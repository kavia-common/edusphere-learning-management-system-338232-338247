import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui";

// PUBLIC_INTERFACE
export function generateStaticParams() {
  /** Static export requires params to be known at build time. Demo course/lesson slugs only. */
  return [
    { courseSlug: "intro-to-databases", lessonSlug: "welcome" },
    { courseSlug: "intro-to-databases", lessonSlug: "core-concepts" },
    { courseSlug: "frontend-foundations", lessonSlug: "welcome" },
    { courseSlug: "frontend-foundations", lessonSlug: "core-concepts" },
  ];
}

export default async function LessonPage(props: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await props.params;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="h1">
            Lesson: <span className="capitalize">{lessonSlug.replace(/-/g, " ")}</span>
          </h1>
          <p className="muted capitalize">Course: {courseSlug.replace(/-/g, " ")}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/app/courses/${courseSlug}`} className="btn-ghost">
            Back to course
          </Link>
          <Link href="/app/discussions" className="btn-ghost">
            Open discussions
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Video</p>
            <p className="muted">Embedded player placeholder</p>
          </div>
          <span className="badge-blue">HD</span>
        </CardHeader>
        <CardBody>
          <div className="grid aspect-video w-full place-items-center rounded-lg border border-gray-200 bg-gradient-to-br from-blue-500/10 to-gray-50">
            <p className="text-sm text-gray-600">Video player would render here</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Download slides (demo)
            </span>
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Mark as complete (demo)
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Notes</p>
            <p className="muted">Your personal notes (local only)</p>
          </div>
        </CardHeader>
        <CardBody>
          <textarea
            className="input min-h-40"
            placeholder="Write notes about this lesson…"
            aria-label="Lesson notes"
          />
        </CardBody>
      </Card>
    </div>
  );
}
