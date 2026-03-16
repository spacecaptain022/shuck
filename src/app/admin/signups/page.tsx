import type { Metadata } from "next";
import { db, emailSignups } from "@/lib/db";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Email Signups — Admin" };

export default async function AdminSignupsPage() {
  const allSignups = await db
    .select()
    .from(emailSignups)
    .orderBy(desc(emailSignups.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Email Signups</h1>
        <p className="text-sm text-muted-foreground">{allSignups.length} total</p>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left border-b border-border">
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {allSignups.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-muted-foreground text-sm">
                  No signups yet.
                </td>
              </tr>
            ) : (
              allSignups.map((signup) => (
                <tr key={signup.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 font-medium">{signup.email}</td>
                  <td className="px-5 py-3 text-muted-foreground capitalize">{signup.source}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {new Date(signup.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
