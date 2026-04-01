import type { UserRole } from "@/lib/auth";

export type NavItem = {
  label: string;
  href: string;
  roles: UserRole[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app", roles: ["admin", "instructor", "student"] },
  { label: "Courses", href: "/app/courses", roles: ["admin", "instructor", "student"] },
  { label: "Assignments", href: "/app/assignments", roles: ["instructor", "student"] },
  { label: "Quizzes", href: "/app/quizzes", roles: ["instructor", "student"] },
  { label: "Discussions", href: "/app/discussions", roles: ["admin", "instructor", "student"] },
  { label: "Messages", href: "/app/messages", roles: ["admin", "instructor", "student"] },
  { label: "Notifications", href: "/app/notifications", roles: ["admin", "instructor", "student"] },
  { label: "Search", href: "/app/search", roles: ["admin", "instructor", "student"] },

  { label: "Instructor", href: "/app/instructor", roles: ["instructor"] },
  { label: "Admin", href: "/app/admin", roles: ["admin"] },
];

export function getNavForRole(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter((i) => i.roles.includes(role));
}
