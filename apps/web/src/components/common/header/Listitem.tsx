// components/nav/ListItem.tsx
import * as React from "react"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function ListItem({
  title,
  href,
  children,
  className,
}: {
  title: string
  href: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none rounded-md p-3 no-underline outline-none",
            "transition hover:bg-accent focus:shadow-sm",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children ? (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {children}
            </p>
          ) : null}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
