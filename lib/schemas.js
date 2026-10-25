import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Title is too short"),
  subject: z.string().optional(),
  excerpt: z.string().max(280).optional(),
  content: z.string().min(1, "Write something first"),
  file_url: z.string().url().optional(),
  published: z.boolean(),
});