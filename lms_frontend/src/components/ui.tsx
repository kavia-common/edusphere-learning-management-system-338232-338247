import * as React from "react";
import clsx from "clsx";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={clsx("card", props.className)} />;
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={clsx("card-header", props.className)} />;
}

export function CardBody(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={clsx("card-body", props.className)} />;
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
  }
) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  return (
    <button
      {...rest}
      className={clsx(
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "ghost" && "btn-ghost",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        className
      )}
    />
  );
}

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }
) {
  const { label, hint, className, id, ...rest } = props;
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm font-medium text-gray-800">{label}</span> : null}
      <input id={inputId} {...rest} className={clsx("input", className)} />
      {hint ? <span className="mt-1 block text-xs text-gray-500">{hint}</span> : null}
    </label>
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; hint?: string }
) {
  const { label, hint, className, id, children, ...rest } = props;
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm font-medium text-gray-800">{label}</span> : null}
      <select id={selectId} {...rest} className={clsx("select", className)}>
        {children}
      </select>
      {hint ? <span className="mt-1 block text-xs text-gray-500">{hint}</span> : null}
    </label>
  );
}

export function EmptyState(props: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
      <div className="mx-auto max-w-md">
        <p className="text-base font-semibold text-gray-900">{props.title}</p>
        {props.description ? (
          <p className="mt-2 text-sm text-gray-600">{props.description}</p>
        ) : null}
        {props.action ? <div className="mt-4 flex justify-center">{props.action}</div> : null}
      </div>
    </div>
  );
}

export function Avatar(props: { name: string; size?: "sm" | "md" }) {
  const initials = props.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");
  const sizeCls = props.size === "sm" ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm";
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 font-semibold text-blue-700",
        sizeCls
      )}
      aria-label={`Avatar for ${props.name}`}
      title={props.name}
    >
      {initials || "U"}
    </div>
  );
}
