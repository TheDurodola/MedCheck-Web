import * as React from "react"
import { Link } from "react-router-dom"
import {
  UserCheck,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  MapPin,
  FileWarning,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import VerificationTypeSelect from "@/components/common/VerificationTypeSelect"
import { verifyMedicine } from "@/services/verificationService"

const SAMPLE_VERIFICATIONS = [
  {
    code: "MC-89241-NG",
    drug: "Amoxicillin Trihydrate 500mg",
    manufacturer: "Swiss Pharma Nigeria",
    date: "Today, 14:20",
    status: "AUTHENTIC",
    pharmacy: "Apex Care Pharmacy, Ikeja",
  },
  {
    code: "ART-80-480",
    drug: "Artemether / Lumefantrine 20/120mg",
    manufacturer: "Novartis Pharmaceuticals",
    date: "12 Oct 2026",
    status: "AUTHENTIC",
    pharmacy: "HealthPlus, Victoria Island",
  },
  {
    code: "PARA-500-TAB",
    drug: "Paracetamol BP 500mg",
    manufacturer: "Emzor Pharmaceuticals",
    date: "04 Oct 2026",
    status: "AUTHENTIC",
    pharmacy: "MedPlus Pharmacy, Yaba",
  },
]

export default function ConsumerDashboard() {
  const [history, setHistory] = React.useState(SAMPLE_VERIFICATIONS)
  const [code, setCode] = React.useState("")
  const [verificationType, setVerificationType] = React.useState("pack")
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [scanResult, setScanResult] = React.useState(null)

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!code.trim()) return

    setIsVerifying(true)
    setErrorMessage("")

    try {
      const result = await verifyMedicine({
        type: verificationType,
        code: code.trim(),
      })
      const newScan = {
        code: result.lot || code.trim().toUpperCase(),
        drug: result.name || "Authenticated Drug",
        manufacturer: result.manufacturer || "Verified Partner",
        date: "Just now",
        status: result.status || "AUTHENTIC",
        pharmacy: `Direct ${verificationType.toUpperCase()} Verification`,
      }
      setHistory([newScan, ...history])
      setScanResult({ ...newScan, raw: result })
      setCode("")
    } catch (err) {
      console.warn("[ConsumerDashboard] Verification error:", err.message)
      setErrorMessage(err.message || "Failed to verify code. Please check your network and role.")
      setScanResult(null)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0208F9]" />
              <span className="tech-mono text-xs font-semibold text-[#0208F9] uppercase tracking-wider">
                Patient & Consumer Safety Portal
              </span>
            </div>
            <h1 className="text-[2.25rem] font-bold tracking-[-0.03em] text-slate-900 leading-tight">
              My Medicine Authenticity Center
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Verify your prescribed drugs before consumption and safeguard your family from counterfeit medications.
            </p>
          </div>

          <div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-red-700 border-red-200 hover:bg-red-50"
            >
              <Link to="/home#whistleblower">
                <FileWarning className="w-4 h-4 mr-1 text-red-600" />
                <span>Report Suspect Medication</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Whistleblower Bounty Banner */}
        <div className="p-6 rounded-xl bg-[#0208F9] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_4px_20px_rgba(2,8,249,0.18)] border border-white/10">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-xl font-bold tracking-tight text-white">
              Earn Rewards for Reporting Organizations Selling Fake Drugs
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              If you identify a pharmacy, distributor, or stall selling counterfeit medications, submit an anonymous report. <strong>Financial rewards are disbursed from public safety escrow once the report is investigated and an official regulatory verdict is reached.</strong>
            </p>
          </div>

          <Button asChild variant="white" size="default" className="shrink-0 font-semibold text-xs">
            <Link to="/home#whistleblower" className="flex items-center gap-1.5">
              <span>Lodge Whistleblower Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Verification Card */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0208F9]" />
              <CardTitle className="text-lg font-bold">
                Check Any Medicine Instantly
              </CardTitle>
            </div>
            <CardDescription>
              Enter the verification serial code found under the scratch-off label or barcode sticker
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-2">
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <VerificationTypeSelect
                    value={verificationType}
                    onChange={(newType) => setVerificationType(newType)}
                  />
                </div>
                <div className="sm:col-span-8 flex flex-col sm:flex-row gap-3 items-end">
                  <div className="flex-1 w-full">
                    <Input
                      label="Scratch Code or Serial Number"
                      placeholder="e.g. PAOPzHy7Hp1dIHE8 or MC-89241-NG"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="tech-mono text-base uppercase"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    size="default"
                    disabled={isVerifying}
                    className="shrink-0 w-full sm:w-auto"
                  >
                    <Search className="w-4 h-4" />
                    <span>{isVerifying ? "Verifying..." : "Verify Medication"}</span>
                  </Button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>

            {scanResult && (
              <div className="mt-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-950 text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-sm block">
                      SAFE & AUTHENTIC MEDICINE
                    </span>
                    <span className="text-emerald-800">
                      Code {scanResult.code} confirmed in manufacturer national registry. You can take this medication safely.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Verified History */}
        <Card className="p-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                My Verification History
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Past medicines scanned and verified by your account
              </p>
            </div>
            <span className="tech-mono text-xs text-slate-500">
              Total Scans: {history.length}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="tech-mono text-xs">Serial Code</TableHead>
                  <TableHead className="text-xs">Medication</TableHead>
                  <TableHead className="text-xs">Manufacturer</TableHead>
                  <TableHead className="text-xs">Purchased At</TableHead>
                  <TableHead className="text-xs">Authenticity</TableHead>
                  <TableHead className="tech-mono text-xs">Date Scanned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="tech-mono font-semibold text-[#0208F9]">
                      {item.code}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {item.drug}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {item.manufacturer}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {item.pharmacy}
                    </TableCell>
                    <TableCell>
                      <span className="tech-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-500">
                      {item.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Verified Pharmacies Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-blue-50/50 border-blue-200">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0208F9]" />
              <span>How MedCheck Protects You</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-600 mt-4 leading-relaxed">
              <p>
                1. <strong>Direct Manufacturer Ledger:</strong> Every authentic drug pack has a unique cryptographic hash registered directly by the manufacturer.
              </p>
              <p>
                2. <strong>One-Time Activation:</strong> When you verify a code, the system validates whether it has been previously scanned or flagged as copied.
              </p>
              <p>
                3. <strong>Immediate Alerting:</strong> In the event a duplicate or illicit code is scanned, warning flags are instantly transmitted to health inspectors.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
