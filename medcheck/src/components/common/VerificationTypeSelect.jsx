import * as React from "react"
import { useAuth } from "@/features/authentication"
import { canAccessBatchVerification } from "@/services/verificationService"

export default function VerificationTypeSelect({
  value = "pack",
  onChange,
  className = "",
  label = "Verification Target",
  helperText,
}) {
  const { authority } = useAuth()
  const canVerifyBatch = canAccessBatchVerification(authority)

  // Automatically reset to 'pack' if current selection is 'batch' but user lacks permission
  React.useEffect(() => {
    if (!canVerifyBatch && value === "batch") {
      onChange("pack")
    }
  }, [canVerifyBatch, value, onChange])

  return (
    <div className={`flex flex-col gap-1.5 text-left ${className}`}>
      {label && (
        <label className="text-[0.875rem] font-medium tracking-[0.01em] text-slate-800">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 sm:h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 transition-all duration-200 ease-out focus:border-[#0208F9] focus:outline-none focus:ring-2 focus:ring-[#0208F9] focus:ring-offset-2"
      >
        <option value="pack">Pack Verification</option>
        <option value="sachet">Sachet Verification</option>
        {/* Only render Batch for authorized roles (INVESTIGATOR, MANUFACTURER_EMPLOYEE, RETAIL_EMPLOYEE, WHOLESALE_EMPLOYEE) */}
        {canVerifyBatch && (
          <option value="batch">Batch Verification</option>
        )}
      </select>
      {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  )
}
