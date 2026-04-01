import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui";

const MY_COURSES = [
  { slug: "intro-to-databases", title: "Intro to Databases", students: 42, updated: "2d ago" },
  { slug: "frontend-foundations", title: "Frontend Foundations", students: 31, updated: "5d ago" },
];

export default function InstructorCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">My courses</h1>
          <p className="muted">Create, edit, and publish content.</p>
        </div>
        <Link href="/app/instructor/courses/new" className="btn-primary">
          Create course
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MY_COURSES.map((c) => (
          <Card key={c.slug}>
            <CardHeader>
              <div className="min-w-0">
                <p className="h2 truncate">{c.title}</p>
                <p className="muted">
                  {c.students} students • updated {c.updated}
                </p>
              </div>
              <Link href={`/app/instructor/courses/${c.slug}/edit`} className="btn-primary">
                Edit
              </Link>
            </CardHeader>
            <CardBody className="flex gap-2">
              <Link href={`/app/courses/${c.slug}`} className="btn-ghost">
                View as student
              </Link>
              <Link href={`/app/instructor/courses/${c.slug}/edit`} className="btn-ghost">
                Manage modules
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
