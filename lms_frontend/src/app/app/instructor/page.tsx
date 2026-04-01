"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Card, CardBody, CardHeader, EmptyState } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function InstructorHomePage() {
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user && user.role !== "instructor") router.replace("/app");
  }, [user, router]);

  if (!user) return null;

  if (user.role !== "instructor") {
    return <EmptyState title="Instructor access required" description="Switch role to Instructor (demo) to view this page." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Instructor</h1>
          <p className="muted">Manage courses, assignments, quizzes, and grading.</p>
        </div>
        <Link href="/app/instructor/courses/new" className="btn-primary">
          Create course
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <p className="h2">Course authoring</p>
              <p className="muted">Modules, lessons, content</p>
            </div>
          </CardHeader>
          <CardBody className="flex gap-2">
            <Link href="/app/instructor/courses" className="btn-primary">
              My courses
            </Link>
            <Button variant="ghost" onClick={() => alert("Demo: upload content")}>
              Upload content
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="h2">Assessment</p>
              <p className="muted">Assignments & quizzes</p>
            </div>
          </CardHeader>
          <CardBody className="flex gap-2">
            <Link href="/app/assignments" className="btn-primary">
              Review assignments
            </Link>
            <Link href="/app/quizzes" className="btn-ghost">
              Quizzes
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
