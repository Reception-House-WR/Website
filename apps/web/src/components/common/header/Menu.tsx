"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const NAV = [
  { label: "Home", href: "/" },

  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Our People",
        href: "/about/people",
        description: "Meet the team behind Reception House.",
      },
      {
        label: "Our Purpose",
        href: "/about/purpose",
        description: "What we do and why we exist.",
      },
      {
        label: "Our History",
        href: "/about/history",
        description: "Milestones and impact over the years.",
      },
      {
        label: "Contact Us",
        href: "/contact",
        description: "Get in touch or visit our offices.",
      },
    ],
  },

  {
    label: "Programs & Services",
    href: "/programs",
    children: [
      {
        label: "Healthcare & Wellbeing",
        href: "/programs/healthcare-wellbeing",
        description: "Primary care access, mental health and wellness.",
      },
      {
        label: "Temporary Accommodation & Housing",
        href: "/programs/housing",
        description: "Short-term stays and pathways to permanent housing.",
      },
      {
        label: "Children & Youth",
        href: "/programs/children-youth",
        description: "Support for school readiness and youth programs.",
      },
      {
        label: "Employment Services",
        href: "/programs/employment",
        description: "Job search help, coaching and employer links.",
      },
      {
        label: "Integration Skills Training",
        href: "/programs/integration-skills",
        description: "Language and life skills for newcomers.",
      },
      {
        label: "French Services",
        href: "/programs/french-services",
        description: "Services en français pour les nouveaux arrivants.",
      },
    ],
  },

  { label: "Events", href: "/events" },

  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      {
        label: "Volunteer Sign Up",
        href: "/get-involved/volunteer",
        description: "Share your time and skills with our community.",
      },
      {
        label: "Rent to Refugees",
        href: "/get-involved/rent-to-refugees",
        description: "Landlords: offer a unit and change a life.",
      },
      {
        label: "Careers",
        href: "/get-involved/careers",
        description: "Join our staff—see current openings.",
      },
    ],
  },

  { label: "Stories", href: "/stories" },
  { label: "Donate", href: "/donate" },
  { label: "Media Room", href: "/media" },
]

/* ====================== Desktop  ====================== */
export function MenuDesktop() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/")

  const ItemInner = (item: (typeof NAV)[number]) => {
    if (!item.children) {
      return (
        <NavigationMenuLink asChild data-active={isActive(item.href)}>
          <Link
            href={item.href}
            className={cn(
              "py-2 px-2 text-sm rounded-md", 
              "hover:!bg-[var(--rh-500)] hover:text-white",
              "data-[active=true]:bg-gray-900 data-[active=true]:text-white",
            )}
          >
            {item.label}
          </Link>
        </NavigationMenuLink>
      )
    }

    return (
      <>
        <NavigationMenuTrigger className="text-sm font-normal px-2 rounded-md bg-transparent
             hover:text-white hover:bg-[var(--rh-500)] 
             data-[state=open]:!bg-[var(--rh-500)] data-[state=open]:!text-white 
             transition-colors duration-200">
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="p-4 md:w-[600px] lg:w-[720px]">
            <ul className="grid gap-2 sm:grid-cols-2">
              <ListItem title="Overview" href={item.href}>
                A quick summary of this section.
              </ListItem>
              {item.children.map((sub) => (
                <ListItem key={sub.href} title={sub.label} href={sub.href}>
                  {sub.description}
                </ListItem>
              ))}
            </ul>
          </div>
        </NavigationMenuContent>
      </>
    )
  }

  return (
    <div className="hidden md:block">
      <NavigationMenu className="relative">
        <NavigationMenuList className="gap-0">
          {NAV.map((item) => (
            <NavigationMenuItem key={item.label}>
              <ItemInner {...item} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <NavigationMenuViewport className="left-0 right-0" />
      </NavigationMenu>
    </div>
  )
}


/* ====================== Mobile ====================== */
import { Sheet, SheetContent, SheetTrigger,
  SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ListItem } from "./Listitem"

export function MenuMobile() {
  return (
    <div className="block min-[1000px]:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[92vw] sm:w-96 p-4" aria-describedby={undefined}>
          <div className="mb-4 text-lg font-semibold">Reception House</div>
          <SheetHeader className="sr-only">
            <SheetTitle>Site navigation</SheetTitle>
            <SheetDescription id="mobile-menu-desc">
              Browse and open sections and pages of Reception House.
            </SheetDescription>
          </SheetHeader>

          <nav className="space-y-2">
            {NAV.map((item) =>
              item.children ? (
                <Accordion type="single" collapsible key={item.label}>
                  <AccordionItem value="section">
                    <AccordionTrigger className="text-base font-normal">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-2">
                        <Link
                          href={item.href}
                          className="block py-2 text-sm opacity-90"
                        >
                          Overview
                        </Link>
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block py-2 text-sm opacity-90"
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
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MenuDesktop
