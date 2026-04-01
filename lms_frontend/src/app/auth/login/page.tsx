"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Card, CardBody, CardHeader, Input, Select } from "@/components/ui";
import { useAuth, type UserRole } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { loginDemo } = useAuth();
  const [role, setRole] = React.useState<UserRole>("student");

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="container-page flex min-h-screen items-center justify-center py-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div>
              <h1 className="h1">Sign in</h1>
              <p className="muted">Demo auth until backend auth is available.</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Email" placeholder="you@example.com" autoComplete="email" />
            <Input label="Password" placeholder="••••••••" type="password" autoComplete="current-password" />

            <Select label="Role (demo)" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </Select>

            <Button
              className="w-full"
              onClick={() => {
                loginDemo(role);
                router.push("/app");
              }}
            >
              Continue
            </Button>

            <div className="flex items-center justify-between text-sm">
              <Link className="text-blue-700 hover:underline" href="/auth/forgot-password">
                Forgot password?
              </Link>
              <Link className="text-gray-700 hover:underline" href="/auth/register">
                Create account
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
