"use client";

import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  category: string;
  onRemove: () => void;
}

export default function FilterChip({
  label,
  category,
  onRemove,
}: FilterChipProps) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
      <span className="text-gray-500 mr-1">{category}:</span>
      {label}
      <button
        onClick={onRemove}
        className="ml-1.5 text-gray-500 hover:text-gray-700"
        aria-label={`Remove ${category} filter: ${label}`}
      >
        <X size={14} />
      </button>
    </div>
  );
}
