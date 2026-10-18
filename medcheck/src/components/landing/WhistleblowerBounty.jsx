import * as React from "react"
import {
  Award,
  Scale,
  Send,
  Search,
  CheckCircle2,
  Clock,
  Lock,
  FileSearch,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import VerificationJourney from "./VerificationJourney"

const SAMPLE_BOUNTY_CLAIMS = {
  "CLAIM-TK-8841-LAGOS": {
    ticketId: "CLAIM-TK-8841-LAGOS",
    reportedOrg: "Victoria Pharmacy & Chemist Ltd",
    location: "Mainland, Lagos",
    suspectDrug: "Counterfeit Artemether/Lumefantrine 20/120mg",
    stage: 4,
    investigationStatus: "VERDICT_GUILTY",
    verdictDate: "16 Oct 2026",
    verdictSummary:
      "Laboratory spectrometry assay confirmed 0% active pharmaceutical ingredient (API). Regulatory enforcement raid conducted; 4,200 illicit packs seized and premise sealed.",
    rewardStatus: "REWARD_RELEASED",
    rewardAmount: "₦750,000",
    claimStatus: "ESCROW_DISBURSED_TO_CLAIMANT",
  },
  "CLAIM-TK-9022-KANO": {
    ticketId: "CLAIM-TK-9022-KANO",
    reportedOrg: "Al-Barakah Wholesale Depot",
    location: "Sabon Gari, Kano",
    suspectDrug: "Cloned Ciprofloxacin 500mg Infusion Bottles",
    stage: 2,
    investigationStatus: "FORENSIC_LAB_ASSAY_IN_PROGRESS",
    verdictDate: "Investigation Pending",
    verdictSummary:
      "Undercover enforcement purchase completed. Seized samples undergoing high-performance liquid chromatography (HPLC) testing at the Central Drug Safety Laboratory.",
    rewardStatus: "ESCROW_LOCKED_PENDING_VERDICT",
    rewardAmount: "₦1,000,000",
    claimStatus: "REWARD_LOCKED_UNTIL_VERDICT",
  },
}

export default function WhistleblowerBounty() {
  const [bountyTab, setBountyTab] = React.useState("report") // "report" | "track"
  const [reportForm, setReportForm] = React.useState({
    orgName: "",
    location: "",
    drugName: "",
    batchNumber: "",
    observations: "",
    agreedTerms: false,
  })
  const [submittedTicket, setSubmittedTicket] = React.useState(null)
  const [isSubmittingReport, setIsSubmittingReport] = React.useState(false)
  const [trackTicketInput, setTrackTicketInput] = React.useState("CLAIM-TK-8841-LAGOS")
  const [trackedClaim, setTrackedClaim] = React.useState(SAMPLE_BOUNTY_CLAIMS["CLAIM-TK-8841-LAGOS"])

  const handleReportSubmit = (e) => {
    e.preventDefault()
    if (!reportForm.orgName || !reportForm.drugName) return

    setIsSubmittingReport(true)
    setTimeout(() => {
      setIsSubmittingReport(false)
      const generatedTicket = `CLAIM-TK-${Math.floor(1000 + Math.random() * 9000)}-${
        reportForm.location.substring(0, 4).toUpperCase() || "NIG"
      }`
      setSubmittedTicket({
        ticketId: generatedTicket,
        orgName: reportForm.orgName,
        drugName: reportForm.drugName,
        estimatedBounty: "₦500,000 – ₦2,000,000",
      })
      setReportForm({
        orgName: "",
        location: "",
        drugName: "",
        batchNumber: "",
        observations: "",
        agreedTerms: false,
      })
    }, 450)
  }

  const handleTrackClaim = (e) => {
    e.preventDefault()
    if (!trackTicketInput.trim()) return

    const key = trackTicketInput.trim().toUpperCase()
    if (SAMPLE_BOUNTY_CLAIMS[key]) {
      setTrackedClaim(SAMPLE_BOUNTY_CLAIMS[key])
    } else {
      setTrackedClaim({
        ticketId: key,
        reportedOrg: "Report Lodged for Review",
        location: "Designated Field Zone",
        suspectDrug: "Reported Pharmaceutical Lot",
        stage: 1,
        investigationStatus: "UNDER_INITIAL_TRIAGE",
        verdictDate: "Awaiting Investigation",
        verdictSummary:
          "Report received securely. Field taskforce assigning inspectors for undercover surveillance. Bounty will release upon official lab verdict.",
        rewardStatus: "ESCROW_COMMITTED_PENDING_VERDICT",
        rewardAmount: "₦500,000",
        claimStatus: "ACTIVE_EVALUATION",
      })
    }
  }

  return (
    <section
      id="whistleblower"
      className="w-full py-[clamp(4rem,8vw,8rem)] bg-white border-t border-slate-100"
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-50 border border-blue-100 text-[#0208F9] text-xs font-semibold uppercase tracking-wider tech-mono">
            <Award className="w-4 h-4 text-[#0208F9]" />
            <span>Whistleblower Integrity Protocol // Financial Bounty Rewards</span>
          </div>

          <h2 className="text-[2.25rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
            Rewards for Reporting Organizations Selling Fake Drugs
          </h2>

          <p className="text-base text-slate-600 leading-[1.6] max-w-[72ch] mx-auto">
            MedCheck operates a dedicated Public Protection Bounty Fund in direct partnership with health regulatory agencies. Citizens, pharmacists, and supply chain personnel who blow the whistle on illicit operations are eligible for monetary compensation.
          </p>

          {/* Core Policy Highlight Card */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-left text-sm text-slate-800 flex items-start gap-3 shadow-sm">
            <Scale className="w-5 h-5 text-[#0208F9] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">
                How Reward Release Works: Investigation & Legal Verdict
              </span>
              <span className="text-slate-600 leading-relaxed text-xs sm:text-sm mt-0.5 block">
                To protect against false claims and safeguard honest institutions, <strong>all whistleblower rewards are held in escrow and released immediately after your report has been formally investigated by enforcement authorities, chemical lab assays confirm counterfeit formulation, and an official regulatory or judicial verdict has been reached.</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 1. REFACTORED 4-STEP VERIFICATION & RELEASE JOURNEY */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <span className="tech-mono text-xs font-semibold text-[#0208F9] uppercase tracking-wider block">
                Step-by-Step Lifecycle
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                The 4-Step Verification & Release Journey
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md text-left sm:text-right">
              Click any stage below to inspect the forensic requirements, legal gates, and escrow release status.
            </p>
          </div>

          <VerificationJourney />
        </div>

        {/* 2. INTERACTIVE PORTAL: LODGE REPORT & CHECK STATUS */}
        <div className="pt-6">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 md:p-8">
              {/* Tabs Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setBountyTab("report")
                    setSubmittedTicket(null)
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ease-out cursor-pointer ${
                    bountyTab === "report"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Submit Confidential Tip-Off
                </button>
                <button
                  type="button"
                  onClick={() => setBountyTab("track")}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ease-out cursor-pointer ${
                    bountyTab === "track"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Track Bounty Claim & Verdict Status
                </button>
              </div>

              {/* TAB 1: LODGE TIP-OFF FORM */}
              {bountyTab === "report" && (
                <div>
                  {!submittedTicket ? (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Target Organization / Pharmacy / Depot"
                          placeholder="e.g. Apex Chemist or Market Stall #14"
                          value={reportForm.orgName}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, orgName: e.target.value })
                          }
                          required
                        />
                        <Input
                          label="Location / City / Premise Address"
                          placeholder="e.g. Idumota Market, Lagos Island"
                          value={reportForm.location}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, location: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Suspect Medication Brand Name"
                          placeholder="e.g. Artemether 20/120mg or Paracetamol"
                          value={reportForm.drugName}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, drugName: e.target.value })
                          }
                          required
                        />
                        <Input
                          label="Lot / Batch Number (if visible)"
                          placeholder="e.g. LOT-2026-UNKNOWN"
                          value={reportForm.batchNumber}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, batchNumber: e.target.value })
                          }
                          className="tech-mono"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[0.875rem] font-medium tracking-[0.01em] text-slate-800">
                          Observations & Evidence Details
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Provide details: strange blister foil, absence of NAFDAC registration, sold without receipt, unusual odor, patient adverse reaction..."
                          value={reportForm.observations}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, observations: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 ease-out focus:border-[#0208F9] focus:outline-none focus:ring-2 focus:ring-[#0208F9] focus:ring-offset-2"
                        />
                      </div>

                      {/* Explicit Agreement Checkbox matching user requirements */}
                      <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reportForm.agreedTerms}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, agreedTerms: e.target.checked })
                          }
                          required
                          className="mt-0.5 rounded border-slate-300 text-[#0208F9] focus:ring-[#0208F9]"
                        />
                        <span>
                          I acknowledge that whistleblower rewards are released from escrow once the regulatory taskforce completes the forensic chemical investigation and issues an official counterfeit verdict.
                        </span>
                      </label>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="default"
                          size="lg"
                          disabled={isSubmittingReport || !reportForm.agreedTerms}
                          className="w-full font-semibold"
                        >
                          <Send className="w-4 h-4 mr-1.5" />
                          <span>
                            {isSubmittingReport
                              ? "Encrypting & Lodging Tip-Off..."
                              : "Submit Anonymous Tip-Off & Generate Claim Token"}
                          </span>
                        </Button>
                      </div>
                    </form>
                  ) : (
                    /* Submission Confirmation Card */
                    <div className="p-6 rounded-xl bg-emerald-50/80 border border-emerald-200 text-slate-900 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-emerald-950">
                            Whistleblower Tip-Off Confirmed & Registered
                          </h4>
                          <p className="text-xs text-emerald-800">
                            Your identity is cryptographically masked. Save your private redemption token below.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Your Private Claim Token:</span>
                          <span className="tech-mono font-bold text-sm text-[#0208F9]">
                            {submittedTicket.ticketId}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Target Organization:</span>
                          <span className="font-semibold text-slate-800">
                            {submittedTicket.orgName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                          <span className="text-slate-500">Target Drug:</span>
                          <span className="font-semibold text-slate-800">
                            {submittedTicket.drugName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Estimated Bounty Value:</span>
                          <span className="tech-mono font-bold text-emerald-700">
                            {submittedTicket.estimatedBounty}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
                        <p className="font-semibold text-[#0208F9]">Escrow Release Policy:</p>
                        <p className="text-[11px] leading-relaxed">
                          Your report is now in <strong>Stage 02 (Field Inspection)</strong>. Once forensic laboratory testing confirms the counterfeit batch and an official guilty verdict is sealed in Stage 03, your reward will unlock in Stage 04.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setTrackTicketInput(submittedTicket.ticketId)
                            setBountyTab("track")
                            setSubmittedTicket(null)
                          }}
                        >
                          <span>Track This Claim</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSubmittedTicket(null)}
                        >
                          <span>Lodge Another Tip-Off</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CLAIM STATUS LOOKUP */}
              {bountyTab === "track" && (
                <div className="space-y-6">
                  <form onSubmit={handleTrackClaim} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter Claim Token, e.g. CLAIM-TK-8841-LAGOS"
                        value={trackTicketInput}
                        onChange={(e) => setTrackTicketInput(e.target.value)}
                        className="tech-mono text-sm uppercase"
                      />
                    </div>
                    <Button type="submit" variant="default" size="default" className="shrink-0">
                      <Search className="w-4 h-4" />
                      <span>Lookup Status</span>
                    </Button>
                  </form>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Sample Claims:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackTicketInput("CLAIM-TK-8841-LAGOS")
                        setTrackedClaim(SAMPLE_BOUNTY_CLAIMS["CLAIM-TK-8841-LAGOS"])
                      }}
                      className="tech-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-[#0208F9] border border-slate-200 transition-colors"
                    >
                      CLAIM-TK-8841-LAGOS (Verdict Reached)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackTicketInput("CLAIM-TK-9022-KANO")
                        setTrackedClaim(SAMPLE_BOUNTY_CLAIMS["CLAIM-TK-9022-KANO"])
                      }}
                      className="tech-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-[#0208F9] border border-slate-200 transition-colors"
                    >
                      CLAIM-TK-9022-KANO (Under Lab Assay)
                    </button>
                  </div>

                  {trackedClaim && (
                    <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                        <div>
                          <span className="tech-mono text-[10px] text-slate-500 uppercase block">
                            Claim Token
                          </span>
                          <span className="tech-mono text-sm font-bold text-[#0208F9]">
                            {trackedClaim.ticketId}
                          </span>
                        </div>

                        <div className="sm:text-right">
                          <span className="tech-mono text-[10px] text-slate-500 uppercase block">
                            Bounty Reward Amount
                          </span>
                          <span className="tech-mono text-base font-bold text-emerald-700">
                            {trackedClaim.rewardAmount}
                          </span>
                        </div>
                      </div>

                      {/* Progress Line */}
                      <div className="py-2">
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {[
                            { label: "1. Lodged", active: trackedClaim.stage >= 1 },
                            { label: "2. Lab Assay", active: trackedClaim.stage >= 2 },
                            {
                              label: "3. Verdict",
                              active:
                                trackedClaim.stage >= 3 ||
                                trackedClaim.rewardStatus === "REWARD_RELEASED",
                            },
                            {
                              label: "4. Escrow Release",
                              active: trackedClaim.rewardStatus === "REWARD_RELEASED",
                            },
                          ].map((s, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div
                                className={`w-full h-1.5 rounded-full mb-1.5 transition-colors ${
                                  s.active ? "bg-emerald-500" : "bg-slate-200"
                                }`}
                              />
                              <span
                                className={`text-[10px] font-semibold tech-mono ${
                                  s.active ? "text-emerald-700" : "text-slate-400"
                                }`}
                              >
                                {s.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Reported Organization:</span>
                          <span className="font-semibold text-slate-900">
                            {trackedClaim.reportedOrg} ({trackedClaim.location})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Target Drug:</span>
                          <span className="font-semibold text-slate-900">
                            {trackedClaim.suspectDrug}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Official Legal Verdict:</span>
                          <span
                            className={`tech-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                              trackedClaim.rewardStatus === "REWARD_RELEASED"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {trackedClaim.investigationStatus}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <span className="text-slate-500 block mb-0.5 font-medium">
                            Forensic Assay & Verdict Summary:
                          </span>
                          <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                            {trackedClaim.verdictSummary}
                          </p>
                        </div>
                      </div>

                      {/* Status Banner */}
                      <div
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                          trackedClaim.rewardStatus === "REWARD_RELEASED"
                            ? "bg-emerald-100/70 border-emerald-300 text-emerald-950"
                            : "bg-amber-100/70 border-amber-300 text-amber-950"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {trackedClaim.rewardStatus === "REWARD_RELEASED" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-700" />
                          )}
                          <span className="font-semibold">
                            {trackedClaim.rewardStatus === "REWARD_RELEASED"
                              ? "VERDICT REACHED: REWARD RELEASED & PAID TO CLAIMANT"
                              : "REWARD ESCROW LOCKED: AWAITING FINAL REGULATORY VERDICT"}
                          </span>
                        </div>

                        <span className="tech-mono font-bold text-xs">
                          {trackedClaim.rewardAmount}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
