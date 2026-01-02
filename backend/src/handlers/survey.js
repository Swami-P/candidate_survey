import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tables } from "../lib/db.js";
import { nowIso, ym, year } from "../lib/utils.js";

export async function submit(event) {
  const body = JSON.parse(event.body || "{}");
  const {
    candidateId,
    name,
    email,
    positionApplied,
    answers,
  } = body;

  if (!candidateId || !answers) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing candidateId/answers" }) };
  }

  const ts = new Date();

  await ddb.send(new PutCommand({
    TableName: tables.responses,
    Item: {
      candidateId,
      name,
      email,
      positionApplied,
      answers,
      submittedAt: nowIso(),
      year: year(ts),
      yearMonth: ym(ts)
    }
  }));

  await ddb.send(new UpdateCommand({
    TableName: tables.candidates,
    Key: { candidateId },
    UpdateExpression: "SET responseReceivedAt = :ts",
    ExpressionAttributeValues: { ":ts": nowIso() }
  }));

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}
