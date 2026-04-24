"use client";

import { useState } from "react";


type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddGalleryModal({ onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("subtitle", subtitle);

      // ✅ REQUIRED IMAGE ONLY
      if (!image) {
        alert("Please select an image");
        setLoading(false);
        return;
      }

      formData.append("image", image);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create");

      onSuccess();
      onClose();
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Gallery Image</h2>

          <button onClick={onClose} className="text-slate-500">
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TITLE */}
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* SUBTITLE */}
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          {/* IMAGE ONLY */}
          <div>
            <label className="text-sm font-medium">
              Upload Image (Required)
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 p-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-800 text-white p-2 rounded-lg hover:bg-blue-900"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}