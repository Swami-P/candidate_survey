import React, { useState } from "react";
import UploadExcel from "../components/UploadExcel.jsx";
import ManualEntryForm from "../components/ManualEntryForm.jsx";
import { api } from "../api";

export default function AdminDashboard() {
  const [inviteResult, setInviteResult] = useState(null);
  async function sendInvites() { const res = await api.sendInvites(); setInviteResult(res.data); }
  return (
    <>
      <div className="card" style={{ borderTop: "4px solid var(--accent-yellow)" }}>
        <h2>Admin Dashboard</h2>
        <p>Upload Excel or add candidates manually, then send invites with survey links via SES.</p>
      </div>
      <UploadExcel />
      <ManualEntryForm />
      <div className="card">
        <h3>Send Invites</h3>
        <button className="btn secondary" onClick={sendInvites}>Send Invites Now</button>
        {inviteResult && (
          <div style={{ marginTop: 12 }}>
            <strong>Sent:</strong> {inviteResult.sent}
          </div>
        )}
      </div>
    </>
  );
}
