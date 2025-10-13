"use client"

import { useState } from "react"
import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

type SearchProps = {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export default function Search({ onSearch, placeholder = "Search...", className }: SearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className={className}>
      {/* Desktop */}
      <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-md">
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

      {/* Mobile */}
      <form onSubmit={handleSubmit} className="md:hidden pb-3">
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
    </div>
  )
}
