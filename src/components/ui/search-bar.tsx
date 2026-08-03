"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

type SearchBarProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  onSearch,
  placeholder = "Search games",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(query.trim());
      }}
      role="search"
    >
      <label className="sr-only" htmlFor="site-search">
        {placeholder}
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <Input
          id="site-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          value={query}
          className="pl-9"
        />
      </div>
    </form>
  );
}
