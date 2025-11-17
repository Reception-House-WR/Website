// components/nav/ListItem.tsx
import * as React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ListItem({
  title,
  href,
  children,
  className,
}: {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            "flex flex-col justify-center min-h-11 text-left",
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
  );
}
