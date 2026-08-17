"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Domain } from "@/lib/domains";
import { submitPreferences } from "./actions";

interface Props {
  domains: Domain[];
}

const RANK_LABELS = ["1st Choice", "2nd Choice", "3rd Choice"];
const RANK_COLORS = [
  "bg-white text-gray-950",
  "bg-gray-300 text-gray-950",
  "bg-gray-600 text-white",
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function PreferencePicker({ domains }: Props) {
  // selections[0] = rank-1 domainId, [1] = rank-2, [2] = rank-3
  const [selections, setSelections] = useState<(string | null)[]>([null, null, null]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const selectedCount = selections.filter(Boolean).length;

  function handleCardClick(domainId: string) {
    setSelections((prev) => {
      const existingRankIdx = prev.indexOf(domainId);

      if (existingRankIdx !== -1) {
        // Deselect: remove and shift subsequent ranks down
        const next = [...prev];
        next[existingRankIdx] = null;
        // Compact: move non-null values to front
        const filled = next.filter(Boolean) as string[];
        while (filled.length < 3) filled.push(null as unknown as string);
        return [filled[0] ?? null, filled[1] ?? null, filled[2] ?? null];
      }

      // Select into next available slot
      const nextSlot = prev.findIndex((v) => v === null);
      if (nextSlot === -1) return prev; // all 3 filled
      const next = [...prev];
      next[nextSlot] = domainId;
      return next;
    });
    setError(null);
  }

  function handleSubmitClick() {
    const filled = selections.filter(Boolean) as string[];
    if (filled.length !== 3) {
      setError("Please select exactly 3 domain preferences before submitting.");
      return;
    }
    setShowConfirm(true);
  }

  function handleConfirmSubmit() {
    const filled = selections.filter(Boolean) as string[];

    startTransition(async () => {
      const result = await submitPreferences(
        filled.map((domainId, i) => ({ domainId, rank: i + 1 }))
      );
      if (result.ok) {
        router.refresh(); // re-renders page.tsx which will now show locked view
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <div>
      {/* Sticky rank summary bar */}
      <div className="sticky top-4 z-30 island-glass rounded-2xl py-3 mb-8 -mx-1 px-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-stone-950 dark:text-gray-300 uppercase tracking-wider mr-1">
            Your selections:
          </span>
          {[0, 1, 2].map((i) => {
            const domainId = selections[i];
            const domain = domains.find((d) => d.id === domainId);
            return (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ease-fluid ${
                  domain
                    ? "bg-stone-950/10 dark:bg-white/10 text-stone-950 dark:text-white border border-black/15 dark:border-white/10"
                    : "bg-black/5 dark:bg-white/[0.03] text-stone-950 dark:text-gray-500 border border-dashed border-black/15 dark:border-white/15"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${RANK_COLORS[i]}`}
                >
                  {i + 1}
                </span>
                <span className="truncate max-w-[180px]">
                  {domain ? domain.name : `${RANK_LABELS[i]} — not selected`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress rail — rank slots R1→R2→R3 */}
      <div className="flex items-stretch gap-2 mb-6" aria-live="polite">
        {[0, 1, 2].map((i) => {
          const domainId = selections[i];
          const domain = domains.find((d) => d.id === domainId);
          return (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div
                className={`flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-all duration-300 ease-fluid ${
                  domain
                    ? "bg-black/[0.04] dark:bg-white/[0.05] border-black/15 dark:border-white/15"
                    : "bg-black/[0.02] dark:bg-white/[0.02] border-dashed border-black/15 dark:border-white/15"
                }`}
              >
                <span
                  className={`shrink-0 w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center ${
                    domain ? "text-white" : "bg-black/10 dark:bg-white/10 text-stone-950 dark:text-gray-400"
                  }`}
                  style={domain ? { backgroundColor: domain.colorToken, boxShadow: `0 4px 14px ${domain.colorToken}55` } : undefined}
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[9px] font-bold uppercase tracking-[0.2em] ${domain ? "text-stone-950 dark:text-gray-300" : "text-stone-950 dark:text-gray-500"}`}>
                    {i === 0 ? "1st Choice" : i === 1 ? "2nd Choice" : "3rd Choice"}
                  </span>
                  <span className={`block text-xs font-medium truncate ${domain ? "text-stone-800 dark:text-white" : "text-stone-950 dark:text-gray-500"}`}>
                    {domain ? domain.name : "Awaiting selection"}
                  </span>
                </span>
              </div>
              {i < 2 && (
                <svg className="w-4 h-4 shrink-0 text-black/25 dark:text-white/25" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Domain cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10"
        initial={shouldReduceMotion ? false : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
        }}
      >
        {domains.map((domain) => {
          const rankIdx = selections.indexOf(domain.id);
          const isSelected = rankIdx !== -1;
          const isDisabled = !isSelected && selectedCount >= 3;

          return (
            <motion.div
              key={domain.id}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
              }}
            >
            <button
              key={domain.id}
              id={`domain-card-${domain.id}`}
              onClick={() => !isDisabled && handleCardClick(domain.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              className={`group relative block w-full text-left transition-all duration-200 ease-fluid active:scale-[0.98] rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-sdg6/60 dark:focus-visible:ring-white/50 ${
                isDisabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <span
                className={`absolute inset-0 rounded-[1.75rem] transition-opacity duration-300 ease-fluid ${
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{
                  background: `linear-gradient(180deg, ${domain.colorToken}55, rgba(255,255,255,0.06))`,
                }}
              />
              <span className="relative block rounded-[1.75rem] p-1.5">
                <span
                  className={`relative block rounded-[calc(1.75rem-0.375rem)] border p-5 overflow-hidden transition-all duration-200 ease-fluid ${
                    isSelected
                      ? "bg-white dark:bg-[#101012] border-2"
                      : isDisabled
                        ? "bg-white dark:bg-[#0B0B0C] border-black/5 dark:border-white/5"
                        : "bg-white dark:bg-[#0B0B0C] border-black/10 dark:border-white/10 group-hover:border-black/20 dark:group-hover:border-white/20"
                  }`}
                  style={isSelected ? { borderColor: domain.colorToken } : undefined}
                >
                  {/* Color stripe on the left */}
                  <span
                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-200 ease-fluid group-hover:w-2"
                    style={{ backgroundColor: domain.colorToken }}
                  />

                  {/* Console domain id tag */}
                  <span className={`absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 text-stone-950 dark:text-gray-500`}>
                    {domain.id}
                  </span>

                  <span className="relative block pl-5 pr-4 py-5">
                    {/* Rank badge */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          key={`badge-${domain.id}`}
                          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.12, ease: "easeOut" }}
                          className={`inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[11px] font-bold ${RANK_COLORS[rankIdx]}`}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{ backgroundColor: domain.colorToken, color: "#fff" }}
                          >
                            {rankIdx + 1}
                          </span>
                          {RANK_LABELS[rankIdx]}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <span className="block font-heading font-semibold text-sm text-stone-950 dark:text-white leading-snug mb-1.5">
                      {domain.name}
                    </span>
                    <span className="block text-xs text-stone-950 dark:text-gray-400 leading-relaxed">
                      {domain.description}
                    </span>
                  </span>
                </span>
              </span>
            </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            key="picker-error"
            role="alert"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-950/40 border border-red-800/60 text-red-300 text-sm"
          >
            <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          id="submit-preferences"
          onClick={handleSubmitClick}
          disabled={selectedCount !== 3 || isPending}
          className={`group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ease-fluid active:scale-[0.97] ${
            selectedCount === 3 && !isPending
              ? "bg-white text-gray-950 hover:bg-gray-200 cursor-pointer shadow-[0_12px_40px_rgba(255,255,255,0.15)]"
              : "bg-black/5 dark:bg-white/[0.06] text-stone-950 dark:text-gray-500 border border-black/10 dark:border-white/10 cursor-not-allowed"
          }`}
        >
          {isPending ? "Submitting…" : "Submit Preferences"}
          {selectedCount === 3 && !isPending && (
            <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 ease-fluid group-hover:translate-x-1 group-hover:-translate-y-px">
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </span>
          )}
        </button>
        <AnimatePresence>
          {selectedCount > 0 && selectedCount < 3 && (
            <motion.span
              key="picker-hint"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="text-sm text-stone-950 dark:text-gray-400"
            >
              {3 - selectedCount} more selection{3 - selectedCount !== 1 ? "s" : ""} needed
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            key="confirm-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => !isPending && setShowConfirm(false)}
          >
            <motion.div
              key="confirm-panel"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: "easeOut" } }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
              className="hard-shell w-full max-w-md bg-gradient-to-b from-black/10 to-black/[0.03] dark:from-white/10 dark:to-white/[0.03] shadow-[0_32px_100px_rgba(0,0,0,0.7)]"
            >
              <div className="hard-core bg-white dark:bg-[#0B0B0C] p-6 md:p-8">
                <h3 id="confirm-title" className="font-heading text-xl font-bold text-stone-950 dark:text-white mb-2">Confirm your choices?</h3>
                <p className="text-sm text-stone-950 dark:text-gray-400 mb-6 leading-relaxed">
                  You are about to submit your society&apos;s domain preferences. This action cannot be undone and will lock your choices. Are you sure you want to proceed?
                </p>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isPending}
                    className="px-4 py-2 rounded-full text-sm font-medium text-stone-950 dark:text-gray-400 hover:text-sdg6 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSubmit}
                    disabled={isPending}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-white text-gray-950 hover:bg-gray-200 transition-all duration-200 ease-fluid active:scale-[0.97]"
                  >
                    {isPending ? "Submitting..." : "Yes, Submit"}
                    {!isPending && (
                      <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-200 ease-fluid group-hover:translate-x-0.5">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6h8M6 2l4 4-4 4" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}