/**
 * Maps the `authority` value returned by the sign-in endpoint
 * to its corresponding dashboard route.
 *
 * Keep this in sync with the role values defined on the backend.
 */
export const AUTHORITY_REDIRECTS = {
  CONSUMER:               "/dashboard/consumer",
  RETAIL_EMPLOYEE:        "/dashboard/retailer",
  WHOLESALE_EMPLOYEE:     "/dashboard/wholesaler",
  MANUFACTURING_EMPLOYEE: "/dashboard/admin",
  REGULATORY_OFFICER:     "/dashboard/investigator",
}

/**
 * Normalizes different role/authority formats (e.g. "ROLE_MANUFACTURING_EMPLOYEE",
 * lowercase, array of roles, or object) into a standardized authority string.
 */
export function normalizeAuthority(authority) {
  if (!authority) return null

  // Handle array: ["ROLE_MANUFACTURING_EMPLOYEE"] or [{ authority: "..." }]
  if (Array.isArray(authority)) {
    if (authority.length === 0) return null
    const first = authority[0]
    return normalizeAuthority(typeof first === "object" ? first?.authority || first?.role : first)
  }

  // Handle object: { authority: "..." } or { role: "..." }
  if (typeof authority === "object") {
    return normalizeAuthority(authority?.authority || authority?.role)
  }

  // Handle string: strip "ROLE_" prefix and uppercase
  if (typeof authority === "string") {
    return authority.trim().replace(/^ROLE_/i, "").toUpperCase()
  }

  return null
}

/**
 * Resolves the dashboard path for a given authority string.
 * Falls back to "/home" if the authority is unknown.
 */
export function getDashboardPath(rawAuthority) {
  const normalized = normalizeAuthority(rawAuthority)
  if (normalized && AUTHORITY_REDIRECTS[normalized]) {
    return AUTHORITY_REDIRECTS[normalized]
  }
  return "/home"
}
