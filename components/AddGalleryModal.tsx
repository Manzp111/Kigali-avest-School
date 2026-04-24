"use client";

import { useState, useEffect } from "react";

type GalleryItem = {
  id: string;
  title: string;
  subtitle?: string;
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
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState<"background" | "gallery">(initialData?.type || "gallery");
  const [published, setPublished] = useState(initialData?.published || false);
  const [loading, setLoading] = useState(false);

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("type", type);
      formData.append("published", String(published));
      if (image) formData.append("image", image);

      const url = isEditing ? `/api/gallery/${initialData.id}` : "/api/gallery";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        // If editing without a new image, you could send JSON instead, 
        // but FormData works for both scenarios if your API handles it.
        body: image ? formData : JSON.stringify({ title, subtitle, type, published }),
        headers: image ? {} : { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to save gallery item");

      onSuccess();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? "Edit Gallery Item" : "Add Gallery Image"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
            <input
              required
              className="w-full border border-slate-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subtitle</label>
            <input
              className="w-full border border-slate-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setType("background")}
              className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-all ${
                type === "background" ? "border-blue-600 bg-blue-50 text-blue-700" : "bg-white text-slate-600"
              }`}
            >
              Background
            </button>
            <button
              type="button"
              onClick={() => setType("gallery")}
              className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-all ${
                type === "gallery" ? "border-blue-600 bg-blue-50 text-blue-700" : "bg-white text-slate-600"
              }`}
            >
              Gallery
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border">
            <span className="text-sm font-semibold text-slate-700">Published Status</span>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${published ? "bg-emerald-500" : "bg-slate-300"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${published ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {isEditing ? "Replace Image (Optional)" : "Image File *"}
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 bg-slate-100 p-3 rounded-xl font-medium">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-blue-700 text-white p-3 rounded-xl font-medium shadow-lg active:scale-95 transition-all">
              {loading ? "Saving..." : isEditing ? "Update Item" : "Save to Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}