export const RESOURCES = {
  videos: {
    label: "Videos", singular: "video", slug: false,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "youtube_url", label: "YouTube URL", type: "url", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "thumbnail_url", label: "Custom thumbnail (optional)", type: "image", folder: "videos" },
      { name: "featured", label: "Featured", type: "switch" },
      { name: "published", label: "Published", type: "switch", default: true },
    ],
  },
  projects: {
    label: "Projects", singular: "project", slug: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "cover_url", label: "Cover image", type: "image", folder: "projects" },
      { name: "content", label: "Case study", type: "rich" },
      { name: "tags", label: "Tags (comma separated)", type: "tags" },
      { name: "live_url", label: "Live URL", type: "url" },
      { name: "repo_url", label: "Source URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "featured", label: "Featured", type: "switch" },
      { name: "published", label: "Published", type: "switch", default: true },
    ],
  },
  notes: {
    label: "Notes", singular: "note", slug: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subject", label: "Subject", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea", rows: 2 },
      { name: "content", label: "Content", type: "rich", required: true },
      { name: "file_url", label: "Attachment (PDF)", type: "file", accept: "application/pdf", folder: "notes" },
      { name: "published", label: "Published", type: "switch", default: true },
    ],
  },
  updates: {
    label: "Updates", singular: "update", slug: false,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "body", label: "Body", type: "textarea", rows: 6 },
      { name: "pinned", label: "Pinned", type: "switch" },
      { name: "published", label: "Published", type: "switch", default: true },
    ],
  },
};

export const SETTINGS_FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "headline", label: "Homepage headline", type: "text", required: true },
  { name: "subline", label: "Subline", type: "textarea", rows: 3 },
  { name: "bio", label: "About text", type: "textarea", rows: 6 },
  { name: "portrait_url", label: "Portrait", type: "image", folder: "site" },
  { name: "stats", label: "Stats (one per line, like  Subscribers: 120K)", type: "stats" },
  { name: "socials", label: "Socials (one per line, like  youtube: https://...)", type: "socials" },
];