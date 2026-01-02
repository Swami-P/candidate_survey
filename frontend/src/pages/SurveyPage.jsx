import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function SurveyPage() {
  const { token } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [answers, setAnswers] = useState({ q1:"", q2:"", q3:"", q4:"", q5:"", q6:"", q7:"", feedback:"" });
  const [done, setDone] = useState(false);

  useEffect(() => { (async () => { const res = await api.candidateByToken(token); setCandidate(res.data); })(); }, [token]);
  function onChange(e, key) { setAnswers({ ...answers, [key]: e.target.value }); }
  async function submit() { const payload = { candidateId: candidate.candidateId, name: candidate.name, email: candidate.email, positionApplied: candidate.positionApplied, answers }; await api.submitSurvey(payload); setDone(true); }

  if (!candidate) return <div className="card">Loading...</div>;
  if (done) return <div className="card"><h3>Thank you!</h3><p>Your feedback has been submitted.</p></div>;

  return (
    <div className="card">
      <h3>Candidate Feedback Form</h3>
      <p><strong>Name:</strong> {candidate.name}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Position Applied:</strong> {candidate.positionApplied}</p>
      <Question label="I found it easy to apply for jobs on CelcomDigi’s career site and/or LinkedIn page." value={answers.q1} onChange={e => onChange(e,"q1")} />
      <Question label="The job description provided in the job advertisement was clear and easy to understand." value={answers.q2} onChange={e => onChange(e,"q2")} />
      <Question label="The recruiter was responsive and provided timely updates on my application status throughout the process." value={answers.q3} onChange={e => onChange(e,"q3")} />
      <Question label="I have a good understanding of the steps involved in the recruitment process at CelcomDigi." value={answers.q4} onChange={e => onChange(e,"q4")} />
      <Question label="The interview questions and/or case studies were relevant to the job applied and helped me showcase my skills." value={answers.q5} onChange={e => onChange(e,"q5")} />
      <Question label="The interviewers were engaging, knowledgeable and professional during the interview." value={answers.q6} onChange={e => onChange(e,"q6")} />
      <Question label="It was a good experience overall to go through CelcomDigi’s recruitment process." value={answers.q7} onChange={e => onChange(e,"q7")} />
      <label>Do you have any further feedback about your recruitment process experience?</label>
      <textarea value={answers.feedback} onChange={e => onChange(e,"feedback")} rows={4} />
      <button className="btn" onClick={submit}>Submit</button>
    </div>
  );
}

function Question({ label, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">Select...</option>
        {[
          "Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"
        ].map(o => (<option key={o} value={o}>{o}</option>))}
      </select>
    </>
  );
}
