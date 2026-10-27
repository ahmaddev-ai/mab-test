"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Calendar,
  MapPin,
  Send,
  Video,
  Building2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { trackMetaEvent } from "@/lib/meta-tracking";

type FormMode = "message" | "arfa" | "online" | "mentorship" | null;

type FormState = {
  name: string;
  email: string;
  organization: string;
  date: string;
  time: string;
  purpose: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  organization: "",
  date: "",
  time: "",
  purpose: "",
  message: "",
};

export default function BookingClient() {
  const searchParams = useSearchParams();
  const paramMode = searchParams.get("mode") as
    | "message"
    | "arfa"
    | "online"
    | "mentorship"
    | null;
  const [formMode, setFormMode] = useState<FormMode>("message");
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paramMode) {
      setFormMode(paramMode);
    }
  }, [paramMode]);

  const getFormTitle = () => {
    switch (formMode) {
      case "message":
        return "Send a Quick Message";
      case "arfa":
        return "Book a Meeting at Arfa Tower";
      case "online":
        return "Book an Online Consultation";
      case "mentorship":
        return "Book Tech Mentorship";
      default:
        return "Send a Message";
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    const { name, email, organization, date, time, purpose, message } =
      formData;

    const schedulingRows =
      formMode === "arfa" || formMode === "online" || formMode === "mentorship"
        ? `
          <p><b>Date:</b> ${date || "N/A"}</p>
          <p><b>Time:</b> ${time || "N/A"}</p>
          <p><b>Purpose:</b> ${purpose || "N/A"}</p>`
        : "";

    const body = {
      projectName: process.env.NEXT_PUBLIC_PROJECT_NAME,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      to: "ahmadhasandevai@gmail.com",
      subject: `${getFormTitle()} — ${name}`,
      htmlBody: `
        <div style="font-family: Arial; padding: 20px; background: #111; color: white;">
          <h2>${getFormTitle()} - Contact Form</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Organization:</b> ${organization || "N/A"}</p>
          ${schedulingRows}
          <p><b>Message:</b> ${message || "N/A"}</p>
        </div>`,
    };

    try {
      setLoading(true);
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/v1/project/sendEmail",
        body
      );
      trackMetaEvent("Lead", { content_name: getFormTitle(), content_category: "booking" });
      toast.success(" Your request has been sent successfully!");
      setFormData(EMPTY_FORM);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-[#050505] dark:text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.10),transparent_28%),linear-gradient(145deg,#F8FAFC_0%,#E5E7EB_58%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.10),transparent_24%),linear-gradient(145deg,#050505_0%,#0E0E11_58%,#020202_100%)]" />
      {/* GRID */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
      {/* HEADER */}
      <div className="border-b border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:px-20">
          <span className="font-mono text-xs uppercase tracking-[0.34em] text-blue-600 dark:text-blue-300">
            Book With Mian Ahmad Basit
          </span>
          <h1 className="mt-5 text-4xl font-medium tracking-[-2px] text-slate-900 dark:text-white md:text-6xl">
            Let’s Start a
            <span className="mt-2 block bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
              Conversation.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9CA3AF]">
            Meet in person at Arfa Tower, connect online, or book a tech
            mentorship session — reach out with confidence.
          </p>
        </div>
      </div>
      {/* CONTACT OPTIONS */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <ContactCard
            icon={<Mail />}
            title="Quick Message"
            value="ahmadhasandevai@gmail.com"
            description="General inquiries and collaborations."
            mode="message"
            setFormMode={setFormMode}
          />
          <ContactCard
            icon={<Building2 />}
            title="Meet at Arfa Tower"
            value="In-Person Meeting"
            description="Book a face-to-face meeting at Arfa Tower, Lahore."
            mode="arfa"
            setFormMode={setFormMode}
          />
          <ContactCard
            icon={<Video />}
            title="Online Consultation"
            value="Schedule a Video Call"
            description="Book a remote consultation from anywhere."
            mode="online"
            setFormMode={setFormMode}
          />
          <ContactCard
            icon={<Phone />}
            title="Tech Mentorship"
            value="Book Mentorship Session"
            description="One-on-one guidance on your tech career or project."
            mode="mentorship"
            setFormMode={setFormMode}
          />
        </div>
      </div>
      {/* FORM SECTION */}
      <div className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:px-20 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <h2 className="text-3xl font-medium tracking-[-1px] text-slate-900 dark:text-white">
              Professional Engagements
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600 dark:text-[#9CA3AF]">
              Working with founders, students, and teams on AI, software
              development, and career mentorship — in person at Arfa Tower or
              online.
            </p>
            <div className="mt-8 space-y-5">
              <InfoRow
                icon={<MapPin size={18} />}
                text="Arfa Software Technology Park, Lahore"
              />
              <InfoRow
                icon={<Calendar size={18} />}
                text="Flexible in-person & online scheduling"
              />
              <InfoRow
                icon={<Send size={18} />}
                text="Response within 24–48 hours"
              />
            </div>
            {formMode && (
              <div className="mt-10">
                <Button
                  onClick={() => setFormMode(null)}
                  className="rounded-full border border-red-500/20 bg-red-500/10 px-8 py-6 text-red-600 shadow-none transition hover:bg-red-500/20 dark:text-red-300"
                >
                  Close {getFormTitle()}
                </Button>
              </div>
            )}
          </div>
          {/* FORM */}
          <AnimatePresence mode="wait">
            {formMode && (
              <motion.div
                key={formMode}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4 }}
                className="rounded-[32px] border border-black/5 bg-white/70 p-8 shadow-xl shadow-blue-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <h3 className="text-2xl font-medium text-slate-900 dark:text-white">
                  {getFormTitle()}
                </h3>
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    disabled={loading}
                    onChange={(e: any) => handleChange("name", e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    disabled={loading}
                    onChange={(e: any) => handleChange("email", e.target.value)}
                  />
                  <Input
                    placeholder="Organization / Company"
                    value={formData.organization}
                    disabled={loading}
                    onChange={(e: any) =>
                      handleChange("organization", e.target.value)
                    }
                  />
                  {(formMode === "arfa" ||
                    formMode === "online" ||
                    formMode === "mentorship") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-5 overflow-hidden"
                    >
                      <Input
                        type="date"
                        value={formData.date}
                        disabled={loading}
                        onChange={(e: any) =>
                          handleChange("date", e.target.value)
                        }
                      />
                      <Input
                        type="time"
                        value={formData.time}
                        disabled={loading}
                        onChange={(e: any) =>
                          handleChange("time", e.target.value)
                        }
                      />
                      <select
                        value={formData.purpose}
                        disabled={loading}
                        onChange={(e) =>
                          handleChange("purpose", e.target.value)
                        }
                        className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-sm text-slate-700 outline-none focus:border-blue-500 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                      >
                        <option value="">Purpose</option>
                        {formMode === "arfa" && (
                          <option value="In-Person Meeting">
                            In-Person Meeting
                          </option>
                        )}
                        {formMode === "online" && (
                          <option value="Online Consultation">
                            Online Consultation
                          </option>
                        )}
                        {formMode === "mentorship" && (
                          <option value="Tech Mentorship">
                            Tech Mentorship
                          </option>
                        )}
                      </select>
                    </motion.div>
                  )}
                  <textarea
                    rows={5}
                    placeholder="Briefly describe your requirement..."
                    value={formData.message}
                    disabled={loading}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-[#6B7280]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    <Send className="h-4 w-4" />
                    {loading
                      ? "Sending..."
                      : formMode === "message"
                      ? "Send Message"
                      : "Request Booking"}
                  </button>
                  <p className="text-center text-xs text-slate-500 dark:text-[#6B7280]">
                    Your information is kept confidential.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
/* COMPONENTS */
function ContactCard({
  icon,
  title,
  value,
  description,
  mode,
  setFormMode,
}: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={() => setFormMode(mode)}
      className="group cursor-pointer rounded-[28px] border border-black/5 bg-white/70 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-500/30"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/10 bg-blue-500/10 text-blue-600 dark:text-blue-300">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-medium text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium text-slate-700 dark:text-[#D1D5DB]">
        {value}
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
        {description}
      </p>
      <span className="mt-5 inline-flex text-sm font-medium text-blue-600 dark:text-blue-300">
        Click to {mode === "message" ? "send message" : "book"}
      </span>
    </motion.div>
  );
}
function InfoRow({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-[#D1D5DB]">
      <span className="text-blue-600 dark:text-blue-300">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
function Input(props: any) {
  return (
    <input
      {...props}
      className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-sm text-slate-700 outline-none transition focus:border-blue-500 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-[#6B7280]"
    />
  );
}
