import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tables } from "../lib/db.js";
import { createToken, nowIso, ym, year } from "../lib/utils.js";
import XLSX from "xlsx";

const s3 = new S3Client({});

export async function ingest(event) {
  for (const record of event.Records || []) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key);
    const obj = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const buffer = await streamToBuffer(obj.Body);
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const ts = new Date();
    for (const row of rows) {
      const name = row.Name || row.name;
      const email = row.Email || row.email;
      const status = row.Status || row.status;
      const jobTitle = row["Job Title"] || row.jobTitle || "";
      if (!name || !email || !status) continue;
      const candidateId = `${Date.now()}-${email}`;
      const token = createToken();
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
    }
  }
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
