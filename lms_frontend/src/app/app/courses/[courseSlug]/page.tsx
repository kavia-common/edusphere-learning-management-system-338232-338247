import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui";

type Lesson = { slug: string; title: string; durationMin: number; completed: boolean };
type Module = { title: string; lessons: Lesson[] };

// PUBLIC_INTERFACE
export function generateStaticParams() {
  /** Static export requires params to be known at build time. Demo slugs only. */
  return [{ courseSlug: "intro-to-databases" }, { courseSlug: "frontend-foundations" }];
}

function demoModules(courseSlug: string): Module[] {
  const base = courseSlug.replace(/-/g, " ");
  return [
    {
      title: "Module 1 — Foundations",
      lessons: [
        { slug: "welcome", title: `Welcome to ${base}`, durationMin: 6, completed: true },
        { slug: "core-concepts", title: "Core concepts", durationMin: 14, completed: false },
      ],
    },
    {
      title: "Module 2 — Practice",
      lessons: [
        { slug: "exercise-1", title: "Exercise 1", durationMin: 12, completed: false },
        { slug: "quiz-1", title: "Quiz 1 (practice)", durationMin: 8, completed: false },
      ],
    },
  ];
}

export default async function CourseDetailPage(props: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await props.params;
  const modules = demoModules(courseSlug);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const pct = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="h1 capitalize">{courseSlug.replace(/-/g, " ")}</h1>
          <p className="muted">Modules, lessons, and resources.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/courses" className="btn-ghost">
            Back to courses
          </Link>
          <Link href={`/app/courses/${courseSlug}/lessons/welcome`} className="btn-primary">
            Start lesson
          </Link>
        </div>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-lg font-semibold text-gray-900">
                {completedLessons}/{totalLessons} lessons • {pct}%
              </p>
            </div>
            <span className="badge-blue">Enrollment: Active (demo)</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </CardBody>
      </Card>

      <div className="space-y-4">
        {modules.map((m) => (
          <Card key={m.title}>
            <CardHeader>
              <div>
                <p className="h2">{m.title}</p>
                <p className="muted">{m.lessons.length} lessons</p>
              </div>
              <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
                Download resources (demo)
              </span>
            </CardHeader>
            <CardBody>
              <div className="divide-y divide-gray-100 rounded-lg border border-gray-200">
                {m.lessons.map((l) => (
                  <div key={l.slug} className="flex items-center justify-between gap-3 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{l.title}</p>
                      <p className="text-xs text-gray-600">{l.durationMin} min</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {l.completed ? (
                        <span className="badge-cyan">Completed</span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                          Pending
                        </span>
                      )}
                      <Link
                        href={`/app/courses/${courseSlug}/lessons/${l.slug}`}
                        className="btn-primary"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
