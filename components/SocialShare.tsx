import { Facebook, Linkedin, MessageCircle, Twitter } from "lucide-react";

const SHARE_URL = "https://ahmadbasit.com/";

export default function SocialShare() {
  const socials = [
    {
      icon: <Facebook size={18} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`,
      label: "Facebook",
    },
    {
      icon: <Twitter size={18} />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SHARE_URL)}`,
      label: "Twitter",
    },
    {
      icon: <Linkedin size={18} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
      label: "LinkedIn",
    },
    {
      icon: <MessageCircle size={18} />,
      href: `https://wa.me/?text=${encodeURIComponent(SHARE_URL)}`,
      label: "WhatsApp",
    },
  ];

  return (
    <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="flex h-11 w-11 items-center justify-center rounded-full border bg-white text-slate-900 shadow-lg transition-transform hover:scale-110"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
