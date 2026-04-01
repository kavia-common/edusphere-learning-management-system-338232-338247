"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import clsx from "clsx";
import { Avatar, Button, Input, Select } from "@/components/ui";
import { getNavForRole } from "@/lib/nav";
import { useAuth, type UserRole } from "@/lib/auth";

function AppLogo() {
  return (
    <Link href="/app" className="flex items-center gap-2">
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-200" />
      <div className="leading-tight">
        <div className="text-sm font-semibold text-gray-900">EduSphere</div>
        <div className="text-xs text-gray-500">Learning Management</div>
      </div>
    </Link>
  );
}

function SidebarNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  if (!user) return null;

  const items = getNavForRole(user.role);

  return (
    <nav className="mt-4 space-y-1">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
              active ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <span className="font-medium">{item.label}</span>
            {active ? <span className="text-xs text-blue-700">•</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileDrawer(props: { open: boolean; onClose: () => void }) {
  const { open, onClose } = props;
  return (
    <div className={clsx("fixed inset-0 z-50 lg:hidden", open ? "block" : "hidden")} role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="border-b border-gray-100 p-4">
          <AppLogo />
        </div>
        <div className="p-4">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * AppShell provides the standard responsive layout for all authenticated app routes.
 *
 * Contract:
 * - Inputs: children content.
 * - Outputs: renders sidebar + header + main content.
 * - Errors: none thrown (auth gating handled by the /app layout).
 */
export function AppShell(props: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logout, loginDemo, state } = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const role = user?.role ?? "student";

  // Role switching is a demo-only tool while backend auth is not available.
  const onRoleChange = (nextRole: string) => {
    loginDemo(nextRole as UserRole);
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex">
        <aside className="hidden h-screen w-72 shrink-0 border-r border-gray-200 bg-white lg:block">
          <div className="p-4">
            <AppLogo />
            <SidebarNav />
          </div>
          <div className="mt-auto border-t border-gray-100 p-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar name={user.name} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                {state.status === "loading" ? "Loading…" : "Signed out"}
              </div>
            )}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
            <div className="container-page flex h-16 items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="lg:hidden" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
                  Menu
                </Button>
                <div className="hidden lg:block text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Workspace</span>{" "}
                  <span className="text-gray-400">/</span>{" "}
                  <span className="capitalize">{role}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:block w-80">
                  <Input placeholder="Search courses, lessons, people…" aria-label="Global search" />
                </div>

                <div className="hidden sm:block w-44">
                  <Select value={role} onChange={(e) => onRoleChange(e.target.value)} aria-label="Switch role (demo)">
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </Select>
                </div>

                <Link href="/app/notifications" className="btn-ghost">
                  Notifications
                </Link>

                <Button variant="ghost" onClick={() => logout()}>
                  Sign out
                </Button>
              </div>
            </div>
          </header>

          <main className="container-page flex-1 py-6">{props.children}</main>
        </div>
      </div>
    </div>
  );
}
