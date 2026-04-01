import { Card, CardBody, CardHeader, Input } from "@/components/ui";

// PUBLIC_INTERFACE
export function generateStaticParams() {
  /** Static export requires params to be known at build time. Demo slugs only. */
  return [{ courseSlug: "intro-to-databases" }, { courseSlug: "frontend-foundations" }];
}

export default async function EditCoursePage(props: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await props.params;
  const slug = courseSlug;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Edit course</h1>
        <p className="muted capitalize">Course: {slug.replace(/-/g, " ")}</p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Metadata</p>
            <p className="muted">Update title and description (demo).</p>
          </div>
          <span className="badge-blue">Publish: Draft</span>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input label="Title" defaultValue={slug.replace(/-/g, " ")} />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-800">Description</span>
            <textarea className="input min-h-36" defaultValue="Course description…" />
          </label>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Save (demo)
            </span>
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Add module (demo)
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Modules & lessons</p>
            <p className="muted">Structure editor (placeholder)</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="rounded-lg border border-dashed border-gray-200 p-4 text-sm text-gray-600">
            Module/lesson drag-and-drop editor will be implemented once backend endpoints exist.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
