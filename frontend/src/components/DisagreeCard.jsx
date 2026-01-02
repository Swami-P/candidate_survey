import React from "react";
const labels = {
  q1: "Ease of applying (Career site/LinkedIn)",
  q2: "Clarity of job description",
  q3: "Recruiter responsiveness",
  q4: "Understanding of steps/process",
  q5: "Relevance of interview questions/cases",
  q6: "Interviewers engaging/knowledgeable/professional",
  q7: "Overall recruitment experience"
};
export default function DisagreeCard({ ranked }) {
  return (
    <div className="card" style={{ borderTop: "4px solid var(--accent-yellow)" }}>
      <h3>Areas to Improve (Disagree / Strongly Disagree)</h3>
      <p>Weighted by Strongly Disagree (x2) + Disagree</p>
      <ul>
        {(ranked || []).slice(0, 3).map(item => (
          <li key={item.questionKey}>
            <strong>{labels[item.questionKey]}</strong>: SD={item.stronglyDisagreeCount}, D={item.disagreeCount}
            {item.total ? ` (n=${item.total})` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
