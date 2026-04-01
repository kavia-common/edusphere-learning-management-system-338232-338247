"use client";

import * as React from "react";
import { Button, Card, CardBody, CardHeader, Select } from "@/components/ui";

type Notification = {
  id: string;
  type: "announcement" | "assignment" | "message";
  title: string;
  body: string;
  ts: string;
  read: boolean;
};

const DEMO: Notification[] = [
  { id: "n1", type: "assignment", title: "Assignment due soon", body: "Component composition due Monday.", ts: "1h ago", read: false },
  { id: "n2", type: "message", title: "New message", body: "Instructor replied in General chat.", ts: "3h ago", read: false },
  { id: "n3", type: "announcement", title: "Course update", body: "New lesson added to Intro to Databases.", ts: "2d ago", read: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = React.useState("all");
  const [items, setItems] = React.useState(DEMO);

  const filtered = items.filter((n) => (filter === "all" ? true : n.type === filter));

  const markAllRead = () => setItems((prev) => prev.map((x) => ({ ...x, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Notifications</h1>
          <p className="muted">In-app notifications (demo).</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={markAllRead}>
            Mark all read
          </Button>
        </div>
      </div>

      <Card>
        <CardBody className="flex flex-wrap items-end justify-between gap-3">
          <div className="w-64">
            <Select label="Filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="announcement">Announcements</option>
              <option value="assignment">Assignments</option>
              <option value="message">Messages</option>
            </Select>
          </div>
          <span className="badge-blue">{filtered.filter((x) => !x.read).length} unread</span>
        </CardBody>
      </Card>

      <div className="space-y-3">
        {filtered.map((n) => (
          <Card key={n.id} className={n.read ? "" : "ring-1 ring-blue-100"}>
            <CardHeader>
              <div className="min-w-0">
                <p className="h2 truncate">{n.title}</p>
                <p className="muted">
                  {n.type} • {n.ts}
                </p>
              </div>
              <span className={n.read ? "badge" : "badge-cyan"}>{n.read ? "Read" : "New"}</span>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-700">{n.body}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
