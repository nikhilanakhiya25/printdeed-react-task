import { useState, useRef, useCallback } from "react";
 
const COLORS = [
  { name: "Forest Green", value: "#1a6b3c" },
  { name: "Royal Blue", value: "#1e40af" },
  { name: "Crimson Red", value: "#b91c1c" },
  { name: "Deep Purple", value: "#6d28d9" },
  { name: "Burnt Orange", value: "#c2410c" },
  { name: "Dark Teal", value: "#0f766e" },
  { name: "Charcoal", value: "#1f2937" },
  { name: "Deep Rose", value: "#9d174d" },
];
 
const PATTERNS = [
  { name: "None", value: "none" },
  { name: "Dots", value: "dots" },
  { name: "Grid", value: "grid" },
  { name: "Diagonal", value: "diagonal" },
];
 
const FONT_SIZES = ["Small", "Medium", "Large"];
 
const FONTS = [
  { name: "Arial Black", value: "'Arial Black', Arial, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Impact", value: "Impact, sans-serif" },
  { name: "Courier", value: "'Courier New', monospace" },
];
 
function PatternBg({ pattern, color }) {
  if (pattern === "none") return null;
  const opacity = 0.12;
  if (pattern === "dots")
    return (
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle, white ${opacity * 100}%, transparent 0)`,
          backgroundSize: "14px 14px",
        }}
      />
    );
  if (pattern === "grid")
    return (
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />
    );
  if (pattern === "diagonal")
    return (
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "12px 12px",
        }}
      />
    );
  return null;
}
 
function LawnMowerSVG({ color, size = 110 }) {
  return (
    <svg viewBox="0 0 120 130" width={size} height={size * 1.18} xmlns="http://www.w3.org/2000/svg">
      <circle cx="62" cy="14" r="10" fill={color} />
      <line x1="62" y1="24" x2="50" y2="68" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="44" x2="30" y2="56" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="44" x2="72" y2="54" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="68" x2="36" y2="90" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="68" x2="62" y2="88" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="72" y1="54" x2="88" y2="80" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <rect x="68" y="80" width="40" height="20" rx="4" fill={color} />
      <circle cx="74" cy="104" r="7" fill={color} />
      <circle cx="102" cy="104" r="7" fill={color} />
      <ellipse cx="86" cy="82" rx="14" ry="7" fill="#aad4b4" />
    </svg>
  );
}
 
function SignPreview({ state, logoUrl, previewRef }) {
  const { title, phone, services, bgColor, showIcon, fontSize, font, pattern, tagline, showTagline } = state;
  const sizeMap = {
    Small: { title: 26, service: 13, phone: 22, tagline: 11 },
    Medium: { title: 38, service: 17, phone: 30, tagline: 13 },
    Large: { title: 50, service: 21, phone: 40, tagline: 16 },
  };
  const sz = sizeMap[fontSize];
 
  return (
    <div
      ref={previewRef}
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: `3px solid ${bgColor}`,
        fontFamily: font,
        boxShadow: `0 8px 32px ${bgColor}44`,
        maxWidth: "520px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ background: bgColor, padding: "20px 24px 16px", textAlign: "center", position: "relative" }}>
        <PatternBg pattern={pattern} color={bgColor} />
        {logoUrl && (
          <img
            src={logoUrl}
            alt="logo"
            style={{ height: "44px", objectFit: "contain", display: "block", margin: "0 auto 8px" }}
          />
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ color: "#fff", fontSize: sz.title + "px", fontWeight: "900", letterSpacing: "2px", lineHeight: 1.1 }}>
            {title || "YOUR BUSINESS"}
          </div>
          {showTagline && tagline && (
            <div style={{ color: "rgba(255,255,255,0.82)", fontSize: sz.tagline + "px", marginTop: "4px", letterSpacing: "1px" }}>
              {tagline}
            </div>
          )}
        </div>
      </div>
 
      {/* Body */}
      <div style={{ background: "#fff", display: "flex", alignItems: "center", padding: "24px 20px", gap: "14px" }}>
        {showIcon && <LawnMowerSVG color={bgColor} size={100} />}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          {services.map((s, i) => (
            <div key={i} style={{ color: bgColor, fontSize: sz.service + "px", fontWeight: "800", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              {s || "SERVICE"}
            </div>
          ))}
        </div>
      </div>
 
      {/* Footer */}
      <div style={{ background: bgColor, padding: "16px 20px", textAlign: "center", position: "relative" }}>
        <PatternBg pattern={pattern} color={bgColor} />
        <div style={{ position: "relative", zIndex: 1, color: "#fff", fontSize: sz.phone + "px", fontWeight: "900", letterSpacing: "2px" }}>
          {phone || "1-000-000-0000"}
        </div>
      </div>
    </div>
  );
}
 
function Section({ title, children }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "12px",
    }}>
      <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b7280", marginBottom: "12px" }}>
        {title}
      </div>
      {children}
    </div>
  );
}
 
function InputField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      {label && <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>{label}</div>}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%", fontSize: "13px", padding: "7px 10px",
          border: "1px solid #d1d5db", borderRadius: "7px",
          fontFamily: "inherit", outline: "none", boxSizing: "border-box",
          color: "#111827", background: "#fafafa",
        }}
      />
    </div>
  );
}
 
export default function LawnSignEditor() {
  const [state, setState] = useState({
    title: "LANDSCAPING",
    phone: "1-999-999-9999",
    tagline: "Professional & Reliable",
    showTagline: true,
    services: ["BRUSH REMOVAL", "TREE TRIMMING", "LAWN MOWING"],
    bgColor: "#1a6b3c",
    showIcon: true,
    fontSize: "Medium",
    font: "'Arial Black', Arial, sans-serif",
    pattern: "none",
  });
  const [logoUrl, setLogoUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("text");
  const previewRef = useRef(null);
  const logoInputRef = useRef(null);
 
  const set = useCallback((key, val) => setState(s => ({ ...s, [key]: val })), []);
 
  const updateService = (i, val) => {
    const a = [...state.services];
    a[i] = val.toUpperCase();
    set("services", a);
  };
  const addService = () => set("services", [...state.services, "NEW SERVICE"]);
  const removeService = (i) => set("services", state.services.filter((_, j) => j !== i));
 
  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };
 
  const handleDownload = () => {
    if (!previewRef.current) return;
    const el = previewRef.current;
    const w = el.offsetWidth, h = el.offsetHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w * 2; canvas.height = h * 2;
    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    // Simple CSS-based screenshot via blob + anchor
    const html = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><foreignObject width='${w}' height='${h}'><div xmlns='http://www.w3.org/1999/xhtml'>${el.outerHTML}</div></foreignObject></svg>`;
    const blob = new Blob([html], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "lawn-sign.svg"; a.click();
    URL.revokeObjectURL(url);
  };
 
  const tabStyle = (tab) => ({
    padding: "7px 14px", fontSize: "12px", fontWeight: "600",
    border: "none", borderRadius: "7px", cursor: "pointer",
    background: activeTab === tab ? state.bgColor : "transparent",
    color: activeTab === tab ? "#fff" : "#6b7280",
    transition: "all 0.15s",
  });
 
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", minHeight: "100vh", background: "#f3f4f6", fontFamily: "system-ui, sans-serif", boxSizing: "border-box" }}>
 
      {/* Left: Editor Panel */}
      <div style={{ width: "300px", flexShrink: 0 }}>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#111827", marginBottom: "4px" }}>Sign Editor</div>
        <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>Build your custom lawn sign</div>
 
        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#e5e7eb", borderRadius: "9px", padding: "3px", marginBottom: "14px" }}>
          {["text", "design", "extras"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
 
        {/* Text Tab */}
        {activeTab === "text" && (
          <>
            <Section title="Business Info">
              <InputField label="Business Name" value={state.title} onChange={e => set("title", e.target.value.toUpperCase())} placeholder="YOUR BUSINESS" />
              <InputField label="Phone Number" value={state.phone} onChange={e => set("phone", e.target.value)} placeholder="1-000-000-0000" />
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <input type="checkbox" id="taglineCheck" checked={state.showTagline} onChange={e => set("showTagline", e.target.checked)} />
                <label htmlFor="taglineCheck" style={{ fontSize: "12px", color: "#6b7280", cursor: "pointer" }}>Show tagline</label>
              </div>
              {state.showTagline && (
                <InputField value={state.tagline} onChange={e => set("tagline", e.target.value)} placeholder="e.g. Professional & Reliable" />
              )}
            </Section>
 
            <Section title="Services">
              {state.services.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "6px", alignItems: "center" }}>
                  <input
                    value={s}
                    onChange={e => updateService(i, e.target.value)}
                    style={{
                      flex: 1, fontSize: "12px", padding: "6px 8px",
                      border: "1px solid #d1d5db", borderRadius: "7px",
                      fontFamily: "inherit", outline: "none", background: "#fafafa", color: "#111827",
                    }}
                  />
                  <button onClick={() => removeService(i)} style={{
                    background: "#fee2e2", color: "#b91c1c", border: "none",
                    borderRadius: "6px", width: "28px", height: "28px", cursor: "pointer", fontSize: "16px", lineHeight: 1,
                  }}>×</button>
                </div>
              ))}
              <button onClick={addService} style={{
                width: "100%", padding: "7px", fontSize: "12px", fontWeight: "600",
                border: "1.5px dashed #d1d5db", borderRadius: "7px",
                background: "transparent", color: "#6b7280", cursor: "pointer",
              }}>+ Add Service</button>
            </Section>
          </>
        )}
 
        {/* Design Tab */}
        {activeTab === "design" && (
          <>
            <Section title="Sign Color">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {COLORS.map(c => (
                  <div key={c.value} onClick={() => set("bgColor", c.value)} style={{ textAlign: "center", cursor: "pointer" }}>
                    <div style={{
                      width: "100%", aspectRatio: "1", borderRadius: "8px", background: c.value,
                      border: state.bgColor === c.value ? "3px solid #111827" : "2px solid transparent",
                      transition: "all 0.15s",
                    }} />
                    <div style={{ fontSize: "9px", color: "#9ca3af", marginTop: "3px", lineHeight: 1.2 }}>{c.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "12px" }}>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Custom color</div>
                <input type="color" value={state.bgColor} onChange={e => set("bgColor", e.target.value)}
                  style={{ width: "100%", height: "36px", border: "1px solid #d1d5db", borderRadius: "7px", cursor: "pointer", padding: "2px" }} />
              </div>
            </Section>
 
            <Section title="Font Size">
              <div style={{ display: "flex", gap: "6px" }}>
                {FONT_SIZES.map(s => (
                  <button key={s} onClick={() => set("fontSize", s)} style={{
                    flex: 1, padding: "7px 4px", fontSize: "12px", fontWeight: "600",
                    border: state.fontSize === s ? `2px solid ${state.bgColor}` : "1px solid #d1d5db",
                    borderRadius: "7px", cursor: "pointer",
                    background: state.fontSize === s ? state.bgColor + "18" : "#fafafa",
                    color: state.fontSize === s ? state.bgColor : "#374151",
                  }}>{s}</button>
                ))}
              </div>
            </Section>
 
            <Section title="Font Family">
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {FONTS.map(f => (
                  <button key={f.value} onClick={() => set("font", f.value)} style={{
                    padding: "8px 12px", fontSize: "13px", fontFamily: f.value,
                    border: state.font === f.value ? `2px solid ${state.bgColor}` : "1px solid #d1d5db",
                    borderRadius: "7px", cursor: "pointer", textAlign: "left",
                    background: state.font === f.value ? state.bgColor + "18" : "#fafafa",
                    color: state.font === f.value ? state.bgColor : "#374151",
                    fontWeight: "700",
                  }}>{f.name}</button>
                ))}
              </div>
            </Section>
 
            <Section title="Background Pattern">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}>
                {PATTERNS.map(p => (
                  <button key={p.value} onClick={() => set("pattern", p.value)} style={{
                    padding: "7px", fontSize: "12px", fontWeight: "600",
                    border: state.pattern === p.value ? `2px solid ${state.bgColor}` : "1px solid #d1d5db",
                    borderRadius: "7px", cursor: "pointer",
                    background: state.pattern === p.value ? state.bgColor + "18" : "#fafafa",
                    color: state.pattern === p.value ? state.bgColor : "#374151",
                  }}>{p.name}</button>
                ))}
              </div>
            </Section>
          </>
        )}
 
        {/* Extras Tab */}
        {activeTab === "extras" && (
          <>
            <Section title="Logo">
              <div
                onClick={() => logoInputRef.current?.click()}
                style={{
                  border: "2px dashed #d1d5db", borderRadius: "10px", padding: "24px",
                  textAlign: "center", cursor: "pointer", background: "#fafafa",
                  transition: "border-color 0.15s",
                }}
              >
                {logoUrl
                  ? <img src={logoUrl} alt="logo" style={{ maxHeight: "60px", maxWidth: "100%", objectFit: "contain" }} />
                  : <>
                    <div style={{ fontSize: "28px", marginBottom: "6px" }}>🖼</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Click to upload logo</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>PNG, JPG, SVG</div>
                  </>
                }
              </div>
              <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogo} style={{ display: "none" }} />
              {logoUrl && (
                <button onClick={() => setLogoUrl(null)} style={{
                  marginTop: "8px", width: "100%", padding: "7px", fontSize: "12px",
                  border: "1px solid #fca5a5", borderRadius: "7px",
                  background: "#fee2e2", color: "#b91c1c", cursor: "pointer",
                }}>Remove Logo</button>
              )}
            </Section>
 
            <Section title="Elements">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="iconToggle" checked={state.showIcon} onChange={e => set("showIcon", e.target.checked)} style={{ cursor: "pointer" }} />
                <label htmlFor="iconToggle" style={{ fontSize: "13px", color: "#374151", cursor: "pointer" }}>Show lawn mower icon</label>
              </div>
            </Section>
 
            <Section title="Export">
              <button onClick={handleDownload} style={{
                width: "100%", padding: "10px", fontSize: "13px", fontWeight: "700",
                border: "none", borderRadius: "8px", cursor: "pointer",
                background: state.bgColor, color: "#fff", letterSpacing: "0.5px",
              }}>Download as SVG</button>
              <div style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "6px" }}>
                SVG format — scales to any size
              </div>
            </Section>
          </>
        )}
      </div>
 
      {/* Right: Preview */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "32px",
          border: "1px solid #e5e7eb", flex: 1,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: "20px" }}>
            Live Preview
          </div>
          <SignPreview state={state} logoUrl={logoUrl} previewRef={previewRef} />
        </div>
 
        <div style={{
          marginTop: "12px", padding: "12px 16px", background: "#fff",
          borderRadius: "10px", border: "1px solid #e5e7eb",
          fontSize: "12px", color: "#6b7280", textAlign: "center",
        }}>
          Switch between <strong>Text</strong>, <strong>Design</strong>, and <strong>Extras</strong> tabs to customize every aspect of your sign
        </div>
      </div>
    </div>
  );
}
