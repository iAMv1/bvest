"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

async function requireAdmin() {
  const s = await getSession();
  if (!s.isAdmin) redirect("/admin/login?error=unauthorized");
}

const ID_RE = /^[a-z0-9][a-z0-9-]{2,40}$/;

export async function createDomain(formData: FormData) {
  await requireAdmin();
  const id = ((formData.get("id") as string) ?? "").trim().toLowerCase();
  const name = ((formData.get("name") as string) ?? "").trim();
  const description = ((formData.get("description") as string) ?? "").trim();
  const colorToken = ((formData.get("colorToken") as string) ?? "").trim() || "var(--color-sdg6)";

  if (!ID_RE.test(id) || name.length < 2 || description.length < 5) {
    redirect("/admin/domains?error=invalid");
  }
  const exists = await prisma.domain.findUnique({ where: { id } });
  if (exists) redirect("/admin/domains?error=duplicate");

  await prisma.domain.create({ data: { id, name, description, colorToken } });
  revalidatePath("/admin/domains");
  revalidatePath("/society/preferences");
  redirect("/admin/domains?created=1");
}

export async function deleteDomain(formData: FormData) {
  await requireAdmin();
  const id = ((formData.get("id") as string) ?? "").trim();
  if (!id) redirect("/admin/domains?error=invalid");
  await prisma.domain.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/domains");
  redirect("/admin/domains?deleted=1");
}

export async function bulkImportDomains(formData: FormData) {
  await requireAdmin();
  const json = ((formData.get("json") as string) ?? "").trim();
  const file = formData.get("file") as File | null;

  let raw = json;
  if (file && file.size > 0) {
    raw = await file.text();
  }
  if (!raw) redirect("/admin/domains?error=invalid");

  let list: any[] = [];
  try {
    // Try JSON first
    if (raw.trim().startsWith("[")) {
      list = JSON.parse(raw);
    } else if (raw.trim().startsWith("{")) {
      const obj = JSON.parse(raw);
      list = Array.isArray(obj.domains) ? obj.domains : [obj];
    } else {
      // CSV: id,name,description,colorToken per line, skip header if contains "id"
      const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
      const start = lines[0].toLowerCase().startsWith("id,") ? 1 : 0;
      for (let i = start; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
        if (parts.length >= 3) {
          list.push({ id: parts[0], name: parts[1], description: parts[2], colorToken: parts[3] || "var(--color-sdg6)" });
        }
      }
    }
  } catch {
    redirect("/admin/domains?error=invalid");
  }

  let imported = 0;
  for (const d of list) {
    const id = String(d.id || "").trim().toLowerCase();
    const name = String(d.name || "").trim();
    const description = String(d.description || "").trim();
    const colorToken = String(d.colorToken || "var(--color-sdg6)").trim();
    if (!ID_RE.test(id) || name.length < 2 || description.length < 5) continue;
    try {
      await prisma.domain.upsert({
        where: { id },
        create: { id, name, description, colorToken },
        update: { name, description, colorToken },
      });
      imported++;
    } catch {}
  }

  revalidatePath("/admin/domains");
  redirect(`/admin/domains?imported=${imported}`);
}
