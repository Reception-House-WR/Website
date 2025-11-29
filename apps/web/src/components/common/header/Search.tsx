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
  items: SearchSection[];
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

  const fuse = useMemo(() => {
    if (!items.length) return null;

    return new Fuse(items, {
      keys: ["label", "description"],
      includeScore: true,
      threshold: 0.3,
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
    const top = fuseResults.slice(0, 10).map((r) => r.item as SearchSection);

    setResults(top);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    runSearch(value);
  };

  const handleSelect = () => {
    setIsOpen(false);
  };

  // 🔹 Reusable results list, with `floating` to control positioning
  const ResultsList = ({ floating = false }: { floating?: boolean }) => {
    if (!isOpen || !query.trim()) return null;

    return (
      <div
        className={cn(
          "w-full bg-popover border rounded-md shadow-md max-h-72 overflow-auto text-sm z-50",
          floating ? "absolute left-0 top-full mt-2" : "mt-2"
        )}
      >
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
      <div className="hidden xl:flex flex-1 min-w-[180px] max-w-2xl">
        <div className="relative w-full">
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
          {/* 🔹 Floating dropdown so it doesn't push layout */}
          <ResultsList floating />
        </div>
      </div>

      {/* MD–LG: inline (narrow) search bar */}
      <div className="hidden md:flex lg:hidden w-full min-w-[180px]">
        <div className="relative w-full">
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
          {/* 🔹 Same floating behavior here */}
          <ResultsList floating />
        </div>
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
            {/* 🔹 Inside dialog we want it *below*, not floating */}
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
