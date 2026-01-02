import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tables } from "../lib/db.js";
import { sendEmail, renderReminderEmail } from "../lib/ses.js";

export async function run() {
  const res = await ddb.send(new ScanCommand({ TableName: tables.candidates }));
  const now = Date.now();
  const toRemind = (res.Items || []).filter(c => {
    if (!c.inviteSentAt) return false;
    if (c.responseReceivedAt) return false;
    if (c.reminderSentAt) return false;
    const inviteTs = Date.parse(c.inviteSentAt);
    const diffDays = (now - inviteTs) / (1000 * 60 * 60 * 24);
    return diffDays >= 7;
  });
  for (const c of toRemind) {
    const mail = renderReminderEmail({ name: c.name, token: c.token });
    await sendEmail({ to: c.email, subject: mail.subject, html: mail.html });
    await ddb.send(new UpdateCommand({
      TableName: tables.candidates,
      Key: { candidateId: c.candidateId },
      UpdateExpression: "SET reminderSentAt = :ts",
      ExpressionAttributeValues: { ":ts": new Date().toISOString() }
    }));
  }
  return { statusCode: 200, body: JSON.stringify({ reminded: toRemind.length }) };
}
