import * as React from "react"
import {
  FileText,
  SearchCheck,
  Scale,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Microscope,
  Building,
  Coins,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const STEPS = [
  {
    number: "01",
    shortTitle: "Confidential Tip-Off",
    title: "Encrypted Anonymous Incident Registration",
    actor: "Whistleblower (Citizen / Healthcare Staff / Warehouse Personnel)",
    protocol: "256-bit SHA Anonymous Masking & Zero-Knowledge Hashing",
    badge: "ANONYMOUS INITIATION",
    timeframe: "Instant (Within Minutes)",
    escrowStatus: "Bounty Allocated to Escrow",
    icon: FileText,
    summary:
      "Submit details of the suspect pharmacy, distributor, or illicit open-market stall. Your personal identity is never stored or published. The network issues an anonymous Private Claim Token as your exclusive proof of reporting.",
    criteria: [
      "Target organization name and verifiable premise coordinates",
      "Medication brand, packaging markings, and batch/lot numbers",
      "Tamper-evident photographic proof or purchase receipt (if available)",
    ],
    deliverable: "Private Claim Token (e.g. CLAIM-TK-8841-LAGOS)",
  },
  {
    number: "02",
    shortTitle: "Field Investigation",
    title: "Surprise Inspection & Physical Evidence Confiscation",
    actor: "Joint Taskforce (NAFDAC / WHO / Police Anti-Counterfeit Squad)",
    protocol: "Chain-of-Custody Evidence Collection & Premise Seal",
    badge: "EVIDENCE CONFISCATION",
    timeframe: "24 – 72 Hours Post-Report",
    escrowStatus: "Escrow Locked (Field Phase Active)",
    icon: SearchCheck,
    summary:
      "Enforcement inspectors deploy to the reported premise under strict evidentiary protocols. Covert decoy purchases are performed, suspect stocks are inventoried, and tamper-sealed forensic sample bags are confiscated for chemical testing.",
    criteria: [
      "Physical audit of wholesale stock, shelves, and backroom storage",
      "Confiscation of suspect packages under official seizure manifest",
      "Immediate quarantine lock placed on remaining premise inventory",
    ],
    deliverable: "Chain-of-Custody Manifest & Seized Lab Samples",
  },
  {
    number: "03",
    shortTitle: "Lab Assay & Legal Verdict",
    title: "Chemical Laboratory Spectrometry & Formal Condemnation",
    actor: "National Reference Quality Assurance Laboratory & Court",
    protocol: "High-Performance Liquid Chromatography (HPLC) & Chemical Assay",
    badge: "CRUCIAL VERDICT GATE",
    timeframe: "3 – 7 Working Days",
    escrowStatus: "Verdict Registered -> Bounty Unlocked",
    icon: Scale,
    summary:
      "Accredited chemists test the active pharmaceutical ingredient (API) against pharmacopoeial reference standards. Upon confirmation of zero or toxic active content, regulators issue an official guilty verdict, revoke premise licenses, and seal the verdict on-chain.",
    criteria: [
      "Laboratory spectrometry assay proves adulterated or 0% active drug",
      "Official regulatory condemnation certificate issued by authorities",
      "Guilty legal verdict entered into the national public health register",
    ],
    deliverable: "Accredited Assay Certificate & Official Guilty Verdict",
  },
  {
    number: "04",
    shortTitle: "Bounty Disbursal",
    title: "Automated Escrow Reward Release to Whistleblower",
    actor: "Public Health Safety Escrow & Neutral Custody Protocol",
    protocol: "Zero-Knowledge Token Redemption & Direct Disbursal",
    badge: "FUNDS RELEASED",
    timeframe: "Immediate Following Verdict Confirmation",
    escrowStatus: "Funds Unlocked & Paid Out",
    icon: Award,
    summary:
      "With the guilty verdict formally rendered, the cryptographic escrow lock releases automatically. The whistleblower inputs their Private Claim Token to claim the monetary reward (₦500,000 – ₦2,000,000+) directly without revealing their identity.",
    criteria: [
      "Case verification status confirmed as VERDICT_GUILTY by authority",
      "Claim token matches the authenticated initial tip-off record",
      "One-time cryptographic signature releases financial reward",
    ],
    deliverable: "₦500,000 – ₦2,000,000+ Disbursed via Bank / Custody",
  },
]

export default function VerificationJourney({ onSelectStep }) {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0)
  const currentStep = STEPS[activeStepIndex]
  const IconComponent = currentStep.icon

  return (
    <div className="w-full space-y-8">
      {/* Stepper Navigation Track */}
      <div className="relative">
        {/* Connecting Progress Bar Behind Steps (Desktop) */}
        <div
          className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-slate-200 z-0"
          aria-hidden="true"
        >
          <div
            className="h-full bg-[#0208F9] transition-all duration-300 ease-out"
            style={{ width: `${(activeStepIndex / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* 4 Interactive Step Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
          {STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx
            const isCompleted = activeStepIndex > idx
            const StepIcon = step.icon

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => {
                  setActiveStepIndex(idx)
                  if (onSelectStep) onSelectStep(idx)
                }}
                className={`flex flex-col items-center md:items-start p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 ease-out cursor-pointer ${
                  isActive
                    ? "bg-white border-[#0208F9] shadow-[0_4px_16px_rgba(2,8,249,0.12)] ring-2 ring-[#0208F9]/20"
                    : isCompleted
                    ? "bg-slate-50 border-slate-300 hover:bg-white"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                      isActive
                        ? "bg-[#0208F9] text-white shadow-sm"
                        : isCompleted
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                  </div>

                  <span
                    className={`tech-mono text-[9px] font-semibold px-2 py-0.5 rounded uppercase hidden sm:inline-block ${
                      isActive
                        ? "bg-blue-50 text-[#0208F9] border border-blue-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    Stage {idx + 1}
                  </span>
                </div>

                <div className="w-full text-center md:text-left">
                  <h4
                    className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                      isActive ? "text-[#0208F9]" : "text-slate-900"
                    }`}
                  >
                    {step.shortTitle}
                  </h4>
                  <p className="tech-mono text-[10px] text-slate-500 truncate mt-0.5">
                    {step.timeframe}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Step Detailed Showcase Card */}
      <Card className="p-6 md:p-8 border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0208F9] border border-blue-100 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <IconComponent className="w-6 h-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="tech-mono text-xs font-bold text-[#0208F9] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  PHASE {currentStep.number} OF 04
                </span>
                <span className="tech-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                  {currentStep.badge}
                </span>
                {activeStepIndex === 2 && (
                  <span className="tech-mono text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-200">
                    ESCROW RELEASE GATE
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                {currentStep.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-[72ch] mt-2">
                {currentStep.summary}
              </p>
            </div>
          </div>

          {/* Quick Step Indicators */}
          <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-3 shrink-0 pt-2 lg:pt-0">
            <div className="text-left lg:text-right">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block tech-mono">
                Escrow State
              </span>
              <span
                className={`tech-mono text-xs font-bold ${
                  activeStepIndex === 3
                    ? "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                    : "text-slate-800"
                }`}
              >
                {currentStep.escrowStatus}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="h-8 text-xs"
              >
                Previous
              </Button>
              <Button
                variant="default"
                size="sm"
                disabled={activeStepIndex === STEPS.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
                className="h-8 text-xs"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Step Metadata & Forensic Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
          {/* Column 1: Responsible Stakeholder & Protocol */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider tech-mono block">
              Operational Actors
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div>
                <span className="text-slate-500 block">Responsible Lead:</span>
                <span className="font-semibold text-slate-900 mt-0.5 block leading-snug">
                  {currentStep.actor}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 block">Security Protocol:</span>
                <span className="tech-mono text-[11px] font-medium text-slate-800 mt-0.5 block leading-snug">
                  {currentStep.protocol}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Mandatory Verification Criteria */}
          <div className="space-y-3 md:col-span-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider tech-mono block">
              Stage Verification Requirements
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <ul className="space-y-2 text-slate-700">
                {currentStep.criteria.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Stage Output Artifact:</span>
                <span className="tech-mono font-semibold text-[#0208F9]">
                  {currentStep.deliverable}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Note for Verdict Rule */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-700 flex items-start gap-3">
          <Scale className="w-4 h-4 text-[#0208F9] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Key Safeguard:</strong> The transition between <strong>Stage 03 (Lab Assay & Official Verdict)</strong> and <strong>Stage 04 (Bounty Disbursal)</strong> guarantees that only reports confirmed as counterfeit by forensic testing unlock financial rewards, protecting honest pharmaceutical premises while swiftly compensating courageous whistleblowers.
          </div>
        </div>
      </Card>
    </div>
  )
}
