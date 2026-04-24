"use client";

import { useEffect, useState } from "react";
import AddGalleryModal from "@/components/AddGalleryModal";

type Gallery = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  published: boolean;
};

export default function GalleryPage() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

 const handleDelete = async (id: string) => {
  const res = await fetch(`/api/gallery/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("Failed to delete");
    return;
  }

  setItems((prev) => prev.filter((item) => item.id !== id));
};

  return (
    <div className="p-6">

      {/* MODAL (ONLY ONCE) */}
      {open && (
        <AddGalleryModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            fetchGallery();
            setOpen(false);
          }}
        />
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Gallery
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-900"
        >
          + Add Image
        </button>
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-sm border hover:shadow-lg transition"
            >

              {/* IMAGE */}
              <img
                src={item.imageUrl}
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="font-bold text-slate-800">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>

              {/* 3 DOT MENU */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() =>
                    setOpenMenuId(
                      openMenuId === item.id ? null : item.id
                    )
                  }
                  className="text-slate-600 text-xl"
                >
                  ⋮
                </button>

                {openMenuId === item.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg overflow-hidden">

                    <button
                      className="w-full text-left px-3 py-2 hover:bg-slate-100"
                      onClick={() => alert("Edit " + item.id)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️ Delete
                    </button>

                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}