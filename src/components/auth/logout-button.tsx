"use client";

import { signOut } from "app/(auth)/actions";
import { useRouter } from "next/navigation";
import type React from "react";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className = "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
  children = "로그아웃",
}: LogoutButtonProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}
