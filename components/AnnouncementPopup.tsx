"use client";

import { useEffect, useRef, useState } from "react";

type Announcement = {
  id: string;
  title: string;
  message: string;
};

// Switched to Session Storage so it resets when the tab is closed/reloaded
const STORAGE_KEY = "session_seen_announcements";

export default function AnnouncementBanner() {
  const [list, setList] = useState<Announcement[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(true);

  const rotateTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Optional: Clear session storage on every single manual reload 
    // to ensure the user always sees the latest updates immediately.
    sessionStorage.removeItem(STORAGE_KEY);

    const load = async () => {
      try {
        const res = await fetch("/api/announcement");
        const json = await res.json();
        const published = (json.data || []).filter((a: any) => a.isPublished);
        
        // We no longer filter by "seen" here if you want them to always 
        // show up on every reload. If you want them to stay hidden ONLY 
        // until they click close (but come back on reload), we use the list directly.
        
        setList(published);
        setVisible(published.length > 0);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!visible || list.length <= 1) return;

    rotateTimer.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % list.length);
        setFade(true);
      }, 500); 
    }, 6000);

    return () => {
      if (rotateTimer.current) clearInterval(rotateTimer.current);
    };
  }, [visible, list.length]);

  if (!visible || list.length === 0) return null;

  const item = list[index];

  return (
    <>
      <style>{`
        @keyframes pulse-brand {
          0% { background-color: #FFFFFF; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          50% { background-color: #1E4F9A; box-shadow: 0 0 0 8px rgba(30, 79, 154, 0); }
          100% { background-color: #FFFFFF; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .animate-fade {
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
      `}</style>

      <div style={styles.banner}>
        {/* CONTENT */}
        <div 
          style={{
            ...styles.content,
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(5px)"
          }} 
          className="animate-fade"
        >
          <div style={styles.liveIndicator}>
            <div style={styles.dot}></div>
          </div>
          <div style={styles.title}>{item.title}</div>
          <span style={styles.separator}>•</span>
          <div style={styles.message}>{item.message}</div>
        </div>

        {/* COUNTER */}
        {/* {list.length > 1 && (
          <div style={styles.counter}>
            {index + 1}/{list.length}
          </div>
        )} */}
      </div>
    </>
  );
}

const styles: any = {
  banner: {
    width: "100%",
    background: "#E31E24", // School Red
    color: "#FFFFFF",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
    gap: "15px",
    overflow: "hidden",
    position: "relative",
  },
  liveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 0px",
  },
  dot: {
    width: "20px", // Adjusted to be slightly more balanced
    height: "20px",
    borderRadius: "50%",
    border: "1.5px solid #FFFFFF",
    animation: "pulse-brand 2s infinite ease-in-out",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: "13px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },
  separator: {
    opacity: 0.6,
  },
  message: {
    fontSize: "13px",
    opacity: 0.95,
    whiteSpace: "nowrap",
    fontWeight: "500",
    
    
  },
  counter: {
    fontSize: "10px",
    background: "#1E4F9A", // School Blue
    padding: "2px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
  }
};