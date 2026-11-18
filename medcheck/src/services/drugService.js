import { handleUnauthorized } from "./apiClient"

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

/**
 * Standard pharmaceutical drugs and batches catalog matching the required JSON schema:
 * {
 *   "drugs": [
 *     {
 *       "drugId": "...",
 *       "drugBrandName": "Panadol Extra",
 *       "drugGenericName": "Paracetamol 500mg, Caffeine 30mg",
 *       "drugManufacturerName": "Emzor Pharmaceutical Industries",
 *       "drugNafdacNumber": "04-0005",
 *       "drugDescription": "...",
 *       "batches": [
 *         {
 *           "id": "...",
 *           "batchIdentifier": "AAOB1",
 *           "verificationCode": "AAOBvzrIK8xrqKWw",
 *           "manufactureDate": "2026-10-31",
 *           "expirationDate": "2029-10-30",
 *           "verificationCount": 8,
 *           "noOfPacks": 50,
 *           "created": "2026-10-31T09:50:54.602643Z"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const DEFAULT_DRUGS_DATA = {
  drugs: [
    {
      drugId: "1ab9b691-2246-4ef9-aea5-b50a04255fa8",
      drugBrandName: "Panadol Extra",
      drugGenericName: "Paracetamol 500mg, Caffeine 30mg",
      drugManufacturerName: "Emzor Pharmaceutical Industries",
      drugNafdacNumber: "04-0005",
      drugDescription:
        "Powerful relief for tough pain including headache, migraine, backache, and toothache. Contains caffeine to enhance the analgesic effect of paracetamol. Store below 30°c.",
      batches: [
        {
          id: "ab9da4f4-1c97-4c1a-ad1d-e18f8362c3dd",
          batchIdentifier: "AAOB1",
          verificationCode: "AAOBvzrIK8xrqKWw",
          manufactureDate: "2026-10-31",
          expirationDate: "2029-10-30",
          verificationCount: 8,
          noOfPacks: 50,
          created: "2026-10-31T09:50:54.602643Z",
        },
      ],
    },
    {
      drugId: "2cd8c102-3357-5fa0-be96-c61b15366fb9",
      drugBrandName: "Amoxil 500mg",
      drugGenericName: "Amoxicillin Trihydrate 500mg",
      drugManufacturerName: "Swiss Pharma Nigeria",
      drugNafdacNumber: "A4-1029",
      drugDescription:
        "Broad-spectrum bactericidal penicillin antibiotic for respiratory, ENT, and urinary tract infections.",
      batches: [
        {
          id: "bc0eb5e5-2d08-5d2b-be2e-f29e9473d4ee",
          batchIdentifier: "LOT-2026-AMX-910",
          verificationCode: "AMX910zHx891pQr",
          manufactureDate: "2026-10-15",
          expirationDate: "2028-10-14",
          verificationCount: 12,
          noOfPacks: 1000,
          created: "2026-10-15T08:30:00.000000Z",
        },
      ],
    },
    {
      drugId: "3ef9d213-4468-6ab1-cf07-d72c26477ac0",
      drugBrandName: "Coartem 20/120mg",
      drugGenericName: "Artemether 20mg, Lumefantrine 120mg",
      drugManufacturerName: "Novartis Pharma",
      drugNafdacNumber: "B4-9921",
      drugDescription:
        "Fixed-dose artemisinin-based combination therapy (ACT) for acute uncomplicated Plasmodium falciparum malaria.",
      batches: [
        {
          id: "cd1fc6f6-3e19-6e3c-cf3f-03af0584e5ff",
          batchIdentifier: "LOT-NL-2026-881",
          verificationCode: "COART881vK47mNp",
          manufactureDate: "2026-09-01",
          expirationDate: "2028-08-31",
          verificationCount: 5,
          noOfPacks: 500,
          created: "2026-09-01T10:15:00.000000Z",
        },
      ],
    },
    {
      drugId: "4fa0e324-5579-7bc2-df18-e83d37588bd1",
      drugBrandName: "Ciprobid 500mg Infusion",
      drugGenericName: "Ciprofloxacin 500mg / 100ml",
      drugManufacturerName: "Fidson Healthcare",
      drugNafdacNumber: "A4-8841",
      drugDescription:
        "Fluoroquinolone antimicrobial IV infusion for severe systemic and nosocomial bacterial infections.",
      batches: [
        {
          id: "de2ad7a7-4f2a-7f4d-d04a-14ba1695f6aa",
          batchIdentifier: "LOT-CIP-2026-004",
          verificationCode: "CIP004wL92zKmTs",
          manufactureDate: "2026-07-20",
          expirationDate: "2027-12-19",
          verificationCount: 3,
          noOfPacks: 250,
          created: "2026-07-20T14:45:00.000000Z",
        },
      ],
    },
  ],
}

function getAuthToken(explicitToken) {
  if (explicitToken && typeof explicitToken === "string") return explicitToken
  if (explicitToken && typeof explicitToken === "object") {
    return explicitToken.token || explicitToken.accessToken || explicitToken.jwt || ""
  }
  try {
    const stored = localStorage.getItem("medcheck_auth")
    if (stored) {
      const parsed = JSON.parse(stored)
      const t = parsed?.token || parsed?.accessToken || parsed?.jwt
      if (t) return t
    }
    const direct =
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("accessToken")
    if (direct) return direct

    const sess = sessionStorage.getItem("medcheck_auth")
    if (sess) {
      const parsed = JSON.parse(sess)
      const t = parsed?.token || parsed?.accessToken || parsed?.jwt
      if (t) return t
    }
    const directSess =
      sessionStorage.getItem("token") || sessionStorage.getItem("jwt")
    if (directSess) return directSess
  } catch {
    // ignore
  }
  return ""
}

/**
 * Normalizes backend responses into a standard list of drugs with batches.
 * Accepts:
 * - { "drugs": [ ... ] }
 * - [ ... ]
 * - { "data": [ ... ] }
 * - { "content": [ ... ] }
 */
