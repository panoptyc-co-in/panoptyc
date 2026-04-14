import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import {
  Shield, LogOut, RefreshCw, Download, FileSpreadsheet,
  Users, UserCircle, Package, Search, ChevronDown,
  ChevronUp, AlertCircle, CheckCircle, Loader2, ArrowLeft,
  TrendingUp, Clock, Database
} from "lucide-react";

// Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

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
const exportExcel = async (data, filename) => {
  if (!data.length) return;
  try {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  } catch (err) {
    console.error("Excel export error:", err);
    alert("Excel export failed. Trying CSV instead…");
    exportCSV(data, filename.replace(".xlsx", ".csv"));
  }
};

// ── Stats Card ─────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, loading }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      backdropFilter: "blur(10px)",
    }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        background: `rgba(${color},0.12)`,
        border: `1px solid rgba(${color},0.25)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={22} color={`rgb(${color})`} />
    </div>
    <div>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}
      </p>
      <p style={{ color: "#fff", fontSize: "26px", fontWeight: "700", margin: 0 }}>
        {loading ? "—" : value}
      </p>
    </div>
  </div>
);

// ── Data Table ─────────────────────────────────────────────────────────────
const DataTable = ({ columns, data, loading, error, onRefresh, onExportCSV, onExportExcel, searchQuery, onSearch }) => {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("desc");

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

  return (
    <div>
      {/* Table Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
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
            padding: "10px 16px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.15s",
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
            padding: "10px 16px",
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "10px",
            color: "#10B981",
            fontSize: "13px",
            fontWeight: "500",
            cursor: data.length ? "pointer" : "not-allowed",
            opacity: data.length ? 1 : 0.4,
            fontFamily: "'Inter', sans-serif",
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
            padding: "10px 16px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "10px",
            color: "#818CF8",
            fontSize: "13px",
            fontWeight: "500",
            cursor: data.length ? "pointer" : "not-allowed",
            opacity: data.length ? 1 : 0.4,
            fontFamily: "'Inter', sans-serif",
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
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "11px",
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
                        padding: "13px 16px",
                        color: col.key === "created_at" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)",
                        fontSize: "13.5px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        whiteSpace: col.key === "created_at" ? "nowrap" : "normal",
                      }}
                    >
                      {col.key === "created_at"
                        ? row[col.key] ? new Date(row[col.key]).toLocaleString("en-IN") : "—"
                        : row[col.key] ?? "—"}
                    </td>
                  ))}
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

  const [applications, setApplications] = useState([]);
  const [profileSetups, setProfileSetups] = useState([]);
  const [passkeyOrders, setPasskeyOrders] = useState([]);

  const [loadingMap, setLoadingMap] = useState({ applications: true, profile_setups: true, passkey_orders: true });
  const [errorMap, setErrorMap] = useState({});
  const [searchMap, setSearchMap] = useState({ applications: "", profile_setups: "", passkey_orders: "" });

  // Auth guard
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token !== btoa("panoptyc_admin_authenticated")) {
      navigate("/admin");
    }
  }, [navigate]);

  const fetchTable = useCallback(async (table, setter) => {
    setLoadingMap((prev) => ({ ...prev, [table]: true }));
    setErrorMap((prev) => ({ ...prev, [table]: null }));
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setter(data || []);
    } catch (err) {
      setErrorMap((prev) => ({ ...prev, [table]: err.message || "Failed to load data" }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [table]: false }));
    }
  }, []);

  useEffect(() => {
    fetchTable("applications", setApplications);
    fetchTable("profile_setups", setProfileSetups);
    fetchTable("passkey_orders", setPasskeyOrders);
  }, [fetchTable]);

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
        { key: "city", label: "City" },
        { key: "created_at", label: "Submitted At" },
      ],
      csvFile: "applications.csv",
      xlsxFile: "applications.xlsx",
    },
    {
      id: "profile_setups",
      label: "Profile Setups",
      icon: UserCircle,
      data: profileSetups,
      color: "168,85,247",
      columns: [
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
        { key: "created_at", label: "Submitted At" },
      ],
      csvFile: "profile_setups.csv",
      xlsxFile: "profile_setups.xlsx",
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
    ...profileSetups.map((r) => r.created_at),
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
          padding: "0 32px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Shield size={20} color="#EF4444" />
              <span style={{ fontWeight: "700", fontSize: "16px", color: "#fff" }}>Admin Dashboard</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "18px" }}>|</span>
            <img
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
              alt="Panoptyc"
              style={{ height: "24px", width: "auto", objectFit: "contain", opacity: 0.8 }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981", fontSize: "12px", fontWeight: "500" }}>
              <div style={{ width: "7px", height: "7px", background: "#10B981", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Live
            </div>
            <button
              onClick={() => navigate("/")}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <ArrowLeft size={13} />
              Site
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "8px",
                color: "#EF4444",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px" }}>

        {/* ── Stats Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          <StatCard
            icon={Users}
            label="Total Applications"
            value={applications.length}
            color="239,68,68"
            loading={loadingMap.applications}
          />
          <StatCard
            icon={UserCircle}
            label="Profile Setups"
            value={profileSetups.length}
            color="168,85,247"
            loading={loadingMap.profile_setups}
          />
          <StatCard
            icon={Package}
            label="Passkey Orders"
            value={passkeyOrders.length}
            color="16,185,129"
            loading={loadingMap.passkey_orders}
          />
          <StatCard
            icon={TrendingUp}
            label="Total Submissions"
            value={applications.length + profileSetups.length + passkeyOrders.length}
            color="251,191,36"
            loading={loadingMap.applications || loadingMap.profile_setups || loadingMap.passkey_orders}
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
            marginBottom: "24px",
          }}
        >
          <Clock size={13} />
          <span>Last activity: <span style={{ color: "rgba(255,255,255,0.55)" }}>{lastActivity}</span></span>
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.1)" }}>•</span>
          <Database size={13} />
          <span>Supabase Postgres</span>
        </div>

        {/* ── Tabs ── */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "6px",
            marginBottom: "24px",
            width: "fit-content",
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
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive
                    ? `rgba(${tab.color},0.15)`
                    : "transparent",
                  color: isActive ? `rgb(${tab.color})` : "rgba(255,255,255,0.45)",
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "400",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s",
                  outline: isActive ? `1px solid rgba(${tab.color},0.3)` : "none",
                  whiteSpace: "nowrap",
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
              padding: "28px",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Table Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `rgba(${currentTab.color},0.12)`,
                    border: `1px solid rgba(${currentTab.color},0.25)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <currentTab.icon size={18} color={`rgb(${currentTab.color})`} />
                </div>
                <div>
                  <h2 style={{ color: "#fff", fontSize: "18px", fontWeight: "700", margin: "0 0 2px" }}>
                    {currentTab.label}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0 }}>
                    {currentTab.data.length} total records · supabase/{activeTab}
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
                if (activeTab === "applications") fetchTable("applications", setApplications);
                if (activeTab === "profile_setups") fetchTable("profile_setups", setProfileSetups);
                if (activeTab === "passkey_orders") fetchTable("passkey_orders", setPasskeyOrders);
              }}
              onExportCSV={() => exportCSV(currentTab.data, currentTab.csvFile)}
              onExportExcel={() => exportExcel(currentTab.data, currentTab.xlsxFile)}
              searchQuery={searchMap[activeTab]}
              onSearch={(q) => setSearchMap((prev) => ({ ...prev, [activeTab]: q }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
