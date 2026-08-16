export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { domains } from "@/lib/domains";

export default async function AdminAllocationsPage() {
  const session = await getSession();

  if (!session.isAdmin) {
    redirect("/admin/login");
  }

  const societies = await prisma.society.findMany({
    include: {
      preferences: { orderBy: { rank: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Society Allocations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl">
            Review the submitted domain preferences for all societies.
          </p>
        </div>

        {/* TODO: Add auto-allocation algorithm here for future feature */}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-700">Society ID</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-700">Name</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-700">Submitted At</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-700">Rank 1</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-700">Rank 2</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-700">Rank 3</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {societies.map((society: { id: string; name: string; locked: boolean; submittedAt: Date | null; preferences: { rank: number; domainId: string }[] }, idx) => {
                const getDomainName = (rank: number) => {
                  const pref = society.preferences.find((p: { rank: number; domainId: string }) => p.rank === rank);
                  if (!pref) return "-";
                  const domain = domains.find((d) => d.id === pref.domainId);
                  return domain ? domain.name : pref.domainId;
                };

                return (
                  <tr key={society.id} className="animate-rise-in hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" style={{ animationDelay: `${Math.min(idx * 50, 400)}ms` }}>
                    <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-gray-400">{society.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{society.name}</td>
                    <td className="px-6 py-4">
                      {society.locked ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Locked
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                      {society.submittedAt ? new Date(society.submittedAt).toLocaleString() : "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 truncate max-w-[150px]" title={getDomainName(1)}>{getDomainName(1)}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 truncate max-w-[150px]" title={getDomainName(2)}>{getDomainName(2)}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 truncate max-w-[150px]" title={getDomainName(3)}>{getDomainName(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
