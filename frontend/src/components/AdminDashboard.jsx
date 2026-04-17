import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl, readJsonSafely } from "../lib/api";
import {
  Shield, LogOut, RefreshCw, Download, FileSpreadsheet,
  Users, UserCheck, Package, Search, ChevronDown,
  ChevronUp, AlertCircle, CheckCircle, Loader2, ArrowLeft,
  TrendingUp, Clock, Database, Server
} from "lucide-react";

// ── Utility: Export to CSV ─────────────────────────────────────────────────
const exportCSV = (data, filename) => {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h] == null ? "" : String(row[h]);
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ── Utility: Export to Excel (XLSX via SheetJS) ────────────────────────────
const sanitizeForExport = (data) =>
  data.map((row) => {
    const clean = {};
    for (const [k, v] of Object.entries(row)) {
      // Skip base64 image fields — they're too large and crash Excel
      if (typeof v === "string" && v.startsWith("data:image")) {
        clean[k] = "[Image — see admin panel]";
      } else {
        clean[k] = v;
      }
    }
    return clean;
  });

const exportExcel = async (data, filename) => {
  if (!data.length) return;
  try {
    const XLSX = await import("xlsx");
    const clean = sanitizeForExport(data);
    const ws = XLSX.utils.json_to_sheet(clean);
    // Auto column widths
    const cols = Object.keys(clean[0]).map((k) => ({ wch: Math.max(k.length + 2, 18) }));
    ws["!cols"] = cols;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, filename);
  } catch (err) {
    console.error("Excel export error:", err);
    alert("Excel export failed. Downloading CSV instead…");
    exportCSV(sanitizeForExport(data), filename.replace(".xlsx", ".csv"));
  }
};

