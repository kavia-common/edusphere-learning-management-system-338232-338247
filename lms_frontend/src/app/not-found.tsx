import Link from "next/link";
import { Button, Card, CardBody, CardHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="container-page flex min-h-screen items-center justify-center py-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div>
              <h1 className="h1">404 – Page Not Found</h1>
              <p className="muted">The page you’re looking for doesn’t exist.</p>
            </div>
          </CardHeader>
          <CardBody className="flex gap-2">
            <Link href="/">
              <Button>Go home</Button>
            </Link>
            <Link href="/app">
              <Button variant="ghost">Open app</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
