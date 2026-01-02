import axios from "axios";
import apiMock from "./api.mock";

const isDemo = new URLSearchParams(window.location.search).get("demo") === "1";
export const API_BASE = "https://YOUR_API_ID.execute-api.ap-southeast-1.amazonaws.com";

const realApi = {
  manualAdd: (payload) => axios.post(`${API_BASE}/candidates`, payload),
  sendInvites: (payload = {}) => axios.post(`${API_BASE}/invites`, payload),
  candidateByToken: (token) => axios.get(`${API_BASE}/candidateByToken`, { params: { token } }),
  submitSurvey: (payload) => axios.post(`${API_BASE}/survey`, payload),
  reportSummary: () => axios.get(`${API_BASE}/report/summary`),
  reportResponses: () => axios.get(`${API_BASE}/report/responses`),
  disagreeInsights: () => axios.get(`${API_BASE}/report/disagree-insights`)
};

export const api = isDemo ? apiMock : realApi;
