import React from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

type SearchInputProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInput = ({ search, setSearch }: SearchInputProps) => {
  return (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
      <Input
        placeholder="Search name, email or ID…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9 rtl:pl-3 rtl:pr-9 bg-background"
      />
    </div>
  );
};
