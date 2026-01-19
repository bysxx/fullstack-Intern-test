"use client";
import LogoutButton from "@components/auth/logout-button";
import { ChartBarIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useUserQuery } from "app/(auth)/query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const DISABLED_NAVIGATION = ["/login", "/register"];

const navigationStructure = [
  {
    name: "메인",
    children: [{ name: "메인", href: "/", icon: ChartBarIcon }],
  },
];

function GlobalNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { data: user, isLoading } = useUserQuery();

  const navigation = useMemo(
    () =>
      navigationStructure.map((item) => ({
        ...item,
        current: item.children.some((child) => pathname.startsWith(child.href)),
        children: item.children.map((child) => ({
          ...child,
          current: pathname.startsWith(child.href),
        })),
      })),
    [pathname],
  );

  if (DISABLED_NAVIGATION.includes(pathname)) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-sm" onMouseLeave={() => setOpenMenu(null)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500"
            >
              Hello
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative py-2"
                  onMouseEnter={() => setOpenMenu(item.name)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      item.current
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${openMenu === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`absolute z-30 top-full w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${
                      openMenu === item.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-4 py-2 text-sm ${
                            child.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                          onClick={() => setOpenMenu(null)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">메뉴 열기</span>
                {isMobileMenuOpen ? (
                  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-16 left-0 w-full md:hidden bg-white shadow-lg transition-all duration-200 ease-out origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigationStructure
            .flatMap((item) => item.children)
            .map((child) => (
              <Link
                key={child.name}
                href={child.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname.startsWith(child.href)
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {child.name}
              </Link>
            ))}

          {isLoading ? (
            <div className="w-[72px] h-4 bg-gray-200 animate-pulse" />
          ) : user ? (
            <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
              <LogoutButton className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800" />
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link
                href="/login"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default GlobalNav;
