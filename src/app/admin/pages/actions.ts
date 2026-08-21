"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Page } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { isReservedSlug, isValidPageSlug, normalizeSlug } from "@/lib/nav";

async function requireAdmin() {
  const s = await getSession();
  if (!s.isAdmin) redirect("/admin/login?error=unauthorized");
}

export async function createPage(formData: FormData) {
  await requireAdmin();
  const rawSlug = ((formData.get("slug") as string) ?? "").trim();
  const slug = normalizeSlug(rawSlug);
  const title = ((formData.get("title") as string) ?? "").trim();
  const navLabelRaw = ((formData.get("navLabel") as string) ?? "").trim();
  const navLabel = navLabelRaw || null;
  const section = ((formData.get("section") as string) ?? "main").trim() || "main";
  const orderRaw = ((formData.get("order") as string) ?? "").trim();
  // Checkboxes: hidden fallback + checkbox pattern ensures a value always sent.
  // Detect checked via getAll includes "on"
  const showInNavVals = formData.getAll("showInNav").map(String);
  const enabledVals = formData.getAll("enabled").map(String);
  const adminOnlyVals = formData.getAll("adminOnly").map(String);
  const showInNavResolved = showInNavVals.includes("on") || showInNavVals.includes("true");
  const enabledResolved = enabledVals.includes("on") || enabledVals.includes("true");
  const adminOnly = adminOnlyVals.includes("on") || adminOnlyVals.includes("true");
  // Fallback to spec defaults if completely absent (e.g. programmatic): true/true/false
  const showInNavFinal = formData.has("showInNav") ? showInNavResolved : true;
  const enabledFinal = formData.has("enabled") ? enabledResolved : true;

  const allowedSections = ["main", "portal", "footer"];
  const sectionVal = allowedSections.includes(section) ? section : "main";

  let order = parseInt(orderRaw, 10);
  if (Number.isNaN(order)) {
    // auto: max + 1
    try {
      const max = await prisma.page.aggregate({ _max: { order: true } });
      order = (max._max.order ?? -1) + 1;
    } catch {
      order = 0;
    }
  }

  if (!isValidPageSlug(slug)) redirect("/admin/pages?error=slug");
  if (isReservedSlug(slug)) redirect("/admin/pages?error=reserved");
  if (title.length < 2) redirect("/admin/pages?error=title");
  if (navLabel && navLabel.length > 40) redirect("/admin/pages?error=navLabel");

  const exists = await prisma.page.findUnique({ where: { slug } }).catch(() => null);
  if (exists) redirect("/admin/pages?error=duplicate");

  await prisma.page.create({
    data: {
      slug,
      title,
      navLabel,
      order,
      showInNav: showInNavFinal,
      enabled: enabledFinal,
      adminOnly,
      section: sectionVal,
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath("/");
  redirect("/admin/pages?created=1");
}

export async function togglePageField(formData: FormData) {
  await requireAdmin();
  const id = ((formData.get("id") as string) ?? "").trim();
  const field = ((formData.get("field") as string) ?? "").trim();
  const allowed = ["showInNav", "enabled", "adminOnly"];
  if (!id || !allowed.includes(field)) redirect("/admin/pages?error=invalid");

  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) redirect("/admin/pages?error=invalid");

  const current = page[field as "showInNav" | "enabled" | "adminOnly"];
  const next = !current;
  const data =
    field === "showInNav" ? { showInNav: next } : field === "enabled" ? { enabled: next } : { adminOnly: next };
  await prisma.page.update({ where: { id }, data });

  revalidatePath("/admin/pages");
  revalidatePath("/");
  revalidatePath(`/${page.slug}`);
  redirect("/admin/pages?updated=1");
}

export async function movePage(formData: FormData) {
  await requireAdmin();
  const id = ((formData.get("id") as string) ?? "").trim();
  const dir = ((formData.get("dir") as string) ?? "").trim(); // "up" | "down"
  if (!id || (dir !== "up" && dir !== "down")) redirect("/admin/pages?error=invalid");

  const pages: Page[] = await prisma.page.findMany({ orderBy: { order: "asc" } });
  const idx = pages.findIndex((p) => p.id === id);
  if (idx === -1) redirect("/admin/pages?error=invalid");

  const targetIdx = dir === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= pages.length) redirect("/admin/pages?updated=1");

  const a = pages[idx];
  const b = pages[targetIdx];

  // swap orders
  const orderA = a.order;
  const orderB = b.order;
  // if equal, ensure we give distinct values based on position
  if (orderA === orderB) {
    await prisma.page.update({ where: { id: a.id }, data: { order: targetIdx } });
    await prisma.page.update({ where: { id: b.id }, data: { order: idx } });
  } else {
    await prisma.page.update({ where: { id: a.id }, data: { order: orderB } });
    await prisma.page.update({ where: { id: b.id }, data: { order: orderA } });
  }

  revalidatePath("/admin/pages");
  revalidatePath("/");
  redirect("/admin/pages?updated=1");
}

export async function deletePage(formData: FormData) {
  await requireAdmin();
  const id = ((formData.get("id") as string) ?? "").trim();
  if (!id) redirect("/admin/pages?error=invalid");
  const page = await prisma.page.findUnique({ where: { id } }).catch(() => null);
  if (!page) redirect("/admin/pages?error=invalid");
  await prisma.page.delete({ where: { id } });
  revalidatePath("/admin/pages");
  revalidatePath("/");
  revalidatePath(`/${page.slug}`);
  redirect("/admin/pages?deleted=1");
}

export async function updatePage(formData: FormData) {
  await requireAdmin();
  const id = ((formData.get("id") as string) ?? "").trim();
  if (!id) redirect("/admin/pages?error=invalid");
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) redirect("/admin/pages?error=invalid");

  const rawSlug = ((formData.get("slug") as string) ?? "").trim();
  const slug = normalizeSlug(rawSlug);
  const title = ((formData.get("title") as string) ?? "").trim();
  const navLabelRaw = ((formData.get("navLabel") as string) ?? "").trim();
  const navLabel = navLabelRaw || null;
  const section = ((formData.get("section") as string) ?? "main").trim() || "main";
  const allowedSections = ["main", "portal", "footer"];
  const sectionVal = allowedSections.includes(section) ? section : "main";

  if (!isValidPageSlug(slug)) redirect("/admin/pages?error=slug");
  if (isReservedSlug(slug)) redirect("/admin/pages?error=reserved");
  if (title.length < 2) redirect("/admin/pages?error=title");
  if (navLabel && navLabel.length > 40) redirect("/admin/pages?error=navLabel");

  const owner = await prisma.page.findUnique({ where: { slug } }).catch(() => null);
  if (owner && owner.id !== id) redirect("/admin/pages?error=duplicate");

  await prisma.page.update({
    where: { id },
    data: { slug, title, navLabel, section: sectionVal },
  });

  revalidatePath("/admin/pages");
  revalidatePath("/");
  revalidatePath(`/${slug}`);
  if (page.slug !== slug) revalidatePath(`/${page.slug}`);
  redirect("/admin/pages?updated=1");
}
