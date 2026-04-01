"use client";

import Link from "next/link";
import * as React from "react";
import { Button, Card, CardBody, CardHeader, Input, Select } from "@/components/ui";
import { useAuth } from "@/lib/auth";

type Course = {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Engineering" | "Design" | "Business";
  instructor: string;
  enrolled: boolean;
  progressPct: number;
};

const DEMO_COURSES: Course[] = [
  {
    slug: "intro-to-databases",
    title: "Intro to Databases",
    level: "Beginner",
    category: "Engineering",
    instructor: "Instructor User",
    enrolled: true,
    progressPct: 62,
  },
  {
    slug: "frontend-foundations",
    title: "Frontend Foundations",
    level: "Intermediate",
    category: "Engineering",
    instructor: "Instructor User",
    enrolled: true,
    progressPct: 28,
  },
  {
    slug: "product-design-systems",
    title: "Product Design Systems",
    level: "Beginner",
    category: "Design",
    instructor: "Jordan Lee",
    enrolled: false,
    progressPct: 0,
  },
  {
    slug: "metrics-that-matter",
    title: "Metrics That Matter",
    level: "Advanced",
    category: "Business",
    instructor: "Casey Morgan",
    enrolled: false,
    progressPct: 0,
  },
];

export default function CoursesPage() {
  const { user } = useAuth();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [level, setLevel] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    return DEMO_COURSES.filter((c) => {
      const qOk =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.toLowerCase().includes(query.toLowerCase());
      const catOk = category === "all" ? true : c.category === category;
      const lvlOk = level === "all" ? true : c.level === level;
      return qOk && catOk && lvlOk;
    });
  }, [query, category, level]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Courses</h1>
          <p className="muted">Browse, enroll, and manage course content.</p>
        </div>

        {user?.role === "instructor" ? (
          <Link href="/app/instructor/courses/new">
            <Button>Create course</Button>
          </Link>
        ) : null}
      </div>

      <Card>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              label="Search"
              placeholder="Search by title or instructor…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
            </Select>
            <Select label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="all">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <Card key={c.slug}>
            <CardHeader>
              <div className="min-w-0">
                <p className="h2 truncate">{c.title}</p>
                <p className="muted">
                  {c.category} • {c.level} • {c.instructor}
                </p>
              </div>
              <span className={c.enrolled ? "badge-cyan" : "badge"}>{c.enrolled ? "Enrolled" : "Available"}</span>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Progress</span>
                <span className="font-medium">{c.enrolled ? `${c.progressPct}%` : "—"}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${c.progressPct}%` }} />
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/app/courses/${c.slug}`} className="btn-primary">
                  View
                </Link>
                {user?.role === "student" && !c.enrolled ? (
                  <Button variant="ghost" onClick={() => alert("Demo: enrollment request sent")}>
                    Enroll
                  </Button>
                ) : null}
                {user?.role === "instructor" ? (
                  <Link href={`/app/instructor/courses/${c.slug}/edit`} className="btn-ghost">
                    Edit
                  </Link>
                ) : null}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
