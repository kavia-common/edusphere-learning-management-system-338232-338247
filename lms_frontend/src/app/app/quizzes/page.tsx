"use client";

import Link from "next/link";
import { Button, Card, CardBody, CardHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";

const QUIZZES = [
  { id: "q1", title: "SQL Basics", course: "Intro to Databases", questions: 10, status: "Available" },
  { id: "q2", title: "React Patterns", course: "Frontend Foundations", questions: 8, status: "Completed" },
];

export default function QuizzesPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Quizzes</h1>
          <p className="muted">Practice and graded assessments (demo).</p>
        </div>
        {user?.role === "instructor" ? (
          <Link href="/app/instructor/quizzes/new" className="btn-primary">
            Create quiz
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {QUIZZES.map((q) => (
          <Card key={q.id}>
            <CardHeader>
              <div className="min-w-0">
                <p className="h2 truncate">{q.title}</p>
                <p className="muted">
                  {q.course} • {q.questions} questions
                </p>
              </div>
              <span className={q.status === "Completed" ? "badge-cyan" : "badge"}>{q.status}</span>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Link href={`/app/quizzes/${q.id}`} className="btn-primary">
                  {q.status === "Completed" ? "Review" : "Start"}
                </Link>
                {user?.role === "instructor" ? (
                  <Button variant="ghost" onClick={() => alert("Demo: view analytics")}>
                    Analytics
                  </Button>
                ) : null}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
