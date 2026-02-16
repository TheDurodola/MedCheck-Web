import * as React from "react";
// If you are using Next.js, use 'import Link from "next/link"'
// If you are using a standard React Router, use 'import { Link } from "react-router-dom"'
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";

const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link href={href}>
          <div className="flex flex-col gap-1 text-sm p" >
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export { ListItem };
