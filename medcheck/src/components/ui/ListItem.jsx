import * as React from "react"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const ListItem = React.forwardRef(
  ({ className, title, children, href, icon: Icon, badge, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={href}
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all duration-200 ease-out hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 group",
              className
            )}
            {...props}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {Icon && (
                  <Icon className="w-4 h-4 text-[#0208F9] transition-transform duration-200 group-hover:scale-110" />
                )}
                <div className="text-sm font-semibold text-slate-900 tracking-[-0.01em]">
                  {title}
                </div>
              </div>
              {badge && (
                <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded-md bg-blue-50 text-[#0208F9] font-medium border border-blue-100">
                  {badge}
                </span>
              )}
            </div>
            {children && (
              <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 mt-1 font-normal">
                {children}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)

ListItem.displayName = "ListItem"

export { ListItem }
