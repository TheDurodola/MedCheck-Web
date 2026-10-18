import * as React from "react"
import { ShieldCheck, Search, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const DEMO_MEDICATIONS = {
  "MC-89241-NG": {
    name: "Amoxicillin Trihydrate 500mg",
    manufacturer: "Swiss Pharma Nigeria Ltd",
    lot: "LOT-2026-AMX-910",
    nafdac: "A4-1029",
    expiry: "12/2028",
    status: "AUTHENTIC",
    origin: "Lagos, Nigeria",
    scans: 1,
  },
  "ART-80-480": {
    name: "Artemether / Lumefantrine 20/120mg",
    manufacturer: "Novartis Pharmaceuticals",
    lot: "LOT-NL-2026-881",
    nafdac: "B4-9921",
    expiry: "09/2027",
    status: "AUTHENTIC",
    origin: "Basel, Switzerland",
    scans: 2,
  },
  "PARA-500-TAB": {
    name: "Paracetamol BP 500mg",
    manufacturer: "Emzor Pharmaceutical Ind.",
    lot: "LOT-EMZ-2026-442",
    nafdac: "04-0192",
    expiry: "04/2029",
    status: "AUTHENTIC",
    origin: "Ogun, Nigeria",
    scans: 1,
  },
}

export default function VerificationWidget() {
  const [searchCode, setSearchCode] = React.useState("MC-89241-NG")
  const [verificationResult, setVerificationResult] = React.useState(DEMO_MEDICATIONS["MC-89241-NG"])
  const [isVerifying, setIsVerifying] = React.useState(false)

  const handleVerify = (e) => {
    e.preventDefault()
    if (!searchCode.trim()) return

    setIsVerifying(true)
    setTimeout(() => {
      const trimmed = searchCode.trim().toUpperCase()
      if (DEMO_MEDICATIONS[trimmed]) {
        setVerificationResult(DEMO_MEDICATIONS[trimmed])
      } else {
        setVerificationResult({
          name: "Unregistered Medication Batch",
          manufacturer: "Unknown Manufacturer",
          lot: trimmed,
          nafdac: "NOT_FOUND",
          expiry: "N/A",
          status: "SUSPECT_UNREGISTERED",
          origin: "Unverified Node",
          scans: 0,
        })
      }
      setIsVerifying(false)
    }, 280)
  }

  return (
    <section
      id="verify"
      className="w-full py-[clamp(4rem,8vw,8rem)] border-b border-slate-100 bg-slate-50/50"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 border border-blue-100 text-[#0208F9] text-xs font-semibold uppercase tracking-wider tech-mono mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Instant Verification Engine</span>
          </div>
          <h2 className="text-[2.25rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
            Verify Your Medication Authenticity
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-[72ch] mx-auto">
            Enter the batch or serial identifier found on the medication pack or blister foil to authenticate authenticity directly against the manufacturer ledger.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-6 md:p-8">
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 w-full">
                  <Input
                    label="Medication Batch or Serial Code"
                    placeholder="e.g. MC-89241-NG or ART-80-480"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    helperText="Locate this 8-12 character code on the tamper sticker or box barcode."
                    className="tech-mono text-base font-medium uppercase tracking-wider"
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isVerifying}
                  className="w-full sm:w-auto shrink-0 mb-5 sm:mb-0"
                >
                  <Search className="w-4 h-4" />
                  <span>{isVerifying ? "Verifying..." : "Authenticate"}</span>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                <span className="font-medium text-slate-700">Sample Codes:</span>
                {Object.keys(DEMO_MEDICATIONS).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setSearchCode(code)
                      setVerificationResult(DEMO_MEDICATIONS[code])
                    }}
                    className="tech-mono px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#0208F9] border border-slate-200 transition-colors duration-200 ease-out cursor-pointer"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </form>

            {verificationResult && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div
                  className={`p-5 rounded-xl border transition-all duration-300 ${
                    verificationResult.status === "AUTHENTIC"
                      ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                      : "bg-amber-50/70 border-amber-200 text-amber-950"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-current/10">
                    <div className="flex items-center gap-3">
                      {verificationResult.status === "AUTHENTIC" ? (
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold tracking-tight">
                            {verificationResult.name}
                          </h3>
                          <span
                            className={`tech-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                              verificationResult.status === "AUTHENTIC"
                                ? "bg-emerald-200 text-emerald-900"
                                : "bg-amber-200 text-amber-900"
                            }`}
                          >
                            {verificationResult.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Manufacturer: {verificationResult.manufacturer}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span className="tech-mono text-[10px] text-slate-500 uppercase block">
                        Tamper Verification
                      </span>
                      <span className="tech-mono text-xs font-semibold text-emerald-800">
                        SEAL_INTEGRITY_CONFIRMED
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Batch Lot #</span>
                      <span className="tech-mono font-semibold text-slate-900">
                        {verificationResult.lot}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Regulatory Reg #</span>
                      <span className="tech-mono font-semibold text-slate-900">
                        {verificationResult.nafdac}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Expiry Date</span>
                      <span className="tech-mono font-semibold text-slate-900">
                        {verificationResult.expiry}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Point of Origin</span>
                      <span className="font-semibold text-slate-900">
                        {verificationResult.origin}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
