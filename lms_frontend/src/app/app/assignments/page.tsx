"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button, Card, CardBody, CardHeader } from "@/components/ui";

type Assignment = {
  id: string;
  title: string;
  course: string;
  due: string;
  status: "Assigned" | "Submitted" | "Graded";
  score?: string;
};

const DEMO: Assignment[] = [
  { id: "a1", title: "Schema design", course: "Intro to Databases", due: "Fri", status: "Submitted", score: "—" },
  { id: "a2", title: "Component composition", course: "Frontend Foundations", due: "Mon", status: "Assigned" },
  { id: "a3", title: "Metrics report", course: "Metrics That Matter", due: "Wed", status: "Graded", score: "92/100" },
];

export default function AssignmentsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Assignments</h1>
          <p className="muted">
            {user?.role === "instructor"
              ? "Review submissions and grade."
              : "Submit your work and track grades."}
          </p>
        </div>
        {user?.role === "instructor" ? (
          <Link href="/app/instructor/assignments/new" className="btn-primary">
            Create assignment
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {DEMO.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <div className="min-w-0">
                <p className="h2 truncate">{a.title}</p>
                <p className="muted">{a.course}</p>
              </div>
              <span className={a.status === "Graded" ? "badge-cyan" : a.status === "Submitted" ? "badge-blue" : "badge"}>
                {a.status}
              </span>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Due</span>
                <span className="font-medium">{a.due}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Score</span>
                <span className="font-medium">{a.score ?? "—"}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/app/assignments/${a.id}`} className="btn-primary">
                  {user?.role === "instructor" ? "Open & grade" : "Open"}
                </Link>
                {user?.role === "student" ? (
                  <Button variant="ghost" onClick={() => alert("Demo: upload submission")}>
                    Submit
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
