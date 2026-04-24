"use client";

import { useEffect, useState, useMemo } from "react";
import AnnouncementModal from "@/components/announcement/AnnouncementModal";
import DeleteConfirmModal from "@/components/announcement/DeleteConfirmModal";

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
  updatedAt?: string;
};

type Filter = "all" | "published" | "draft";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", gap: 10 }}>
      <span style={{ position: "relative", display: "inline-block", width: 38, height: 21 }}>
        <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} />
        <span style={{ position: "absolute", inset: 0, borderRadius: 100, background: checked ? "#4a7c59" : "#d1d5db", border: `0.5px solid ${checked ? "#3b6348" : "#c4c9d0"}`, transition: "background 0.2s" }} />
        <span style={{ position: "absolute", top: 3, left: 3, width: 15, height: 15, borderRadius: "50%", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.18)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)", transform: checked ? "translateX(17px)" : "translateX(0)" }} />
      </span>
    </label>
  );
}

function StatusBadge({ isPublished }: { isPublished: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", fontFamily: "'DM Mono', monospace", background: isPublished ? "#e6f3e9" : "#f3f4f6", color: isPublished ? "#3b6348" : "#6b7280", whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: isPublished ? "#4a7c59" : "#9ca3af", display: "inline-block" }} />
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

function IconEdit() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z" />
    </svg>
  );
}

