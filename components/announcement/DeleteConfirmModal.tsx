"use client";

import { useRef, useState } from "react";

type Announcement = {
  id: string;
  title: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  announcement: Announcement | null;
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');
  .del-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(17,24,39,0.45);
    backdrop-filter: blur(3px);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    animation: delOverlayIn 0.15s ease both;
  }
  @keyframes delOverlayIn { from { opacity: 0; } to { opacity: 1; } }
  .del-card {
    background: white;
    border: 0.5px solid #e5e7eb;
    border-radius: 18px;
    width: 100%; max-width: 400px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06);
    animation: delCardIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
    font-family: 'Outfit', sans-serif;
    overflow: hidden;
  }
  @keyframes delCardIn { from { opacity: 0; transform: scale(0.94) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .del-icon-wrap {
    width: 48px; height: 48px; border-radius: 14px;
    background: #fef2f2; border: 0.5px solid #fecaca;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem;
  }
  .del-btn-cancel {
    flex: 1; padding: 11px 0; border-radius: 9px;
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; border: 0.5px solid #e5e7eb; background: white; color: #6b7280;
    transition: all 0.15s;
  }
  .del-btn-cancel:hover { background: #f9fafb; color: #374151; }
  .del-btn-confirm {
    flex: 1; padding: 11px 0; border-radius: 9px;
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; border: none; background: #dc2626; color: white;
    transition: opacity 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .del-btn-confirm:hover:not(:disabled) { opacity: 0.85; }
  .del-btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
  .del-spinner {
    width: 13px; height: 13px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: delSpin 0.6s linear infinite;
  }
  @keyframes delSpin { to { transform: rotate(360deg); } }
`;

export default function DeleteConfirmModal({ open, onClose, onSuccess, announcement }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  async function handleDelete() {
    if (!announcement) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/announcement/${announcement.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to delete.");
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  }

  if (!open || !announcement) return null;

  return (
    <>
      <style>{fonts}</style>
      <div className="del-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="del-card" role="alertdialog" aria-modal="true">

          {/* Top accent strip */}
          <div style={{ height: 4, background: "linear-gradient(90deg, #ef4444, #dc2626)" }} />

          <div style={{ padding: "1.75rem 1.75rem 1.5rem", textAlign: "center" }}>

            {/* Icon */}
            <div className="del-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round">
                <polyline points="2,5 18,5" />
                <path d="M6.5,5V3.5a.5.5,0,0,1,.5-.5h6a.5.5,0,0,1,.5.5V5" />
                <path d="M4,5l1.2,12a1,1,0,0,0,1,.9h7.6a1,1,0,0,0,1-.9L16,5" />
                <line x1="8" y1="9" x2="8" y2="14" />
                <line x1="12" y1="9" x2="12" y2="14" />
              </svg>
            </div>

            {/* Heading */}
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: "#111827", margin: "0 0 8px" }}>
              Delete announcement?
            </h2>

            {/* Message */}
            <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.55, margin: "0 0 6px" }}>
              You&apos;re about to permanently delete
            </p>
            <div style={{
              display: "inline-block",
              background: "#f9fafb", border: "0.5px solid #e5e7eb",
              borderRadius: 8, padding: "6px 14px",
              fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#374151",
              maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {announcement.title}
            </div>
            <p style={{ fontSize: 12.5, color: "#9ca3af", marginTop: 12, marginBottom: 0 }}>
              This action cannot be undone.
            </p>

            {error && (
              <div style={{ background: "#fef2f2", border: "0.5px solid #fecaca", borderRadius: 8, padding: "9px 12px", fontSize: 12.5, color: "#dc2626", marginTop: 14, textAlign: "left" }}>
                {error}
              </div>
            )}
          </div>

          {/* Footer buttons */}
          <div style={{ display: "flex", gap: 10, padding: "0 1.5rem 1.5rem" }}>
            <button className="del-btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="del-btn-confirm" onClick={handleDelete} disabled={loading}>
              {loading ? <span className="del-spinner" /> : (
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <polyline points="1,3 11,3" />
                  <path d="M3,3V2h6v1" />
                  <path d="M2,3l.7,7.5h6.6L10,3" />
                </svg>
              )}
              {loading ? "Deleting…" : "Delete"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}