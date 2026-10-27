"use client";

import {
  COURSE_CATALOG_BY_SLUG,
  type CourseSlug,
} from "@/data/all_courses_catalog";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Headphones,
  MonitorPlay,
  Play,
  Smartphone,
  Sparkles,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { trackMetaEvent } from "@/lib/meta-tracking";

type CourseDetailPageProps = {
  slug: CourseSlug;
};

export function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState("Training Content");
  // Modal now opens automatically on page load
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const course = COURSE_CATALOG_BY_SLUG[slug];

  if (!course) {
    throw new Error(`Course detail not found for slug: ${slug}`);
  }

  const tabs = useMemo(
    () => ["Training Content", "Important", "Bonuses", "Impact & Vision"],
    []
  );

  const outline = [
    ...course.curriculum.flatMap((module) =>
      module.points.map((point) => ({
        title: point,
        desc: `${module.title}: practical training, examples, and implementation tasks for ${course.title}.`,
      }))
    ),
    {
      title: "Portfolio and Client-Ready Execution",
      desc: "Build practical assets you can show to clients, employers, or partners.",
    },
    {
      title: "Tools, Systems, and Automation",
      desc: "Use modern software, AI workflows, and repeatable systems to save time and improve delivery quality.",
    },
    {
      title: "Growth and Monetization",
      desc: "Learn how to turn your new skills into services, products, campaigns, or income opportunities.",
    },
  ];

  const enrollmentSections = [
    {
      title: "Important Note",
      items: [
        "No registration fee",
        "One-time fee only",
        "Live lectures",
        "Recorded lectures",
        "Lifetime learning access",
        "No monthly subscription",
      ],
    },
    {
      title: "Course Access",
      items: [
        "Student portal access",
        "Web, iOS, and Android access",
        "Private learning community",
        "Course updates",
      ],
    },
    {
      title: "Training Content",
      items: course.curriculum.flatMap((module, index) => [
        `Module ${index + 1}: ${module.title}`,
      ]),
    },
    {
      title: "Support",
      items: [
        "Live support",
        "Community help",
        "Q&A guidance",
        "Practical feedback",
      ],
    },
    {
      title: "Resources",
      items: ["Templates", "Checklists", "Tools list", "Project resources"],
    },
    {
      title: "Bonus",
      items: [
        "Freelancing guidance",
        "AI workflow pack",
        "Portfolio direction",
      ],
    },
  ];

  const faqs = [
    {
      question: "Is this training online or in-person?",
      answer:
        "This training is online. You can follow the lectures, resources, and support from desktop, laptop, or mobile.",
    },
    {
      question: "I am new to this field. Can I join?",
      answer:
        "Yes. The course starts with foundations and moves into practical implementation step by step.",
    },
    {
      question: "Will I get recorded lectures?",
      answer:
        "Yes. Recorded lessons are included so you can revise the training after live sessions.",
    },
    {
      question: "Does the training guarantee financial success?",
      answer:
        "No course can guarantee income. The training gives you skills, systems, and direction; results depend on execution and consistency.",
    },
  ];

  return (
    <main className="bg-[#f4f3f8] text-[#061b34] dark:bg-[#050505] dark:text-white">
      <EnrollmentModal
        courseName={course.title}
        open={enrollmentOpen}
        onClose={() => setEnrollmentOpen(false)}
      />

      <section className="px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold leading-tight text-[#001f42] dark:text-white sm:text-4xl lg:text-[42px]">
            {course.title}
          </h1>

          <div className="mt-5 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <span className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-[#7517f8]" />
              MAB Instructor{" "}
              <span className="text-slate-500 dark:text-white/55">
                (Trainer)
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#7517f8]" />
              12,000+{" "}
              <span className="text-slate-500 dark:text-white/55">
                (Graduates)
              </span>
            </span>
            <span className="flex items-center gap-1">
              5
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 fill-[#ff8a1f] text-[#ff8a1f]"
                />
              ))}
              <span className="ml-1 text-slate-500 dark:text-white/55">
                (5932 Reviews)
              </span>
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start xl:grid-cols-[minmax(0,1fr)_400px]">
            <div>
              <div className="group relative overflow-hidden rounded-xl border border-black/10 bg-black shadow-lg dark:border-white/10">
                <div className="relative aspect-[16/9] min-h-[190px] sm:min-h-[300px] lg:min-h-[360px]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-contain"
                    priority
                    loading="eager"
                  />
                </div>
                <button
                  type="button"
                  aria-label={`Play ${course.title} preview`}
                  className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff7a1a] text-white shadow-xl transition group-hover:scale-105 sm:h-16 sm:w-16"
                >
                  <Play className="ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8" />
                </button>
              </div>

              <div className="mt-7 space-y-5 text-sm leading-7 text-[#061b34] dark:text-white/75 sm:text-base sm:leading-8">
                <p className="font-bold">
                  Join {course.title} by MAB - a practical training program for
                  focused digital growth.
                </p>
                <p>
                  Led by experienced trainers, master{" "}
                  <strong>{course.category}</strong> workflows, practical
                  implementation, freelancing direction, and modern digital
                  systems. Gain expert insights to transform your career.
                </p>
                <p>Sign up now and start building job-ready skills.</p>
              </div>
            </div>

            <aside className="rounded-xl border border-black/10 bg-white p-5 shadow-2xl shadow-purple-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-purple-500/15 sm:p-6 lg:sticky lg:top-24">
              {/* <h2 className="text-2xl font-bold sm:text-3xl">Rs. 60,000</h2> */}

              <div className="mt-6 space-y-4 text-[15px]">
                <p className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#7517f8]" />
                  Training Duration: {course.duration}
                </p>
                <p className="flex items-center gap-3">
                  <MonitorPlay className="h-5 w-5 text-[#ff7a1a]" />
                  100+ Live Lectures
                </p>
                <p className="flex items-center gap-3">
                  <Headphones className="h-5 w-5 text-[#ff7a1a]" />
                  24/7 Support
                </p>
              </div>

              <div className="my-7 h-px bg-slate-200 dark:bg-white/10" />

              <div className="space-y-4 text-[15px]">
                <p className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[#ff7a1a]" />
                  Last Date: Contact admissions
                </p>
                <p className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#ff7a1a]" />
                  AI + Live Support
                </p>
                <p className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-[#ff7a1a]" />
                  Web/iOS/Android Access
                </p>
                <p className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-[#ff7a1a]" />
                  Certificate of Completion
                </p>
              </div>

              <div className="my-7 h-px bg-slate-200 dark:bg-white/10" />

              <button
                type="button"
                onClick={() => setEnrollmentOpen(true)}
                className="flex h-12 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#8b3dff] to-[#6a00f4] text-base font-bold text-white shadow-lg px-3 shadow-purple-500/20"
              >
                Get Enrolled Now
                <ChevronRight className="h-5 w-5" />
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="font-bold text-[#6a00f4]">
            {course.title} Details & Registration
          </div>
          <h2 className="mt-3 text-xl font-bold text-[#001f42] dark:text-white sm:text-3xl">
            {course.title}: Training Content, Bonuses & Career Direction
          </h2>

          <div className="mt-7 grid grid-cols-2 gap-2 border-b border-purple-300 pb-2 text-sm dark:border-purple-500/40 sm:flex sm:overflow-x-auto sm:gap-0 sm:pb-0 sm:text-base">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`min-h-12 rounded-lg px-3 py-3 text-center transition sm:min-w-[180px] sm:rounded-none sm:px-8 sm:py-4 ${
                  activeTab === tab
                    ? "border border-[#6a00f4] bg-[#6a00f4]/5 font-bold text-[#061b34] dark:bg-[#6a00f4]/15 dark:text-white sm:border-x-0 sm:border-t-0 sm:border-b-2"
                    : "text-black hover:text-[#6a00f4] dark:text-white/75 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-6xl sm:mt-10">
            {activeTab === "Training Content" && (
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">Whats New:-</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    `${course.category} Workflows`,
                    "Automation Systems",
                    "Client Projects",
                    "Portfolio Direction",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-bold"
                    >
                      <CheckCircle2 className="h-5 w-5 fill-[#ff9d00] text-white" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-10 text-xl font-bold sm:mt-12 sm:text-2xl">
                  Course Outline:-
                </h3>
                <div className="mt-6 space-y-5 text-[#061b34] dark:text-white/75">
                  {outline.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 fill-[#ff9d00] text-white" />
                      <div>
                        <h4 className="font-bold text-[#061b34] dark:text-white">
                          {item.title}:
                        </h4>
                        <p className="text-sm leading-7 sm:text-base">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Important" && (
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  Important Details:-
                </h3>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {[
                    `Duration: ${course.duration}`,
                    `Level: ${course.level}`,
                    `Format: ${course.format}`,
                    "Live and recorded learning access",
                    "Certificate of completion",
                    "Support for practical implementation",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-black/10 bg-white p-5 font-bold dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <CheckCircle2 className="mb-3 h-5 w-5 fill-[#7517f8] text-white" />
                      {item}
                    </div>
                  ))}
                </div>

                <h3 className="mt-10 text-xl font-bold sm:mt-12 sm:text-2xl">
                  Learning Outcomes:-
                </h3>
                <div className="mt-6 space-y-4">
                  {course.outcomes.map((outcome) => (
                    <div key={outcome} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 fill-[#ff9d00] text-white" />
                      <p className="leading-7 text-[#061b34] dark:text-white/75">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Bonuses" && (
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  Bonuses Included:-
                </h3>
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  {[
                    "Freelancing guidance",
                    "AI workflow pack",
                    "Portfolio direction",
                    "Templates and checklists",
                    "Tools and resource list",
                    "Client-ready project ideas",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <Sparkles className="mb-4 h-6 w-6 text-[#ff8a1f]" />
                      <h4 className="font-bold">{item}</h4>
                      <p className="mt-3 text-sm leading-6 text-[#061b34] dark:text-white/65">
                        Designed to help you apply {course.title} beyond lessons
                        and move into practical delivery.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Impact & Vision" && (
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  Impact & Vision:-
                </h3>
                <p className="mt-5 max-w-5xl text-sm leading-7 text-[#061b34] dark:text-white/75 sm:text-base sm:leading-8">
                  {course.title} is built to help learners move from theory to
                  practical execution. The goal is to create confident builders,
                  freelancers, marketers, and founders who can use{" "}
                  {course.category.toLowerCase()} skills in real projects.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {[
                    {
                      title: "Skill Growth",
                      desc: "Build a strong foundation and improve through guided practice.",
                    },
                    {
                      title: "Real Execution",
                      desc: "Work through practical tasks that map to real client and product needs.",
                    },
                    {
                      title: "Career Direction",
                      desc: "Understand how to package your skills for jobs, freelance work, or your own products.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <TrophyIcon />
                      <h4 className="mt-4 text-lg font-bold">{item.title}</h4>
                      <p className="mt-3 leading-7 text-[#061b34] dark:text-white/65">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id="enroll"
        className="px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Get Enrolled Now</h2>
          <p className="mx-auto mt-5 max-w-5xl text-sm leading-7 sm:mt-6 sm:text-base sm:leading-8">
            Learn the core principles of {course.title}. Build standout
            projects, implement practical systems, and gain the skills necessary
            to move forward in the digital landscape.
          </p>

          <div className="mx-auto mt-8 max-w-[380px] rounded-xl border border-black/10 bg-white p-4 text-left shadow-2xl shadow-purple-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-purple-500/15 sm:mt-10">
            <div className="py-2 text-center">
              <h3 className="text-2xl font-bold">{course.category}</h3>
              <p className="font-bold">Rs. 60,000</p>
            </div>

            <div className="my-5 h-px bg-slate-200 dark:bg-white/10" />

            <div className="space-y-3">
              {enrollmentSections.map((section, index) => (
                <details
                  key={section.title}
                  open={index === 0}
                  className="group rounded-lg border border-transparent bg-white open:border-[#6a00f4] dark:bg-transparent dark:open:bg-white/[0.03]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 font-bold">
                    {section.title}
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7b22f5] text-white">
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                    </span>
                  </summary>
                  <ul className="space-y-2 px-5 pb-5 pt-2 text-sm">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 fill-[#7517f8] text-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setEnrollmentOpen(true)}
              className="mt-8 flex h-11 px-3 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#8b3dff] to-[#6a00f4] font-bold text-white"
            >
              Register Now
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="font-bold text-[#6a00f4]">Say hi to</div>
          <h2 className="text-3xl font-bold text-[#001f42] dark:text-white sm:text-4xl">
            Our Success Stories
          </h2>
          <p className="mt-5 max-w-6xl text-sm leading-7 text-[#061b34] dark:text-white/75 sm:text-base sm:leading-8">
            Meet learners who turned training into real progress. Each story is
            a reminder that focused learning, practice, and consistency can open
            strong career opportunities.
          </p>

          <div className="mt-8 grid gap-6 rounded-xl bg-white px-5 py-7 shadow-sm dark:border dark:border-white/10 dark:bg-white/[0.04] sm:px-6 sm:py-10 lg:flex lg:items-center lg:gap-8">
            <button
              type="button"
              aria-label="Previous story"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7b22f5] text-white lg:flex"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <div className="grid flex-1 gap-6 md:grid-cols-[260px_1fr] md:items-center">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left md:gap-5">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-purple-100 dark:bg-purple-500/10">
                  <Image
                    src={course.image}
                    alt="Student success story"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">MAB Student</h3>
                  <p>Earned: $3,000+</p>
                  <p>Source: Freelancing</p>
                </div>
              </div>
              <p className="text-base leading-8 text-[#061b34] dark:text-white/75 sm:text-xl sm:leading-9">
                This training gave me a clear path, practical assignments, and
                confidence to start offering digital services.
              </p>
            </div>
            <button
              type="button"
              aria-label="Next story"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7b22f5] text-white lg:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="font-bold text-[#6a00f4]">FAQ&apos;s</div>
          <h2 className="text-3xl font-bold text-[#001f42] dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#061b34] dark:text-white/75 sm:text-base sm:leading-8">
            Got questions? Find quick answers about courses, enrollment, and
            support.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-6xl space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              open={index === 0}
              className="group rounded-lg border border-transparent bg-white open:border-[#6a00f4] dark:bg-white/[0.04] dark:open:border-[#8b3dff]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-base font-bold sm:px-6 sm:text-xl">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7b22f5] text-white">
                  <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                </span>
              </summary>
              <div className="border-t border-slate-200 px-5 py-5 text-left text-sm leading-7 text-[#061b34] dark:border-white/10 dark:text-white/75 sm:px-6 sm:py-6 sm:text-base sm:leading-8">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

function TrophyIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7517f8]/10 text-[#7517f8] dark:bg-[#8b3dff]/15 dark:text-[#b993ff]">
      <BadgeCheck className="h-6 w-6" />
    </div>
  );
}

function EnrollmentModal({
  courseName,
  open,
  onClose,
}: {
  courseName: string;
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formValues = new FormData(form);
    const name = formValues.get("name") as string;
    const phone = formValues.get("phone") as string;
    const email = formValues.get("email") as string;

    const body = {
      projectName: process.env.NEXT_PUBLIC_PROJECT_NAME,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      to: "ahmadhasandevai@gmail.com",
      subject: `New Enrollment Request from ${name} — ${courseName}`,
      htmlBody: `
        <div style="font-family: Arial; padding: 20px; background: #111; color: white;">
          <h2>New Enrollment Request - MAB</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Course:</b> ${courseName}</p>
        </div>`,
    };

    try {
      setLoading(true);
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/v1/project/sendEmail",
        body
      );
      trackMetaEvent("Lead", { content_name: courseName, content_category: "course_enrollment" });
      toast.success("🎉 Application submitted successfully!");
      form.reset();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-sm sm:px-5">
      <div className="relative my-auto w-full max-w-md rounded-2xl border border-black/10 bg-white p-5 text-[#061b34] shadow-2xl shadow-purple-500/20 dark:border-white/10 dark:bg-[#101014] dark:text-white sm:p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enrollment form"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xl leading-none dark:border-white/10"
        >
          ×
        </button>

        <h2 className="pr-10 text-xl font-bold sm:text-2xl">
          Get Enrolled Now
        </h2>

        <div className="mt-3 rounded-lg border border-[#7517f8]/30 bg-[#7517f8]/10 px-4 py-3 text-sm font-bold text-[#6a00f4] dark:bg-[#8b3dff]/15 dark:text-[#c9a9ff]">
          Freelancing course is completely free when you enroll in this program.
        </div>

        <p className="mt-3 text-sm text-slate-600 dark:text-white/60">
          Submit your details and our team will contact you.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-bold">Name</span>
            <input
              name="name"
              type="text"
              required
              disabled={loading}
              className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-4 outline-none focus:border-[#7517f8] disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] sm:h-12"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold">Phone</span>
            <input
              name="phone"
              type="tel"
              required
              disabled={loading}
              className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-4 outline-none focus:border-[#7517f8] disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] sm:h-12"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold">Email</span>
            <input
              name="email"
              type="email"
              required
              disabled={loading}
              className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-4 outline-none focus:border-[#7517f8] disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] sm:h-12"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold">Course</span>
            <input
              name="course"
              type="text"
              value={courseName}
              readOnly
              className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-slate-100 px-4 outline-none dark:border-white/10 dark:bg-white/[0.06] sm:h-12"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#8b3dff] to-[#6a00f4] font-bold text-white disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
