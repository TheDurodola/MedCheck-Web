import * as React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/features/authentication/context/AuthContext"

/**
 * Wraps any route that requires authentication.
 * Unauthenticated users are redirected to /signin, and the
 * original destination is preserved via location state so they
 * can be sent there automatically after a successful login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Also check localStorage synchronously to avoid race conditions
  // during state transitions immediately after login() is called
  const hasLocalToken = React.useMemo(() => {
    try {
      const stored = localStorage.getItem("medcheck_auth")
      if (!stored) return false
      const parsed = JSON.parse(stored)
      return !!(parsed?.token || parsed?.accessToken || parsed?.jwt)
    } catch {
      return false
    }
  }, [])

  const isAuthed = isAuthenticated || hasLocalToken

  if (!isAuthed) {
    console.warn("[ProtectedRoute] Unauthenticated access to:", location.pathname, "→ Redirecting to /signin")
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
