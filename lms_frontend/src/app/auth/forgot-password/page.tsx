import Link from "next/link";
import { Button, Card, CardBody, CardHeader, Input } from "@/components/ui";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="container-page flex min-h-screen items-center justify-center py-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div>
              <h1 className="h1">Reset password</h1>
              <p className="muted">UI placeholder. Backend email reset will be wired later.</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Email" placeholder="you@example.com" autoComplete="email" />
            <Button className="w-full" disabled>
              Send reset link
            </Button>
            <Link className="btn-ghost w-full justify-center" href="/auth/login">
              Back to sign in
            </Link>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
