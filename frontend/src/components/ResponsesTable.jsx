import React from "react";
export default function ResponsesTable({ responses }) {
  return (
    <div className="card">
      <h3>All Responses</h3>
      <div style={{ overflowX: "auto" }}>
        <table cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ background: "var(--accent-yellow)" }}>
              <th>Name</th><th>Email</th><th>Position</th><th>Submitted At</th>
              <th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Q5</th><th>Q6</th><th>Q7</th><th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {(responses || []).map(r => (
              <tr key={r.candidateId} style={{ borderTop: "1px solid var(--border)" }}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.positionApplied}</td>
                <td>{new Date(r.submittedAt).toLocaleString()}</td>
                <td>{r.q1}</td><td>{r.q2}</td><td>{r.q3}</td>
                <td>{r.q4}</td><td>{r.q5}</td><td>{r.q6}</td><td>{r.q7}</td>
                <td>{r.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
