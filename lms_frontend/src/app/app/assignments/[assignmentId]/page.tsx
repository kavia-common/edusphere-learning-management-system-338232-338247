import { Card, CardBody, CardHeader, Input } from "@/components/ui";

// PUBLIC_INTERFACE
export function generateStaticParams() {
  /** Static export requires params to be known at build time. Demo assignment IDs only. */
  return [{ assignmentId: "a1" }, { assignmentId: "a2" }, { assignmentId: "a3" }];
}

export default async function AssignmentDetailPage(props: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await props.params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Assignment {assignmentId}</h1>
        <p className="muted">
          Details, submission, and grading flow (demo). Note: this page is a server component to
          support static export; role-specific views will be enabled once backend auth is wired.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Prompt</p>
            <p className="muted">What you need to do</p>
          </div>
          <span className="badge-blue">Due in 3 days</span>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-700">
            Design a data model for course modules and lessons. Include relationships, constraints,
            and indexing strategy.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Actions</p>
            <p className="muted">Submission/grading (demo placeholders)</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="rounded-lg border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-600">
            In a full integration, students see submission controls; instructors see grading controls.
            This UI will be connected to backend endpoints later.
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Score (instructor demo)" defaultValue="92" />
            <Input label="Status" defaultValue="Submitted" />
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-800">Feedback (instructor demo)</span>
            <textarea className="input min-h-36" defaultValue="Good structure and clear reasoning." />
          </label>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Upload file (demo)
            </span>
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Submit assignment (demo)
            </span>
            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
              Save grade (demo)
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
