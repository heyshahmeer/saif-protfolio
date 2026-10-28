"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES, SETTINGS_FIELDS } from "@/lib/resources";

const pairs = (str) =>
  str.split("\n").map((l) => l.match(/^([^:]+):\s*(.+)$/)).filter(Boolean);

function parse(fields, fd) {
  const row = {};
  for (const f of fields) {
    const raw = fd.get(f.name);
    const str = raw == null ? "" : String(raw).trim();
    if (f.required && !str) return { error: `${f.label} is required` };
    switch (f.type) {
      case "switch": row[f.name] = raw === "on"; break;
      case "number": row[f.name] = str ? parseInt(str, 10) || 0 : f.nullable ? null : 0; break;
      case "tags": row[f.name] = str ? str.split(",").map((t) => t.trim()).filter(Boolean) : []; break;
      case "stats": row[f.name] = pairs(str).map((m) => ({ label: m[1].trim(), value: m[2].trim() })); break;
      case "socials": row[f.name] = Object.fromEntries(pairs(str).map((m) => [m[1].trim().toLowerCase(), m[2].trim()])); break;
      case "gallery": row[f.name] = fd.getAll(f.name).map(String).filter(Boolean); break;
      case "gallery":
        control = (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FileUpload key={i} name={f.name} folder="gallery" accept="image/*" defaultValue={(value ?? [])[i] ?? ""} />
            ))}
          </div>
        );
        break;

      default: row[f.name] = str || null;
    }
  }
  return { row };
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data: ok } = await supabase.rpc("is_admin");
  return ok ? supabase : null;
}

export async function saveResource(key, _prev, fd) {
  const cfg = RESOURCES[key];
  if (!cfg) return { error: "Unknown section" };
  const supabase = await requireAdmin();
  if (!supabase) return { error: "Unauthorized" };

  const { row, error } = parse(cfg.fields, fd);
  if (error) return { error };

  const id = fd.get("id");
  let res;
  if (id) {
    res = await supabase.from(key).update(row).eq("id", id);
  } else {
    const slug = `${slugify(row.title, { lower: true, strict: true })}-${Math.random().toString(36).slice(2, 6)}`;
    res = await supabase.from(key).insert(cfg.slug ? { ...row, slug } : row);
  }
  if (res.error) return { error: res.error.message };

  revalidatePath("/", "layout");
  redirect(`/admin/${key}`);
}

export async function deleteResource(key, id) {
  if (!RESOURCES[key]) return;
  const supabase = await requireAdmin();
  if (!supabase) return;
  await supabase.from(key).delete().eq("id", id);
  revalidatePath("/", "layout");
}

export async function saveSettings(_prev, fd) {
  const supabase = await requireAdmin();
  if (!supabase) return { error: "Unauthorized" };
  const { row, error } = parse(SETTINGS_FIELDS, fd);
  if (error) return { error };
  const res = await supabase.from("site_settings").upsert({ id: 1, ...row });
  if (res.error) return { error: res.error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}