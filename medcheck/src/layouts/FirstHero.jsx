import * as React from "react"
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import heroImage from "@/assets/images/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare.jpg"

export default function FirstHero() {
  return (
    <section className="relative w-full bg-[#0208F9] text-white min-h-[100dvh] flex items-center justify-center py-[clamp(4rem,8vw,8rem)] overflow-hidden">
      {/* Subtle geometric surface lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Split-Screen Text Left */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
         

          {/* Headline: Albert Sans 700, Tight Tracking -5%, 90% Leading, clamp(2.5rem, 5vw, 4rem) */}
          <div className="space-y-3">
            <h1 className="text-[clamp(2.75rem,5.5vw,4.25rem)] font-bold text-white tracking-[-0.05em] leading-[0.9]">
              MedCheck
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-blue-100 tracking-tight">
              Your trusted partner in the drug industry.
            </p>
          </div>

          {/* Body: Albert Sans 400, 16px/1.6 line-height, max 72ch */}
          <p className="text-base sm:text-lg text-blue-50/90 leading-[1.6] max-w-[72ch] font-normal">
            Here at MedCheck, we prioritize your health and well-being with
            innovative solutions designed to ensure that you received authentic
            drugs only.
          </p>

          {/* CTA Buttons per Design.md: 0.75rem rounded, tactile press, weight 600 */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              asChild
              variant="white"
              size="lg"
              className="text-base font-semibold"
            >
              <a href="#verify" className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0208F9]" />
                <span>Verify Medication</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>

            <Button
              asChild
              variant="outlineWhite"
              size="lg"
              className="text-base font-semibold"
            >
              <a href="#stakeholders">Supply Chain Network</a>
            </Button>
          </div>

          {/* Technical Specs & Verification Metrics (JetBrains Mono) */}
          <div className="pt-6 border-t border-white/15 w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="tech-mono text-[11px] text-blue-200 tracking-wider uppercase">
                Tamper Protocol
              </span>
              <span className="tech-mono text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-300" />
                Dual-Key Serial
              </span>
            </div>

            <div className="flex flex-col">
              <span className="tech-mono text-[11px] text-blue-200 tracking-wider uppercase">
                Verification Latency
              </span>
              <span className="tech-mono text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-300" />
                &lt; 240ms Real-Time
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="tech-mono text-[11px] text-blue-200 tracking-wider uppercase">
                Safety Guarantee
              </span>
              <span className="tech-mono text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-300" />
                End-to-End
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Split-Screen Visual Right */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-lg lg:max-w-none">
            {/* Visual Container with 12px rounded corners, 1px border stroke, subtle shadow */}
            <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.22)] bg-blue-950/40">
              <picture>
                <img
                  src={heroImage}
                  alt="Wholesale and Retail Pharmacists verifying medicine authenticity"
                  className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Live Verification Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 tracking-tight">
                        AUTHENTIC PRODUCT
                      </span>
                      <span className="tech-mono text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                        VERIFIED
                      </span>
                    </div>
                    <p className="tech-mono text-[11px] text-slate-500 mt-0.5">
                      LOT: 2026-MC-90812 • NAFDAC #04-8911
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="tech-mono text-[10px] text-slate-400 uppercase block">
                    Chain Status
                  </span>
                  <span className="tech-mono text-xs font-semibold text-[#0208F9]">
                    SECURE (100%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
