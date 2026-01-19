import type React from "react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  color?: "green" | "blue" | "indigo" | "red" | "gray";
  children: React.ReactNode;
}

const colorMap = {
  green: {
    base: "bg-green-500",
    hover: "hover:bg-green-600",
    ring: "focus:ring-green-500",
    disabled: "disabled:bg-green-400",
  },
  blue: {
    base: "bg-blue-500",
    hover: "hover:bg-blue-600",
    ring: "focus:ring-blue-500",
    disabled: "disabled:bg-blue-200",
  },
  indigo: {
    base: "bg-indigo-600",
    hover: "hover:bg-indigo-700",
    ring: "focus:ring-indigo-500",
    disabled: "disabled:bg-indigo-200",
  },
  red: {
    base: "bg-red-500",
    hover: "hover:bg-red-600",
    ring: "focus:ring-red-500",
    disabled: "disabled:bg-red-200",
  },
  gray: {
    base: "bg-gray-500",
    hover: "hover:bg-gray-600",
    ring: "focus:ring-gray-500",
    disabled: "disabled:bg-gray-200",
  },
};

export default function ActionButton({ icon, color = "green", children, className = "", ...props }: ActionButtonProps) {
  const colorClass = colorMap[color];
  return (
    <button
      type={props.type || "button"}
      className={`px-4 py-2 text-white rounded-md transition-colors font-medium flex items-center gap-2
        ${colorClass.base} ${colorClass.hover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClass.ring} ${colorClass.disabled} disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
