"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Card, CardBody, CardHeader, EmptyState } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function AdminHomePage() {
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user && user.role !== "admin") router.replace("/app");
  }, [user, router]);

  if (!user) return null;

  if (user.role !== "admin") {
    return <EmptyState title="Admin access required" description="Switch role to Admin (demo) to view this page." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Admin</h1>
          <p className="muted">User management, course governance, and analytics.</p>
        </div>
        <Link href="/app/admin/settings" className="btn-primary">
          Settings
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <p className="h2">Users</p>
              <p className="muted">Roles, access, enrollment</p>
            </div>
            <Link href="/app/admin/users" className="btn-primary">
              Manage
            </Link>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-700">
              View users, assign roles, and suspend accounts (UI demo).
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="h2">Analytics</p>
              <p className="muted">Usage and performance</p>
            </div>
            <Link href="/app/admin/analytics" className="btn-primary">
              View
            </Link>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-700">Course completion, active users, and engagement metrics.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
