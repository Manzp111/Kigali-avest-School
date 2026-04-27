"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Save, AlertCircle, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { Announcement } from "@/lib/types/announcement.types";
import { apiClient } from "@/lib/utils/apiClient"; 

type AnnouncementFormData = {
  title: string;
  message: string;
  imageUrl: string;
  isPublished: boolean;
  userId: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  announcement?: Announcement | null;
  userId: string;
};

const EMPTY: AnnouncementFormData = {
  title: "",
  message: "",
  imageUrl: "",
  isPublished: false,
  userId: "",
};

export default function AnnouncementModal({ open, onClose, onSuccess, announcement, userId }: Props) {
  const isEdit = Boolean(announcement);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<AnnouncementFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof AnnouncementFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  

  useEffect(() => {
    if (open) {
      if (announcement) {
        setForm({
          title: announcement.title ?? "",
          message: announcement.message ?? "",
          imageUrl: announcement.imageUrl ?? "",
          isPublished: announcement.isPublished ?? false,
          userId: announcement.userId ?? userId,
        });
      } else {
        setForm({ ...EMPTY, userId });
      }
      setErrors({});
      setServerError("");
    }
  }, [open, announcement, userId]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  function setField(field: keyof AnnouncementFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof AnnouncementFormData, string>> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.message.trim()) e.message = "Message content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
async function handleSubmit() {
  if (!validate()) return;

  setLoading(true);
  setServerError("");

  const payload = {
    title: form.title.trim(),
    message: form.message.trim(),
    imageUrl: form.imageUrl.trim() || null,
    isPublished: form.isPublished,
    userId,
  };

  try {
    const url = isEdit
      ? `/api/announcement/${announcement?.id}`
      : "/api/announcement";

    const method = isEdit ? "PATCH" : "POST";

    const res = await apiClient(url, {
      method,
      body: JSON.stringify(payload),
    });

    // 🔥 SAFE CHECK
    if (!res || !res.success) {
      const errors = res?.errors?.fieldErrors;

      const message = errors
        ? Object.values(errors).flat().join(", ")
        : res?.message || "Failed to save announcement";

      throw new Error(message);
    }

    onSuccess();
    onClose();

  } catch (err: any) {
    console.error("Submit Error:", err);
    setServerError(err.message || "An unexpected error occurred");
  } finally {
    setLoading(false);
  }
}

  if (!open) return null;

  return (
    <div 
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-300 overflow-y-auto">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-none">
              {isEdit ? "Update Post" : "New Post"}
            </h2>
            <p className="text-[10px] text-[#E31E24] font-bold uppercase tracking-[0.2em] mt-2">
              Kigali Harvest Portal
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-[#E31E24] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Heading</label>
            <input 
              type="text"
              placeholder="Announcement title..."
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              className={`w-full px-5 py-3.5 rounded-2xl border transition-all outline-none font-medium ${
                errors.title ? "border-red-500 bg-red-50" : "border-slate-100 bg-slate-50 focus:bg-white focus:border-[#E31E24] focus:ring-4 focus:ring-red-50"
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message Body</label>
            <textarea 
              rows={5}
              placeholder="What would you like to announce?"
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              className={`w-full px-5 py-3.5 rounded-2xl border transition-all outline-none font-medium resize-none ${
                errors.message ? "border-red-500 bg-red-50" : "border-slate-100 bg-slate-50 focus:bg-white focus:border-[#E31E24] focus:ring-4 focus:ring-red-50"
              }`}
            />
          </div>

          {/* <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              <ImageIcon size={12} /> Cover Image URL (Optional)
            </label>
            <input 
              type="text"
              placeholder="https://..."
              value={form.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#E31E24] outline-none text-sm font-medium transition-all"
            />
          </div> */}

          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-2">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-lg ${form.isPublished ? "bg-green-100 text-[#004795]" : "bg-slate-200 text-slate-500"}`}>
                 <Send size={16} />
               </div>
               <span className="text-sm font-bold text-slate-700">Publish immediately</span>
            </div>
            <button 
              onClick={() => setField("isPublished", !form.isPublished)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.isPublished ? "bg-green-500" : "bg-slate-300"
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                form.isPublished ? "translate-x-6" : "translate-x-1"
              }`} />
            </button>
          </div>

          {serverError && (
            <div className="p-4 bg-red-50 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-2 border border-red-100">
              <AlertCircle size={14} />
              {serverError}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Discard
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] flex items-center justify-center gap-2 bg-[#E31E24] hover:bg-red-700 disabled:bg-slate-300 text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-red-100 transition-all active:scale-95"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isEdit ? <Save size={18} /> : <Send size={18} />}
                <span className="uppercase tracking-widest text-xs">{isEdit ? "Update Post" : "Post Now"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}