import React, { useState } from "react";
import { api } from "../api";

export default function ManualEntryForm() {
  const [form, setForm] = useState({ name: "", email: "", status: "Rejected", jobTitle: "" });
  const [result, setResult] = useState(null);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  async function submit() { const res = await api.manualAdd(form); setResult(res.data); }
  return (
    <div className="card">
      <h3>Manual Candidate Entry</h3>
      <label>Name</label>
      <input name="name" value={form.name} onChange={onChange} />
      <label>Email</label>
      <input name="email" type="email" value={form.email} onChange={onChange} />
      <label>Status</label>
      <select name="status" value={form.status} onChange={onChange}>
        <option>Rejected</option>
        <option>Shortlisted</option>
      </select>
      <label>Job Title</label>
      <input name="jobTitle" value={form.jobTitle} onChange={onChange} />
      <button className="btn" onClick={submit}>Add Candidate</button>
      {result && <p style={{ marginTop: 8 }}>Candidate created. Token: {result.token}</p>}
    </div>
  );
}
