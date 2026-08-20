"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const ID_RE = /^[a-z0-9][a-z0-9-]{1,39}$/;

async function requireAdmin() {
  const s = await getSession();
  if (!s.isAdmin) redirect("/admin/login?error=unauthorized");
}

function saveCustomSocietyRecord(record: { id: string; name: string; password?: string; hashedPassword?: string; kind?: string }) {
  try {
    const customPath = path.join(process.cwd(), "prisma", "custom-societies.json");
    let list: any[] = [];
    if (fs.existsSync(customPath)) {
      list = JSON.parse(fs.readFileSync(customPath, "utf-8"));
    }
    const idx = list.findIndex((item: any) => item.id === record.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...record };
    } else {
      list.push(record);
    }
    fs.writeFileSync(customPath, JSON.stringify(list, null, 2) + "\n");
  } catch (e) {
    console.error("Failed to save custom society record:", e);
  }
}

export async function createSociety(formData: FormData) {
  await requireAdmin();
  const rawId = ((formData.get("id") as string) ?? "").trim().toLowerCase();
  const name = ((formData.get("name") as string) ?? "").trim();
  const password = (formData.get("password") as string) ?? "";
  const kind = ((formData.get("kind") as string) ?? "GROUP") === "SOCIETY" ? "SOCIETY" : "GROUP";
  const memberIds = (formData.getAll("memberIds") as string[])
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const problem =
    !ID_RE.test(rawId)
      ? "id"
      : name.length < 2
        ? "name"
        : password.length < 6
          ? "password"
          : null;

  if (problem) redirect(`/admin/societies?error=${problem}`);

  const existing = await prisma.society.findUnique({ where: { id: rawId } });
  if (existing) redirect("/admin/societies?error=duplicate");

  const hashed = await bcrypt.hash(password, 12);

  let storedMembers: string[] = [];
  if (memberIds.length > 0) {
    const valid = await prisma.society.findMany({ where: { id: { in: memberIds } } });
    storedMembers = valid.map((s) => s.id);
  }

  await prisma.society.create({
    data: {
      id: rawId,
      name,
      password: hashed,
      kind,
      memberIds: storedMembers.length > 0 ? JSON.stringify(storedMembers) : null,
    },
  });

  saveCustomSocietyRecord({
    id: rawId,
    name,
    password,
    hashedPassword: hashed,
    kind,
  });

  revalidatePath("/admin/societies");
  revalidatePath("/admin/allocations");
  redirect("/admin/societies?created=1");
}

export async function resetPassword(formData: FormData) {
  await requireAdmin();
  const id = ((formData.get("id") as string) ?? "").trim();
  const password = (formData.get("password") as string) ?? "";

  if (id.length < 2 || password.length < 6) redirect("/admin/societies?error=password");

  const exists = await prisma.society.findUnique({ where: { id } });
  if (!exists) redirect("/admin/societies?error=password");

  const hashed = await bcrypt.hash(password, 12);
  await prisma.society.update({ where: { id }, data: { password: hashed } });

  saveCustomSocietyRecord({
    id: exists.id,
    name: exists.name,
    password,
    hashedPassword: hashed,
    kind: exists.kind,
  });

  revalidatePath("/admin/societies");
  redirect("/admin/societies?updated=1");
}