export function normalizeDrugList(data) {
  if (!data) return DEFAULT_DRUGS_DATA.drugs
  if (Array.isArray(data)) return data
  if (Array.isArray(data.drugs)) return data.drugs
  if (Array.isArray(data.content)) return data.content
  if (Array.isArray(data.data)) return data.data
  return DEFAULT_DRUGS_DATA.drugs
}

/**
 * GET /api/v1/batch
 * Retrieves registered pharmaceutical drugs catalog with their associated batches.
 * Response format: { "drugs": [ { "drugId": "...", "drugBrandName": "...", batches: [...] } ] }
 */
export async function getAvailableDrugs(token) {
  const authToken = getAuthToken(token)
  if (!authToken) {
    console.warn("[drugService] No auth token found; returning default drugs catalog without querying /api/v1/batch")
    return DEFAULT_DRUGS_DATA.drugs
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`,
  }
  const url = `${BASE_URL}/api/v1/batch`
  console.log("[drugService] Fetching drugs with batches from:", url)

  try {
    const res = await fetch(url, { method: "GET", headers })
    if (res.status === 401 || res.status === 403) {
      handleUnauthorized()
      return DEFAULT_DRUGS_DATA.drugs
    }
    if (!res.ok) {
      console.warn(`[drugService] /api/v1/batch responded with status ${res.status}`)
      return DEFAULT_DRUGS_DATA.drugs
    }
    const data = await res.json()
    const list = normalizeDrugList(data)
    return list.length > 0 ? list : DEFAULT_DRUGS_DATA.drugs
  } catch (err) {
    console.warn("[drugService] /api/v1/batch query error, using local catalog:", err.message)
    return DEFAULT_DRUGS_DATA.drugs
  }
}
