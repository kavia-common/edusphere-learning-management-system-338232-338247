"use client";

import Link from "next/link";
import * as React from "react";
import { Button, Card, CardBody, Input, Select } from "@/components/ui";

type Topic = { id: string; title: string; course: string; replies: number; last: string };

const TOPICS: Topic[] = [
  { id: "t1", title: "Normalization vs denormalization", course: "Intro to Databases", replies: 18, last: "2h ago" },
  { id: "t2", title: "State management patterns", course: "Frontend Foundations", replies: 9, last: "1d ago" },
  { id: "t3", title: "Design token naming", course: "Product Design Systems", replies: 4, last: "3d ago" },
];

export default function DiscussionsPage() {
  const [query, setQuery] = React.useState("");
  const [course, setCourse] = React.useState("all");

  const filtered = React.useMemo(() => {
    return TOPICS.filter((t) => {
      const qOk = !query || t.title.toLowerCase().includes(query.toLowerCase());
      const cOk = course === "all" ? true : t.course === course;
      return qOk && cOk;
    });
  }, [query, course]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Discussions</h1>
          <p className="muted">Course Q&A and announcements threads.</p>
        </div>
        <Button onClick={() => alert("Demo: create topic")}>New topic</Button>
      </div>

      <Card>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-3">
            <Input label="Search" placeholder="Search topics…" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Select label="Course" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="all">All</option>
              <option value="Intro to Databases">Intro to Databases</option>
              <option value="Frontend Foundations">Frontend Foundations</option>
              <option value="Product Design Systems">Product Design Systems</option>
            </Select>
            <div className="flex items-end">
              <Link href="/app/messages" className="btn-ghost w-full justify-center">
                Real-time chat
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-3">
        {filtered.map((t) => (
          <Card key={t.id}>
            <CardBody>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                  <p className="text-xs text-gray-600">
                    {t.course} • {t.replies} replies • last {t.last}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/app/discussions/${t.id}`} className="btn-primary">
                    Open
                  </Link>
                  <Button variant="ghost" onClick={() => alert("Demo: subscribe")}>
                    Follow
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
