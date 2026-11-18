import * as React from "react"
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Package,
  Layers,
  Truck,
  Copy,
  Check,
  Printer,
  FileCheck,
  Clock,
  ArrowRight,
  ShieldAlert,
  Share2,
  RefreshCw,
  QrCode,
  FileBadge,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { verifyMedicine } from "@/services/verificationService"
import { useAuth, getDashboardPath } from "@/features/authentication"

export default function BatchDetails() {
  const { code } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { authority } = useAuth()

  const [batchData, setBatchData] = React.useState(location.state?.batchData || null)
  const [isLoading, setIsLoading] = React.useState(!location.state?.batchData)
  const [error, setError] = React.useState(null)
  const [copied, setCopied] = React.useState(false)

  // Fetch batch details if not provided via navigation state or if re-fetching
  const loadBatchDetails = React.useCallback(async (targetCode) => {
    if (!targetCode) return
    setIsLoading(true)
    setError(null)

    try {
      const result = await verifyMedicine({
        type: "batch",
        code: targetCode,
      })
      setBatchData(result)
    } catch (err) {
      console.warn("[BatchDetails] Failed to load batch:", err.message)
      setError(err.message || "Failed to retrieve batch verification record.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (!batchData && code) {
      loadBatchDetails(code)
    }
  }, [code, batchData, loadBatchDetails])

  const handleCopyCode = (textToCopy) => {
    if (!textToCopy) return
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  const returnDashboard = getDashboardPath(authority) || "/home"

  // Raw or mapped fields
  const raw = batchData?.raw || batchData || {}
  const drugDetail = raw.drugDetail || batchData?.drugDetail || {}
  const brandName = drugDetail.drugBrandName || batchData?.name || "Verified Batch"
  const genericName = drugDetail.genericName || batchData?.genericName || "Pharmaceutical Formulation"
  const manufacturer =
    drugDetail.manufacturerName || batchData?.manufacturer || "Registered Manufacturer"
  const nafdacNumber =
    drugDetail.nafdacRegistrationNumber || batchData?.nafdac || "NAFDAC Registered"
  const description =
    drugDetail.description || batchData?.description || "No specific storage indications provided."
  const verificationCode = raw.verificationCode || batchData?.verificationCode || batchData?.lot || code
  const batchId = raw.id || batchData?.id || "N/A"
  const manufactureDate = raw.manufactureDate || batchData?.manufactureDate || "N/A"
  const expiryDate = raw.expiryDate || batchData?.expiry || "N/A"
  const noOfPacks = raw.noOfPacks ?? batchData?.noOfPacks ?? null
  const noOfSachetsPerPack = raw.noOfSachetsPerPack ?? batchData?.noOfSachetsPerPack ?? null
  const totalUnits =
    typeof noOfPacks === "number" && typeof noOfSachetsPerPack === "number"
      ? noOfPacks * noOfSachetsPerPack
      : null

  const logisticsHistory = Array.isArray(raw.logisticsHistory)
    ? raw.logisticsHistory
    : Array.isArray(batchData?.logisticsHistory)
    ? batchData.logisticsHistory
    : []

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "N/A") return "N/A"
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateStr
    }
  }

  const formatTimestamp = (ts) => {
    if (!ts) return "N/A"
    try {
      const d = new Date(ts)
      if (isNaN(d.getTime())) return ts
      return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    } catch {
      return ts
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/70 text-slate-900 print:bg-white">
      <div className="print:hidden">
        <NavigationBar />
      </div>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Navigation Bar / Breadcrumb & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1)
                } else {
                  navigate(returnDashboard)
                }
              }}
              className="gap-1.5 text-xs text-slate-700 hover:text-slate-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Button>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500 font-medium">Batch Verification</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono font-semibold text-[#0208F9]">{code}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadBatchDetails(code)}
              disabled={isLoading}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-44 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 bg-white rounded-xl border border-slate-200 p-4" />
              ))}
            </div>
            <div className="h-64 bg-white rounded-xl border border-slate-200 p-6" />
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <Card className="p-8 border-red-200 bg-red-50/50 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-950">Batch Verification Failed</h2>
              <p className="text-sm text-red-800 max-w-md mx-auto mt-1">{error}</p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadBatchDetails(code)}
                className="gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Verification</span>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link to={returnDashboard}>Return to Dashboard</Link>
              </Button>
            </div>
          </Card>
        )}

        {/* Success / Loaded Batch Record */}
        {!isLoading && !error && batchData && (
          <div className="space-y-6">
            {/* Main Header / Status Banner */}
            <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/40 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold tracking-wide uppercase shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Authentic Consignment Verified
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/5 border border-slate-300 text-slate-700 text-xs font-mono font-medium">
                      <FileBadge className="w-3 h-3 text-[#0208F9]" />
                      NAFDAC: {nafdacNumber}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {brandName}
                  </h1>

                  <p className="text-sm sm:text-base font-medium text-slate-700">
                    {genericName}
                  </p>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 pt-1">
                    <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Manufacturer:</span>
                    <strong className="text-slate-900 font-semibold">{manufacturer}</strong>
                  </div>
                </div>

                {/* Right verification token box */}
                <div className="shrink-0 flex flex-col items-start md:items-end justify-between bg-white border border-slate-200 rounded-lg p-4 shadow-sm min-w-[260px]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider tech-mono">
                    Batch Verification Code
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-lg font-bold text-[#0208F9] tracking-wider select-all">
                      {verificationCode}
                    </span>
                    <button
                      onClick={() => handleCopyCode(verificationCode)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Copy code"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cryptographic Ledger Confirmed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider tech-mono">
                    Manufacture Date
                  </span>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {formatDate(manufactureDate)}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    Production run date
                  </span>
                </div>
              </Card>

              <Card className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider tech-mono">
                    Expiration Date
                  </span>
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {formatDate(expiryDate)}
                  </span>
                  <span className="block text-[11px] text-emerald-600 font-medium mt-0.5">
                    Valid & safe for distribution
                  </span>
                </div>
              </Card>

              <Card className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider tech-mono">
                    Consignment Volume
                  </span>
                  <Package className="w-4 h-4 text-[#0208F9]" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {noOfPacks !== null ? `${noOfPacks} Packs` : "N/A"}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    Total registered packs
                  </span>
                </div>
              </Card>

              <Card className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider tech-mono">
                    Unit Packaging
                  </span>
                  <Layers className="w-4 h-4 text-purple-600" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {noOfSachetsPerPack !== null ? `${noOfSachetsPerPack} Sachets/Pack` : "N/A"}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    {totalUnits ? `${totalUnits} Total Sachets` : "Per pack configuration"}
                  </span>
                </div>
              </Card>
            </div>

            {/* Product Specifications & Indication Card */}
            <Card className="p-6">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#0208F9]" />
                  <CardTitle className="text-base font-bold">
                    Therapeutic & Regulatory Dossier
                  </CardTitle>
                </div>
                <CardDescription>
                  Official indications, formulation profile, and custody ledger specifications
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 pt-4 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider tech-mono mb-1">
                    Therapeutic Description & Handling
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    {description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block tech-mono">
                      NAFDAC Number
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block font-mono">
                      {nafdacNumber}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block tech-mono">
                      Formulation Active Ingredients
                    </span>
                    <span className="text-xs font-medium text-slate-900 mt-0.5 block">
                      {genericName}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logistics & Chain-of-Custody Timeline */}
            <Card className="p-6">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#0208F9]" />
                    <CardTitle className="text-base font-bold">
                      Chain-of-Custody & Logistics History
                    </CardTitle>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {logisticsHistory.length} Recorded Transfer{logisticsHistory.length === 1 ? "" : "s"}
                  </span>
                </div>
                <CardDescription>
                  Verified cryptographic transit checkpoints and custody handoffs across distribution channels
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 pt-6">
                {logisticsHistory.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-sm">
                    No intermediate custody handoffs logged yet. The batch remains at initial dispatch node.
                  </div>
                ) : (
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                    {logisticsHistory.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4">
                        {/* Bullet / Node */}
                        <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#0208F9] text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
                          {idx + 1}
                        </div>

                        <div className="flex-1 bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0208F9] text-[11px] font-mono font-semibold">
                                {step.productType || "BATCH"} CUSTODY
                              </span>
                              <span className="text-xs text-slate-500 font-medium">
                                Checkpoint #{idx + 1}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500 tech-mono flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {formatTimestamp(step.timestamp)}
                            </span>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-11 gap-3 items-center text-xs">
                            <div className="md:col-span-5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                                Origin / Sender
                              </span>
                              <strong className="text-slate-900 font-semibold text-xs mt-0.5 block">
                                {step.sender || "Authorized Sender"}
                              </strong>
                            </div>

                            <div className="md:col-span-1 flex justify-center text-slate-400">
                              <ArrowRight className="w-4 h-4 hidden md:block text-[#0208F9]" />
                              <span className="md:hidden text-[10px] text-slate-400">transferred to</span>
                            </div>

                            <div className="md:col-span-5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                                Destination / Recipient
                              </span>
                              <strong className="text-slate-900 font-semibold text-xs mt-0.5 block">
                                {step.recipient || "Authorized Recipient"}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Regulatory Footer / Whistleblower Callout */}
            {/* <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Validated against the MedCheck National Authentication Ledger in compliance with PCN & NAFDAC protocols.
                </span>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0 text-xs">
                <Link to="/home#whistleblower">Report Irregularity</Link>
              </Button>
            </div> */}
          </div>
        )}
      </main>
    </div>
  )
}
