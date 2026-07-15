"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(
  (
    {
      label,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={show ? "text" : "password"}
            className={`
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            pr-12
            text-sm
            outline-none
            transition-all
            duration-200
            placeholder:text-gray-400
            focus:border-[#0D3B82]
            focus:ring-4
            focus:ring-[#0D3B82]/10
            ${error ? "border-red-500" : ""}
            ${className}
          `}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName =
  "PasswordInput";

export default PasswordInput;