"use server";
import { z } from "zod";
import { publicDb } from "@/lib/supabase/public";

const schema = z.object({
  university_id: z.string().uuid("Choose a university"),
  program: z.string().max(120).optional(),
  full_name: z.string().min(2, "Enter your full name").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number").max(25),
  city: z.string().max(80).optional(),
  qualification: z.string().max(60).optional(),
  marks: z.string().max(40).optional(),
  message: z.string().max(1500, "Message is too long").optional(),
});

const v = (x) => (x ? String(x).trim() || undefined : undefined);

export async function submitApplication(_prev, fd) {
  if (fd.get("company")) return { ok: true }; // honeypot: bots fill this, humans never see it

  const parsed = schema.safeParse({
    university_id: v(fd.get("university_id")),
    program: v(fd.get("program")),
    full_name: v(fd.get("full_name")),
    email: v(fd.get("email")),
    phone: v(fd.get("phone")),
    city: v(fd.get("city")),
    qualification: v(fd.get("qualification")),
    marks: v(fd.get("marks")),
    message: v(fd.get("message")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const db = publicDb();
  const { data: uni } = await db.from("universities").select("title").eq("id", parsed.data.university_id).maybeSingle();
  const { error } = await db.from("applications").insert({ ...parsed.data, university_name: uni?.title ?? null });
  if (error) return { error: "Could not submit right now. Please try again." };
  return { ok: true };
}