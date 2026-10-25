import sanitizeHtml from "sanitize-html";

export const cleanHtml = (html) =>
  sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h2", "h3"]),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ["src", "alt"] },
  });

export const ytId = (url) => url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1] ?? "";
export const ytThumb = (url) => `https://i.ytimg.com/vi/${ytId(url)}/maxresdefault.jpg`;