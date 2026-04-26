"use client";

import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    // Strict session check: both token and user profile must exist
    if (!token || !user) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // Prevent flickering of protected content before check is complete
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E31E24]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}