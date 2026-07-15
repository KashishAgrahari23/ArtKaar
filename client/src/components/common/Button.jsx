import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  loading = false,
  disabled = false,
  icon,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0D3B82]/30 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-[#0D3B82] text-white hover:bg-[#0A2E65] shadow-md hover:shadow-lg",

    secondary:
      "border border-[#0D3B82] text-[#0D3B82] hover:bg-[#0D3B82] hover:text-white",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    ghost:
      "text-[#0D3B82] hover:bg-[#EEF4FF]",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={classes}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        icon
      )}

      {children}
    </button>
  );
}