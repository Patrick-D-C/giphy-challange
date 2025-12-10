import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Buscar GIFs...",
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const term = value.trim();
    onSearch(term);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-4 w-full max-w-2xl"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 w-full"
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="px-4 py-2 text-sm rounded-lg bg-blue-900 text-white hover:bg-blue-800 w-full sm:w-auto"
      >
        Buscar
      </button>
    </form>
  );
}
