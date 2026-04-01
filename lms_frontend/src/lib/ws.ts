"use client";

import * as React from "react";

export type WsStatus = "idle" | "connecting" | "open" | "closed" | "error";

export type WsMessage = {
  type: "chat_message" | "system";
  roomId?: string;
  text: string;
  from?: string;
  ts: number;
};

type WsClientOptions = {
  url: string;
  protocols?: string | string[];
};

/**
 * PUBLIC_INTERFACE
 * WsClientFlow is the single reusable WebSocket client flow.
 *
 * Contract:
 * - Inputs: url, optional protocols; connect/disconnect/send.
 * - Outputs: status, lastError, received messages list (in-memory).
 * - Errors: connection errors set status="error" and store error.
 * - Side effects: opens WebSocket connection; logs lifecycle events.
 *
 * Invariants:
 * - When status is "open", socket is non-null and readyState is OPEN.
 */
export class WsClientFlow {
  private socket: WebSocket | null = null;
  private listeners = new Set<(msg: WsMessage) => void>();

  status: WsStatus = "idle";
  lastError: string | null = null;

  connect(opts: WsClientOptions) {
    if (this.socket && (this.status === "connecting" || this.status === "open")) return;

    this.status = "connecting";
    this.lastError = null;

    try {
      console.info("[WsClientFlow] Connecting", { url: opts.url });
      const ws = new WebSocket(opts.url, opts.protocols);
      this.socket = ws;

      ws.onopen = () => {
        this.status = "open";
        console.info("[WsClientFlow] Open");
      };

      ws.onclose = () => {
        this.status = "closed";
        console.info("[WsClientFlow] Closed");
      };

      ws.onerror = () => {
        this.status = "error";
        this.lastError = "WebSocket error";
        console.error("[WsClientFlow] Error");
      };

      ws.onmessage = (evt) => {
        const parsed = this.safeParse(evt.data);
        if (parsed) {
          this.listeners.forEach((fn) => fn(parsed));
        }
      };
    } catch (err) {
      this.status = "error";
      this.lastError = err instanceof Error ? err.message : String(err);
      console.error("[WsClientFlow] Failed to create WebSocket", err);
    }
  }

  disconnect() {
    if (this.socket) {
      console.info("[WsClientFlow] Disconnect requested");
      this.socket.close();
      this.socket = null;
      this.status = "closed";
    }
  }

  send(msg: WsMessage) {
    if (!this.socket || this.status !== "open") {
      console.warn("[WsClientFlow] send() called while not open", { status: this.status });
      return;
    }
    this.socket.send(JSON.stringify(msg));
  }

  subscribe(listener: (msg: WsMessage) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private safeParse(raw: unknown): WsMessage | null {
    try {
      const obj = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!obj || typeof obj !== "object") return null;
      const anyObj = obj as Record<string, unknown>;
      if (typeof anyObj.text !== "string") return null;
      return {
        type: (anyObj.type === "chat_message" ? "chat_message" : "system") as WsMessage["type"],
        roomId: typeof anyObj.roomId === "string" ? anyObj.roomId : undefined,
        text: anyObj.text,
        from: typeof anyObj.from === "string" ? anyObj.from : undefined,
        ts: typeof anyObj.ts === "number" ? anyObj.ts : Date.now(),
      };
    } catch {
      return null;
    }
  }
}

const defaultWsUrl = () => {
  const base = process.env.NEXT_PUBLIC_WS_BASE_URL;
  if (!base) return "";
  return `${base.replace(/\/$/, "")}/ws`;
};

/**
 * PUBLIC_INTERFACE
 * useWsChat provides a hook that manages connecting, receiving, and sending chat messages.
 */
export function useWsChat(roomId: string) {
  const [status, setStatus] = React.useState<WsStatus>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<WsMessage[]>([]);

  const flowRef = React.useRef<WsClientFlow | null>(null);

  React.useEffect(() => {
    const wsUrl = defaultWsUrl();
    if (!wsUrl) {
      setStatus("error");
      setError("Missing NEXT_PUBLIC_WS_BASE_URL");
      return;
    }

    const flow = new WsClientFlow();
    flowRef.current = flow;

    const cleanupSub = flow.subscribe((m) => setMessages((prev) => [...prev, m]));
    flow.connect({ url: wsUrl });

    const interval = globalThis.setInterval(() => {
      setStatus(flow.status);
      setError(flow.lastError);
    }, 250);

    return () => {
      globalThis.clearInterval(interval);
      cleanupSub();
      flow.disconnect();
    };
  }, [roomId]);

  const send = React.useCallback(
    (text: string, from?: string) => {
      const flow = flowRef.current;
      if (!flow) return;
      flow.send({
        type: "chat_message",
        roomId,
        text,
        from,
        ts: Date.now(),
      });
      // optimistic append
      setMessages((prev) => [
        ...prev,
        { type: "chat_message", roomId, text, from: from ?? "me", ts: Date.now() },
      ]);
    },
    [roomId]
  );

  return { status, error, messages, send };
}
