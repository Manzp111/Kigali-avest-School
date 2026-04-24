"use client";

import { useEffect, useRef, useState } from "react";

type AnnouncementFormData = {
  title: string;
  message: string;
  imageUrl: string;
  fileUrl: string;
  isPublished: boolean;
  publishAt: string;
  expiresAt: string;
  priority: number;
  userId: string;
};

type Announcement = {
  id: string;
  title: string;
  message: string;
  imageUrl?: string;
  fileUrl?: string;
  isPublished: boolean;
  publishAt?: string;
  expiresAt?: string;
  priority?: number;
  userId?: string;
  createdAt: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  announcement?: Announcement | null; // null = create mode, Announcement = edit mode
  userId: string; // pass logged-in user's id
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');
  .modal-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(17,24,39,0.45);
    backdrop-filter: blur(3px);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    animation: overlayIn 0.18s ease both;
  }
  @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-card {
    background: white;
    border: 0.5px solid #e5e7eb;
    border-radius: 18px;
    width: 100%;
    max-width: 560px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 24px 80px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06);
    animation: cardIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
    font-family: 'Outfit', sans-serif;
  }
  @keyframes cardIn { from { opacity: 0; transform: scale(0.96) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .modal-header {
    padding: 1.5rem 1.75rem 1.25rem;
    border-bottom: 0.5px solid #f3f4f6;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  }
  .modal-body { padding: 1.5rem 1.75rem; display: flex; flex-direction: column; gap: 1.1rem; }
  .modal-footer {
    padding: 1.1rem 1.75rem 1.5rem;
    border-top: 0.5px solid #f3f4f6;
    display: flex; gap: 10px; justify-content: flex-end;
  }
  .field-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.09em;
    text-transform: uppercase; color: #9ca3af;
    font-family: 'DM Mono', monospace;
    margin-bottom: 6px; display: block;
  }
  .field-input {
    width: 100%; border: 0.5px solid #e5e7eb;
    border-radius: 9px; padding: 10px 13px;
    font-family: 'Outfit', sans-serif; font-size: 13.5px; color: #111827;
    background: #fafafa; outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    box-sizing: border-box;
  }
  .field-input:focus { border-color: #4a7c59; box-shadow: 0 0 0 3px rgba(74,124,89,0.1); background: white; }
  .field-input::placeholder { color: #d1d5db; }
  .field-input.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
  .error-msg { font-size: 11px; color: #ef4444; margin-top: 4px; }
  textarea.field-input { resize: vertical; min-height: 90px; line-height: 1.5; }
  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .btn-cancel {
    padding: 10px 18px; border-radius: 9px; font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    border: 0.5px solid #e5e7eb; background: white; color: #6b7280;
    transition: all 0.15s;
  }
  .btn-cancel:hover { background: #f9fafb; color: #374151; }
  .btn-submit {
    padding: 10px 22px; border-radius: 9px; font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    border: none; background: #111827; color: white;
    transition: opacity 0.15s;
    display: flex; align-items: center; gap: 8px;
    min-width: 110px; justify-content: center;
  }
  .btn-submit:hover:not(:disabled) { opacity: 0.82; }
  .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .close-btn {
    width: 30px; height: 30px; border-radius: 8px;
    border: 0.5px solid #e5e7eb; background: #f9fafb;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: #9ca3af; transition: all 0.15s; flex-shrink: 0;
  }
  .close-btn:hover { background: #f3f4f6; color: #374151; }
  .toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    background: #f9fafb; border: 0.5px solid #f3f4f6;
    border-radius: 10px; padding: 12px 14px;
  }
  .spinner {
    width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const EMPTY: AnnouncementFormData = {
  title: "",
  message: "",
  imageUrl: "",
  fileUrl: "",
  isPublished: false,
  publishAt: "",
  expiresAt: "",
  priority: 1,
  userId: "",
};

function toDatetimeLocal(iso?: string | null) {
  if (!iso) return "";
  return iso.slice(0, 16); // "YYYY-MM-DDTHH:mm"
}

function toISO(local: string) {
  if (!local) return null;
  return new Date(local).toISOString();
}

export default function AnnouncementModal({ open, onClose, onSuccess, announcement, userId }: Props) {
  const isEdit = Boolean(announcement);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<AnnouncementFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof AnnouncementFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (open) {
      if (announcement) {
        setForm({
          title: announcement.title ?? "",
          message: announcement.message ?? "",
          imageUrl: announcement.imageUrl ?? "",
          fileUrl: announcement.fileUrl ?? "",
          isPublished: announcement.isPublished ?? false,
          publishAt: toDatetimeLocal(announcement.publishAt),
          expiresAt: toDatetimeLocal(announcement.expiresAt),
          priority: announcement.priority ?? 1,
          userId: announcement.userId ?? userId,
        });
      } else {
        setForm({ ...EMPTY, userId });
      }
      setErrors({});
      setServerError("");
    }
  }, [open, announcement, userId]);

  // Close on overlay click
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  function set(field: keyof AnnouncementFormData, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof AnnouncementFormData, string>> = {};
    if (!form.title.trim() || form.title.trim().length < 3) e.title = "Title must be at least 3 characters.";
    if (!form.message.trim() || form.message.trim().length < 5) e.message = "Message must be at least 5 characters.";
    if (form.imageUrl && !/^https?:\/\/.+/.test(form.imageUrl)) e.imageUrl = "Must be a valid URL.";
    if (form.fileUrl && !/^https?:\/\/.+/.test(form.fileUrl)) e.fileUrl = "Must be a valid URL.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    const payload: Record<string, unknown> = {
      title: form.title.trim(),
      message: form.message.trim(),
      isPublished: form.isPublished,
      priority: Number(form.priority),
      userId: form.userId || userId,
    };
    if (form.imageUrl) payload.imageUrl = form.imageUrl;
    if (form.fileUrl) payload.fileUrl = form.fileUrl;
    if (form.publishAt) payload.publishAt = toISO(form.publishAt);
    if (form.expiresAt) payload.expiresAt = toISO(form.expiresAt);

    try {
      const url = isEdit ? `/api/announcement/${announcement!.id}` : "/api/announcement";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Something went wrong.");
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <>
      <style>{fonts}</style>
      <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="modal-card" role="dialog" aria-modal="true">

          {/* Header */}
          <div className="modal-header">
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 5 }}>
                {isEdit ? "Edit Announcement" : "New Announcement"}
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, fontWeight: 400, color: "#111827", margin: 0, lineHeight: 1.2 }}>
                {isEdit ? "Update content" : "Create new"}
              </h2>
            </div>
            <button className="close-btn" onClick={onClose} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">

            {/* Title */}
            <div>
              <label className="field-label">Title *</label>
              <input
                className={`field-input${errors.title ? " error" : ""}`}
                placeholder="e.g. School Opening Notice"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
              {errors.title && <p className="error-msg">{errors.title}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="field-label">Message *</label>
              <textarea
                className={`field-input${errors.message ? " error" : ""}`}
                placeholder="Write the announcement message…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
              />
              {errors.message && <p className="error-msg">{errors.message}</p>}
            </div>

            {/* Image URL + File URL */}
            <div className="row-2">
              <div>
                <label className="field-label">Image URL</label>
                <input
                  className={`field-input${errors.imageUrl ? " error" : ""}`}
                  placeholder="https://…"
                  value={form.imageUrl}
                  onChange={(e) => set("imageUrl", e.target.value)}
                />
                {errors.imageUrl && <p className="error-msg">{errors.imageUrl}</p>}
              </div>
              <div>
                <label className="field-label">File URL</label>
                <input
                  className={`field-input${errors.fileUrl ? " error" : ""}`}
                  placeholder="https://…"
                  value={form.fileUrl}
                  onChange={(e) => set("fileUrl", e.target.value)}
                />
                {errors.fileUrl && <p className="error-msg">{errors.fileUrl}</p>}
              </div>
            </div>

            {/* Publish At + Expires At */}
            <div className="row-2">
              <div>
                <label className="field-label">Publish At</label>
                <input
                  type="datetime-local"
                  className="field-input"
                  value={form.publishAt}
                  onChange={(e) => set("publishAt", e.target.value)}
                />
              </div>
              <div>
                <label className="field-label">Expires At</label>
                <input
                  type="datetime-local"
                  className="field-input"
                  value={form.expiresAt}
                  onChange={(e) => set("expiresAt", e.target.value)}
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="field-label">Priority</label>
              <input
                type="number"
                className="field-input"
                min={1}
                max={10}
                value={form.priority}
                onChange={(e) => set("priority", parseInt(e.target.value) || 1)}
                style={{ maxWidth: 120 }}
              />
            </div>

            {/* Published toggle */}
            <div className="toggle-row">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "#374151" }}>Publish immediately</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Make this announcement live right now</div>
              </div>
              <ToggleSwitch checked={form.isPublished} onChange={() => set("isPublished", !form.isPublished)} />
            </div>

            {serverError && (
              <div style={{ background: "#fef2f2", border: "0.5px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626" }}>
                {serverError}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? <span className="spinner" /> : null}
              {loading ? "Saving…" : isEdit ? "Save changes" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <span style={{ position: "relative", display: "inline-block", width: 38, height: 21 }}>
        <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} />
        <span style={{ position: "absolute", inset: 0, borderRadius: 100, background: checked ? "#4a7c59" : "#d1d5db", border: `0.5px solid ${checked ? "#3b6348" : "#c4c9d0"}`, transition: "background 0.2s" }} />
        <span style={{ position: "absolute", top: 3, left: 3, width: 15, height: 15, borderRadius: "50%", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.18)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)", transform: checked ? "translateX(17px)" : "translateX(0)" }} />
      </span>
    </label>
  );
}