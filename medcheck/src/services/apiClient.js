/**
 * API Client utilities & Unauthorized (401/403) Interceptor
 *
 * Ensures that whenever the backend responds with a 401 or 403 status code:
 * 1. The stored JWT token and session are erased from storage.
 * 2. An event is dispatched to update any active AuthContext state.
 * 3. The user is redirected to the log in page (/signin).
 */

export function handleUnauthorized() {
  if (typeof window === "undefined") return

  const currentPath = window.location.pathname

  // Do not redirect if already on the login page
  if (currentPath === "/signin") return

  console.warn(
    `[Auth] 401/403 status detected on ${currentPath}. Erasing token and redirecting to /signin...`
  )

  try {
    localStorage.removeItem("medcheck_auth")
    localStorage.removeItem("token")
    localStorage.removeItem("jwt")
    localStorage.removeItem("accessToken")
    sessionStorage.removeItem("medcheck_auth")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("jwt")
  } catch (err) {
    console.warn("[Auth] Error clearing storage keys on 401/403:", err)
  }

  // Notify AuthContext to reset state
  window.dispatchEvent(
    new CustomEvent("medcheck:unauthorized", {
      detail: { from: currentPath },
    })
  )

  // Navigate to login page
  try {
    if (window.__medcheck_router && typeof window.__medcheck_router.navigate === "function") {
      window.__medcheck_router.navigate("/signin", {
        state: { from: { pathname: currentPath } },
        replace: true,
      })
      return
    }
  } catch (err) {
    console.warn("[Auth] Router navigation failed, falling back to window.location:", err)
  }

  window.location.assign("/signin")
}

/**
 * Initializes a global fetch interceptor that catches any 401 or 403
 * responses across the entire application and redirects the user to the log in page.
 */
export function setupFetchInterceptor() {
  if (typeof window === "undefined" || window.__fetchInterceptorInitialized) return
  window.__fetchInterceptorInitialized = true

  const originalFetch = window.fetch
  window.fetch = async (...args) => {
    const response = await originalFetch(...args)

    if (response.status === 401 || response.status === 403) {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url || ""
      // Avoid redirecting when submitting credentials on the login endpoint itself
      if (!url.includes("/api/v1/auth/signin")) {
        console.warn(
          `[HTTP Interceptor] Server returned ${response.status} from ${url}. Redirecting to log in page...`
        )
        handleUnauthorized()
      }
    }

    return response
  }

  console.log("[HTTP Interceptor] 401/403 authentication interceptor active.")
}
