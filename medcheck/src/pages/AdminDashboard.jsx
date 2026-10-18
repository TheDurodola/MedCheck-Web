import * as React from "react"
import {
  Factory,
  Cpu,
  Plus,
  ShieldCheck,
  AlertTriangle,
  Radio,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

const REGISTERED_BATCHES = [
  {
    lotNumber: "LOT-2026-AMX-910",
    product: "Amoxicillin Trihydrate 500mg",
    nafdacReg: "A4-1029",
    unitsMinted: "250,000",
    mfgDate: "10/2026",
    expDate: "10/2028",
    status: "ACTIVE_IN_CIRCULATION",
    cryptoSignature: "0x7F9A...4E2B",
  },
  {
    lotNumber: "LOT-NL-2026-881",
    product: "Artemether / Lumefantrine 20/120mg",
    nafdacReg: "B4-9921",
    unitsMinted: "100,000",
    mfgDate: "09/2026",
    expDate: "09/2028",
    status: "ACTIVE_IN_CIRCULATION",
    cryptoSignature: "0x3C1B...88AA",
  },
  {
    lotNumber: "LOT-EMZ-2026-442",
    product: "Paracetamol BP 500mg Tablets",
    nafdacReg: "04-0192",
    unitsMinted: "500,000",
    mfgDate: "08/2026",
    expDate: "08/2029",
    status: "ACTIVE_IN_CIRCULATION",
    cryptoSignature: "0x110E...99DF",
  },
]

export default function AdminDashboard() {
  const [batches, setBatches] = React.useState(REGISTERED_BATCHES)
  const [newLot, setNewLot] = React.useState("")
  const [newProduct, setNewProduct] = React.useState("")
  const [newNafdac, setNewNafdac] = React.useState("")
  const [newUnits, setNewUnits] = React.useState("")
  const [isMinting, setIsMinting] = React.useState(false)
  const [successMsg, setSuccessMsg] = React.useState("")

  const handleMintBatch = (e) => {
    e.preventDefault()
    if (!newLot || !newProduct) return

    setIsMinting(true)
    setTimeout(() => {
      setIsMinting(false)
      const minted = {
        lotNumber: newLot.toUpperCase(),
        product: newProduct,
        nafdacReg: newNafdac || "NAFDAC-PENDING",
        unitsMinted: newUnits || "50,000",
        mfgDate: "10/2026",
        expDate: "10/2029",
        status: "ACTIVE_IN_CIRCULATION",
        cryptoSignature: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
      }
      setBatches([minted, ...batches])
      setSuccessMsg(`Batch ${newLot} cryptographically registered onto MedCheck ledger. Ready for distribution.`)
      setNewLot("")
      setNewProduct("")
      setNewNafdac("")
      setNewUnits("")
    }, 400)
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
                Manufacturer Origin & Network Governance
              </span>
            </div>
            <h1 className="text-[2.25rem] font-bold tracking-[-0.03em] text-slate-900 leading-tight">
              Cryptographic Batch Serialization Hub
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Authorized Manufacturer Node • Root Key Authority: PKI-SHA256
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Batch recall broadcast protocol simulated.")}
              className="text-amber-700 border-amber-200 hover:bg-amber-50"
            >
              <AlertTriangle className="w-4 h-4 mr-1 text-amber-600" />
              <span>Broadcast Recall Emergency</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Total Units Serialized
              </span>
              <Cpu className="w-4 h-4 text-[#0208F9]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">850,000</span>
              <span className="text-xs text-emerald-600 font-semibold">+50k this week</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Active Batches
              </span>
              <Factory className="w-4 h-4 text-[#0208F9]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">{batches.length}</span>
              <span className="text-xs text-slate-500">In circulation</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Distributor Hubs
              </span>
              <Radio className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">34</span>
              <span className="text-xs text-slate-500">Nodes synchronized</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider tech-mono">
                Root Cryptographic Key
              </span>
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="tech-mono text-sm font-bold text-slate-800">ECDSA-P256 // SECURE</span>
            </div>
          </Card>
        </div>

        {/* Mint New Production Batch Form */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#0208F9]" />
              <CardTitle className="text-lg font-bold">
                Register New Pharmaceutical Production Batch
              </CardTitle>
            </div>
            <CardDescription>
              Assign cryptographically signed GS1 2D DataMatrix serial sets prior to warehouse departure
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-2">
            <form onSubmit={handleMintBatch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Input
                  label="Lot Identifier"
                  placeholder="e.g. LOT-2026-CIP-104"
                  value={newLot}
                  onChange={(e) => setNewLot(e.target.value)}
                  className="tech-mono"
                  required
                />
                <Input
                  label="Product Formulation"
                  placeholder="e.g. Ciprofloxacin 500mg"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  required
                />
                <Input
                  label="Regulatory License #"
                  placeholder="e.g. A4-8841"
                  value={newNafdac}
                  onChange={(e) => setNewNafdac(e.target.value)}
                  className="tech-mono"
                />
                <Input
                  label="Quantity to Serialize"
                  placeholder="e.g. 50,000"
                  value={newUnits}
                  onChange={(e) => setNewUnits(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  disabled={isMinting}
                >
                  <Cpu className="w-4 h-4" />
                  <span>{isMinting ? "Generating Cryptographic Hashes..." : "Mint & Register Batch"}</span>
                </Button>
              </div>
            </form>

            {successMsg && (
              <div className="mt-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-950 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Registered Batches Ledger */}
        <Card className="p-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Production Batch Ledger
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Immutable list of pharmaceutical lots authorized for commercial distribution
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="tech-mono text-xs">Lot Identifier</TableHead>
                  <TableHead className="text-xs">Product</TableHead>
                  <TableHead className="tech-mono text-xs">NAFDAC #</TableHead>
                  <TableHead className="text-xs">Serialized Units</TableHead>
                  <TableHead className="tech-mono text-xs">Crypto Signature</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="tech-mono text-xs">Expiry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((batch) => (
                  <TableRow key={batch.lotNumber}>
                    <TableCell className="tech-mono font-semibold text-[#0208F9]">
                      {batch.lotNumber}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {batch.product}
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-700">
                      {batch.nafdacReg}
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">
                      {batch.unitsMinted} units
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-500">
                      {batch.cryptoSignature}
                    </TableCell>
                    <TableCell>
                      <span className="tech-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {batch.status}
                      </span>
                    </TableCell>
                    <TableCell className="tech-mono text-xs text-slate-500">
                      {batch.expDate}
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