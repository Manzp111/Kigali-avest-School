// app/dashboard/layout.tsx
"use client";
import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    router.replace("/login");
  }
}, [router]);
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {/* Content changes here based on the URL */}
          <div className="p-6">
            {children}
          </div>

          <div className="absolute top-0 right-0 -z-10 p-20 opacity-20 pointer-events-none">
            <div className="w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          </div>
        </main>
      </div>
    </div>
  );
}