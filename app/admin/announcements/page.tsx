"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import AnnouncementModal from "@/components/announcement/AnnouncementModal";
import DeleteConfirmModal from "@/components/announcement/DeleteConfirmModal";
import { apiClient } from "@/lib/utils/apiClient";
import { 
  Plus, Search, Edit2, Trash2, 
  Megaphone, CheckCircle, FileText,
  ChevronLeft, ChevronRight 
} from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  message: string;
  imageUrl?: string | null;
  isPublished: boolean;
  userId?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

type Filter = "all" | "published" | "draft";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-RW", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AnnouncementsPage() {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => { fetchAnnouncements(); }, [page, filter]);

  async function fetchAnnouncements() {
    setLoading(true);
    try {
      // Assuming your backend handles ?page and ?status
      const res = await apiClient(`/api/announcement?page=${page}&limit=2&status=${filter}`);
      if (res.success) {
        setData(res.data ?? []);
        setTotalPages(res.meta?.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function togglePublish(id: string, current: boolean) {
    // Optimistic Update
    const originalData = [...data];
    setData((prev) => prev.map((a) => (a.id === id ? { ...a, isPublished: !current } : a)));

    try {
      const res = await apiClient(`/api/announcement/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isPublished: !current }),
      });
      if (!res.success) throw new Error();
    } catch (err) {
      // Rollback on error
      setData(originalData);
      console.error("Toggle failed", err);
    }
  }

 const filtered = useMemo(() => {
  return data.filter((item) => {
    // 1. Status Filter Logic
    const matchFilter = 
      filter === "all" || 
      (filter === "published" ? item.isPublished === true : item.isPublished === false);

    // 2. Search Query Logic
    const matchQuery = 
      !query || item.title.toLowerCase().includes(query.toLowerCase());

    // Only return items that satisfy BOTH
    return matchFilter && matchQuery;
  });
}, [data, filter, query]);

  if (loading && data.length === 0) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31E24]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 font-sans text-slate-900">
      <AnnouncementModal open={formOpen} onClose={() => setFormOpen(false)} onSuccess={fetchAnnouncements} announcement={editTarget} userId="ADMIN_ID" />
      <DeleteConfirmModal open={deleteOpen} onClose={() => setDeleteOpen(false)} onSuccess={fetchAnnouncements} announcement={deleteTarget} />

      {/* --- Top Header --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
            <Image src="/image/logo.jpeg" alt="KHS Logo" fill className="object-contain p-2" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kigali Harvest School</h1>
            <p className="text-slate-500 text-sm">Communication & Announcement Center</p>
          </div>
        </div>
        <button 
          onClick={() => { setEditTarget(null); setFormOpen(true); }}
          className="flex items-center justify-center gap-2 bg-[#E31E24] hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-100"
        >
          <Plus size={18} />
          <span>New Post</span>
        </button>
      </header>

      {/* --- Stats Summary --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Posts" value={data.length} icon={<Megaphone className="text-blue-500" />} />
        <StatCard label="Live on Site" value={data.filter(a => a.isPublished).length} icon={<CheckCircle className="text-green-500" />} />
        <StatCard label="Drafts" value={data.filter(a => !a.isPublished).length} icon={<FileText className="text-amber-500" />} />
      </section>

      {/* --- Main Content Card --- */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-fit">
            {(["all", "published", "draft"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filter === f ? "bg-[#E31E24] text-white shadow-md" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#E31E24] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search page..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E31E24] w-full md:w-72 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Content Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Message Preview</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{formatDate(item.createdAt)}</div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-600 line-clamp-1 max-w-xs">{item.message}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => togglePublish(item.id, item.isPublished)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          item.isPublished ? "bg-green-500" : "bg-slate-300"
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.isPublished ? "translate-x-6" : "translate-x-1"
                        }`} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditTarget(item); setFormOpen(true); }}
                        className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => { setDeleteTarget(item); setDeleteOpen(true); }}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Pagination Footer --- */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Page {page} <span className="mx-1 opacity-30">/</span> {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:border-[#E31E24] hover:text-[#E31E24] transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:border-[#E31E24] hover:text-[#E31E24] transition-all shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-inner">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black text-slate-900 leading-none">{value}</div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">{label}</div>
      </div>
    </div>
  );
}