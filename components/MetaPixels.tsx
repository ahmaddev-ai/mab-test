"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { canTrackMetaEvents, trackMetaEvent } from "@/lib/meta-tracking";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.replace(/[^0-9]/g, "");

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pixelReady, setPixelReady] = useState(false);
  const lastTrackedUrl = useRef<string | undefined>(undefined);
  const currentUrl = `${pathname}${searchParams.size ? `?${searchParams}` : ""}`;

  useEffect(() => {
    if (!pixelReady || !canTrackMetaEvents() || lastTrackedUrl.current === currentUrl) return;

    lastTrackedUrl.current = currentUrl;
    trackMetaEvent("PageView");
  }, [currentUrl, pixelReady]);

  if (!PIXEL_ID || !canTrackMetaEvents()) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive" onLoad={() => setPixelReady(true)}>
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){
        n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
        s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
      `}
    </Script>
  );
}
