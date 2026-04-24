import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* 1. SIDEBAR */}
      <Sidebar />

      {/* 2. RIGHT SIDE */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* 3. NAVBAR */}
        <Navbar />

        {/* 4. CONTENT */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {children}

          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -z-10 p-20 opacity-20">
            <div className="w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
