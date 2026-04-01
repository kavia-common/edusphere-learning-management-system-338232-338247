"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { state, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (state.status === "anonymous") router.replace("/auth/login");
  }, [state.status, router]);

  if (state.status === "loading") {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <div className="container-page py-12">
          <div className="card p-6">
            <p className="text-sm text-gray-600">Loading session…</p>
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) return null;

  return <AppShell>{children}</AppShell>;
}
