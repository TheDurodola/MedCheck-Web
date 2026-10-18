import * as React from "react"
import {
  SearchCheck,
  AlertOctagon,
  MapPin,
  ShieldAlert,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Award,
  Scale,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

const INVESTIGATION_CASES = [
  {
    caseId: "CASE-2026-091",
    drugName: "Counterfeit Artemether Pack (Cloned Serial)",
    suspectLot: "LOT-FAKE-9921",
    flaggedLocation: "Open Market Stall, Idumota, Lagos",
    reportedBy: "Whistleblower Tip-Off #8841",
    status: "SEIZED_QUARANTINE",
    bountyAmount: "₦750,000",
    bountyEscrow: "PENDING_LAB_VERDICT",
    date: "Today, 11:04",
  },
  {
    caseId: "CASE-2026-088",
    drugName: "Unregistered Imported Ciprofloxacin",
    suspectLot: "LOT-UNREG-401",
    flaggedLocation: "Unlicensed Chemist, Kano Central",
    reportedBy: "Whistleblower Tip-Off #9022",
    status: "FIELD_INVESTIGATION",
    bountyAmount: "₦1,000,000",
    bountyEscrow: "PENDING_LAB_VERDICT",
    date: "Yesterday",
  },
  {
    caseId: "CASE-2026-079",
    drugName: "Tampered Cold-Chain Insulin Vials",
    suspectLot: "LOT-INS-9002",
    flaggedLocation: "Transit Depot, Port Harcourt",
    reportedBy: "Wholesaler Sensor",
    status: "RECALLED",
    bountyAmount: "N/A (Automated Node)",
    bountyEscrow: "N/A",
    date: "14 Oct 2026",
  },
  {
    caseId: "CASE-2026-064",
    drugName: "Expired Paracetamol Repackaged",
    suspectLot: "LOT-EXP-112",
    flaggedLocation: "Onitsha Main Market",
    reportedBy: "Whistleblower Tip-Off #7104",
    status: "VERDICT_GUILTY",
    bountyAmount: "₦500,000",
    bountyEscrow: "RELEASED_TO_WHISTLEBLOWER",
    date: "09 Oct 2026",
  },
]

export default function InvestigatorDashboard() {
  const [cases, setCases] = React.useState(INVESTIGATION_CASES)
  const [search, setSearch] = React.useState("")

  const filteredCases = cases.filter(
    (c) =>
      c.drugName.toLowerCase().includes(search.toLowerCase()) ||
      c.suspectLot.toLowerCase().includes(search.toLowerCase()) ||
      c.caseId.toLowerCase().includes(search.toLowerCase()) ||
      c.flaggedLocation.toLowerCase().includes(search.toLowerCase())
  )

  const handleDeliverVerdict = (caseId) => {
    setCases((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              status: "VERDICT_GUILTY",
              bountyEscrow: "RELEASED_TO_WHISTLEBLOWER",
            }
          : c
      )
    )
    alert(`Case ${caseId} concluded: Laboratory confirmed counterfeit. Guilty verdict officially registered and whistleblower reward released from escrow!`)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span className="tech-mono text-xs font-semibold text-red-600 uppercase tracking-wider">
                Regulatory Enforcement Command
              </span>
            </div>
            <h1 className="text-[2.25rem] font-bold tracking-[-0.03em] text-slate-900 leading-tight">
              Counterfeit Intelligence & Field Investigations
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Agency: NAFDAC / WHO Anti-Counterfeit Taskforce • Security Clearance: LEVEL-3
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              className="bg-red-600 hover:bg-red-700 shadow-none"
              onClick={() => {
                const newCase = {
                  caseId: `CASE-2026-${Math.floor(100 + Math.random() * 900)}`,
                  drugName: "Immediate Field Seizure In Progress",
                  suspectLot: "LOT-SZ-" + Math.floor(1000 + Math.random() * 9000),
                  flaggedLocation: "Field Enforcement Taskforce",
                  reportedBy: "Whistleblower Tip-Off",
                  status: "SEIZED_QUARANTINE",
                  bountyAmount: "₦600,000",
                  bountyEscrow: "PENDING_LAB_VERDICT",
                  date: "Just now",
                }
                setCases([newCase, ...cases])
              }}
            >
              <AlertOctagon className="w-4 h-4 mr-1" />
              <span>Initiate Seizure Notice</span>
            </Button>
          </div>
        </div>

        {/* Telemetry Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Active Cases
              </span>
              <AlertOctagon className="w-4 h-4 text-red-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">12</span>
              <span className="text-xs text-red-600 font-semibold">3 high priority</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Counterfeit Intercepts
              </span>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">148</span>
              <span className="text-xs text-slate-500">Seized this month</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Whistleblower Bounties Paid
              </span>
              <Award className="w-4 h-4 text-[#0208F9]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">₦4.2M</span>
              <span className="text-xs text-emerald-600 font-semibold">Post-verdict releases</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                National Network Status
              </span>
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="tech-mono text-xl font-bold text-emerald-700">ENFORCED</span>
            </div>
          </Card>
        </div>

        {/* Case Table */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Suspect Anomaly & Counterfeit Incident Dossiers
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Whistleblower tip-offs and duplicate scan alerts. Rewards release from escrow upon formal regulatory verdict.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <Input
                placeholder="Filter by drug, lot, or area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="tech-mono text-xs">Case Ref #</TableHead>
                  <TableHead className="text-xs">Suspect Product Description</TableHead>
                  <TableHead className="tech-mono text-xs">Flagged Lot</TableHead>
                  <TableHead className="text-xs">Location / Node</TableHead>
                  <TableHead className="text-xs">Whistleblower Source</TableHead>
                  <TableHead className="text-xs">Verdict Status</TableHead>
                  <TableHead className="text-xs">Bounty Escrow</TableHead>
                  <TableHead className="text-xs text-right">Verdict Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((c) => (
                  <TableRow key={c.caseId}>
                    <TableCell className="tech-mono font-semibold text-red-600">
                      {c.caseId}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {c.drugName}
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-700">
                      {c.suspectLot}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {c.flaggedLocation}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600 font-medium">
                      {c.reportedBy}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`tech-mono text-[10px] font-semibold px-2 py-0.5 rounded ${
                          c.status.includes("VERDICT_GUILTY")
                            ? "bg-emerald-100 text-emerald-800"
                            : c.status.includes("SEIZED")
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {c.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="tech-mono text-xs font-semibold text-slate-800">
                          {c.bountyAmount}
                        </span>
                        <span
                          className={`tech-mono text-[9px] font-medium ${
                            c.bountyEscrow.includes("RELEASED")
                              ? "text-emerald-700"
                              : "text-amber-700"
                          }`}
                        >
                          {c.bountyEscrow}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {c.bountyEscrow === "PENDING_LAB_VERDICT" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeliverVerdict(c.caseId)}
                          className="h-8 text-[11px] text-[#0208F9] border-blue-200 hover:bg-blue-50"
                        >
                          <Scale className="w-3.5 h-3.5 mr-1" />
                          <span>Deliver Verdict & Pay Bounty</span>
                        </Button>
                      ) : (
                        <span className="tech-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 font-medium">
                          VERDICT_SEALED
                        </span>
                      )}
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