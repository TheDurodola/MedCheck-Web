import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const defaultId = React.useId()
    const inputId = id || defaultId

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[0.875rem] font-medium tracking-[0.01em] text-slate-800"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 ease-out focus:border-[#0208F9] focus:outline-none focus:ring-2 focus:ring-[#0208F9] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-600 font-medium tracking-[0.01em]">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
