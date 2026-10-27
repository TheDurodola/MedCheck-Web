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

const ROLES = [
  { id: "CONSUMER", label: "Patient / Consumer", icon: UserCheck },
  { id: "RETAIL_EMPLOYEE", label: "Retail Pharmacy", icon: Store },
  { id: "WHOLESALE_EMPLOYEE", label: "Wholesale Depot", icon: Building2 },
  { id: "MANUFACTURING_EMPLOYEE", label: "Manufacturer", icon: Factory },
  { id: "REGULATORY_OFFICER", label: "Regulatory Agency", icon: SearchCheck },
]

const ROLE_REDIRECT_MAP = {
  CONSUMER: "/dashboard/consumer",
  RETAIL_EMPLOYEE: "/dashboard/retailer",
  WHOLESALE_EMPLOYEE: "/dashboard/wholesaler",
  MANUFACTURING_EMPLOYEE: "/dashboard/admin",
  REGULATORY_OFFICER: "/dashboard/investigator",
}

const INITIAL_FORM = {
  username: "",
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  password: "",
  phoneNumber: "",
  nationalIdentityNumber: "",
  gender: "",
  dateOfBirth: "",
  role: "CONSUMER",
  organisationId: "",
  organisationCode: "",
}

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState(INITIAL_FORM)
  const [error, setError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const set = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const required = [
      "username", "firstName", "lastName", "email",
      "password", "phoneNumber", "nationalIdentityNumber",
      "gender", "dateOfBirth",
    ]
    const missing = required.filter((f) => !formData[f].trim())
    if (missing.length) {
      setError("Please complete all required fields.")
      return
    }

    setIsSubmitting(true)
    setError("")
    setTimeout(() => {
      setIsSubmitting(false)
      navigate(ROLE_REDIRECT_MAP[formData.role] || "/dashboard/consumer")
    }, 450)
  }

  const isOrgRole = formData.role !== "CONSUMER"

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[640px]">
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
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* ── Role ── */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[0.875rem] font-medium tracking-[0.01em] text-slate-800">
                    Registration Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ROLES.map(({ id, label, icon: Icon }) => {
                      const isSelected = formData.role === id
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, role: id }))}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ease-out cursor-pointer ${
                            isSelected
                              ? "bg-blue-50 border-[#0208F9] text-[#0208F9]"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ── Personal Info ── */}
                <div className="space-y-3">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-400">
                    Personal Information
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={set("firstName")}
                      required
                    />
                    <Input
                      label="Middle Name"
                      placeholder="Alexander"
                      value={formData.middleName}
                      onChange={set("middleName")}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={set("lastName")}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[0.875rem] font-medium tracking-[0.01em] text-slate-800">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.gender}
                        onChange={set("gender")}
                        required
                        className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0208F9]/30 focus:border-[#0208F9] transition"
                      >
                        <option value="" disabled>Select gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>

                    <Input
                      label="Date of Birth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={set("dateOfBirth")}
                      required
                    />
                  </div>
                </div>

                {/* ── Account Details ── */}
                <div className="space-y-3">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-400">
                    Account Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Username"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={set("username")}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={set("email")}
                      required
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={set("password")}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+2348012345678"
                      value={formData.phoneNumber}
                      onChange={set("phoneNumber")}
                      required
                    />
                  </div>
                  <Input
                    label="National Identity Number (NIN)"
                    placeholder="12345678901"
                    value={formData.nationalIdentityNumber}
                    onChange={set("nationalIdentityNumber")}
                    required
                  />
                </div>

                {/* ── Organisation (non-consumer only) ── */}
                {isOrgRole && (
                  <div className="space-y-3">
                    <p className="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-400">
                      Organisation
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Organisation ID"
                        placeholder="org-uuid-here"
                        value={formData.organisationId}
                        onChange={set("organisationId")}
                      />
                      <Input
                        label="Organisation Code"
                        placeholder="ORG123"
                        value={formData.organisationCode}
                        onChange={set("organisationCode")}
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                )}

                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#0208F9] shrink-0 mt-0.5" />
                  <span>
                    By registering, you agree to comply with NAFDAC &amp; WHO pharmaceutical security protocols and authenticate only verified distribution channels.
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
