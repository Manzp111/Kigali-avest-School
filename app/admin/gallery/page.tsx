"use client";

import { useEffect, useState } from "react";
import AddGalleryModal from "@/components/AddGalleryModal";
import { apiClient } from "@/lib/utils/apiClient";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Image as LucideImageIcon
} from "lucide-react";

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

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Gallery | null>(null);

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
      
      const res = await apiClient(`/api/gallery?${params.toString()}`);
      setItems(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModalId) return;
    try {
      const res = await apiClient(`/api/gallery/${deleteModalId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((item) => item.id !== deleteModalId));
      setDeleteModalId(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdateStatus = async (item: Gallery) => {
    try {
      const res = await apiClient(`/api/gallery/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      if (res.ok) fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    try {
      const res = await apiClient(`/api/gallery/${editItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editItem.title,
          subtitle: editItem.subtitle || null,
          type: editItem.type,
        }),
      });
      if (res.ok) {
        fetchGallery();
        setEditItem(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-[#f8fafc] min-h-screen font-sans">
      {/* ADD MODAL */}
      {open && (
        <AddGalleryModal 
          onClose={() => setOpen(false)} 
          onSuccess={() => { fetchGallery(); setOpen(false); }} 
        />
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-[#E31E24] rounded-2xl flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Permanent Action</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">This will delete the asset from the servers. You cannot undo this.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModalId(null)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-4 bg-[#E31E24] text-white font-black rounded-2xl hover:bg-red-700 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-red-100">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Edit Asset</h3>
                <p className="text-[10px] font-bold text-[#E31E24] uppercase tracking-widest mt-1">Information Portal</p>
              </div>
              <button type="button" onClick={() => setEditItem(null)} className="p-3 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Asset Title</label>
                <input 
                  type="text" 
                  value={editItem.title} 
                  onChange={(e) => setEditItem({...editItem, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:bg-white focus:border-[#E31E24] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Description</label>
                <textarea 
                  value={editItem.subtitle || ""} 
                  onChange={(e) => setEditItem({...editItem, subtitle: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:bg-white focus:border-[#E31E24] outline-none h-24 resize-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Asset Type</label>
                <select 
                  value={editItem.type} 
                  onChange={(e) => setEditItem({...editItem, type: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:bg-white focus:border-[#E31E24] outline-none transition-all"
                >
                  <option value="gallery">Standard Gallery</option>
                  <option value="background">Page Background</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#E31E24] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-red-100 hover:bg-red-700 active:scale-95 transition-all">Update Asset</button>
          </form>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">KIGALI HARVEST <span className="text-[#E31E24]">GALLERY</span></h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Administrative Media Console</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-50 border-none rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest shadow-sm outline-none focus:ring-2 focus:ring-[#E31E24] cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="background">Backgrounds</option>
            <option value="gallery">Gallery</option>
          </select>

          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#E31E24] transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        </div>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-32 gap-4">
          <div className="w-12 h-12 border-[5px] border-slate-100 border-t-[#E31E24] rounded-full animate-spin"></div>
          <p className="font-black text-slate-300 uppercase tracking-widest text-[10px]">Loading assets...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <LucideImageIcon size={40} />
          </div>
          <p className="text-slate-400 font-black text-sm uppercase tracking-widest">Repository Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute top-5 right-5">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                    className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl text-slate-900 shadow-xl hover:bg-[#E31E24] hover:text-white transition-all"
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {openMenuId === item.id && (
                    <div className="absolute right-0 mt-3 w-44 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-50 animate-in fade-in zoom-in-95">
                      <button 
                        className="w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-600"
                        onClick={() => { setEditItem(item); setOpenMenuId(null); }}
                      >
                        <Pencil size={14} className="text-blue-500" /> Edit
                      </button>
                      <button 
                        onClick={() => { setDeleteModalId(item.id); setOpenMenuId(null); }} 
                        className="w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#E31E24] hover:bg-red-50 border-t border-slate-50 transition-colors flex items-center gap-3"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="bg-white text-slate-900 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h2 className="font-black text-lg text-slate-900 truncate mb-1 leading-tight uppercase">
                  {item.title}
                </h2>
                <p className="text-[11px] font-bold text-slate-400 truncate mb-6">
                  {item.subtitle || "Portal Asset"}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <button 
                    onClick={() => handleUpdateStatus(item)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      item.published 
                        ? "bg-green-50 text-green-600 border border-green-100" 
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {item.published ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {item.published ? "Active" : "Draft"}
                  </button>
                  
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
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