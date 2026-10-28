const LABELS = { youtube: "YouTube", tiktok: "TikTok", linkedin: "LinkedIn", whatsapp: "WhatsApp", facebook: "Facebook", instagram: "Instagram" };
export const labelFor = (k) => LABELS[k.toLowerCase()] ?? k;

export function handleFor(key, url) {
  const k = key.toLowerCase();
  if (k === "whatsapp") return "Channel";
  if (k === "facebook") return "Page";
  try {
    const u = new URL(url);
    const last = u.pathname.split("/").filter(Boolean).pop();
    if (["instagram", "tiktok", "youtube"].includes(k) && last) return last.startsWith("@") ? last : `@${last}`;
    return u.hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function SocialIcon({ name }) {
  const n = name.toLowerCase();
  const fill = { viewBox: "0 0 24 24", fill: "currentColor", className: "h-6 w-6" };
  const line = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, className: "h-6 w-6" };

  if (n === "instagram")
    return (<svg {...line}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>);
  if (n === "facebook")
    return (<svg {...fill}><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" /></svg>);
  if (n === "youtube")
    return (<svg {...fill}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" /></svg>);
  if (n === "tiktok")
    return (<svg {...fill}><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z" /></svg>);
  if (n === "linkedin")
    return (<svg {...fill}><path d="M6.9 8.7H3.7V20h3.2V8.7zM5.3 3.8a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.3 13.4c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.8-2.8 1.5V8.7h-3.1V20h3.2v-6.2c0-1.6.7-2.6 2-2.6 1.2 0 1.8.9 1.8 2.6V20h3.2v-6.6z" /></svg>);
  if (n === "whatsapp")
    return (<svg {...line}><path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8c-.9-.4-1.6-1.1-2-2l.8-.8-1-2L9 9.5z" /></svg>);
  return <span className="text-xl">↗</span>;
}