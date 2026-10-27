"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Calendar,
  MapPin,
  Send,
  Mic,
  Users,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function CollaborationSection() {
  // current form mode
  const [formMode, setFormMode] = useState<
    "message" | "call" | "podcast" | "event" | null
  >(null);

  // Helper to get title for form based on selection
  const getFormTitle = () => {
    switch (formMode) {
      case "message":
        return "Send a Quick Message";
      case "call":
        return "Book a Strategy Call";
      case "podcast":
        return "Book a Podcast / Interview";
      case "event":
        return "Book for Event / Session";
      default:
        return "Send a Message";
    }
  };

  return (
    <section className="relative py-28 px-6 bg-[#05060A] overflow-hidden">
      {/* Background Glows */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute -top-10 left-0 w-[450px] h-[450px] bg-[#10B981]/10 blur-[140px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#10B981]/10 blur-[160px]"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-6"
        >
          Collaborate{" "}
          <span className="text-[#10B981] drop-shadow-[0_0_12px_#10B981]">
            with Mian Ahmad Basit
          </span>
        </motion.h2>

        <p className="text-center text-white/60 max-w-3xl mx-auto mb-20">
          Connect for strategic guidance, speaking engagements, or impactful
          collaboration opportunities across AI, innovation, leadership, and
          future technology.
        </p>

        {/* CTA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <CollaborationCard
            icon={
              <MessageSquare className="text-[#10B981] w-14 h-14 mb-4 group-hover:scale-110 transition" />
            }
            title="Send a Quick Message"
            description="Share your thoughts or questions instantly."
            mode="message"
            setFormMode={setFormMode}
          />
          <CollaborationCard
            icon={
              <Calendar className="text-[#10B981] w-14 h-14 mb-4 group-hover:scale-110 transition" />
            }
            title="Book a Consultation"
            description="Discuss AI transformation, enterprise strategy, or growth-driven digital innovation."
            mode="call"
            setFormMode={setFormMode}
          />
          <CollaborationCard
            icon={
              <Mic className="text-[#10B981] w-14 h-14 mb-4 group-hover:scale-110 transition" />
            }
            title="Book Podcast / Interview"
            description="Invite Mian Ahmad Basit to share insights on AI, startups, and innovation."
            mode="podcast"
            setFormMode={setFormMode}
          />
          <CollaborationCard
            icon={
              <Users className="text-[#10B981] w-14 h-14 mb-4 group-hover:scale-110 transition" />
            }
            title="Book for Event / Session"
            description="Invite for keynotes, workshops, training sessions or corporate events."
            mode="event"
            setFormMode={setFormMode}
          />
        </div>

        {/* Contact Form */}
        <AnimatePresence>
          {formMode && (
            <motion.div
              key="contactForm"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="mt-16 border border-white/10 rounded-2xl bg-[#0d0f15] p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">{getFormTitle()}</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFormMode(null)}
                >
                  Close
                </Button>
              </div>

              <form className="space-y-5">
                <input type="text" placeholder="Full Name" className="input" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Organization / Company"
                  className="input"
                />

                {/* Conditional fields for Call / Podcast / Event */}
                {(formMode === "call" ||
                  formMode === "podcast" ||
                  formMode === "event") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <input type="date" className="input" />
                    <input type="time" className="input" />
                    <select className="input bg-[#0d0f15]">
                      <option>Purpose</option>
                      {formMode === "call" && <option>Consulting</option>}
                      {formMode === "podcast" && (
                        <option>Podcast / Interview</option>
                      )}
                      {formMode === "event" && (
                        <option>Workshop / Keynote</option>
                      )}
                    </select>
                  </motion.div>
                )}

                <textarea
                  rows={5}
                  placeholder="Briefly describe your requirement..."
                  className="input resize-none"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-md transition"
                >
                  <Send className="w-4 h-4" />
                  {formMode === "message" ? "Send Message" : "Request Booking"}
                </button>

                <p className="text-xs text-white/50 text-center">
                  Your information is kept confidential.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ===== CARD COMPONENT ===== */
function CollaborationCard({
  icon,
  title,
  description,
  mode,
  setFormMode,
}: any) {
  return (
    <Link
      href={`/contact?mode=${mode}`} // Pass mode as query param
      className="inline-block w-full"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0A0F14] border border-white/10 p-10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_45px_rgba(16,185,129,0.25)] transition-all group cursor-pointer"
      >
        {icon}
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-white/60 mt-3 mb-5">{description}</p>
        <span className="inline-block px-4 py-2 text-xs text-emerald-400 font-medium">
          Click to {mode === "message" ? "send message" : "book"}
        </span>
      </motion.div>
    </Link>
  );
}
