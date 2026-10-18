import * as React from "react"
import { Link } from "react-router-dom"
import { ShieldAlert, Home, ArrowLeft } from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="max-w-[480px] w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0208F9] border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="tech-mono text-xs font-semibold uppercase tracking-wider text-[#0208F9] px-2.5 py-1 rounded bg-blue-50 border border-blue-100">
              404 // ROUTE_NOT_FOUND
            </span>
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-900 mt-3">
              Endpoint Not Recognized
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              The page or node parameter you requested is not indexed on the MedCheck network ledger.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild variant="default" size="default">
              <Link to="/home" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </Button>

            <Button asChild variant="outline" size="default">
              <Link to="/signin" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Sign In Portal</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}