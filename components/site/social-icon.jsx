export function handleFor(key, url) {
  try {
    const u = new URL(url);
    const last = u.pathname.split("/").filter(Boolean).pop();
    return key.toLowerCase() === "instagram" && last ? `@${last}` : u.hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function SocialIcon({ name }) {
  const n = name.toLowerCase();
  if (n === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  if (n === "facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
      </svg>
    );
  return <span className="text-xl">↗</span>;
}