import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ShieldCheck,
  Building2,
  Store,
  Factory,
  SearchCheck,
  UserCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    fullName: "",
    orgName: "",
    email: "",
    licenseNumber: "",
    role: "retailer",
    password: "",
  })
  const [error, setError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please complete all required fields")
      return
    }

    setIsSubmitting(true)
    setError("")
    setTimeout(() => {
      setIsSubmitting(false)
      const redirectMap = {
        consumer: "/dashboard/consumer",
        retailer: "/dashboard/retailer",
        wholesaler: "/dashboard/wholesaler",
        manufacturer: "/dashboard/admin",
        investigator: "/dashboard/investigator",
      }
      navigate(redirectMap[formData.role] || "/dashboard/consumer")
    }, 450)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[560px]">
          <Card className="p-2 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-slate-200">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0208F9] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-[-0.03em] text-slate-900">
                Join the MedCheck Network
              </CardTitle>
              <CardDescription className="text-sm text-slate-500 mt-1">
                Register as a verified participant to secure pharmaceutical authenticity
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role selection */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[0.875rem] font-medium tracking-[0.01em] text-slate-800">
                    Registration Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "consumer", label: "Patient / Consumer", icon: UserCheck },
                      { id: "retailer", label: "Retail Pharmacy", icon: Store },
                      { id: "wholesaler", label: "Wholesale Depot", icon: Building2 },
                      { id: "manufacturer", label: "Manufacturer", icon: Factory },
                      { id: "investigator", label: "Regulatory Agency", icon: SearchCheck },
                    ].map((item) => {
                      const Icon = item.icon
                      const isSelected = formData.role === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, role: item.id })}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ease-out cursor-pointer ${
                            isSelected
                              ? "bg-blue-50 border-[#0208F9] text-[#0208F9]"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Representative Full Name"
                    placeholder="e.g. Dr. Abolaji Durodola"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />

                  <Input
                    label="Organization Name"
                    placeholder={
                      formData.role === "consumer"
                        ? "Individual / Self"
                        : "e.g. Apex Health Pharmacy"
                    }
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Official Work Email"
                    type="email"
                    placeholder="pharmacist@apexhealth.ng"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  <Input
                    label="License / Premise Registration #"
                    placeholder="e.g. PCN-2026-9941"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    helperText={formData.role === "consumer" ? "Optional for consumers" : "Required for supply chain nodes"}
                  />
                </div>

                <Input
                  label="Create Security Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />

                {error && (
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                )}

                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0 mt-0.5" />
                  <span>
                    By registering, you agree to comply with NAFDAC & WHO pharmaceutical security protocols and authenticate only verified distribution channels.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-sm font-semibold"
                >
                  {isSubmitting ? "Creating Account..." : "Complete Registration"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </form>

              <div className="mt-6 text-center text-xs text-slate-600">
                Already registered with MedCheck?{" "}
                <Link to="/signin" className="text-[#0208F9] font-semibold hover:underline">
                  Sign in to your console
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}