import * as React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth, signIn, getDashboardPath } from "@/features/authentication"

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, authority } = useAuth()

  // Prevent redirect loops: only honor "from" if it isn't /signin
  const rawFrom = location.state?.from?.pathname
  const from = rawFrom && rawFrom !== "/signin" ? rawFrom : null

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  // Log on mount to verify browser console visibility
  React.useEffect(() => {
    console.log("[SignIn] Mounted. Current auth state:", { isAuthenticated, authority, from })
  }, [isAuthenticated, authority, from])

  // If already authenticated on arrival, redirect directly
  React.useEffect(() => {
    if (isAuthenticated) {
      const destination = from || getDashboardPath(authority)
      console.log("[SignIn] User is already authenticated. Navigating to:", destination)
      navigate(destination, { replace: true })
    }
  }, [isAuthenticated, authority, from, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("[SignIn] Form submitted with username:", username, "| password provided:", !!password)

    if (!username.trim()) {
      setError("Please enter your username")
      return
    }
    if (!password) {
      setError("Please enter your password")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      console.log("[SignIn] Calling signIn API...")
      const data = await signIn({ username: username.trim(), password })
      console.log("[SignIn] Sign in successful. Received payload:", data)

      // Store in AuthContext + localStorage
      const session = login(data)

      // Resolve destination
      const destination = from || getDashboardPath(session.authority)
      console.log("[SignIn] Redirecting authenticated user to:", destination)

      // Direct navigation
      navigate(destination, { replace: true })
    } catch (err) {
      console.error("[SignIn] Error during sign in:", err)
      setError(err.message || "Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[480px]">
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
                {/* Username Input */}
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. johndoe"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (error) setError("")
                  }}
                  error={error && !username.trim() ? error : undefined}
                />

                {/* Password Input */}
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your security passkey"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError("")
                  }}
                  error={error && !password ? error : undefined}
                />

                {/* General error (both fields filled but API returned error) */}
                {error && username.trim() && password && (
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
