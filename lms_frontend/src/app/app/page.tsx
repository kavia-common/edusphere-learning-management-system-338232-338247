"use client";

import Link from "next/link";
import { Card, CardBody, CardHeader, Button } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { useHealthCheck } from "@/lib/api";

function StatCard(props: { label: string; value: string; hint?: string }) {
  return (
    <Card>
      <CardBody>
        <p className="text-sm text-gray-600">{props.label}</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{props.value}</p>
        {props.hint ? <p className="mt-1 text-xs text-gray-500">{props.hint}</p> : null}
      </CardBody>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, error, isLoading } = useHealthCheck();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Dashboard</h1>
          <p className="muted">
            Welcome back, <span className="font-medium text-gray-900">{user?.name}</span>. Role:{" "}
            <span className="capitalize">{user?.role}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/courses">
            <Button variant="secondary">Browse courses</Button>
          </Link>
          <Link href="/app/messages">
            <Button variant="ghost">Open messages</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active courses" value={user?.role === "instructor" ? "5" : "3"} hint="Demo data" />
        <StatCard label="Assignments due" value={user?.role === "student" ? "2" : "8"} hint="Next 7 days" />
        <StatCard label="Completion" value={user?.role === "student" ? "62%" : "—"} hint="Avg progress" />
        <StatCard label="Messages" value="4" hint="Unread" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <p className="h2">Continue learning</p>
              <p className="muted">Pick up where you left off</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { title: "Intro to Databases", lesson: "Normalization basics", href: "/app/courses/intro-to-databases" },
                { title: "Frontend Foundations", lesson: "Component patterns", href: "/app/courses/frontend-foundations" },
              ].map((x) => (
                <div key={x.title} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{x.title}</p>
                    <p className="truncate text-xs text-gray-600">{x.lesson}</p>
                  </div>
                  <Link href={x.href} className="btn-primary">
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="h2">System status</p>
              <p className="muted">Backend API health check</p>
            </div>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <p className="text-sm text-gray-600">Checking…</p>
            ) : error ? (
              <p className="text-sm text-red-600">
                Unable to reach API. Configure <span className="kbd">NEXT_PUBLIC_API_BASE_URL</span>.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-700">API reachable.</p>
                <pre className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 overflow-auto">
                  {JSON.stringify(data ?? {}, null, 2)}
                </pre>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
