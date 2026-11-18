import * as React from "react"
import { normalizeAuthority } from "../constants/authorityRedirects"

const AuthContext = React.createContext(null)

const STORAGE_KEY = "medcheck_auth"

/**
 * Provides authentication state to the entire app.
 *
 * Stored shape in localStorage:
 * {
 *   token: string        — JWT returned by the sign-in endpoint
 *   authority: string    — e.g. "MANUFACTURING_EMPLOYEE", "CONSUMER"
 * }
 */
export function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  /**
   * Accepts the API response object. Supports { token, authority } as well as
   * variants like { accessToken, role, authorities }.
   */
  const login = React.useCallback((payload) => {
    const token = payload?.token || payload?.accessToken || payload?.jwt || ""
    const rawAuth = payload?.authority || payload?.role || payload?.authorities
    const authority = normalizeAuthority(rawAuth) || rawAuth || ""

    const session = { ...payload, token, authority }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setAuth(session)
    console.log("[AuthContext] User logged in:", { authority, tokenPresent: !!token })
    return session
  }, [])

  /** Clears session and JWT token from storage */
  const logout = React.useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem("token")
      localStorage.removeItem("jwt")
      localStorage.removeItem("accessToken")
      sessionStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("jwt")
    } catch (e) {
      console.warn("[AuthContext] Error removing storage keys:", e)
    }
    setAuth(null)
    console.log("[AuthContext] User logged out, JWT token erased")
  }, [])

  // Listen to 401/403 unauthorized events to reset state immediately
  React.useEffect(() => {
    const onUnauthorized = () => {
      logout()
    }
    window.addEventListener("medcheck:unauthorized", onUnauthorized)
    return () => window.removeEventListener("medcheck:unauthorized", onUnauthorized)
  }, [logout])

  const value = React.useMemo(
    () => ({
      auth,
      token: auth?.token ?? null,
      authority: auth?.authority ?? null,
      isAuthenticated: !!auth?.token,
      login,
      logout,
    }),
    [auth, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Hook to consume auth context anywhere in the app */
export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
