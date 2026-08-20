"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { sdgData } from "@/lib/sdg-data";
import { getSession } from "@/lib/session";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,59}$/;

async function requireAdmin() {
  const s = await getSession();
  if (!s.isAdmin) redirect("/admin/login?error=unauthorized");
}

function isSafeHttpUrl(u: string): boolean {
  try {
    const parsed = new URL(u);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
const STATUSES = ["DRAFT", "PENDING", "CONFIRMED", "LIVE", "COMPLETED"];

function parseDate(value: string): Date | null {
  const v = value?.trim();
  if (!v) return null;
  const d = new Date(`${v}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function createEvent(formData: FormData) {
  await requireAdmin();
  const title = ((formData.get("title") as string) ?? "").trim();
  const rawSlug = ((formData.get("slug") as string) ?? "").trim().toLowerCase();
  const hostSocietyId = ((formData.get("hostSocietyId") as string) ?? "").trim() || null;
  const sdgDomainId = (formData.get("sdgDomainId") as string) ?? "";
  const description = ((formData.get("description") as string) ?? "").trim();
  const venue = ((formData.get("venue") as string) ?? "").trim() || null;
  let registrationUrl = ((formData.get("registrationUrl") as string) ?? "").trim() || null;
  if (registrationUrl && !isSafeHttpUrl(registrationUrl)) registrationUrl = null;
  const status = STATUSES.includes((formData.get("status") as string) ?? "") ? (formData.get("status") as string) : "DRAFT";
  const startDate = parseDate((formData.get("startDate") as string) ?? "");
  const endDate = parseDate((formData.get("endDate") as string) ?? "");

  const problem =
    title.length < 3
      ? "title"
      : !SLUG_RE.test(rawSlug)
        ? "slug"
        : !sdgData.some((s) => String(s.number) === sdgDomainId)
          ? "sdg"
          : description.length < 10
            ? "description"
            : null;

  if (problem) redirect(`/admin/events?error=${problem}`);

  if (hostSocietyId) {
    const host = await prisma.society.findUnique({ where: { id: hostSocietyId } });
    if (!host) redirect("/admin/events?error=host");
  }

  const existing = await prisma.event.findUnique({ where: { slug: rawSlug } });
  if (existing) redirect("/admin/events?error=duplicate");

  await prisma.event.create({
    data: { title, slug: rawSlug, hostSocietyId, sdgDomainId, description, venue, registrationUrl, status, startDate, endDate },
  });

  revalidatePath("/admin/events");
  redirect("/admin/events?created=1");
}