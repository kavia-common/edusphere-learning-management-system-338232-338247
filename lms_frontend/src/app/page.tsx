import Link from "next/link";
import { Button, Card, CardBody, CardHeader } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="badge-blue">Modern • Responsive • Role-based</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
              EduSphere Learning Management System
            </h1>
            <p className="mt-3 text-base text-gray-600">
              Courses, lessons, assignments, quizzes, discussions, messaging, progress tracking, and admin tools—built
              with a clean, responsive sidebar layout.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/auth/login">
                <Button>Sign in</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="ghost">Create account</Button>
              </Link>
              <Link href="/app">
                <Button variant="secondary">Open app (demo)</Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Note: backend OpenAPI currently exposes only a health endpoint; this UI uses demo data but is structured
              for API-first integration.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <div>
                <p className="h2">What you can do</p>
                <p className="muted">Student, Instructor, and Admin experiences</p>
              </div>
              <span className="badge-cyan">Theme: #3b82f6 & #06b6d4</span>
            </CardHeader>
            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Enroll and track progress",
                  "Create courses/modules/lessons",
                  "Assignments & grading",
                  "Quizzes & attempts",
                  "Announcements & notifications",
                  "Discussions & real-time messaging",
                  "Search/filtering",
                  "Admin panel and analytics",
                ].map((t) => (
                  <div key={t} className="rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700">
                    {t}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
