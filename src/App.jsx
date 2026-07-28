import React, { useState } from "react";
import { Camera, Sparkles, Utensils, ArrowRight, X, MessageCircle } from "lucide-react";

const th = { bg: "#0D1117", elevated: "#131822", text: "#F5F7FA", muted: "#A6B0C0", muted2: "#8892A0", muted3: "#6B7686", border: "rgba(255,255,255,0.07)", borderStrong: "#2A3242" };
const color = "#10B981"; // personal productivity category color

function PhoneFrame({ children, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ width: 100, height: 176, borderRadius: 16, background: "#05070B", border: `2px solid ${th.borderStrong}`, padding: 8, display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
        {children}
      </div>
      <span style={{ fontSize: 11, color: th.muted3, textAlign: "center", maxWidth: 110 }}>{label}</span>
    </div>
  );
}

function Frame1() {
  // stylized camera-viewfinder moment — not a literal app screenshot
  return (
    <div style={{ flex: 1, borderRadius: 8, background: "linear-gradient(160deg,#1a2130,#0d1117)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ width: 50, height: 50, borderRadius: 10, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Camera size={22} color={color} />
      </div>
      <div style={{ position: "absolute", top: 6, left: 6, right: 6, bottom: 6, border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 6 }} />
    </div>
  );
}
function Frame2() {
  return (
    <div style={{ flex: 1, borderRadius: 8, background: "linear-gradient(160deg,#1a2130,#0d1117)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#8B5CF622", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 1.6s ease-in-out infinite" }}>
        <Sparkles size={20} color="#8B5CF6" />
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
    </div>
  );
}
function Frame3() {
  // stylized chat bubble — generic rounded bubble, not WhatsApp's actual UI
  return (
    <div style={{ flex: 1, borderRadius: 8, background: "linear-gradient(160deg,#1a2130,#0d1117)", padding: 8, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 4 }}>
      <div style={{ alignSelf: "flex-start", background: th.elevated, border: `1px solid ${th.borderStrong}`, borderRadius: "10px 10px 10px 2px", padding: "6px 8px", fontSize: 8, color: th.muted2, maxWidth: "80%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2, color: "#25D366" }}><MessageCircle size={9} /> <b style={{ fontSize: 7.5 }}>Auto-reply</b></div>
        420 kcal · 32g protein<br />18g carbs · 14g fat
      </div>
    </div>
  );
}

export default function StoryboardPlacementDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: th.bg, color: th.text, minHeight: "100vh", padding: 32, fontFamily: "Inter, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600&display=swap');`}</style>

      <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, marginBottom: 6 }}>Two placements, side by side</h1>
      <p style={{ color: th.muted2, fontSize: 14, marginBottom: 32, maxWidth: 640 }}>
        Left: how the card looks in the rail/catalog with a hero thumbnail added on top. Right: what opens when someone clicks it — the full storyboard, expanded.
      </p>

      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* CARD WITH HERO THUMBNAIL */}
        <div>
          <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#06B6D4", marginBottom: 12 }}>1 — Card (rail/catalog)</div>
          <div style={{ width: 264, borderRadius: 18, background: th.elevated, border: `1px solid ${th.border}`, overflow: "hidden", cursor: "pointer" }} onClick={() => setOpen(true)}>
            {/* hero thumbnail band — NEW */}
            <div style={{ height: 110, background: `linear-gradient(135deg, ${color}22, #06B6D422)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, borderBottom: `1px solid ${th.border}` }}>
              <Camera size={20} color={color} />
              <ArrowRight size={13} color={th.muted3} />
              <Sparkles size={20} color="#8B5CF6" />
              <ArrowRight size={13} color={th.muted3} />
              <Utensils size={20} color="#06B6D4" />
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: th.muted3 }}>Personal Productivity</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, margin: "0 0 8px" }}>Meal & Drink Logging</h3>
              <p style={{ fontSize: 13, color: th.muted2, lineHeight: 1.5, margin: "0 0 14px" }}>Photograph your meal. Get a full nutritional breakdown in seconds.</p>
              <span style={{ color, fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>View Workflow <ArrowRight size={14} /></span>
            </div>
          </div>
          <p style={{ fontSize: 12, color: th.muted3, marginTop: 10, maxWidth: 264, lineHeight: 1.5 }}>
            The 3-icon strip replaces plain empty space at the top — a quick visual preview before anyone even opens the card. Click it to see the drawer →
          </p>
        </div>

        {/* DRAWER PREVIEW (static, always shown here for comparison) */}
        <div>
          <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#06B6D4", marginBottom: 12 }}>2 — Drawer (after clicking)</div>
          <div style={{ width: 380, borderRadius: 18, background: th.elevated, border: `1px solid ${th.border}`, padding: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <Utensils size={20} color={color} />
            </div>
            <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color }}>Personal Productivity</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 21, fontWeight: 700, margin: "6px 0 18px" }}>Meal & Drink Logging</h2>

            {/* full storyboard — NEW, replaces/sits above the current mini-flow */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", padding: "14px 0", borderTop: `1px solid ${th.border}`, borderBottom: `1px solid ${th.border}`, marginBottom: 20 }}>
              <PhoneFrame label="Photo sent"><Frame1 /></PhoneFrame>
              <PhoneFrame label="AI analyzes"><Frame2 /></PhoneFrame>
              <PhoneFrame label="Reply arrives"><Frame3 /></PhoneFrame>
            </div>

            <p style={{ fontSize: 13, color: th.muted3, lineHeight: 1.6, marginBottom: 0 }}>
              Before/After text, "Best for" tags, and the deliverables block would continue below this, same as today — the storyboard just replaces the current small trigger→automate→output diagram at the top.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40, padding: 20, borderRadius: 14, background: th.elevated, border: `1px solid ${th.border}`, maxWidth: 700 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>What's stylized here, deliberately</div>
        <p style={{ fontSize: 13, color: th.muted2, lineHeight: 1.7, margin: 0 }}>
          The "reply" bubble is a generic rounded message shape with a small green icon labeled "Auto-reply" — not WhatsApp's actual header, colors, or icon. Close enough to read as "a chat message arrived," not close enough to look like their trademarked interface.
        </p>
      </div>
    </div>
  );
}
