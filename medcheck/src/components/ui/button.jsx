import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0208F9] focus-visible:ring-offset-2 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#0208F9] text-white shadow-sm hover:bg-[#0106cc] hover:shadow-[0_4px_14px_rgba(2,8,249,0.25)]",
        white:
          "bg-white text-[#0208F9] shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-slate-50 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
        outline:
          "border-[1.5px] border-slate-300 bg-transparent text-[#0f172a] hover:bg-slate-50/80 hover:border-slate-400",
        outlineWhite:
          "border-[1.5px] border-white/50 bg-transparent text-white hover:bg-white/10 hover:border-white",
        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200/80",
        ghost:
          "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        ghostWhite:
          "bg-transparent text-white hover:bg-white/10 hover:text-white",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-[0_4px_12px_rgba(220,38,38,0.25)]",
        link:
          "text-[#0208F9] underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
