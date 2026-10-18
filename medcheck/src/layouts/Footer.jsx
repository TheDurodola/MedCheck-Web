import * as React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0208F9] flex items-center justify-center text-white font-bold">
                MC
              </div>
              <span className="text-lg font-bold text-white tracking-tight">MedCheck</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Restoring trust in pharmaceutical supply chains through cryptographic verification and real-time authenticity tracking.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white tech-mono mb-3">
              Stakeholder Dashboards
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/dashboard/consumer" className="hover:text-white transition-colors">
                  Consumer Verification Portal
                </Link>
              </li>
              <li>
                <Link to="/dashboard/retailer" className="hover:text-white transition-colors">
                  Retailer & Pharmacy Console
                </Link>
              </li>
              <li>
                <Link to="/dashboard/wholesaler" className="hover:text-white transition-colors">
                  Wholesaler Custody Manager
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin" className="hover:text-white transition-colors">
                  Manufacturer Batch Hub
                </Link>
              </li>
              <li>
                <Link to="/dashboard/investigator" className="hover:text-white transition-colors">
                  Enforcement & Regulatory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white tech-mono mb-3">
              Security & Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Whistleblower Protection Escrow</li>
              <li>GS1 2D DataMatrix Standard</li>
              <li>NAFDAC Drug Security Compliance</li>
              <li>Dual-Key Cryptographic Signatures</li>
              <li>WHO Anti-Counterfeiting Guidelines</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white tech-mono mb-3">
              Project Information
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Initiative by Durodola Abolaji Toliat to eliminate counterfeit pharmaceuticals and protect patient lives worldwide.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800 text-blue-400 text-[11px] tech-mono border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>SYSTEM HEALTH // OPTIMAL</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} MedCheck. All rights reserved.</p>
          <div className="flex items-center gap-4 tech-mono text-[11px]">
            <a href="#whistleblower" className="hover:text-slate-300">
              WHISTLEBLOWER REWARDS
            </a>
            <span>•</span>
            <Link to="/signin" className="hover:text-slate-300">
              SIGN IN
            </Link>
            <span>•</span>
            <Link to="/signup" className="hover:text-slate-300">
              SIGN UP
            </Link>
            <span>•</span>
            <a href="#verify" className="hover:text-slate-300">
              AUTHENTICATE
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
