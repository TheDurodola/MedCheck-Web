import * as React from "react";
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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VerificationJourney from "./VerificationJourney";

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
};

export default function WhistleblowerBounty() {
  const [bountyTab, setBountyTab] = React.useState("report"); // "report" | "track"
  const [reportForm, setReportForm] = React.useState({
    orgName: "",
    location: "",
    drugName: "",
    batchNumber: "",
    observations: "",
    agreedTerms: false,
  });
  const [submittedTicket, setSubmittedTicket] = React.useState(null);
  const [isSubmittingReport, setIsSubmittingReport] = React.useState(false);
  const [trackTicketInput, setTrackTicketInput] = React.useState(
    "CLAIM-TK-8841-LAGOS",
  );
  const [trackedClaim, setTrackedClaim] = React.useState(
    SAMPLE_BOUNTY_CLAIMS["CLAIM-TK-8841-LAGOS"],
  );

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportForm.orgName || !reportForm.drugName) return;

    setIsSubmittingReport(true);
    setTimeout(() => {
      setIsSubmittingReport(false);
      const generatedTicket = `CLAIM-TK-${Math.floor(1000 + Math.random() * 9000)}-${
        reportForm.location.substring(0, 4).toUpperCase() || "NIG"
      }`;
      setSubmittedTicket({
        ticketId: generatedTicket,
        orgName: reportForm.orgName,
        drugName: reportForm.drugName,
        estimatedBounty: "₦500,000 – ₦2,000,000",
      });
      setReportForm({
        orgName: "",
        location: "",
        drugName: "",
        batchNumber: "",
        observations: "",
        agreedTerms: false,
      });
    }, 450);
  };

  const handleTrackClaim = (e) => {
    e.preventDefault();
    if (!trackTicketInput.trim()) return;

    const key = trackTicketInput.trim().toUpperCase();
    if (SAMPLE_BOUNTY_CLAIMS[key]) {
      setTrackedClaim(SAMPLE_BOUNTY_CLAIMS[key]);
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
      });
    }
  };

  return (
    <section
      id="whistleblower"
      className="w-full py-[clamp(4rem,8vw,8rem)] bg-white border-t border-slate-100"
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-[2.25rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
            Rewards for Reporting Organizations Selling Fake Drugs
          </h2>

          <p className="text-base text-slate-600 leading-[1.6] max-w-[72ch] mx-auto">
            MedCheck operates a dedicated Public Protection Bounty Fund in
            direct partnership with health regulatory agencies. Citizens,
            pharmacists, and supply chain personnel who blow the whistle on
            illicit operations are eligible for monetary compensation.
          </p>

          {/* Core Policy Highlight Card */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-left text-sm text-slate-800 flex items-start gap-3 shadow-sm">
            <Scale className="w-5 h-5 text-[#0208F9] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">
                How Reward Release Works: Investigation & Legal Verdict
              </span>
              <span className="text-slate-600 leading-relaxed text-xs sm:text-sm mt-0.5 block">
                To protect against false claims and safeguard honest
                institutions,{" "}
                <strong>
                  all whistleblower rewards are held in escrow and released
                  immediately after your report has been formally investigated
                  by enforcement authorities, chemical lab assays confirm
                  counterfeit formulation, and an official regulatory or
                  judicial verdict has been reached.
                </strong>
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
              Click any stage below to inspect the forensic requirements, legal
              gates, and escrow release status.
            </p>
          </div>

          <VerificationJourney />
        </div>
      </div>
    </section>
  );
}
