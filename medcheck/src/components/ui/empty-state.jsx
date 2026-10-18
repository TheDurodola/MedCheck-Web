import * as React from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60",
        className
      )}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#0208F9] flex items-center justify-center mb-4 border border-blue-100 shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-900 tracking-[-0.02em]">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-slate-600 max-w-md leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && (
        <Button onClick={onAction} size="default" className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export { EmptyState }
