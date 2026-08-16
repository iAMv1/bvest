"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Domain } from "@/lib/domains";
import { submitPreferences } from "./actions";

interface Props {
  societyName: string;
  domains: Domain[];
}

const RANK_LABELS = ["1st Choice", "2nd Choice", "3rd Choice"];
const RANK_COLORS = [
  "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
  "bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-900",
  "bg-gray-400 text-white dark:bg-gray-500 dark:text-white",
];

export function PreferencePicker({ societyName, domains }: Props) {
  // selections[0] = rank-1 domainId, [1] = rank-2, [2] = rank-3
  const [selections, setSelections] = useState<(string | null)[]>([null, null, null]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

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
      <div className="sticky top-14 z-10 bg-background/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 py-3 mb-8 -mx-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-2">
            Your selections:
          </span>
          {[0, 1, 2].map((i) => {
            const domainId = selections[i];
            const domain = domains.find((d) => d.id === domainId);
            return (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${domain
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-gray-700"
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

      {/* Persistent indicator */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {selectedCount} of 3 domains selected
        </span>
      </div>

      {/* Domain cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {domains.map((domain) => {
          const rankIdx = selections.indexOf(domain.id);
          const isSelected = rankIdx !== -1;
          const isDisabled = !isSelected && selectedCount >= 3;

          return (
            <button
              key={domain.id}
              id={`domain-card-${domain.id}`}
              onClick={() => !isDisabled && handleCardClick(domain.id)}
              disabled={isDisabled}
              className={`relative text-left w-full rounded-2xl border transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100 ${isSelected
                  ? "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg -translate-y-0.5"
                  : isDisabled
                    ? "bg-gray-50 dark:bg-gray-950 border-gray-100 dark:border-gray-900 opacity-40 cursor-not-allowed"
                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                }`}
            >
              {/* Color stripe on the left */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-200"
                style={{ backgroundColor: domain.colorToken }}
              />

              <div className="pl-5 pr-4 py-5">
                {/* Rank badge */}
                {isSelected && (
                  <span
                    className={`inline-flex items-center gap-1 mb-3 px-2.5 py-1 rounded-full text-[11px] font-bold ${RANK_COLORS[rankIdx]}`}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ backgroundColor: domain.colorToken, color: "#fff" }}
                    >
                      {rankIdx + 1}
                    </span>
                    {RANK_LABELS[rankIdx]}
                  </span>
                )}

                <h3 className="font-heading font-semibold text-sm text-gray-900 dark:text-white leading-snug mb-1.5">
                  {domain.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {domain.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-sm"
        >
          <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          id="submit-preferences"
          onClick={handleSubmitClick}
          disabled={selectedCount !== 3 || isPending}
          className={`px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${selectedCount === 3 && !isPending
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl cursor-pointer"
              : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            }`}
        >
          {isPending ? "Submitting…" : "Submit Preferences"}
        </button>
        {selectedCount > 0 && selectedCount < 3 && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {3 - selectedCount} more selection{3 - selectedCount !== 1 ? "s" : ""} needed
          </span>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirm your choices?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              You are about to submit your society's domain preferences. This action cannot be undone and will lock your choices. Are you sure you want to proceed?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                disabled={isPending}
                className="px-6 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {isPending ? "Submitting..." : "Yes, Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
