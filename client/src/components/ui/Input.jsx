import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
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

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;