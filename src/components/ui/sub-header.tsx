"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubHeaderTab {
  name: string;
  href: string;
}

interface SubHeaderProps {
  tabs: SubHeaderTab[];
}

export default function SubHeader({ tabs }: SubHeaderProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`whitespace-nowrap py-5 px-1 border-b-2 font-medium text-md ${
                  pathname === tab.href
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
