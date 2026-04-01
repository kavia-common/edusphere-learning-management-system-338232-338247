"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader, Input, Select } from "@/components/ui";

type SearchResult =
  | { kind: "course"; title: string; href: string; meta: string }
  | { kind: "assignment"; title: string; href: string; meta: string }
  | { kind: "lesson"; title: string; href: string; meta: string };

const RESULTS: SearchResult[] = [
  { kind: "course", title: "Intro to Databases", href: "/app/courses/intro-to-databases", meta: "Engineering • Beginner" },
  { kind: "lesson", title: "Normalization basics", href: "/app/courses/intro-to-databases/lessons/core-concepts", meta: "Lesson • 14 min" },
  { kind: "assignment", title: "Schema design", href: "/app/assignments/a1", meta: "Due Fri" },
  { kind: "course", title: "Frontend Foundations", href: "/app/courses/frontend-foundations", meta: "Engineering • Intermediate" },
];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [kind, setKind] = React.useState("all");

  const filtered = RESULTS.filter((r) => {
    const qOk = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.meta.toLowerCase().includes(query.toLowerCase());
    const kOk = kind === "all" ? true : r.kind === kind;
    return qOk && kOk;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Search</h1>
        <p className="muted">Find courses, lessons, assignments, and people (demo).</p>
      </div>

      <Card>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-3">
            <Input label="Query" placeholder="Try “database”, “schema”, “lesson”…" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Select label="Type" value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="all">All</option>
              <option value="course">Courses</option>
              <option value="lesson">Lessons</option>
              <option value="assignment">Assignments</option>
            </Select>
            <div className="flex items-end">
              <div className="badge w-full justify-center text-center">Results: {filtered.length}</div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.href}>
            <CardHeader>
              <div className="min-w-0">
                <p className="h2 truncate">{r.title}</p>
                <p className="muted">
                  {r.kind} • {r.meta}
                </p>
              </div>
              <Link href={r.href} className="btn-primary">
                Open
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
