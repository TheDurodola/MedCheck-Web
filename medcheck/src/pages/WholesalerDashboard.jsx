import * as React from "react"
import {
  Building2,
  PackageCheck,
  Truck,
  ScanBarcode,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Plus,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

const INITIAL_SHIPMENTS = [
  {
    id: "SHP-2026-901",
    product: "Amoxicillin Trihydrate 500mg (1,000 Boxes)",
    lot: "LOT-2026-AMX-910",
    manufacturer: "Swiss Pharma Nigeria",
    destination: "Lagos Central Depot -> Mainland Pharmacies",
    status: "VERIFIED_IN_TRANSIT",
    time: "2026-10-18 19:42",
  },
  {
    id: "SHP-2026-884",
    product: "Artemether/Lumefantrine 20/120mg (500 Cartons)",
    lot: "LOT-NL-2026-881",
    manufacturer: "Novartis Pharma",
    destination: "Ikeja Distribution Hub",
    status: "RECEIVED_AUTHENTIC",
    time: "2026-10-18 14:15",
  },
  {
    id: "SHP-2026-729",
    product: "Ciprofloxacin 500mg IV Infusion (250 Packs)",
    lot: "LOT-CIP-2026-004",
    manufacturer: "Fidson Healthcare",
    destination: "Victoria Island Dispensary Network",
    status: "DISPATCHED",
    time: "2026-10-18 10:02",
  },
  {
    id: "SHP-2026-611",
    product: "Paracetamol BP 500mg (2,000 Containers)",
    lot: "LOT-EMZ-2026-442",
    manufacturer: "Emzor Pharmaceuticals",
    destination: "Abuja Regional Warehouse",
    status: "RECEIVED_AUTHENTIC",
    time: "2026-10-17 18:30",
  },
]

export default function WholesalerDashboard() {
  const [shipments, setShipments] = React.useState(INITIAL_SHIPMENTS)
  const [scanCode, setScanCode] = React.useState("")
  const [scanResult, setScanResult] = React.useState(null)
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleScanPallet = (e) => {
    e.preventDefault()
    if (!scanCode.trim()) return

    const match = shipments.find(
      (s) =>
        s.lot.toLowerCase().includes(scanCode.trim().toLowerCase()) ||
        s.id.toLowerCase().includes(scanCode.trim().toLowerCase())
    )

    if (match) {
      setScanResult({
        success: true,
        message: `Consignment ${match.id} verified. Cryptographic origin confirmed from ${match.manufacturer}.`,
        details: match,
      })
    } else {
      setScanResult({
        success: false,
        message: `Unrecognized or unregistered batch identifier: "${scanCode}". Flagged for quarantine inspection.`,
        details: null,
      })
    }
  }

  const filteredShipments = shipments.filter(
    (s) =>
      s.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="tech-mono text-xs font-semibold text-[#0208F9] uppercase tracking-wider">
                Wholesale Logistics Console
              </span>
            </div>
            <h1 className="text-[2.25rem] font-bold tracking-[-0.03em] text-slate-900 leading-tight">
              Chain-of-Custody & Warehouse Audits
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Terminal: Lagos Central Depot Hub #04 • Licensed Distributor Node
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShipments([...INITIAL_SHIPMENTS])
                setScanResult(null)
              }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Ledger</span>
            </Button>
            <Button variant="default" size="sm">
              <Plus className="w-3.5 h-3.5" />
              <span>Log Custody Transfer</span>
            </Button>
          </div>
        </div>

        {/* Telemetry Stat Cards per Design.md: 12px rounded, subtle shadow, 1px border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Active Shipments
              </span>
              <Truck className="w-4 h-4 text-[#0208F9]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">18</span>
              <span className="text-xs text-emerald-600 font-semibold">+3 inbound</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Verified Pallets
              </span>
              <PackageCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">4,280</span>
              <span className="text-xs text-slate-500">100% genuine</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Quarantined Units
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">0</span>
              <span className="text-xs text-slate-500">Clean corridor</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Audit Status
              </span>
              <ShieldCheck className="w-4 h-4 text-[#0208F9]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="tech-mono text-xl font-bold text-emerald-700">PASS</span>
              <span className="tech-mono text-xs text-slate-400">NAFDAC-ALIGNED</span>
            </div>
          </Card>
        </div>

        {/* Pallet Barcode & Consignment Scanner */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <ScanBarcode className="w-5 h-5 text-[#0208F9]" />
              <CardTitle className="text-lg font-bold">
                Depot Inbound / Outbound Consignment Scanner
              </CardTitle>
            </div>
            <CardDescription>
              Scan incoming shipment barcodes or enter batch numbers to verify tamper seals and transfer custody
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-2">
            <form onSubmit={handleScanPallet} className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <Input
                  label="Scan Lot or Pallet Barcode"
                  placeholder="e.g. LOT-2026-AMX-910 or SHP-2026-901"
                  value={scanCode}
                  onChange={(e) => setScanCode(e.target.value)}
                  className="tech-mono text-sm"
                />
              </div>
              <Button type="submit" variant="default" size="default" className="shrink-0 mb-4 sm:mb-0">
                <ScanBarcode className="w-4 h-4" />
                <span>Verify Consignment</span>
              </Button>
            </form>

            {scanResult && (
              <div
                className={`mt-4 p-4 rounded-xl border text-xs ${
                  scanResult.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {scanResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{scanResult.message}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Consignment Ledger Table */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Consignment Audit Ledger
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time cryptographic chain-of-custody tracking across wholesale checkpoints
              </p>
            </div>

            <div className="w-full sm:w-64">
              <Input
                placeholder="Search shipments or lots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="tech-mono text-xs">Shipment ID</TableHead>
                  <TableHead className="text-xs">Medication Description</TableHead>
                  <TableHead className="tech-mono text-xs">Lot Number</TableHead>
                  <TableHead className="text-xs">Origin Manufacturer</TableHead>
                  <TableHead className="text-xs">Route / Destination</TableHead>
                  <TableHead className="text-xs">Custody Status</TableHead>
                  <TableHead className="tech-mono text-xs">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="tech-mono font-semibold text-[#0208F9]">
                      {shipment.id}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {shipment.product}
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-700">
                      {shipment.lot}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {shipment.manufacturer}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {shipment.destination}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`tech-mono text-[10px] font-semibold px-2 py-0.5 rounded ${
                          shipment.status.includes("AUTHENTIC")
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {shipment.status}
                      </span>
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-500">
                      {shipment.time}
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