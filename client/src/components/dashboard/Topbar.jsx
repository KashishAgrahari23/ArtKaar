"use client";

import { Bell, LogOut } from "lucide-react";

import Button from "../common/Button";
import { useAuth } from "@/context/AuthContext";
import * as authService from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function Topbar() {

  const { user, setUser } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {

    await authService.logout();

    setUser(null);

    router.replace("/login");

  };

  return (
    <header className="h-20 border-b bg-white flex items-center justify-between px-8">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back, {user?.name}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button className="h-11 w-11 rounded-xl border flex items-center justify-center hover:bg-gray-50">

          <Bell size={18} />

        </button>

        <Button
          variant="secondary"
          icon={<LogOut size={16} />}
          onClick={handleLogout}
        >
          Logout
        </Button>

      </div>

    </header>
  );
}