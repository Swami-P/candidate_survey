import { UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tables } from "../lib/db.js";
import { nowIso } from "../lib/utils.js";
import { sendEmail, renderRejectedEmail, renderShortlistedEmail } from "../lib/ses.js";

export async function sendInvites(event) {
  const body = JSON.parse(event.body || "{}");

  let targets = [];
  if (Array.isArray(body.candidateIds) && body.candidateIds.length) {
    const ids = new Set(body.candidateIds);
    const res = await ddb.send(new ScanCommand({ TableName: tables.candidates }));
    targets = res.Items.filter(i => ids.has(i.candidateId));
  } else {
    const res = await ddb.send(new ScanCommand({
      TableName: tables.candidates,
      FilterExpression: "attribute_not_exists(inviteSentAt) OR inviteSentAt = :null",
      ExpressionAttributeValues: { ":null": null }
    }));
    targets = res.Items || [];
  }

  const results = [];
  for (const c of targets) {
    const emailModel =
      c.status?.toLowerCase() === "rejected"
        ? renderRejectedEmail({ name: c.name, jobTitle: c.jobTitle || "the", token: c.token })
        : renderShortlistedEmail({ name: c.name, jobTitle: c.jobTitle || "the", token: c.token });

    await sendEmail({ to: c.email, subject: emailModel.subject, html: emailModel.html });

    await ddb.send(new UpdateCommand({
      TableName: tables.candidates,
      Key: { candidateId: c.candidateId },
      UpdateExpression: "SET inviteSentAt = :ts",
      ExpressionAttributeValues: { ":ts": nowIso() }
    }));

    results.push({ candidateId: c.candidateId, email: c.email, status: c.status });
  }

  return { statusCode: 200, body: JSON.stringify({ sent: results.length, details: results }) };
}
