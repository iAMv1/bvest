export default function Loading() {
  return (
    <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center gap-7 px-6 overflow-hidden">
      <div className="bg-dots absolute inset-0 md:opacity-50" aria-hidden="true" />
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-sdg6 animate-spin" />
        <div className="absolute inset-2 rounded-full border border-white/5" />
      </div>
      <p className="relative text-xs font-mono uppercase tracking-[0.35em] text-gray-400 animate-pulse">
        Warming up the grid
      </p>
      <p className="relative text-[10px] font-mono tracking-[0.2em] text-gray-600">17 DOMAINS · 30+ SOCIETIES · 3 DAYS</p>
    </div>
  );
}