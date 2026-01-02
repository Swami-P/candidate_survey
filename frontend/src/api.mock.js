const delay = (ms=300) => new Promise(r=>setTimeout(r,ms));

const mockResponses = [
  {
    candidateId: "demo-001", name: "Aiman", email: "aiman@example.com", positionApplied: "Software Engineer",
    submittedAt: new Date().toISOString(), q1:"Agree", q2:"Neutral", q3:"Disagree", q4:"Agree", q5:"Agree", q6:"Strongly Agree", q7:"Agree", feedback:"Good overall."
  },
  {
    candidateId: "demo-002", name: "Mei", email: "mei@example.com", positionApplied: "Data Analyst",
    submittedAt: new Date().toISOString(), q1:"Disagree", q2:"Disagree", q3:"Neutral", q4:"Neutral", q5:"Agree", q6:"Agree", q7:"Neutral", feedback:"JD could be clearer."
  },
  {
    candidateId: "demo-003", name: "Kumar", email: "kumar@example.com", positionApplied: "HR Specialist",
    submittedAt: new Date().toISOString(), q1:"Neutral", q2:"Agree", q3:"Strongly Disagree", q4:"Disagree", q5:"Agree", q6:"Agree", q7:"Disagree", feedback:"Slow updates."
  }
];

const apiMock = {
  manualAdd: async (payload) => { await delay(); return { data: { candidateId: "demo-999", token: "tok_demo_999" } }; },
  sendInvites: async () => { await delay(); return { data: { sent: 3, details: [] } }; },
  candidateByToken: async () => { await delay(); return { data: { name: "Demo Candidate", email: "demo@celcomdigi.com", positionApplied: "Software Engineer", candidateId: "demo-123" } }; },
  submitSurvey: async () => { await delay(); return { data: { ok: true } }; },
  reportSummary: async () => { await delay(); return { data: { year: { invites: 120, responses: 78, notResponded: 42 }, month: { invites: 10, responses: 6, notResponded: 4 } } }; },
  reportResponses: async () => { await delay(); return { data: { responses: mockResponses } }; },
  disagreeInsights: async () => { await delay(); return { data: { ranked: [
    { questionKey: "q3", disagreeCount: 1, stronglyDisagreeCount: 1, total: 3, concernScore: 3 },
    { questionKey: "q4", disagreeCount: 1, stronglyDisagreeCount: 0, total: 3, concernScore: 1 },
    { questionKey: "q1", disagreeCount: 1, stronglyDisagreeCount: 0, total: 3, concernScore: 1 }
  ] } }; }
};

export default apiMock;
