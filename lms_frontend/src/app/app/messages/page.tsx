"use client";

import * as React from "react";
import { Avatar, Button, Card, CardBody, CardHeader, Input, Select } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { useWsChat } from "@/lib/ws";

const ROOMS = [
  { id: "general", label: "General" },
  { id: "course-intro-to-databases", label: "Intro to Databases" },
  { id: "course-frontend-foundations", label: "Frontend Foundations" },
];

export default function MessagesPage() {
  const { user } = useAuth();
  const [roomId, setRoomId] = React.useState(ROOMS[0]!.id);
  const { status, error, messages, send } = useWsChat(roomId);
  const [text, setText] = React.useState("");

  const onSend = () => {
    if (!text.trim()) return;
    send(text.trim(), user?.name);
    setText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1">Messages</h1>
          <p className="muted">
            Real-time chat UI via WebSocket client. Status:{" "}
            <span className="font-medium">{status}</span>
          </p>
        </div>
        <div className="w-72">
          <Select label="Room" value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            {ROOMS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          WebSocket error: {error}. Configure <span className="kbd">NEXT_PUBLIC_WS_BASE_URL</span>.
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <div>
            <p className="h2">Chat</p>
            <p className="muted">Room: {roomId}</p>
          </div>
          <span className={status === "open" ? "badge-cyan" : "badge"}>{status}</span>
        </CardHeader>
        <CardBody>
          <div className="h-[420px] overflow-auto rounded-lg border border-gray-200 bg-white p-3">
            {messages.length === 0 ? (
              <p className="text-sm text-gray-500">No messages yet.</p>
            ) : (
              <div className="space-y-3">
                {messages.slice(-50).map((m, idx) => (
                  <div key={`${m.ts}-${idx}`} className="flex gap-3">
                    <Avatar name={m.from ?? "System"} size="sm" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <p className="text-sm font-semibold text-gray-900">{m.from ?? "System"}</p>
                        <p className="text-xs text-gray-500">{new Date(m.ts).toLocaleTimeString()}</p>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <Input
              className="flex-1"
              placeholder="Type a message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
              aria-label="Message input"
            />
            <Button onClick={onSend} disabled={!text.trim()}>
              Send
            </Button>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Note: backend WebSocket route name may differ; this client defaults to <span className="kbd">/ws</span>.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
