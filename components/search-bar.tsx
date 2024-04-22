import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SearchBar({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [originalPath, setOriginalPath] = useState(pathname);

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      if (pathname !== "/search") {
        setOriginalPath(pathname);
      }
      params.set('query', term);
      replace(`search?${params.toString()}`);
    } else {
      params.delete('query');
      replace(originalPath);
    }
  }, 500);

  return (
    <div className="relative flex flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input type="search" id="search"
        className={cn(
          "peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 pr-8 mx-2 text-sm outline-2 placeholder:text-gray-500",
          "focus-visible:ring-0 focus-visible:ring-transparent focus:ring-0 focus:ring-offset-transparent",
          "hover:bg-accent border-b-1 border-b-gray-400 focus:border-b-sky-700 focus:border-b-2", 
          // "mb-1/2 mt-0 focus:mb-0 focus:mt-1/2"
        )}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button variant={"ghost"} 
        className="absolute right-2 top-1/2 py-0 px-2 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" >
        <MagnifyingGlassIcon />
      </Button>
    </div>
  );
}