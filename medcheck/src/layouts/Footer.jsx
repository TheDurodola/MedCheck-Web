import * as React from "react"
import { Link } from "react-router-dom"
import { Server, Smartphone, Globe, ExternalLink, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
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
              Open Source Repositories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://github.com/TheDurodola/MedCheck-Server"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <Server className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Backend API (Spring Boot)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TheDurodola/Medify-Mobile"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <Smartphone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Mobile App (Flutter)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TheDurodola/MedCheck-Web"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Web Client (React)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white ml-auto" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white tech-mono mb-3">
              Project Leadership
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Co-founded by <strong>Akintayo Olamide</strong> and <strong>Durodola Abolaji Toliat</strong> to eliminate counterfeit pharmaceuticals and protect patient lives worldwide.
            </p>
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
            <Link to="/signin" className="hover:text-slate-300">
              AUTHENTICATE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
