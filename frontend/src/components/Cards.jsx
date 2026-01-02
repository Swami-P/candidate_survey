import React from "react";
export default function Cards({ data }) {
  const { year = {}, month = {} } = data || {};
  return (
    <div className="card" style={{ borderTop: "4px solid var(--primary-blue)" }}>
      <h3>Summary (Cards)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <MiniCard title="Invites (YTD)" value={year.invites ?? 0} />
        <MiniCard title="Responses (YTD)" value={year.responses ?? 0} />
        <MiniCard title="Not Responded (YTD)" value={year.notResponded ?? 0} />
        <MiniCard title="Invites (MTD)" value={month.invites ?? 0} />
        <MiniCard title="Responses (MTD)" value={month.responses ?? 0} />
        <MiniCard title="Not Responded (MTD)" value={month.notResponded ?? 0} />
      </div>
    </div>
  );
}
function MiniCard({ title, value }) { return (
  <div className="card" style={{ borderTop: "4px solid var(--accent-yellow)" }}>
    <div style={{ fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 28 }}>{value}</div>
  </div>
); }
