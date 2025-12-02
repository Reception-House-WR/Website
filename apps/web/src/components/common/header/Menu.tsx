"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

// Mobile menu components
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ListItem } from "./Listitem";
import { NavItem } from "@/lib/strapi/helpers/navHelper";



/* ====================== Desktop  ====================== */
export function MenuDesktop({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const ItemInner = (item: NavItem) => {
    if (!item.children) {
      return (
        <NavigationMenuLink
          asChild
          data-active={isActive(item.href)}
          className="inline-flex items-center"
        >
          <Link
            href={item.href}
            className={cn(
              "flex flex-row items-center px-2 py-2 text-sm rounded-md min-h-11",
              "hover:!bg-[var(--rh-500)] hover:text-white",
              "data-[active=true]:bg-gray-900 data-[active=true]:text-white"
            )}
          >
            {item.label}
          </Link>
        </NavigationMenuLink>
      );
    }

    return (
      <>
        <NavigationMenuTrigger
          className={cn(
            "text-sm font-normal px-2 py-2 rounded-md bg-transparent flex items-center min-h-11",
            "hover:text-white hover:bg-[var(--rh-500)]",
            "data-[state=open]:!bg-[var(--rh-500)] data-[state=open]:!text-white",
            "transition-colors duration-200"
          )}
        >
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="p-4 md:w-[600px] lg:w-[720px]">
            <ul className="grid gap-2 sm:grid-cols-2">
              {/* <ListItem
                title="Overview"
                href={item.href}
                className="text-[var(--rh-500)]"
              >
                A quick summary of this section.
              </ListItem> */}
              {item.children.map((sub) => (
                <ListItem
                  key={sub.href}
                  title={sub.label}
                  href={sub.href}
                  className="text-[var(--rh-500)]"
                >
                  {sub.description}
                </ListItem>
              ))}
            </ul>
          </div>
        </NavigationMenuContent>
      </>
    );
  };

  return (
    <div className="hidden lg:block">
      <NavigationMenu className="relative">
        <NavigationMenuList className="gap-1">
          {nav.map((item) => (
            <NavigationMenuItem key={item.label}>
              <ItemInner {...item} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <NavigationMenuViewport className="left-0 right-0" />
      </NavigationMenu>
    </div>
  );
}
/* ====================== Mobile ====================== */

export function MenuMobile({
  nav
}: {
  nav: NavItem[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="block lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[92vw] sm:w-96 p-4"
          aria-describedby="mobile-menu-desc"
        >
          <div className="mb-4 text-lg font-semibold">Reception House</div>
          <SheetHeader className="sr-only">
            <SheetTitle>Site navigation</SheetTitle>
            <SheetDescription id="mobile-menu-desc">
              Browse and open sections and pages of Reception House.
            </SheetDescription>
          </SheetHeader>

          <nav className="space-y-2">
            {nav.map((item) =>
              item.children ? (
                <Accordion type="single" collapsible key={item.label}>
                  <AccordionItem value="section">
                    <AccordionTrigger className="text-base font-normal">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-2">
                        {/* <Link
                          href={item.href}
                          className="block py-2 text-sm opacity-90"
                          onClick={() => setIsOpen(false)}
                        >
                          Overview
                        </Link> */}

                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block py-2 text-sm opacity-90"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
