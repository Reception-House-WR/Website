"use client"

import { useState } from "react"
import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type SearchProps = {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export default function Search({
  onSearch,
  placeholder = "Search...",
  className,
}: SearchProps) {
  const [query, setQuery] = useState("")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className={cn("flex items-center w-full", className)}>
      {/* ≥1280px: inline  */}
      <form
        onSubmit={handleSubmit}
        className="hidden xl:flex flex-1 min-w-[180px] max-w-2xl"
      >
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search website"
          />
        </div>
      </form>

      {/* md–lg-1 (≈768–1023): inline  */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex lg:hidden w-full min-w-[180px]"
      >
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search website"
          />
        </div>
      </form>

      {/* lg–xl-1: icon */}
      <div className="hidden lg:flex xl:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open search">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader className="sr-only">
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>Type to search the site</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  autoFocus
                  type="search"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                  aria-label="Search website"
                />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* < md (mobile): icon */}
      <div className="md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open search">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader className="sr-only">
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>Type to search the site</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  autoFocus
                  type="search"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                  aria-label="Search website"
                />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
