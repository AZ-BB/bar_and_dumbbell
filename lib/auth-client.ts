const AUTH_KEY = "admin_auth";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function setAuthenticated(): void {
  if (typeof window !== "undefined") localStorage.setItem(AUTH_KEY, "1");
}

export function clearAuth(): void {
  if (typeof window !== "undefined") localStorage.removeItem(AUTH_KEY);
}
