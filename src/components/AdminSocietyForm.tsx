"use client";

import React, { useState } from "react";
import { createSociety } from "@/app/admin/societies/actions";

export interface ExistingSociety {
  id: string;
  name: string;
  kind: string;
}

interface Props {
  existingSocieties: ExistingSociety[];
}

const PRESET_SOCIETIES = [
  { name: "IEEE BVCOE", id: "ieee-bvcoe" },
  { name: "OPTiCA", id: "optica" },
  { name: "BVP ISTE", id: "bvp-iste" },
  { name: "DSC BVCOE", id: "dsc-bvcoe" },
  { name: "BVP CSI", id: "bvp-csi" },
  { name: "Microsoft Learn SAC", id: "mls-sac" },
  { name: "BVP ACM", id: "bvp-acm" },
  { name: "BVP ISA", id: "bvp-isa" },
  { name: "IET BVCOE", id: "iet-bvcoe" },
  { name: "TechShuttle", id: "techshuttle" },
  { name: "Campus Block", id: "campus-block" },
  { name: "CodeChef BVCOE", id: "codechef-bvcoe" },
  { name: "IOSC BVCOE", id: "iosc-bvcoe" },
  { name: "GFG BVCOE", id: "gfg-bvcoe" },
  { name: "Athena Society", id: "athena-bvcoe" },
  { name: "Dance Society", id: "dance-soc" },
  { name: "Music Society", id: "music-soc" },
  { name: "NSS BVCOE", id: "nss-bvcoe" },
  { name: "DAS Society", id: "das-bvcoe" },
  { name: "Theatre Society", id: "theatre-soc" },
  { name: "Blissful Minds", id: "blissful-minds" },
  { name: "TEDx BVCOE", id: "tedx-bvcoe" },
  { name: "Eduminerva", id: "eduminerva" },
  { name: "Qaafila", id: "qaafila" },
  { name: "Venuva", id: "venuva" },
  { name: "BVP Inc", id: "bvp-inc" },
  { name: "Horizon Society", id: "horizon-soc" },
];

export function AdminSocietyForm({ existingSocieties }: Props) {
  const [selectedPreset, setSelectedPreset] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [kind, setKind] = useState("GROUP");

  const handleSelectPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPreset(val);
    if (!val) return;
    const found = PRESET_SOCIETIES.find((s) => s.id === val);
    if (found) {
      setId(found.id);
      setName(found.name);
    }
  };

  return (
    <div className="animate-rise-in hard-shell mb-8">
      <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
        <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-1">
          Register an Organisation or Society Account
        </h2>
        <p className="text-xs text-stone-950 dark:text-gray-400 mb-6 font-mono">
          Pick a society from the preset list or type custom credentials. Created accounts persist permanently across database updates.
        </p>

        <form action={createSociety} className="space-y-5">
          {/* Quick Preset Picker */}
          <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300 font-mono mb-2">
                ⚡ Select from Known BVCOE Societies (Auto-Fills Name &amp; ID)
              </span>
              <select
                value={selectedPreset}
                onChange={handleSelectPreset}
                className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/60 border border-violet-500/30 text-stone-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 font-mono"
              >
                <option value="">-- Choose a BVCOE Society --</option>
                {PRESET_SOCIETIES.map((soc) => (
                  <option key={soc.id} value={soc.id}>
                    {soc.name} ({soc.id})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">
                Society ID (Login Handle)
              </span>
              <input
                name="id"
                required
                value={id}
                onChange={(e) => setId(e.target.value.toLowerCase())}
                pattern="[a-z0-9][a-z0-9-]{1,39}"
                placeholder="e.g. ieee-bvcoe"
                className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
              />
            </label>

            <label className="block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">
                Display Name
              </span>
              <input
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. IEEE BVCOE"
                className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
              />
            </label>

            <label className="block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">
                Password
              </span>
              <input
                name="password"
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="min. 6 characters"
                className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">
                Account Type
              </span>
              <select
                name="kind"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
              >
                <option value="GROUP">Organisation / Society (Can Log In &amp; Set Preferences)</option>
                <option value="SOCIETY">Member Unit (Affiliated Society)</option>
              </select>
            </label>

            <label className="block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 dark:text-gray-500 font-mono mb-1.5">
                Member Societies (Optional Collaboration Sub-Units)
              </span>
              <select
                name="memberIds"
                multiple
                size={3}
                className="w-full rounded-xl px-4 py-2 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
              >
                {existingSocieties.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id} — {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-stone-950 text-white dark:bg-white dark:text-stone-950 hover:opacity-90 transition-all duration-200 ease-fluid active:scale-[0.97]"
          >
            Create Permanent Account
            <span className="font-mono text-[10px] opacity-60">PERSISTS ON RE-SEED</span>
          </button>
        </form>
      </div>
    </div>
  );
}
