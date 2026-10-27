import * as React from "react"
import {
  Store,
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Clock,
  User,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import VerificationTypeSelect from "@/components/common/VerificationTypeSelect"
import { verifyMedicine } from "@/services/verificationService"

const RECENT_DISPENSES = [
  {
    rxId: "DISP-2026-118",
    patientName: "Adeyemi O.",
    drugName: "Artemether / Lumefantrine 20/120mg",
    lotNumber: "LOT-NL-2026-881",
    status: "AUTHENTIC_DISPENSED",
    pharmacist: "Pharm. Durodola B.",
    time: "10 mins ago",
  },
  {
    rxId: "DISP-2026-117",
    patientName: "Chioma E.",
    drugName: "Amoxicillin Trihydrate 500mg",
    lotNumber: "LOT-2026-AMX-910",
    status: "AUTHENTIC_DISPENSED",
    pharmacist: "Pharm. Durodola B.",
    time: "35 mins ago",
  },
  {
    rxId: "DISP-2026-116",
    patientName: "Ibrahim K.",
    drugName: "Metformin Hydrochloride 500mg",
    lotNumber: "LOT-MET-2026-033",
    status: "AUTHENTIC_DISPENSED",
    pharmacist: "Pharm. Nwosu A.",
    time: "2 hours ago",
  },
  {
    rxId: "DISP-2026-115",
    patientName: "Customer Scan",
    drugName: "Suspicious Antimalarial Pack",
    lotNumber: "LOT-FAKE-9921",
    status: "FLAGGED_COUNTERFEIT",
    pharmacist: "System Quarantine",
    time: "5 hours ago",
  },
]

export default function RetailerDashboard() {
  const [dispenses, setDispenses] = React.useState(RECENT_DISPENSES)
  const [packSerial, setPackSerial] = React.useState("")
  const [patientName, setPatientName] = React.useState("")
  const [verificationType, setVerificationType] = React.useState("pack")
  const [verificationFeedback, setVerificationFeedback] = React.useState(null)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const handleDispenseScan = async (e) => {
    e.preventDefault()
    if (!packSerial.trim()) return

    setIsProcessing(true)
    setVerificationFeedback(null)

    try {
      const result = await verifyMedicine({
        type: verificationType,
        code: packSerial.trim(),
      })

      const newRecord = {
        rxId: `DISP-2026-${Math.floor(100 + Math.random() * 900)}`,
        patientName: patientName || "Walk-in Patient",
        drugName: result.name || "Verified Pharmaceutical Product",
        lotNumber: result.lot || packSerial.toUpperCase(),
        status: "AUTHENTIC_DISPENSED",
        pharmacist: "Pharm. Current Terminal",
        time: "Just now",
      }
      setDispenses([newRecord, ...dispenses])
      setVerificationFeedback({
        success: true,
        title: `AUTHENTICITY CONFIRMED [${verificationType.toUpperCase()}]`,
        message: `${result.name || "Medication"} (${packSerial}) validated against ledger (${result.manufacturer}). Safe for patient dispense.`,
      })
      setPackSerial("")
      setPatientName("")
    } catch (err) {
      console.warn("[RetailerDashboard] Verification error:", err.message)
      setVerificationFeedback({
        success: false,
        title: "VERIFICATION FAILED: Dispense Blocked",
        message: err.message || `Code ${packSerial} could not be validated. Handoff locked.`,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="tech-mono text-xs font-semibold text-[#0208F9] uppercase tracking-wider">
                Retail Pharmacy Terminal
              </span>
            </div>
            <h1 className="text-[2.25rem] font-bold tracking-[-0.03em] text-slate-900 leading-tight">
              Point-of-Dispense Safety Console
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Pharmacy: Apex Care Pharmacy • Premise License: PCN-2026-LA-8812
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                alert("Escalating immediate field alert to National Agency for Food and Drug Administration.")
              }}
              className="text-red-700 border-red-200 hover:bg-red-50"
            >
              <ShieldAlert className="w-4 h-4 mr-1 text-red-600" />
              <span>Report Counterfeit Batch</span>
            </Button>
          </div>
        </div>

        {/* Telemetry Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Dispensed Today
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">64</span>
              <span className="text-xs text-slate-500">Packs authenticated</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Counterfeits Intercepted
              </span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-red-600">1</span>
              <span className="text-xs text-red-600 font-medium">Prevented harm</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Verified Inventory
              </span>
              <Store className="w-4 h-4 text-[#0208F9]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">1,420</span>
              <span className="text-xs text-slate-500">On dispensary shelves</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Pharmacy Credential
              </span>
              <ShieldCheck className="w-4 h-4 text-[#0208F9]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="tech-mono text-lg font-bold text-emerald-700">VERIFIED TIER 1</span>
            </div>
          </Card>
        </div>

        {/* Rapid Point-of-Dispense Scanner Card */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-[#0208F9]" />
              <CardTitle className="text-lg font-bold">
                Counter Barcode & QR Dispense Scanner
              </CardTitle>
            </div>
            <CardDescription>
              Scan medication blister foil or carton identifier prior to dispensing to ensure patient safety
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-2">
            <form onSubmit={handleDispenseScan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <VerificationTypeSelect
                    value={verificationType}
                    onChange={(newType) => setVerificationType(newType)}
                  />
                </div>
                <Input
                  label="Scan Serial / Barcode ID"
                  placeholder="e.g. PAOPzHy7Hp1dIHE8 or LOT-NL-2026-881"
                  value={packSerial}
                  onChange={(e) => setPackSerial(e.target.value)}
                  className="tech-mono"
                  required
                />
                <Input
                  label="Patient Name or Rx Reference (Optional)"
                  placeholder="e.g. Patient Fatima B."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  disabled={isProcessing}
                >
                  <ScanLine className="w-4 h-4" />
                  <span>{isProcessing ? "Verifying with Node..." : "Authenticate & Dispense"}</span>
                </Button>
              </div>
            </form>

            {verificationFeedback && (
              <div
                className={`mt-4 p-4 rounded-xl border text-xs ${
                  verificationFeedback.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-red-50 border-red-200 text-red-950"
                }`}
              >
                <div className="flex items-start gap-3">
                  {verificationFeedback.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm">{verificationFeedback.title}</h4>
                    <p className="mt-1 leading-relaxed text-current/80">
                      {verificationFeedback.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Dispense Log */}
        <Card className="p-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Patient Dispense & Verification History
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Auditable log of all authenticated medications dispensed from this premise
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="tech-mono text-xs">Dispense ID</TableHead>
                  <TableHead className="text-xs">Patient / Rx</TableHead>
                  <TableHead className="text-xs">Medication</TableHead>
                  <TableHead className="tech-mono text-xs">Lot Number</TableHead>
                  <TableHead className="text-xs">Authenticity</TableHead>
                  <TableHead className="text-xs">Dispensing Pharmacist</TableHead>
                  <TableHead className="tech-mono text-xs">Logged</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dispenses.map((dispense) => (
                  <TableRow key={dispense.rxId}>
                    <TableCell className="tech-mono font-semibold text-[#0208F9]">
                      {dispense.rxId}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {dispense.patientName}
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">
                      {dispense.drugName}
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-600">
                      {dispense.lotNumber}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`tech-mono text-[10px] font-semibold px-2 py-0.5 rounded ${
                          dispense.status.includes("AUTHENTIC")
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {dispense.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {dispense.pharmacist}
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-500">
                      {dispense.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  )
}