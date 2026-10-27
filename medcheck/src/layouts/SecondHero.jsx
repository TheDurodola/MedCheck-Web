import * as React from "react"
import FounderMission from "@/components/landing/FounderMission"
import StakeholderFeatures from "@/components/landing/StakeholderFeatures"
import WhistleblowerBounty from "@/components/landing/WhistleblowerBounty"
import Footer from "@/layouts/Footer"

export default function SecondHero() {
  return (
    <div className="w-full bg-white text-slate-900">
      {/* 1. Founder's Crisis Statement & Mission */}
      <FounderMission />

      {/* 2. Stakeholder Feature Rows (Zig-Zag Alternating Layout) */}
      <StakeholderFeatures />

      {/* 3. Whistleblower Bounty Program & Refactored 4-Step Verification Journey */}
      <WhistleblowerBounty />

      {/* 4. Platform Footer */}
      <Footer />
    </div>
  )
}