function IconDelete() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points="1,3 11,3" />
      <path d="M4,3V1.5h4V3" />
      <path d="M2,3l.8,7.5h6.4L10,3" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="6.5" y1="1" x2="6.5" y2="12" />
      <line x1="1" y1="6.5" x2="12" y2="6.5" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="5.5" cy="5.5" r="4" />
      <line x1="8.5" y1="8.5" x2="12" y2="12" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { font-family: 'Outfit', sans-serif; margin: 0; }
  .ann-row { transition: background 0.12s; }
  .ann-row:hover { background: #f9fafb; }
  .action-btn { background: transparent; border: 0.5px solid #e5e7eb; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #9ca3af; transition: all 0.15s; }
  .action-btn:hover { background: #f3f4f6; color: #374151; border-color: #d1d5db; }
  .action-btn.danger:hover { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
  .filter-tab { padding: 5px 13px; border-radius: 7px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; background: transparent; color: #9ca3af; font-family: 'Outfit', sans-serif; transition: all 0.15s; }
  .filter-tab:hover { color: #374151; }
  .filter-tab.active { background: #f3f4f6; color: #111827; }
  .new-btn { display: flex; align-items: center; gap: 8px; padding: 10px 18px; background: #111827; color: white; border: none; border-radius: 9px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.15s; }
  .new-btn:hover { opacity: 0.82; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.3s ease both; }
`;

// Replace with your actual logged-in user id (e.g. from session/auth context)
const CURRENT_USER_ID = "dfb83430-a417-4a16-a78f-47db8e13576a";

export default function AnnouncementsPage() {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    setLoading(true);
    try {
      const res = await fetch("/api/announcement");
      const json = await res.json();
      const safeData = json.data ?? json.announcements ?? [];
      setData(Array.isArray(safeData) ? safeData : []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  async function togglePublish(id: string, current: boolean) {
    try {
      await fetch(`/api/announcement/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      setData((prev) => prev.map((a) => (a.id === id ? { ...a, isPublished: !current } : a)));
    } catch (err) {
      console.error(err);
    }
  }

  // Open create modal
  function openCreate() {
    setEditTarget(null);
    setFormOpen(true);
  }

  // Open edit modal
  function openEdit(item: Announcement) {
    setEditTarget(item);
    setFormOpen(true);
  }

  // Open delete confirmation
  function openDelete(item: Announcement) {
    setDeleteTarget(item);
    setDeleteOpen(true);
  }

  // After create/edit success — refetch
  function handleFormSuccess() {
    fetchAnnouncements();
  }

  // After delete success — remove from local state immediately
  function handleDeleteSuccess() {
    if (deleteTarget) {
      setData((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    }
  }

  const filtered = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((d) => {
      const matchFilter =
        filter === "all" ||
        (filter === "published" && d.isPublished) ||
        (filter === "draft" && !d.isPublished);
      const q = query.toLowerCase().trim();
      const matchQuery = !q || d.title.toLowerCase().includes(q) || d.message.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [data, filter, query]);

  const published = data.filter((d) => d.isPublished).length;
  const drafts = data.filter((d) => !d.isPublished).length;

  if (loading) {
    return (
      <>
        <style>{fonts}</style>
        <div style={{ padding: "3rem 2rem", fontFamily: "'Outfit', sans-serif" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#9ca3af", fontSize: 14 }}>
            <span>Loading announcements…</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{fonts}</style>

      {/* ── Modals ─────────────────────────────────────── */}
      <AnnouncementModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
        announcement={editTarget}
        userId={CURRENT_USER_ID}
      />
      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
        announcement={deleteTarget}
      />

      {/* ── Page ───────────────────────────────────────── */}
      <div style={{ padding: "2.5rem 2rem", background: "#f9fafb", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.75rem" }} className="fade-in">
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af" }}>
              Admin / Content
            </span>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, fontWeight: 400, color: "#111827", lineHeight: 1.1, margin: 0 }}>
              Announcements
            </h1>
            <p style={{ fontSize: 13, color: "#9ca3af", fontWeight: 300, margin: 0, marginTop: 1 }}>
              Manage and schedule your published content
            </p>
          </div>
          <button className="new-btn" onClick={openCreate}>
            <IconPlus />
            New announcement
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }} className="fade-in">
          {[
            { label: "Total", value: data.length, sub: "announcements", color: "#111827" },
            { label: "Published", value: published, sub: "live now", color: "#3b6348" },
            { label: "Drafts", value: drafts, sub: "pending review", color: "#6b7280" },
          ].map((s) => (
            <div key={s.label} style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: "1rem 1.25rem" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 30, fontWeight: 300, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#d1d5db", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }} className="fade-in">

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", borderBottom: "0.5px solid #f3f4f6" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {(["all", "published", "draft"] as Filter[]).map((f) => (
                <button key={f} className={`filter-tab${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f9fafb", border: "0.5px solid #e5e7eb", borderRadius: 8, padding: "6px 12px" }}>
              <span style={{ color: "#9ca3af", display: "flex" }}><IconSearch /></span>
              <input
                type="text"
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ background: "transparent", border: "none", outline: "none", fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#111827", width: 160 }}
              />
            </div>
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid #f3f4f6" }}>
                {["#", "Title", "Message", "Status", "Publish", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 20px", fontSize: 10, fontWeight: 500, letterSpacing: "0.09em", textTransform: "uppercase", color: "#9ca3af", textAlign: "left", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                    No announcements match your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item, i) => (
                  <tr key={item.id} className="ann-row" style={{ borderBottom: i < filtered.length - 1 ? "0.5px solid #f9fafb" : "none" }}>

                    {/* # */}
                    <td style={{ padding: "14px 20px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#d1d5db", width: 36 }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>

                    {/* Title */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'DM Mono', monospace" }}>{formatDate(item.createdAt)}</div>
                    </td>

                    {/* Message */}
                    <td style={{ padding: "14px 20px", maxWidth: 280 }}>
                      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {item.message}
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: "14px 20px" }}>
                      <StatusBadge isPublished={item.isPublished} />
                    </td>

                    {/* Toggle */}
                    <td style={{ padding: "14px 20px" }}>
                      <Toggle checked={item.isPublished} onChange={() => togglePublish(item.id, item.isPublished)} />
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="action-btn" title="Edit" onClick={() => openEdit(item)}>
                          <IconEdit />
                        </button>
                        <button className="action-btn danger" title="Delete" onClick={() => openDelete(item)}>
                          <IconDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div style={{ marginTop: "1rem", fontSize: 12, color: "#d1d5db", fontFamily: "'DM Mono', monospace", textAlign: "right" }}>
          {filtered.length} of {data.length} announcements
        </div>
      </div>
    </>
  );
}