import { createHmac } from "node:crypto";

export type KuickpaySessionPayload = {
  companyid: string;
  orderid: string;
  amount: string;
  amountPayable: string;
  timestamp: string;
  transactiondescription: string;
  returnurl: string;
  signature: string;
};

export type KuickpayStatusPayload = {
  sessionid: string;
  companyid: string;
  orderid: string;
  amount: string;
  amountpayable: string;
  timestamp: string;
  signature: string;
};

type SessionApiResponse = {
  success?: boolean;
  message?: string;
  responseData?: {
    sessionID?: string;
    redirectURL?: string;
    companyID?: string;
    responseCode?: string;
    responseDescription?: string;
    status?: string;
  };
};

export function getKuickpayConfig() {
  const companyId = process.env.KUICKPAY_COMPANY_ID?.trim();
  const securedKey = process.env.KUICKPAY_SECURED_KEY?.trim();
  const prefix = process.env.KUICKPAY_PREFIX?.trim() || "EMAB";
  const rawGateway = process.env.KUICKPAY_GATEWAY_URL?.trim();

  if (!companyId || !securedKey || !rawGateway) {
    throw new Error(
      "KuickPay configuration is missing. Check server environment variables."
    );
  }

  const gatewayUrl = rawGateway
    .replace(/\/+$/, "")
    .replace(/\/checkout\/api\/session$/i, "");

  return { companyId, securedKey, prefix, gatewayUrl };
}

function buildApiUrl(path: string) {
  const { gatewayUrl } = getKuickpayConfig();
  return `${gatewayUrl}/${path.replace(/^\/+/, "")}`;
}

export function buildKuickpayOrderId(prefix: string) {
  // Unique, time-based order reference.
  return `${prefix}${Date.now()}${cryptoRandomDigits()}`;
}

function cryptoRandomDigits() {
  // Use cryptographically secure randomness for the suffix.
  const { randomInt } = require("node:crypto") as typeof import("node:crypto");
  return randomInt(100, 1000).toString();
}

export function createKuickpaySignature(
  companyId: string,
  orderId: string,
  amount: string,
  amountPayable: string,
  timestamp: string,
  securedKey: string
) {
  const canonical = [companyId, orderId, amount, amountPayable, timestamp].join(
    "|"
  );

  return createHmac("sha256", securedKey).update(canonical).digest("base64");
}

export function formatKuickpayAmount(amountPkr: number) {
  if (!Number.isSafeInteger(amountPkr) || amountPkr <= 0) {
    throw new Error("KuickPay amount must be a positive whole PKR amount.");
  }

  return amountPkr.toFixed(2);
}

function getBasicAuthHeader() {
  const { companyId, securedKey } = getKuickpayConfig();
  const encoded = Buffer.from(`${companyId}:${securedKey}`, "utf8").toString(
    "base64"
  );

  return `Basic ${encoded}`;
}

export async function createKuickpayCheckoutSession(
  payload: KuickpaySessionPayload
): Promise<{
  sessionID: string;
  redirectURL: string;
  companyID: string;
}> {
  const { companyId } = getKuickpayConfig();

  const response = await fetch(buildApiUrl("/checkout/api/session"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBasicAuthHeader(),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = (await response
    .json()
    .catch(() => null)) as SessionApiResponse | null;

  if (!response.ok || !data) {
    throw new Error(
      `KuickPay session request failed with HTTP ${response.status}.`
    );
  }

  const result = data.responseData;

  const successful =
    data.success === true ||
    result?.responseCode === "00" ||
    result?.status?.toLowerCase() === "success";

  if (!successful || !result?.sessionID || !result?.redirectURL) {
    throw new Error(
      data.message || "KuickPay did not return a valid checkout session."
    );
  }

  // Only redirect to HTTPS checkout URLs.
  const redirect = new URL(result.redirectURL);

  if (redirect.protocol !== "https:") {
    throw new Error("KuickPay returned an invalid checkout URL.");
  }

  return {
    sessionID: result.sessionID,
    redirectURL: redirect.toString(),
    companyID: result.companyID || companyId,
  };
}

export function buildKuickpayStatusRequestBody(
  payload: KuickpayStatusPayload
): Record<string, string> {
  return {
    SessionID: payload.sessionid,
    CompanyID: payload.companyid,
    OrderID: payload.orderid,
    Amount: payload.amount,
    AmountPayable: payload.amountpayable,
    Timestamp: payload.timestamp,
    Signature: payload.signature,
  };
}

export async function verifyKuickpayPaymentStatus(
  payload: KuickpayStatusPayload
): Promise<unknown> {
  const configuredPath = process.env.KUICKPAY_STATUS_PATH?.trim();

  const paths = configuredPath
    ? [configuredPath]
    : ["/checkout/api/status", "/api/status"];

  let lastError = "No KuickPay status response received.";

  for (const path of paths) {
    const response = await fetch(buildApiUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getBasicAuthHeader(),
      },
      body: JSON.stringify(buildKuickpayStatusRequestBody(payload)),
      cache: "no-store",
    });

    const data: unknown = await response.json().catch(() => null);

    if (response.status === 404 && !configuredPath) {
      lastError = `KuickPay status endpoint ${path} was not found.`;
      continue;
    }

    if (!response.ok) {
      throw new Error(
        `KuickPay status request failed with HTTP ${response.status}.`
      );
    }

    return data;
  }

  throw new Error(lastError);
}

export function isKuickpayPaymentSuccessful(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;

  const record = data as Record<string, unknown>;

  const nested =
    record.responseData && typeof record.responseData === "object"
      ? (record.responseData as Record<string, unknown>)
      : null;

  // Accept only explicit documented success indicators.
  if (record.success === true || nested?.success === true) {
    return true;
  }

  const responseCode = String(
    nested?.responseCode ?? record.responseCode ?? ""
  );

  if (responseCode === "00") return true;

  const rawStatus = String(
    nested?.status ?? record.status ?? record.paymentStatus ?? ""
  ).toLowerCase();

  return ["paid", "success", "successful", "completed", "approved"].includes(
    rawStatus
  );
}
