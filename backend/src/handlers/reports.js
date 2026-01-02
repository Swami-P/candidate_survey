import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tables } from "../lib/db.js";
import { year, ym } from "../lib/utils.js";

function countsFromCandidates(items, currentYear, currentYM) {
  const yearInvites = items.filter(i => i.inviteSentAt && i.year === currentYear).length;
  const yearResponses = items.filter(i => i.responseReceivedAt && i.year === currentYear).length;
  const yearNotResponded = yearInvites - yearResponses;

  const monthInvites = items.filter(i => i.inviteSentAt && i.yearMonth === currentYM).length;
  const monthResponses = items.filter(i => i.responseReceivedAt && i.yearMonth === currentYM).length;
  const monthNotResponded = monthInvites - monthResponses;

  return {
    year: { invites: yearInvites, responses: yearResponses, notResponded: yearNotResponded },
    month: { invites: monthInvites, responses: monthResponses, notResponded: monthNotResponded }
  };
}

export async function summary() {
  const now = new Date();
  const currentYear = year(now);
  const currentYM = ym(now);
  const cRes = await ddb.send(new ScanCommand({ TableName: tables.candidates }));
  const counts = countsFromCandidates(cRes.Items || [], currentYear, currentYM);
  return { statusCode: 200, body: JSON.stringify(counts) };
}

export async function responses() {
  const rRes = await ddb.send(new ScanCommand({ TableName: tables.responses }));
  const items = (rRes.Items || []).map(r => ({
    candidateId: r.candidateId,
    name: r.name,
    email: r.email,
    positionApplied: r.positionApplied,
    submittedAt: r.submittedAt,
    ...r.answers
  }));
  return { statusCode: 200, body: JSON.stringify({ responses: items }) };
}

export async function disagreeInsights() {
  const rRes = await ddb.send(new ScanCommand({ TableName: tables.responses }));
  const items = rRes.Items || [];
  const questions = ["q1","q2","q3","q4","q5","q6","q7"];
  const counts = {};
  for (const q of questions) counts[q] = { stronglyDisagree: 0, disagree: 0, total: 0 };
  for (const r of items) {
    for (const q of questions) {
      const a = r.answers?.[q];
      if (!a) continue;
      counts[q].total += 1;
      if (a === "Strongly Disagree") counts[q].stronglyDisagree += 1;
      if (a === "Disagree") counts[q].disagree += 1;
    }
  }
  const ranked = Object.entries(counts).map(([q, c]) => ({
    questionKey: q,
    disagreeCount: c.disagree,
    stronglyDisagreeCount: c.stronglyDisagree,
    total: c.total,
    concernScore: c.stronglyDisagreeCount * 2 + c.disagreeCount
  })).sort((a,b) => b.concernScore - a.concernScore);
  return { statusCode: 200, body: JSON.stringify({ ranked }) };
}
