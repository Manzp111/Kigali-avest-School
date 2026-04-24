"use client";

import { useEffect, useState } from "react";
import AddGalleryModal from "@/components/AddGalleryModal";
import Image from "next/image";

type Gallery = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  published: boolean;
  type: "background" | "gallery";
  updatedAt: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Filter States
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPublished, setFilterPublished] = useState<string>("all");

  useEffect(() => {
    fetchGallery();
  }, [filterType, filterPublished]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterType !== "all") params.append("type", filterType);
      if (filterPublished !== "all") params.append("published", filterPublished);
      
      const res = await fetch(`/api/gallery?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setItems((prev) => prev.filter((item) => item.id !== id));
      setOpenMenuId(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {open && (
        <AddGalleryModal 
          onClose={() => setOpen(false)} 
          onSuccess={() => { fetchGallery(); setOpen(false); }} 
        />
      )}

      {/* HEADER SECTION WITH LOGO */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image 
              src="/image/logo.jpeg" // Ensure your logo is saved as logo.png in the /public folder
              alt="KHS Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight"> K.H.S Gallery </h1>
            {/* <p className="text-slate-500 font-medium">Kigali Harvest School C</p> */}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
          >
            <option value="all">All Types</option>
            <option value="background">Backgrounds</option>
            <option value="gallery">Gallery</option>
          </select>

          <select 
            value={filterPublished}
            onChange={(e) => setFilterPublished(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
          >
            <option value="all">All Status</option>
            <option value="true">Published Only</option>
            <option value="false">Drafts Only</option>
          </select>

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Content
          </button>
        </div>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-32 text-slate-400 gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="animate-pulse font-medium">Refreshing Gallery...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-32 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 bg-slate-50/50">
          <p className="text-lg">No items found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              
              {/* IMAGE AREA */}
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* DOTS MENU BUTTON */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                    className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg text-slate-700 hover:bg-white transition-all"
                  >
                    <span className="font-bold text-xl mb-1">⋮</span>
                  </button>
                  
                  {openMenuId === item.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-20 overflow-hidden ring-1 ring-black ring-opacity-5">
                        <button 
                          className="w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-700"
                          onClick={() => { alert("Edit feature coming soon"); setOpenMenuId(null); }}
                        >
                          ✏️ Edit Details
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="w-full text-left px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 border-t border-slate-50 transition-colors flex items-center gap-3"
                        >
                          🗑️ Delete Image
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* DETAILS AREA */}
              <div className="p-6">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h2 className="font-bold text-xl text-slate-800 truncate flex-1" title={item.title}>
                    {item.title}
                  </h2>
                </div>

                <p className="text-sm text-slate-500 truncate h-5 mb-6">
                  {item.subtitle || <span className="italic opacity-40">No description provided</span>}
                </p>

                {/* BOTTOM BADGES */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      item.published 
                        ? "bg-emerald-100 text-emerald-600 border border-emerald-200" 
                        : "bg-amber-100 text-amber-600 border border-amber-200"
                    }`}>
                      {item.published ? "Published" : "Draft"}
                    </span>
                    <span className="bg-slate-100 text-slate-500 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}