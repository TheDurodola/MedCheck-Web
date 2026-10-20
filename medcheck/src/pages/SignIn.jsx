import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Building2,
  Store,
  Factory,
  SearchCheck,
  UserCheck,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ROLE_REDIRECTS = {
  consumer: "/dashboard/consumer",
  retailer: "/dashboard/retailer",
  wholesaler: "/dashboard/wholesaler",
  manufacturer: "/dashboard/admin",
  investigator: "/dashboard/investigator",
}

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [selectedRole, setSelectedRole] = React.useState("consumer")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email address")
      return
    }
    if (!password) {
      setError("Please enter your password")
      return
    }

    setIsLoading(true)
    setError("")
    setTimeout(() => {
      setIsLoading(false)
      navigate(ROLE_REDIRECTS[selectedRole] || "/home")
    }, 400)
  }

  const handleQuickLogin = (role) => {
    setSelectedRole(role)
    setEmail(`${role}@medcheck.org`)
    setPassword("••••••••")
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate(ROLE_REDIRECTS[role])
    }, 300)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[480px]">
          {/* Card conforming to Design.md: 12px rounded, 1px border, subtle shadow */}
          <Card className="p-2 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-slate-200">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0208F9] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-[-0.03em] text-slate-900">
                Sign In to MedCheck
              </CardTitle>
              <CardDescription className="text-sm text-slate-500 mt-1">
                Access your secure pharmaceutical authentication console
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  error={error && !email ? error : undefined}
                />

                {/* Password Input */}
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your security passkey"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError("")
                  }}
                  error={error && !password ? error : undefined}
                />

                {error && email && password && (
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 text-[#0208F9] focus:ring-[#0208F9]"
                    />
                    <span>Remember terminal</span>
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault()
                      alert("Please contact your institutional MedCheck administrator to reset credentials.")
                    }}
                    className="text-[#0208F9] hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Primary Button */}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isLoading}
                  className="w-full text-sm font-semibold mt-2"
                >
                  {isLoading ? "Authenticating..." : "Sign In to Console"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </form>

              

              <div className="mt-6 text-center text-xs text-slate-600">
                New to MedCheck?{" "}
                <Link to="/signup" className="text-[#0208F9] font-semibold hover:underline">
                  Create an organization account
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}