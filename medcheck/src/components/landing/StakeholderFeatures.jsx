import * as React from "react"
import { Link } from "react-router-dom"
import {
  Factory,
  Building2,
  Store,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import manufacturerImg from "@/assets/images/manufacturer.webp"
import wholesalerImg from "@/assets/images/wholesaler.png"
import pharmacistImg from "@/assets/images/pharmacist.webp"
import clinicalTeamImg from "@/assets/images/multiethnic-group-three-doctors-nurses-standing-hospital-corridor-wearing-scrubs-coats-team-healthcare-workers-are-staring-camera-smiling.jpg"

export default function StakeholderFeatures() {
  return (
    <section
      id="stakeholders"
      className="w-full py-[clamp(4rem,8vw,8rem)] bg-slate-50/60 border-t border-slate-100"
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-[clamp(4rem,8vw,8rem)]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="tech-mono text-xs font-semibold text-[#0208F9] bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 uppercase tracking-wider">
            End-to-End Supply Chain Protection
          </span>
          <h2 className="mt-3 text-[2.25rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
            Purpose-Built for Every Pharmaceutical Stakeholder
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-[72ch] mx-auto">
            Connecting licensed manufacturers, wholesalers, dispensing pharmacists, and consumers into a unified verification network.
          </p>
        </div>

        {/* ROW 1: MANUFACTURERS (Text Left, Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0208F9] tech-mono uppercase tracking-wider">
              <Factory className="w-4 h-4" />
              <span>Tier 1 // Production Origin</span>
            </div>
            <h3 className="text-[1.75rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
              Cryptographic Batch Serialization for Manufacturers
            </h3>
            <p className="text-base text-slate-600 leading-[1.6] max-w-[72ch]">
              Pharmaceutical manufacturers register production batches with serialized digital signatures directly onto the MedCheck ledger. Every unit is assigned an immutable authenticity fingerprint before entering wholesale distribution.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Automated GS1 2D DataMatrix code registration</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Real-time recall broadcasts and batch isolation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Cryptographic seal verification at factory departure</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="default" size="default">
                <Link to="/dashboard/admin" className="flex items-center gap-2">
                  <span>Explore Manufacturer Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-6">
            <Card className="overflow-hidden p-2 bg-white">
              <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-[4/3]">
                <img
                  src={manufacturerImg}
                  alt="Pharmaceutical Manufacturing Laboratory"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm tech-mono text-xs font-semibold text-slate-900">
                  STATUS // CERTIFIED BATCH
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ROW 2: WHOLESALERS (Image Left, Text Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <Card className="overflow-hidden p-2 bg-white">
              <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-[4/3]">
                <img
                  src={wholesalerImg}
                  alt="Wholesale Medical Logistics and Distribution"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm tech-mono text-xs font-semibold text-[#0208F9]">
                  DEPOT // TRANSIT VERIFIED
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-6 order-1 md:order-2 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0208F9] tech-mono uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Tier 2 // Distribution & Logistics</span>
            </div>
            <h3 className="text-[1.75rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
              Chain-of-Custody Auditing for Wholesalers
            </h3>
            <p className="text-base text-slate-600 leading-[1.6] max-w-[72ch]">
              Licensed wholesalers audit pallet and case-level consignments as they move across distribution hubs. Incoming shipments are scanned and verified against manufacturer keys, preventing unauthorized diversion or illicit infiltration.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Bulk pallet barcode scanning with instant reconciliations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Cryptographic transfer of custody to licensed pharmacies</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Cold-chain integrity and temperature compliance logging</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="default" size="default">
                <Link to="/dashboard/wholesaler" className="flex items-center gap-2">
                  <span>Wholesaler Operations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ROW 3: PHARMACIES & RETAILERS (Text Left, Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0208F9] tech-mono uppercase tracking-wider">
              <Store className="w-4 h-4" />
              <span>Tier 3 // Dispensing Point</span>
            </div>
            <h3 className="text-[1.75rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
              Point-of-Dispense Verification for Pharmacists
            </h3>
            <p className="text-base text-slate-600 leading-[1.6] max-w-[72ch]">
              Pharmacists and retail dispensaries verify single packages instantly before handing medications to patients. In the event of a flagged counterfeit or recalled lot, the system instantly alerts the pharmacist and locks the record.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Sub-second counter barcode verification</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>One-click counterfeit incident escalation to regulators</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Verified Pharmacy badge for patient trust building</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="default" size="default">
                <Link to="/dashboard/retailer" className="flex items-center gap-2">
                  <span>Retailer Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-6">
            <Card className="overflow-hidden p-2 bg-white">
              <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-[4/3]">
                <img
                  src={pharmacistImg}
                  alt="Licensed Dispensing Pharmacist"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-900">
                    DISPENSE AUTHORIZATION // GRANTED
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ROW 4: REGULATORY INVESTIGATION (Image Left, Text Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <Card className="overflow-hidden p-2 bg-white">
              <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-[4/3]">
                <img
                  src={clinicalTeamImg}
                  alt="Healthcare Clinical Team and Regulatory Inspectors"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm tech-mono text-xs font-semibold text-slate-900">
                  FIELD MONITORING // LIVE
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-6 order-1 md:order-2 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0208F9] tech-mono uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4" />
              <span>Tier 4 // Regulatory Enforcement</span>
            </div>
            <h3 className="text-[1.75rem] font-bold tracking-[-0.03em] leading-tight text-slate-900">
              Surveillance Intelligence for Regulatory Investigators
            </h3>
            <p className="text-base text-slate-600 leading-[1.6] max-w-[72ch]">
              Empowering drug enforcement agencies (NAFDAC, FDA, WHO) with real-time geospatial heatmaps of counterfeit detections, fake batch alerts, and suspicious repeat scans to apprehend illicit syndicates.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Geographic anomaly detection for duplicate serial usage</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Automated evidence compilation for field enforcement</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0" />
                <span>Cross-border supply chain verification cooperation</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="default" size="default">
                <Link to="/dashboard/investigator" className="flex items-center gap-2">
                  <span>Investigator Command</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
