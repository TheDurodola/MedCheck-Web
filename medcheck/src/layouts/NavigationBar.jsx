import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  ShieldCheck,
  Building2,
  Store,
  Factory,
  SearchCheck,
  UserCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const PORTALS = [
  {
    title: "Consumer Portal",
    href: "/dashboard/consumer",
    description: "Verify medicine authenticity and report suspect medications.",
    icon: UserCheck,
    badge: "Public",
  },
  {
    title: "Retailer & Pharmacy",
    href: "/dashboard/retailer",
    description: "Point-of-dispense authentication and batch validation.",
    icon: Store,
    badge: "Licensed",
  },
  {
    title: "Wholesale & Distribution",
    href: "/dashboard/wholesaler",
    description: "Chain-of-custody transfer tracking and bulk audit.",
    icon: Building2,
    badge: "Licensed",
  },
  {
    title: "Manufacturer Hub",
    href: "/dashboard/admin",
    description: "Cryptographic batch registration and supply chain controls.",
    icon: Factory,
    badge: "Enterprise",
  },
  {
    title: "Enforcement & Regulatory",
    href: "/dashboard/investigator",
    description: "Field investigation logs and counterfeit intelligence.",
    icon: SearchCheck,
    badge: "Authority",
  },
]

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [portalDropdownOpen, setPortalDropdownOpen] = React.useState(false)
  const location = useLocation()
  const dropdownRef = React.useRef(null)

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPortalDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false)
    setPortalDropdownOpen(false)
  }, [location.pathname])

  const isHomeActive = location.pathname === "/" || location.pathname === "/home"

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 ease-out">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/home"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0208F9] rounded-xl"
        >
      
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-[-0.05em] text-[#0f172a]">
                MedCheck
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 tracking-tight hidden sm:block">
              Anti-Counterfeit Pharmaceutical Network
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/home"
            className={`px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ease-out relative ${
              isHomeActive
                ? "text-[#0208F9] font-medium"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
            {isHomeActive && (
              <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#0208F9] rounded-full" />
            )}
          </Link>

          <a
            href="/home#mission"
            className="px-3.5 py-2 rounded-xl text-sm font-normal text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 ease-out"
          >
            Mission
          </a>

          <a
            href="/home#verify"
            className="px-3.5 py-2 rounded-xl text-sm font-normal text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 ease-out"
          >
            Verify Drug
          </a>

          <a
            href="/home#whistleblower"
            className="px-3.5 py-2 rounded-xl text-sm font-normal text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 ease-out flex items-center gap-1.5"
          >
            <span>Whistleblower Bounty</span>
          </a>

          {/* Portals Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPortalDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ease-out focus:outline-none ${
                location.pathname.startsWith("/dashboard")
                  ? "text-[#0208F9] font-medium bg-blue-50/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>Stakeholder Portals</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                  portalDropdownOpen ? "rotate-180 text-[#0208F9]" : ""
                }`}
              />
            </button>

            {portalDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider tech-mono">
                  Access Specialized Dashboards
                </div>
                <div className="space-y-1">
                  {PORTALS.map((portal) => {
                    const Icon = portal.icon
                    const isActive = location.pathname === portal.href
                    return (
                      <Link
                        key={portal.title}
                        to={portal.href}
                        onClick={() => setPortalDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg transition-all duration-200 ease-out ${
                          isActive
                            ? "bg-blue-50 text-[#0208F9]"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg border mt-0.5 ${
                            isActive
                              ? "bg-white border-blue-200 text-[#0208F9]"
                              : "bg-slate-50 border-slate-200/60 text-slate-600"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-900">
                              {portal.title}
                            </span>
                            <span className="tech-mono text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              {portal.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {portal.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons (Sign In / Sign Up) */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/signin">Sign In</Link>
          </Button>

          <Button asChild variant="default" size="sm">
            <Link to="/signup" className="flex items-center gap-1.5">
              <span>Sign Up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="text-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white px-6 py-5 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium ${
                isHomeActive ? "bg-blue-50 text-[#0208F9]" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>
            <a
              href="/home#mission"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Mission
            </a>
            <a
              href="/home#verify"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Verify Drug
            </a>
            <a
              href="/home#whistleblower"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Whistleblower Bounty</span>
              <span className="tech-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                REWARD
              </span>
            </a>

            <div className="my-2 border-t border-slate-100 pt-2">
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 tech-mono">
                Portals & Dashboards
              </span>
              <div className="mt-2 grid grid-cols-1 gap-1">
                {PORTALS.map((portal) => (
                  <Link
                    key={portal.title}
                    to={portal.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#0208F9]"
                  >
                    <span>{portal.title}</span>
                    <span className="tech-mono text-[10px] text-slate-400">{portal.badge}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
              <Button asChild variant="outline" size="default" className="w-full justify-center">
                <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="default" size="default" className="w-full justify-center">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
