"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}

      <Toaster
        richColors
        position="top-right"
      />
    </AuthProvider>
  );
}