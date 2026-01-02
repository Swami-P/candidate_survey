# Candidate Post Interview Survey — Backend (Serverless Node.js)

Deploy with Serverless Framework:

```bash
cd backend
npm i
npx serverless deploy
```

Set `SURVEY_BASE_URL` to your Amplify/CloudFront URL plus `/s` (e.g., `https://survey.celcomdigi.com/s`).
Verify SES sender `celcomdigi_ta@celcomdigi.com` and domain before sending emails.
Upload Excel to `${service}-excel` bucket. Lambda ingestion will populate candidates.
Use `/invites` endpoint to send emails.
