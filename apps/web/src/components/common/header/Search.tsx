"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SearchSection } from "@/lib/search/types";


type SearchProps = {
  items: SearchSection[];                 // 🔹 list of sections/pages
  placeholder?: string;
  className?: string;
};

export default function Search({
  items,
  placeholder = "Search…",
  className,
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchSection[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Build Fuse index once (or when items change)
  const fuse = useMemo(() => {
    if (!items.length) return null;

    return new Fuse(items, {
      keys: ["label", "description"],
      includeScore: true,
      threshold: 0.3, // 0.2–0.4 is a good fuzzy range
    });
  }, [items]);

  const runSearch = (value: string) => {
    const q = value.trim();
    if (!fuse || !q) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fuseResults = fuse.search(q);
    const top = fuseResults.slice(0, 10).map((r: unknown) => (r as { item: SearchSection }).item);

    setResults(top);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    // live search as user types
    runSearch(value);
  };

  const handleSelect = () => {
    // close results when user clicks a result
    setIsOpen(false);
  };

  const ResultsList = () => {
    if (!isOpen || !query.trim()) return null;

    return (
      <div className="mt-2 w-full bg-popover border rounded-md shadow-md max-h-72 overflow-auto text-sm">
        {results.length === 0 ? (
          <div className="px-3 py-2 text-muted-foreground">No results</div>
        ) : (
          <ul>
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 hover:bg-muted"
                  onClick={handleSelect}
                >
                  <div className="font-medium">{item.pageLabel}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center w-full", className)}>
      {/* XL: inline search bar */}
      <div className="hidden xl:flex flex-1 min-w-[180px] max-w-2xl flex-col">
        <form onSubmit={handleSubmit}>
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={placeholder}
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              className="pl-10"
              aria-label="Search website"
            />
          </div>
        </form>
        <ResultsList />
      </div>

      {/* MD–LG: inline (narrow) search bar */}
      <div className="hidden md:flex lg:hidden w-full min-w-[180px] flex-col">
        <form onSubmit={handleSubmit}>
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={placeholder}
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              className="pl-10"
              aria-label="Search website"
            />
          </div>
        </form>
        <ResultsList />
      </div>

      {/* LG: icon opens dialog */}
      <div className="hidden lg:flex xl:hidden">
        <Dialog onOpenChange={(open) => !open && setIsOpen(false)}>
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
                  onChange={(e) => handleChange(e.target.value)}
                  className="pl-10"
                  aria-label="Search website"
                />
              </div>
            </form>
            <ResultsList />
          </DialogContent>
        </Dialog>
      </div>

      {/* < MD: icon opens dialog */}
      <div className="md:hidden">
        <Dialog onOpenChange={(open) => !open && setIsOpen(false)}>
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
                  onChange={(e) => handleChange(e.target.value)}
                  className="pl-10"
                  aria-label="Search website"
                />
              </div>
            </form>
            <ResultsList />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
