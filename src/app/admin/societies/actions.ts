"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const ID_RE = /^[a-z0-9][a-z0-9-]{1,39}$/;

export async function createSociety(formData: FormData) {
  const rawId = ((formData.get("id") as string) ?? "").trim().toLowerCase();
  const name = ((formData.get("name") as string) ?? "").trim();
  const password = (formData.get("password") as string) ?? "";
  const kind = ((formData.get("kind") as string) ?? "SOCIETY") === "GROUP" ? "GROUP" : "SOCIETY";
  const memberIdsRaw = (formData.get("memberIds") as string) ?? "";
  const memberIds = memberIdsRaw ? memberIdsRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const problem =
    !ID_RE.test(rawId)
      ? "invalid=id"
      : name.length < 2
        ? "invalid=name"
        : password.length < 6
          ? "invalid=password"
          : kind === "GROUP" && memberIds.length === 0
            ? "invalid=members"
            : null;

  if (problem) redirect(`/admin/societies?error=${problem}`);

  const existing = await prisma.society.findUnique({ where: { id: rawId } });
  if (existing) redirect("/admin/societies?error=duplicate");

  const hashed = await bcrypt.hash(password, 12);
  await prisma.society.create({
    data: {
      id: rawId,
      name,
      password: hashed,
      kind,
      memberIds: kind === "GROUP" ? JSON.stringify(memberIds) : null,
    },
  });

  revalidatePath("/admin/societies");
  revalidatePath("/admin/allocations");
  redirect("/admin/societies?created=1");
}

export async function resetPassword(formData: FormData) {
  const id = ((formData.get("id") as string) ?? "").trim();
  const password = (formData.get("password") as string) ?? "";

  if (id.length < 2 || password.length < 6) redirect("/admin/societies?error=password");

  const hashed = await bcrypt.hash(password, 12);
  await prisma.society.update({ where: { id }, data: { password: hashed } });

  revalidatePath("/admin/societies");
  redirect("/admin/societies?updated=1");
}