"use client";

import type React from "react";
import { ChevronDownIcon } from "./icon";

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Accordion({ title, children, isOpen, onToggle }: AccordionProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none"
      >
        <div className="font-bold text-xl">{title}</div>
        <ChevronDownIcon className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}
