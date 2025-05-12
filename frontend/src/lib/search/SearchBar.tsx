import React from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400"></SearchIcon>
      </div>
      <Input
        type="text"
        placeholder="Type to search..."
        className="pl-10 w-full bg-white border-gray-200"
      />
    </div>
  );
}