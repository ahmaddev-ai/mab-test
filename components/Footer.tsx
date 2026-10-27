import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  Github,
  Facebook,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/products", label: "Products" },
  { href: "/mab-fast-earning-program", label: "Courses" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

const GOOGLE_REVIEW_URL = "https://g.page/r/CfYAjcH06O7nEBM/review";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-white px-5 py-16 text-slate-700 dark:border-white/[0.08] dark:bg-[#0A0A0A] dark:text-white/70">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-52 w-[560px] -translate-x-1/2 bg-blue-500/10 blur-[120px]" />

      {/* Main Footer */}
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-3xl font-medium tracking-[-1px] text-slate-950 dark:text-white">
            Mian Ahmad Basit
          </h3>

          <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            Founder & CEO — P2P Clouds
          </p>

          <p className="mt-4 max-w-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
            Engineering Intelligent Futures.
          </p>

          <p className="mt-4 max-w-sm leading-7 text-slate-600 dark:text-[#9CA3AF]">
            AI, Cloud, Blockchain, Security and Education ecosystem branding for
            global-scale products and partnerships.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="font-heading text-lg font-medium text-slate-950 dark:text-white">
            Pages
          </h4>

          <div className="mt-4 grid gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm transition hover:text-blue-600 dark:hover:text-blue-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-heading text-lg font-medium text-slate-950 dark:text-white">
            Connect
          </h4>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Social
              href="https://www.facebook.com/mianahmedbasit"
              label="Facebook"
            >
              <Facebook size={18} />
            </Social>

            <Social
              href="https://pk.linkedin.com/in/mianahmadbasit"
              label="LinkedIn"
            >
              <Linkedin size={18} />
            </Social>

            <Social
              href="https://twitter.com/MianAhmadBasit1"
              label="Twitter / X"
            >
              <Twitter size={18} />
            </Social>

            <Social
              href="https://www.instagram.com/mianahmadbasit"
              label="Instagram"
            >
              <Instagram size={18} />
            </Social>

            <Social href="https://github.com/MianAhmadBasit" label="GitHub">
              <Github size={18} />
            </Social>

            <Social href="https://github.com/mianahmadbasit1" label="GitHub 2">
              <Github size={18} />
            </Social>

            <Social href="mailto:info@p2pclouds.net" label="Email Ahmad Basit">
              <Mail size={18} />
            </Social>
          </div>

          <a
            href="https://wa.me/923072770751"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm transition hover:text-blue-600 dark:hover:text-blue-300"
          >
            <Phone size={16} />
            +92 307 2770751
          </a>
        </div>

        {/* Google Review QR */}
        <div>
          <h4 className="font-heading text-lg font-medium text-slate-950 dark:text-white">
            Review Us
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#9CA3AF]">
            Enjoyed your experience? Leave us a review on Google.
          </p>

          {/* QR Code */}
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Leave a Google Review"
            className="group mt-5 inline-block rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:ring-white/10"
          >
            <Image
              src="/google-review-qr.png"
              alt="Scan to leave a Google review"
              width={150}
              height={150}
              className="h-[150px] w-[150px] rounded-lg"
            />
          </a>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="ml-1 text-xs text-slate-500 dark:text-white/50">
              Google Reviews
            </span>
          </div>

          {/* Button */}
          <a
            href={"https://g.page/r/CfYAjcH06O7nEBM/review"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Leave a Review
          </a>

          <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
            Scan the QR code or click the button.
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="relative mx-auto my-12 max-w-7xl overflow-hidden rounded-2xl border border-black/10 dark:border-white/[0.08]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1792616463184!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDQ0dmJuZVE.!2m2!1d31.47616577311677!2d74.34273533108515!3f206.02141977068766!4f34.45553569720943!5f0.7820865974627469"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ahmad Basit Emerging Tech AI Founder — Location"
          className="w-full grayscale-[15%] dark:grayscale-[40%] dark:invert-[92%] dark:hue-rotate-180"
        />
      </div>

      {/* Footer Bottom */}
      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-black/10 pt-6 text-sm text-slate-600 dark:border-white/[0.08] dark:text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span>
            Copyright {new Date().getFullYear()} Ahmad Basit Ecosystem. All
            rights reserved.
          </span>

          <a
            href="https://p2pclouds.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition hover:text-blue-600 dark:hover:text-blue-300"
          >
            Powered by P2P Clouds
          </a>
        </div>

        <span className="font-mono uppercase tracking-[0.22em]">
          AI / Cloud / Blockchain / Security
        </span>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:hover:text-blue-300"
    >
      {children}
    </a>
  );
}
