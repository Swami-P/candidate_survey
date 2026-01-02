import { PutCommand, GetCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tables } from "../lib/db.js";
import { nowIso, ym, year, createToken } from "../lib/utils.js";

export async function manualAdd(event) {
  const body = JSON.parse(event.body || "{}");
  const { name, email, status, jobTitle = "" } = body;
  if (!name || !email || !status) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing name/email/status" }) };
  }

  const candidateId = `${Date.now()}-${email}`;
  const token = createToken();
  const ts = new Date();

  await ddb.send(new PutCommand({
    TableName: tables.candidates,
    Item: {
      candidateId, name, email, status, jobTitle,
      token,
      createdAt: nowIso(),
      year: year(ts),
      yearMonth: ym(ts),
      inviteSentAt: null,
      responseReceivedAt: null,
      reminderSentAt: null
    }
  }));

  return { statusCode: 200, body: JSON.stringify({ candidateId, token }) };
}

export async function getByToken(event) {
  const token = event.queryStringParameters?.token;
  if (!token) return { statusCode: 400, body: JSON.stringify({ error: "Missing token" }) };

  const res = await ddb.send(new ScanCommand({
    TableName: tables.candidates,
    FilterExpression: "#t = :t",
    ExpressionAttributeNames: { "#t": "token" },
    ExpressionAttributeValues: { ":t": token }
  }));

  const item = res.Items?.[0];
  if (!item) return { statusCode: 404, body: JSON.stringify({ error: "Invalid token" }) };
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: item.name,
      email: item.email,
      positionApplied: item.jobTitle || "",
      candidateId: item.candidateId
    })
  };
}
