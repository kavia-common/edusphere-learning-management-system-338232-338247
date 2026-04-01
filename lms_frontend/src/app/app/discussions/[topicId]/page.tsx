import * as React from "react";
import { Avatar, Card, CardBody, CardHeader } from "@/components/ui";

type Post = { id: string; author: string; ts: string; body: string };

// PUBLIC_INTERFACE
export function generateStaticParams() {
  /** Static export requires params to be known at build time. Demo topic IDs only. */
  return [{ topicId: "t1" }, { topicId: "t2" }, { topicId: "t3" }];
}

const DEMO_POSTS: Post[] = [
  { id: "p1", author: "Student User", ts: "Today • 10:12", body: "Can someone explain when to denormalize?" },
  {
    id: "p2",
    author: "Instructor User",
    ts: "Today • 10:30",
    body: "Denormalize when reads dominate and you can tolerate some duplication. Use constraints + jobs to keep consistency.",
  },
];

export default async function TopicPage(props: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await props.params;

  // Note: This is a server component to support static export.
  // Reply composer buttons are demo-only (alerts); real posting will be wired to backend later.
  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">Topic {topicId}</h1>
        <p className="muted">Thread view (demo).</p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Posts</p>
            <p className="muted">{DEMO_POSTS.length} messages</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          {DEMO_POSTS.map((p) => (
            <div key={p.id} className="flex gap-3">
              <Avatar name={p.author} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-sm font-semibold text-gray-900">{p.author}</p>
                  <p className="text-xs text-gray-500">{p.ts}</p>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{p.body}</p>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-800">Reply</span>
              <textarea className="input min-h-28" placeholder="Write a reply…" />
            </label>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
                Post (demo)
              </span>
              <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">
                Clear (demo)
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
