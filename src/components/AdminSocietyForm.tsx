"use client";

import React, { useState, useMemo } from "react";
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

function genPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  let p = "";
  for (let i = 0; i < 12; i++) p += chars[Math.floor(Math.random() * chars.length)];
  return p;
}

export function AdminSocietyForm({ existingSocieties }: Props) {
  const [selectedPreset, setSelectedPreset] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [kind, setKind] = useState("GROUP");
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  const memberPool = useMemo(() => existingSocieties.filter((s) => s.kind === "SOCIETY"), [existingSocieties]);
  const filteredPool = useMemo(() => {
    if (!filter.trim()) return memberPool;
    const q = filter.toLowerCase();
    return memberPool.filter((s) => s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  }, [memberPool, filter]);

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

  const toggleMember = (mid: string) => {
    setSelected((prev) => {
      if (prev.includes(mid)) return prev.filter((x) => x !== mid);
      if (prev.length >= 2) return prev; // block 3rd
      const next = [...prev, mid];
      // auto-suggest id/name if empty
      if (next.length === 2) {
        const a = memberPool.find((s) => s.id === next[0]);
        const b = memberPool.find((s) => s.id === next[1]);
        if (a && b) {
          if (!id) setId(`${a.id}-x-${b.id}`.slice(0, 40));
          if (!name) setName(`${a.name} × ${b.name}`);
        }
      }
      return next;
    });
  };

  const isGroup = kind === "GROUP";
  const canSubmit = isGroup ? selected.length === 2 && password.length >= 6 : true;
  const hint = isGroup
    ? selected.length === 0
      ? "Pick exactly 2 societies — search and tap"
      : selected.length === 1
        ? "1/2 selected — pick 1 more"
        : password.length < 6
          ? "2/2 ✓ now set a password (or hit Generate)"
          : "2/2 + password ✓ ready — auto-filled ID/name if empty"
    : "Member society — no members, no password — just ID + Name";

  return (
    <div className="animate-rise-in hard-shell mb-8">
      <div className="hard-core bg-white/70 dark:bg-[#0B0B0C]/80 backdrop-blur-sm p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-1">
          <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
            Register an Organisation or Society Account
          </h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
            Admin: 30 societies → pick 2 → make 1 group
          </span>
        </div>
        <p className="text-xs text-stone-950 dark:text-gray-400 mb-6 font-mono">
          Organisations (GROUP) are the only ones that can log in & host events — always exactly 2 societies. Members are the pool.
        </p>

        <form action={createSociety} className="space-y-6">
          {/* Top: Account Type — full width, decides everything below */}
          <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 p-[1.5px]">
            <div className="rounded-[15px] bg-white dark:bg-[#0B0B0C] p-4">
              <label className="block">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300 font-mono mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-black">1</span>
                  What are you creating?
                </span>
                <select
                  name="kind"
                  value={kind}
                  onChange={(e) => {
                    setKind(e.target.value);
                    if (e.target.value === "SOCIETY") setSelected([]);
                  }}
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold bg-stone-50 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
                >
                  <option value="GROUP">Organisation — exactly 2 societies (can log in & host events)</option>
                  <option value="SOCIETY">Member Unit — single society (pool only, no login)</option>
                </select>
                <span className="block mt-2 text-xs font-medium text-stone-600 dark:text-gray-400">{isGroup ? "→ Next: pick exactly 2 members below, then set group credentials on the right." : "→ Just set ID + Name below — no password, no members."}</span>
              </label>
            </div>
          </div>

          {/* Main creator — 2-column utilisation on desktop */}
          <div className={`grid gap-6 ${isGroup ? "lg:grid-cols-5" : "grid-cols-1"}`}>
            {/* Left: Members picker — primary action for GROUP, now properly utilised */}
            {isGroup ? (
              <div className="lg:col-span-3 rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-transparent dark:from-violet-500/10 dark:to-transparent p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300 font-mono flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-black">2</span>
                    Pick exactly 2 member societies
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-black border ${selected.length === 2 ? "bg-emerald-500 text-white border-emerald-500 shadow" : selected.length === 1 ? "bg-amber-500 text-white border-amber-500" : "bg-white dark:bg-black/40 border-black/10 dark:border-white/10 text-stone-500"}`}>
                    {selected.length}/2 {selected.length === 2 ? "✓" : ""}
                  </span>
                </div>
                {/* Selected preview — shows utilisation */}
                {selected.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2 p-3 rounded-xl bg-white dark:bg-black/30 border border-violet-500/20">
                    {selected.map((sid) => {
                      const s = memberPool.find((x) => x.id === sid);
                      return (
                        <span key={sid} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-violet-600 text-white">
                          {s?.name ?? sid}
                          <button type="button" onClick={() => toggleMember(sid)} className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-xs hover:bg-white/30">×</button>
                        </span>
                      );
                    })}
                    {selected.length === 1 && <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-dashed border-amber-500/50 text-amber-600 bg-amber-500/10">+ pick 1 more</span>}
                  </div>
                )}
                <input
                  placeholder="Search 30 members… e.g. ieee, gfg, dance"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full mb-3 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[220px] overflow-auto rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-2">
                  {filteredPool.length === 0 && <span className="col-span-2 text-xs text-stone-500 p-3 text-center">No members found — try different search.</span>}
                  {filteredPool.map((s) => {
                    const checked = selected.includes(s.id);
                    const disabled = !checked && selected.length >= 2;
                    return (
                      <label key={s.id} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm cursor-pointer border transition-all ${checked ? "bg-violet-600 text-white border-violet-600 shadow-md" : disabled ? "opacity-40 bg-black/[0.02] dark:bg-white/[0.02] border-transparent" : "bg-white dark:bg-white/[0.04] border-black/5 dark:border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 hover:shadow-sm"}`}>
                        <input type="checkbox" name="memberIds" value={s.id} checked={checked} onChange={() => toggleMember(s.id)} disabled={disabled} className="accent-violet-600 w-4 h-4 shrink-0" />
                        <span className="font-semibold truncate text-[13px]">{s.name}</span>
                        <span className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${checked ? "bg-white/20 text-white" : "bg-black/5 dark:bg-white/10 text-stone-500"}`}>{s.id}</span>
                      </label>
                    );
                  })}
                </div>
                <p className={`mt-3 text-xs font-semibold px-3 py-2 rounded-full text-center ${selected.length === 2 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20" : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"}`}>{hint}</p>
              </div>
            ) : (
              <div className="hidden lg:flex lg:col-span-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 flex-col justify-center">
                <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg mb-3">✓</span>
                <p className="text-base font-bold text-emerald-800 dark:text-emerald-300">Member — no members, no password</p>
                <p className="text-sm text-stone-600 dark:text-gray-400 mt-1">Just set ID + Name on the right — 30 pre-seeded, done in 5 seconds. Members never log in.</p>
              </div>
            )}

            {/* Right: Details — now beside picker, not below, better utilisation */}
            <div className={`${isGroup ? "lg:col-span-2" : ""} space-y-4`}>
              <div className="rounded-2xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 p-4">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-stone-700 dark:text-gray-300 font-mono mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center text-xs font-black">{isGroup ? "3" : "2"}</span>
                  {isGroup ? "Group credentials" : "Member details"}
                </span>
                <div className="space-y-3">
                  <label className="block">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-1">Society ID</span>
                    <input
                      name="id"
                      required
                      value={id}
                      onChange={(e) => setId(e.target.value.toLowerCase())}
                      pattern="[a-z0-9][a-z0-9-]{1,39}"
                      placeholder={isGroup ? "auto: ieee-x-optica" : "e.g. new-society"}
                      className="w-full rounded-xl px-4 py-2.5 text-sm bg-stone-50 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-1">Display Name</span>
                    <input
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isGroup ? "auto: IEEE × OPTiCA" : "e.g. New Society"}
                      className="w-full rounded-xl px-4 py-2.5 text-sm bg-stone-50 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
                    />
                  </label>
                  {isGroup ? (
                    <label className="block">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 font-mono mb-1 flex items-center justify-between">
                        Password (for GROUP login)
                        <button type="button" onClick={() => setPassword(genPassword())} className="text-[10px] px-2.5 py-1 rounded-full bg-violet-600 text-white hover:bg-violet-700 font-bold">
                          Generate
                        </button>
                      </span>
                      <div className="relative">
                        <input
                          name="password"
                          required
                          minLength={6}
                          type={showPw ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="min. 6 — share with group"
                          className="w-full rounded-xl px-4 py-2.5 pr-16 text-sm bg-stone-50 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 font-mono"
                        />
                        <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 font-medium">
                          {showPw ? "Hide" : "Show"}
                        </button>
                      </div>
                    </label>
                  ) : (
                    <input type="hidden" name="password" value="no-login-needed" />
                  )}
                </div>
              </div>
              {/* Quick preset — now inside details column */}
              <details className="rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-3">
                <summary className="text-xs font-semibold text-stone-600 dark:text-gray-400 cursor-pointer">⚡ Quick fill from BVCOE presets</summary>
                <select value={selectedPreset} onChange={handleSelectPreset} className="mt-3 w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/60 border border-black/10 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 font-mono">
                  <option value="">-- Choose — auto-fills ID & name --</option>
                  {PRESET_SOCIETIES.map((soc) => (
                    <option key={soc.id} value={soc.id}>
                      {soc.name} ({soc.id})
                    </option>
                  ))}
                </select>
              </details>
            </div>
          </div>

          {/* Quick Preset — helper, now at bottom, not top */}
          <details className="rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-3">
            <summary className="text-xs font-semibold text-stone-600 dark:text-gray-400 cursor-pointer">⚡ Quick fill from BVCOE presets (optional)</summary>
            <select
              value={selectedPreset}
              onChange={handleSelectPreset}
              className="mt-3 w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black/60 border border-black/10 dark:border-white/10 text-stone-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 font-mono"
            >
              <option value="">-- Choose — auto-fills ID & name --</option>
              {PRESET_SOCIETIES.map((soc) => (
                <option key={soc.id} value={soc.id}>
                  {soc.name} ({soc.id})
                </option>
              ))}
            </select>
          </details>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${!canSubmit ? "bg-stone-300 dark:bg-white/10 text-stone-500 cursor-not-allowed" : "bg-stone-950 text-white dark:bg-white dark:text-stone-950 hover:opacity-90 active:scale-[0.97]"}`}
            >
              {isGroup ? `Create Organisation (${selected.length}/2)` : "Create Member Society"}
              <span className="font-mono text-[10px] opacity-60">{!canSubmit ? (isGroup && selected.length !== 2 ? "Pick 2 to enable" : "Set password ≥6") : "PERSISTS"}</span>
            </button>
            {isGroup && canSubmit && <span className="text-xs text-emerald-600 dark:text-emerald-400">✓ Ready — will save as {selected.join(" + ")}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
