import type { Metadata } from "next";
import Link from "next/link";
import { BvestLogo } from "@/components/BvestLogo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Official Privacy and Data Retention Policy for BVEST XIII (2026) at BVCOE Delhi.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-28 pb-20 w-full">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white mb-8 font-medium transition-colors"
        >
          ← Back to home
        </Link>

        {/* Header */}
        <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <BvestLogo size={36} isHeader={true} />
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-sdg6/10 border border-sdg6/30 text-sdg6">
              Official Policy
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-stone-950 dark:text-white">
            Privacy &amp; Data Policy
          </h1>
          <p className="text-stone-600 dark:text-gray-400 mt-3 text-sm md:text-base font-mono">
            Last Updated: August 2026 &middot; BVEST XIII &middot; Bharati Vidyapeeth&apos;s College of Engineering (BVCOE Delhi)
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-10 text-stone-800 dark:text-gray-300 leading-relaxed text-base">
          {/* Section 1: Overview */}
          <section className="hard-shell">
            <div className="hard-core bg-white/80 dark:bg-[#111215]/80 p-6 md:p-8 rounded-[calc(1.75rem-1.5px)] border border-black/10 dark:border-white/10">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sdg6/15 text-sdg6 flex items-center justify-center text-sm font-mono">1</span>
                Overview &amp; Scope
              </h2>
              <p>
                This Privacy and Data Policy outlines how <strong>BVEST XIII</strong> (the annual official technical festival of Bharati Vidyapeeth&apos;s College of Engineering, Delhi) collects, uses, protects, and retains personal data submitted through our official website, Society Portal, and event registration forms.
              </p>
            </div>
          </section>

          {/* Section 2: Data Collection */}
          <section className="hard-shell">
            <div className="hard-core bg-white/80 dark:bg-[#111215]/80 p-6 md:p-8 rounded-[calc(1.75rem-1.5px)] border border-black/10 dark:border-white/10">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sdg3/15 text-sdg3 flex items-center justify-center text-sm font-mono">2</span>
                Information We Collect
              </h2>
              <p className="mb-4">
                Depending on how you interact with BVEST XIII platforms, we collect the following categories of information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <h3 className="font-bold text-stone-900 dark:text-white mb-1 text-sm font-mono uppercase tracking-wider">A. Society Portal Data</h3>
                  <ul className="text-xs space-y-1.5 text-stone-600 dark:text-gray-400 list-disc list-inside">
                    <li>Society name &amp; department affiliation</li>
                    <li>President / Vice President / Lead coordinator names</li>
                    <li>Official contact phone numbers &amp; email addresses</li>
                    <li>SDG domain preference rankings (1&ndash;17)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <h3 className="font-bold text-stone-900 dark:text-white mb-1 text-sm font-mono uppercase tracking-wider">B. Participant Registration Data</h3>
                  <ul className="text-xs space-y-1.5 text-stone-600 dark:text-gray-400 list-disc list-inside">
                    <li>Full name, college roll number, &amp; institution name</li>
                    <li>Email address &amp; mobile number for event updates</li>
                    <li>Academic branch, year of study, &amp; team member details</li>
                    <li>Project/hackathon submissions or competition entries</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Purpose of Collection */}
          <section className="hard-shell">
            <div className="hard-core bg-white/80 dark:bg-[#111215]/80 p-6 md:p-8 rounded-[calc(1.75rem-1.5px)] border border-black/10 dark:border-white/10">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sdg9/15 text-sdg9 flex items-center justify-center text-sm font-mono">3</span>
                Why Information Is Collected
              </h2>
              <ul className="space-y-2 text-sm list-disc list-inside text-stone-700 dark:text-gray-300">
                <li><strong>Domain Allocation:</strong> To algorithmically allocate UN Sustainable Development Goals (SDGs) to student societies based on submitted preferences.</li>
                <li><strong>Event Administration:</strong> To verify participant eligibility, communicate schedule updates, venue details, and conduct check-in processes.</li>
                <li><strong>Certificates &amp; Podiums:</strong> To generate digital certificates of participation/merit and publish verified leaderboard podiums.</li>
                <li><strong>Security &amp; Support:</strong> To maintain secure authentication for society leads and assist with administrative inquiries.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Access & Sharing */}
          <section className="hard-shell">
            <div className="hard-core bg-white/80 dark:bg-[#111215]/80 p-6 md:p-8 rounded-[calc(1.75rem-1.5px)] border border-black/10 dark:border-white/10">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sdg10/15 text-sdg10 flex items-center justify-center text-sm font-mono">4</span>
                Who Has Access &amp; Data Sharing
              </h2>
              <p className="mb-3">
                Access to collected data is strictly restricted to:
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-stone-700 dark:text-gray-300">
                <li>Authorized BVEST XIII Event Management (EM) coordinators and core tech leads.</li>
                <li>Designated student society faculty advisors and heads at BVCOE Delhi.</li>
              </ul>
              <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                🔒 <strong>Zero Third-Party Commercial Sharing:</strong> We do NOT sell, rent, lease, or share personal contact information with commercial advertisers or external third-party data brokers under any circumstances.
              </div>
            </div>
          </section>

          {/* Section 5: Retention & Protection */}
          <section className="hard-shell">
            <div className="hard-core bg-white/80 dark:bg-[#111215]/80 p-6 md:p-8 rounded-[calc(1.75rem-1.5px)] border border-black/10 dark:border-white/10">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sdg16/15 text-sdg16 flex items-center justify-center text-sm font-mono">5</span>
                Data Retention &amp; Security
              </h2>
              <p className="mb-3">
                All data is transmitted via encrypted HTTPS protocol and stored on secure cloud database infrastructure.
              </p>
              <p className="text-sm font-medium text-stone-700 dark:text-gray-300">
                <strong>Retention Period:</strong> Data collected for BVEST XIII (2026) will be retained for the duration of the festival and archived for up to <strong>1 year</strong> following the conclusion of the event to facilitate certificate verification and institutional record-keeping for BVCOE Delhi. After 1 year, non-essential contact data is permanently purged.
              </p>
            </div>
          </section>

          {/* Section 6: Contact & Rights */}
          <section className="hard-shell">
            <div className="hard-core bg-white/80 dark:bg-[#111215]/80 p-6 md:p-8 rounded-[calc(1.75rem-1.5px)] border border-black/10 dark:border-white/10">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sdg6/15 text-sdg6 flex items-center justify-center text-sm font-mono">6</span>
                Contact Us Regarding Privacy
              </h2>
              <p className="text-sm text-stone-700 dark:text-gray-300 mb-3">
                If you have questions regarding this Privacy Policy or wish to request data correction/removal, please contact the BVEST team:
              </p>
              <div className="text-xs font-mono space-y-1 text-stone-900 dark:text-white">
                <p>📧 Email: <a href="mailto:bvest@bvcoend.ac.in" className="underline text-sdg6 font-bold">bvest@bvcoend.ac.in</a></p>
                <p>📍 Location: Bharati Vidyapeeth&apos;s College of Engineering (BVCOE), A-4, Paschim Vihar, New Delhi &ndash; 110063</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
