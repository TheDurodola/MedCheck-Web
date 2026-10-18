import * as React from "react"
import { Quote } from "lucide-react"

export default function FounderMission() {
  return (
    <section id="mission" className="w-full py-[clamp(4rem,8vw,8rem)] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="relative rounded-2xl bg-[#0208F9] text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-[0_8px_30px_rgba(2,8,249,0.18)]">
          {/* Subtle background motif */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm mx-auto">
              <Quote className="w-7 h-7 text-white" />
            </div>

            <div className="space-y-6">
              <blockquote className="text-lg sm:text-xl font-normal leading-relaxed text-white/95">
                &ldquo;We have identified a threat in our society. The threat of
                counterfeit drugs in the market. Many individuals have lost their
                lives to this menace, and many more are at risk. MedCheck is our
                response to this crisis. We are committed to ensuring that every
                drug that reaches the hands of consumers is authentic and safe.
                With MedCheck, we can save lives and restore trust in the
                pharmaceutical industry.&rdquo;
              </blockquote>

              <blockquote className="text-base sm:text-lg font-normal leading-relaxed text-blue-100/90 pt-2 border-t border-white/15">
                &ldquo;MedCheck is not just a solution; it&apos;s a movement towards a
                safer and healthier future. We are dedicated to empowering
                individuals with the tools they need to verify the authenticity
                of their medications, ultimately saving lives and improving
                health outcomes.&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 flex flex-col items-center">
              <p className="text-base font-bold tracking-tight text-white">
                Durodola Abolaji Toliat
              </p>
              <p className="tech-mono text-xs text-blue-200 uppercase tracking-wider mt-0.5">
                Founder & Lead Innovator // MedCheck Project
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