// ── Stats Card ─────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, loading, isMobile }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: isMobile ? "14px 16px" : "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "12px" : "16px",
      backdropFilter: "blur(10px)",
    }}
  >
    <div
      style={{
        width: isMobile ? "42px" : "48px",
        height: isMobile ? "42px" : "48px",
        borderRadius: "12px",
        background: `rgba(${color},0.12)`,
        border: `1px solid rgba(${color},0.25)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={isMobile ? 18 : 22} color={`rgb(${color})`} />
    </div>
    <div>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: isMobile ? "10px" : "12px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}
      </p>
      <p style={{ color: "#fff", fontSize: isMobile ? "22px" : "26px", fontWeight: "700", margin: 0 }}>
        {loading ? "—" : value}
      </p>
    </div>
  </div>
);

// ── Data Table ─────────────────────────────────────────────────────────────
const DataTable = ({ columns, data, loading, error, onRefresh, onExportCSV, onExportExcel, searchQuery, onSearch, onDelete, isMobile }) => {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("desc");
  const [lightbox, setLightbox] = useState(null); // { src, type }

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortCol(col); setSortDir("asc"); }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortCol) return 0;
    const av = a[sortCol] ?? "";
    const bv = b[sortCol] ?? "";
    const cmp = String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const filtered = sorted.filter((row) =>
    !searchQuery ||
    Object.values(row).some((v) =>
      String(v ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderCell = (col, row) => {
    const val = row[col.key];
    if (col.key === "created_at") {
      return val ? new Date(val).toLocaleString("en-IN") : "—";
    }
    if (col.key === "termsAgreed") {
      return val ? (
        <span style={{ color: "#4ade80", fontWeight: 700 }}>✅ Agreed</span>
      ) : (
        <span style={{ color: "#f87171" }}>✗ No</span>
      );
    }
    if (col.key === "employeeCode") {
      return val ? (
        <span style={{ fontFamily: "monospace", color: "#4ade80", fontWeight: 700, letterSpacing: "0.05em", background: "rgba(74,222,128,0.1)", padding: "2px 8px", borderRadius: "6px" }}>
          {val}
        </span>
      ) : "—";
    }
    if (col.key === "photo" || col.key === "signature") {
      return val && val.startsWith("data:image") ? (
        <button
          onClick={() => setLightbox({ src: val, type: col.key })}
          style={{
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.35)",
            borderRadius: "6px",
            color: "#93c5fd",
            fontSize: "11px",
            padding: "3px 10px",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          View {col.key === "photo" ? "Photo" : "Signature"}
        </button>
      ) : "—";
    }
    return val ?? "—";
  };

  return (
    <div>
      {/* Lightbox overlay */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          }}
        >
          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", maxWidth: "500px", width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600, textTransform: "capitalize" }}>{lightbox.type}</span>
              <button onClick={() => setLightbox(null)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "20px" }}>×</button>
            </div>
            <img src={lightbox.src} alt={lightbox.type} style={{ width: "100%", borderRadius: "8px", background: "#fff" }} />
          </div>
        </div>
      )}

      {/* Table Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: isMobile ? "100%" : "200px" }}>
          <Search size={15} color="rgba(255,255,255,0.3)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search records…"
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: isMobile ? "9px 12px" : "10px 16px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "rgba(255,255,255,0.7)",
            fontSize: isMobile ? "12px" : "13px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.15s",
            width: isMobile ? "calc(50% - 4px)" : "auto",
            justifyContent: "center",
          }}
        >
          <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          Refresh
        </button>

        {/* Export CSV */}
        <button
          onClick={onExportCSV}
          disabled={!data.length}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: isMobile ? "9px 12px" : "10px 16px",
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "10px",
            color: "#10B981",
            fontSize: isMobile ? "12px" : "13px",
            fontWeight: "500",
            cursor: data.length ? "pointer" : "not-allowed",
            opacity: data.length ? 1 : 0.4,
            fontFamily: "'Inter', sans-serif",
            width: isMobile ? "calc(50% - 4px)" : "auto",
            justifyContent: "center",
          }}
        >
          <Download size={14} />
          CSV
        </button>

        {/* Export Excel */}
        <button
          onClick={onExportExcel}
          disabled={!data.length}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: isMobile ? "9px 12px" : "10px 16px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "10px",
            color: "#818CF8",
            fontSize: isMobile ? "12px" : "13px",
            fontWeight: "500",
            cursor: data.length ? "pointer" : "not-allowed",
            opacity: data.length ? 1 : 0.4,
            fontFamily: "'Inter', sans-serif",
            width: isMobile ? "100%" : "auto",
            justifyContent: "center",
          }}
        >
          <FileSpreadsheet size={14} />
          Excel
        </button>
      </div>

      {/* Row count */}
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: "0 0 12px" }}>
        {filtered.length} of {data.length} records
        {searchQuery ? ` matching "${searchQuery}"` : ""}
      </p>

      {/* Table Container */}
      <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.07)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? "520px" : "600px" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  style={{
                    padding: isMobile ? "10px 12px" : "12px 16px",
                    textAlign: "left",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: isMobile ? "10px" : "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {col.label}
                    {sortCol === col.key ? (
                      sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    ) : null}
                  </span>
                </th>
              ))}
              {onDelete && (
                <th style={{ padding: isMobile ? "10px 12px" : "12px 16px", textAlign: "right", color: "rgba(255,255,255,0.5)", fontSize: isMobile ? "10px" : "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.7px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
                  <Loader2 size={24} style={{ animation: "spin 1s linear infinite", margin: "0 auto" }} />
                  <p style={{ marginTop: "12px", fontSize: "14px" }}>Loading data…</p>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: "48px", textAlign: "center" }}>
                  <AlertCircle size={24} color="#EF4444" style={{ margin: "0 auto" }} />
                  <p style={{ marginTop: "12px", color: "#EF4444", fontSize: "14px" }}>{error}</p>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>
                  {data.length === 0 ? "No submissions yet." : "No records match your search."}
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={row.id || i}
                  style={{
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)")}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: isMobile ? "10px 12px" : "13px 16px",
                        color: col.key === "created_at" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)",
                        fontSize: isMobile ? "12.5px" : "13.5px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        whiteSpace: col.key === "created_at" ? "nowrap" : "normal",
                      }}
                    >
                      {renderCell(col, row)}
                    </td>
                  ))}
                  {onDelete && (
                    <td style={{ padding: isMobile ? "10px 12px" : "13px 16px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <button
                        onClick={() => onDelete(row)}
                        style={{ background: "transparent", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: isMobile ? "3px 7px" : "4px 8px", borderRadius: "6px", cursor: "pointer", fontSize: isMobile ? "11px" : "12px", transition: "all 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applications");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const [applications, setApplications] = useState([]);
  const [completeProfiles, setCompleteProfiles] = useState([]);
  const [passkeyOrders, setPasskeyOrders] = useState([]);

  const [loadingMap, setLoadingMap] = useState({ applications: true, passkey_orders: true, complete_profiles: true });
  const [errorMap, setErrorMap] = useState({});
  const [searchMap, setSearchMap] = useState({ applications: "", passkey_orders: "", complete_profiles: "" });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auth guard
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token !== btoa("panoptyc_admin_authenticated")) {
      navigate("/admin");
    }
  }, [navigate]);

  const fetchDeletedRecords = useCallback(async () => {
    try {
      const response = await fetch(apiUrl("/api/deleted-records"));
      if (!response.ok) return {};
      const payload = await readJsonSafely(response);
      return payload && typeof payload === "object" ? payload : {};
    } catch {
      return {};
    }
  }, []);

  const fetchTable = useCallback(async (table, setter) => {
    setLoadingMap((prev) => ({ ...prev, [table]: true }));
    setErrorMap((prev) => ({ ...prev, [table]: null }));
    try {
      if (table !== "passkey_orders") {
        throw new Error("Unsupported table fetch");
      }

      const response = await fetch(apiUrl("/api/passkey-orders"));
      if (!response.ok) throw new Error("Failed to load passkey orders");

      const payload = await readJsonSafely(response);
      let rows = Array.isArray(payload) ? payload : [];
      if (table === "passkey_orders") {
        const deleted = await fetchDeletedRecords();
        const deletedIds = new Set((deleted?.[table] || []).map((id) => String(id)));
        rows = rows.filter((row) => !deletedIds.has(String(row.id)));
      }

      setter(rows);
    } catch (err) {
      setErrorMap((prev) => ({ ...prev, [table]: err.message || "Failed to load data" }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [table]: false }));
    }
  }, [fetchDeletedRecords]);

  const fetchApplications = useCallback(async () => {
    setLoadingMap((prev) => ({ ...prev, applications: true }));
    setErrorMap((prev) => ({ ...prev, applications: null }));
    try {
      const response = await fetch(apiUrl("/api/applications"));
      if (!response.ok) throw new Error("Failed to load applications data");
      const payload = await readJsonSafely(response);
      const data = Array.isArray(payload) ? payload : [];
      setApplications((data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setErrorMap((prev) => ({ ...prev, applications: err.message || "Failed to load data" }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, applications: false }));
    }
  }, []);

  const handleDelete = async (tabId, row) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    
    try {
      const response = await fetch(apiUrl("/api/delete-record"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tab: tabId,
          id: row.id,
          employeeCode: row.employeeCode,
          email: row.email,
        })
      });
      const result = await readJsonSafely(response);
      if (!response.ok || !result.success) {
        throw new Error(result.detail || "Failed to delete record from backend.");
      }

      if (tabId === "complete_profiles" && row.email) {
        try {
          const stored = localStorage.getItem("panoptyc_employee");
          if (stored) {
            const session = JSON.parse(stored);
            if ((session?.email || "").toLowerCase() === row.email.toLowerCase()) {
              localStorage.removeItem("panoptyc_employee");
            }
          }
        } catch {
          // Ignore malformed local session data.
        }
      }
      
      // Refresh the specific table
      if (tabId === "applications") fetchApplications();
      if (tabId === "passkey_orders") fetchTable("passkey_orders", setPasskeyOrders);
      if (tabId === "complete_profiles") fetchCompleteProfiles();
    } catch (err) {
      alert("Error deleting record: " + err.message);
    }
  };

  const fetchCompleteProfiles = useCallback(async () => {
    setLoadingMap((prev) => ({ ...prev, complete_profiles: true }));
    setErrorMap((prev) => ({ ...prev, complete_profiles: null }));
    try {
      const response = await fetch(apiUrl("/api/complete-profiles"));
      if (!response.ok) throw new Error("Failed to load local data");
      const payload = await readJsonSafely(response);
      const data = Array.isArray(payload) ? payload : [];
      setCompleteProfiles((data || []).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setErrorMap((prev) => ({ ...prev, complete_profiles: err.message || "Failed to load data" }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, complete_profiles: false }));
    }
  }, []);

  useEffect(() => {
    fetchApplications();
    fetchTable("passkey_orders", setPasskeyOrders);
    fetchCompleteProfiles();
  }, [fetchApplications, fetchTable, fetchCompleteProfiles]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    navigate("/admin");
  };

  // Tab config
  const tabs = [
    {
      id: "applications",
      label: "Applications",
      icon: Users,
      data: applications,
      color: "239,68,68",
      columns: [
        { key: "full_name", label: "Full Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "city", label: "City" },
        { key: "created_at", label: "Submitted At" },
      ],
      csvFile: "applications.csv",
      xlsxFile: "applications.xlsx",
    },
    {
      id: "complete_profiles",
      label: "Complete Profiles",
      icon: UserCheck,
      data: completeProfiles,
      color: "59,130,246",
      columns: [
        { key: "employeeCode", label: "Employee Code" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "mobile", label: "Mobile" },
        { key: "education", label: "Education" },
        { key: "address", label: "Address" },
        { key: "photo", label: "Photo" },
        { key: "signature", label: "Signature" },
        { key: "termsAgreed", label: "Terms Agreed" },
        { key: "created_at", label: "Submitted At" },
      ],
      csvFile: "complete_profiles.csv",
      xlsxFile: "complete_profiles.xlsx",
    },
    {
      id: "passkey_orders",
      label: "Passkey Orders",
      icon: Package,
      data: passkeyOrders,
      color: "16,185,129",
      columns: [
        { key: "full_name", label: "Full Name" },
        { key: "phone", label: "Phone" },
        { key: "address_line1", label: "Address 1" },
        { key: "address_line2", label: "Address 2" },
        { key: "city", label: "City" },
        { key: "state", label: "State" },
        { key: "pincode", label: "Pincode" },
        { key: "quantity", label: "Qty" },
        { key: "created_at", label: "Ordered At" },
      ],
      csvFile: "passkey_orders.csv",
      xlsxFile: "passkey_orders.xlsx",
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab);

  // Latest submission time across all
  const allTimestamps = [
    ...applications.map((r) => r.created_at),
    ...completeProfiles.map((r) => r.created_at),
    ...passkeyOrders.map((r) => r.created_at),
  ].filter(Boolean).sort().reverse();

  const lastActivity = allTimestamps[0]
    ? new Date(allTimestamps[0]).toLocaleString("en-IN")
    : "No data yet";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0f1e 0%, #0d1525 100%)",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { border-color: rgba(239,68,68,0.4) !important; box-shadow: 0 0 0 2px rgba(239,68,68,0.08); }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
      `}</style>

      {/* ── Top Navbar ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10,15,30,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: isMobile ? "0 14px" : "0 32px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", height: isMobile ? "auto" : "64px", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "10px" : 0, padding: isMobile ? "10px 0" : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "16px", justifyContent: isMobile ? "space-between" : "flex-start", width: isMobile ? "100%" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Shield size={isMobile ? 18 : 20} color="#EF4444" />
              <span style={{ fontWeight: "700", fontSize: isMobile ? "15px" : "16px", color: "#fff" }}>Admin Dashboard</span>
            </div>
            {!isMobile && <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "18px" }}>|</span>}
            <img
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
              alt="Panoptyc"
              style={{ height: isMobile ? "20px" : "24px", width: "auto", objectFit: "contain", opacity: 0.8 }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px", flexWrap: isMobile ? "wrap" : "nowrap", width: isMobile ? "100%" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981", fontSize: "12px", fontWeight: "500" }}>
              <div style={{ width: "7px", height: "7px", background: "#10B981", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Live
            </div>
            <button
              onClick={() => navigate("/")}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: isMobile ? "8px 10px" : "8px 14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "rgba(255,255,255,0.6)",
                fontSize: isMobile ? "12px" : "13px",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                flex: isMobile ? 1 : "none",
                justifyContent: "center",
              }}
            >
              <ArrowLeft size={13} />
              Site
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: isMobile ? "8px 10px" : "8px 14px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "8px",
                color: "#EF4444",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: "500",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                flex: isMobile ? 1 : "none",
                justifyContent: "center",
              }}
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "16px 12px 20px" : "32px" }}>

        {/* ── Stats Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: isMobile ? "20px" : "32px" }}>
          <StatCard
            icon={Users}
            label="Total Applications"
            value={applications.length}
            color="239,68,68"
            loading={loadingMap.applications}
            isMobile={isMobile}
          />

          <StatCard
            icon={Package}
            label="Passkey Orders"
            value={passkeyOrders.length}
            color="16,185,129"
            loading={loadingMap.passkey_orders}
            isMobile={isMobile}
          />
          <StatCard
            icon={UserCheck}
            label="Complete Profiles"
            value={completeProfiles.length}
            color="59,130,246"
            loading={loadingMap.complete_profiles}
            isMobile={isMobile}
          />
          <StatCard
            icon={TrendingUp}
            label="Total Submissions"
            value={applications.length + completeProfiles.length + passkeyOrders.length}
            color="251,191,36"
            loading={loadingMap.applications || loadingMap.complete_profiles || loadingMap.passkey_orders}
            isMobile={isMobile}
          />
        </div>

        {/* ── Last Activity ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.35)",
            fontSize: "12px",
            marginBottom: isMobile ? "14px" : "24px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <Clock size={13} />
          <span>Last activity: <span style={{ color: "rgba(255,255,255,0.55)" }}>{lastActivity}</span></span>
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.1)" }}>•</span>
          <Server size={13} />
          <span>Hybrid DB System</span>
        </div>

        {/* ── Tabs ── */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: isMobile ? "4px" : "6px",
            marginBottom: isMobile ? "16px" : "24px",
            width: isMobile ? "100%" : "fit-content",
            overflowX: isMobile ? "auto" : "visible",
          }}
        >
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: isMobile ? "9px 12px" : "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive
                    ? `rgba(${tab.color},0.15)`
                    : "transparent",
                  color: isActive ? `rgb(${tab.color})` : "rgba(255,255,255,0.45)",
                  fontSize: isMobile ? "12px" : "14px",
                  fontWeight: isActive ? "600" : "400",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s",
                  outline: isActive ? `1px solid rgba(${tab.color},0.3)` : "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <TabIcon size={15} />
                {tab.label}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    background: isActive ? `rgba(${tab.color},0.2)` : "rgba(255,255,255,0.08)",
                    color: isActive ? `rgb(${tab.color})` : "rgba(255,255,255,0.3)",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    minWidth: "24px",
                    textAlign: "center",
                  }}
                >
                  {tab.data.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Table Card ── */}
        {currentTab && (
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: isMobile ? "14px" : "28px",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Table Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                <div
                  style={{
                    width: isMobile ? "34px" : "40px",
                    height: isMobile ? "34px" : "40px",
                    borderRadius: "10px",
                    background: `rgba(${currentTab.color},0.12)`,
                    border: `1px solid rgba(${currentTab.color},0.25)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <currentTab.icon size={isMobile ? 16 : 18} color={`rgb(${currentTab.color})`} />
                </div>
                <div>
                  <h2 style={{ color: "#fff", fontSize: isMobile ? "16px" : "18px", fontWeight: "700", margin: "0 0 2px" }}>
                    {currentTab.label}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: isMobile ? "11px" : "12px", margin: 0 }}>
                    {currentTab.data.length} total records · {activeTab === "complete_profiles" ? "node/local" : "backend/api"}
                  </p>
                </div>
              </div>

              {/* Export summary */}
              {currentTab.data.length > 0 && !loadingMap[activeTab] && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981", fontSize: "12px" }}>
                  <CheckCircle size={13} />
                  {currentTab.data.length} records ready to export
                </div>
              )}
            </div>

            <DataTable
              columns={currentTab.columns}
              data={currentTab.data}
              loading={loadingMap[activeTab]}
              error={errorMap[activeTab]}
              onRefresh={() => {
                if (activeTab === "applications") fetchApplications();
                if (activeTab === "passkey_orders") fetchTable("passkey_orders", setPasskeyOrders);
                if (activeTab === "complete_profiles") fetchCompleteProfiles();
              }}
              onExportCSV={() => exportCSV(currentTab.data, currentTab.csvFile)}
              onExportExcel={() => exportExcel(currentTab.data, currentTab.xlsxFile)}
              searchQuery={searchMap[activeTab]}
              onSearch={(q) => setSearchMap((prev) => ({ ...prev, [activeTab]: q }))}
              onDelete={(row) => handleDelete(activeTab, row)}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
