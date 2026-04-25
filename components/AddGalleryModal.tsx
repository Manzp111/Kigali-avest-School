"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, ShieldAlert } from "lucide-react";

type GalleryItem = {
  id: string;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  published: boolean;
  type: "background" | "gallery";
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: GalleryItem | null;
};

export default function AddGalleryModal({ onClose, onSuccess, initialData }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState<"background" | "gallery">(initialData?.type || "gallery");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEditing = !!initialData;

  // Authentication check on mount
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const token = localStorage.getItem("accessToken");

    try {
      const url = isEditing ? `/api/gallery/${initialData.id}` : "/api/gallery";
      const method = isEditing ? "PATCH" : "POST";

      let body: BodyInit;
      const headers: Record<string, string> = {
        "Authorization": `Bearer ${token}`,
      };

      if (image) {
        // If image exists, use FormData (Multipart)
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle || "");
        formData.append("type", type);
        formData.append("published", String(published));
        formData.append("image", image);
        body = formData;
        // Do NOT set Content-Type for FormData; the browser handles boundaries automatically
      } else {
        // If no image, send as JSON
        body = JSON.stringify({ title, subtitle, type, published });
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(url, {
        method,
        body,
        headers,
      });

      const result = await res.json();

      if (res.ok && (result.success || result.id)) {
        onSuccess();
        router.refresh();
        onClose();
      } else {
        setErrorMessage(result?.error || "The server rejected this request.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
        
        {/* Error Overlay */}
        {errorMessage && (
          <div className="absolute inset-0 z-[110] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-red-50 text-[#E31E24] rounded-2xl flex items-center justify-center mb-4">
              <ShieldAlert size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Sync Failed</h3>
            <p className="text-slate-500 text-sm mt-2 mb-8 font-medium">{errorMessage}</p>
            <button 
              onClick={() => setErrorMessage(null)}
              className="px-8 py-3 bg-[#1D4F91] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#153a6b] transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center px-10 py-8 border-b border-slate-50">
          <div>
            <h2 className="text-2xl font-black text-[#1D4F91] tracking-tight">
              {isEditing ? "EDIT ASSET" : "NEW ASSET"}
            </h2>
            <p className="text-[10px] font-bold text-[#E31E24] uppercase tracking-widest mt-1">Portal Management</p>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-red-50 hover:text-[#E31E24] rounded-2xl text-slate-400 transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Asset Title</label>
            <input
              required
              placeholder="e.g. Annual School Event"
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-[#1D4F91] outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Description</label>
            <textarea
              placeholder="Enter context for this media..."
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-[#1D4F91] outline-none h-24 resize-none transition-all"
              value={subtitle || ""}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Placement Type</label>
              <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                {(["gallery", "background"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      type === t ? "bg-[#1D4F91] text-white shadow-md" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Visibility Status</span>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${published ? "bg-emerald-500" : "bg-slate-300"}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${published ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#1D4F91]/30 transition-colors">
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
              {isEditing ? "Replace Current Image" : "Upload Image Asset"}
            </label>
            <input
              type="file"
              accept="image/*"
              required={!isEditing}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#1D4F91] file:text-white hover:file:bg-[#E31E24] file:transition-all cursor-pointer"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
            >
              Dismiss
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 bg-[#E31E24] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-[#c1191f] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Syncing..." : isEditing ? "Save Changes" : "Commit to Portal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}