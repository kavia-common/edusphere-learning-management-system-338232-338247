"use client";

import * as React from "react";

export type UserRole = "admin" | "instructor" | "student";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthState =
  | { status: "loading" }
  | { status: "anonymous" }
  | { status: "authenticated"; user: AuthUser };

const AUTH_STORAGE_KEY = "lms_auth_user_v1";

/**
 * PUBLIC_INTERFACE
 * AuthFlow is the single, reusable auth/session flow for the frontend.
 *
 * Contract:
 * - Inputs: login/logout accept a user object (for now a demo user) and/or none.
 * - Outputs: `useAuth()` returns { state, user, isAuthenticated } and actions.
 * - Errors: storage failures are caught and logged; state falls back to anonymous.
 * - Side effects: reads/writes localStorage; no network calls yet (API spec shows only health check).
 *
 * Invariants:
 * - If status === "authenticated", `user` is non-null and has a role.
 * - Role checks must use `requireRole()` to keep logic centralized.
 */
export class AuthFlow {
  static loadFromStorage(): AuthUser | null {
    try {
      const raw = globalThis.localStorage?.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthUser;
      if (!parsed?.id || !parsed?.email || !parsed?.role) return null;
      return parsed;
    } catch (err) {
      console.error("[AuthFlow] Failed to load session from storage", err);
      return null;
    }
  }

  static saveToStorage(user: AuthUser) {
    try {
      globalThis.localStorage?.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.error("[AuthFlow] Failed to save session to storage", err);
    }
  }

  static clearStorage() {
    try {
      globalThis.localStorage?.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.error("[AuthFlow] Failed to clear session from storage", err);
    }
  }

  static requireRole(user: AuthUser, allowed: UserRole[]): boolean {
    return allowed.includes(user.role);
  }
}

type AuthContextValue = {
  state: AuthState;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginDemo: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({ status: "loading" });

  React.useEffect(() => {
    const existing = AuthFlow.loadFromStorage();
    if (existing) setState({ status: "authenticated", user: existing });
    else setState({ status: "anonymous" });
  }, []);

  const loginDemo = React.useCallback((role: UserRole) => {
    const demo: AuthUser = {
      id: `demo-${role}`,
      name: role === "admin" ? "Admin User" : role === "instructor" ? "Instructor User" : "Student User",
      email: `${role}@example.com`,
      role,
    };
    AuthFlow.saveToStorage(demo);
    setState({ status: "authenticated", user: demo });
  }, []);

  const logout = React.useCallback(() => {
    AuthFlow.clearStorage();
    setState({ status: "anonymous" });
  }, []);

  const value: AuthContextValue = React.useMemo(() => {
    const user = state.status === "authenticated" ? state.user : null;
    return {
      state,
      user,
      isAuthenticated: !!user,
      loginDemo,
      logout,
    };
  }, [state, loginDemo, logout]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useAuth is the canonical hook for reading auth state and triggering auth actions.
 */
export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth() must be used within <AuthProvider />");
  }
  return ctx;
}
