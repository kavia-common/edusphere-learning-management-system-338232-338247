"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Card, CardBody, CardHeader, Input, Select } from "@/components/ui";
import { useAuth, type UserRole } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { loginDemo } = useAuth();
  const [role, setRole] = React.useState<UserRole>("student");

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="container-page flex min-h-screen items-center justify-center py-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div>
              <h1 className="h1">Create account</h1>
              <p className="muted">Demo signup (no backend call yet).</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First name" placeholder="Alex" />
              <Input label="Last name" placeholder="Taylor" />
            </div>
            <Input label="Email" placeholder="you@example.com" autoComplete="email" />
            <Input label="Password" placeholder="Create a password" type="password" autoComplete="new-password" />
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
              Create account
            </Button>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="text-blue-700 hover:underline" href="/auth/login">
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
