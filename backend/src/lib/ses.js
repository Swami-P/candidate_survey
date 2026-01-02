import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});
const SENDER = process.env.EMAIL_SENDER;
const SURVEY_BASE_URL = process.env.SURVEY_BASE_URL;

export async function sendEmail({ to, subject, html }) {
  const cmd = new SendEmailCommand({
    FromEmailAddress: SENDER,
    Destination: { ToAddresses: [to] },
    Content: { Simple: { Subject: { Data: subject }, Body: { Html: { Data: html } } } }
  });
  await ses.send(cmd);
}

export function renderRejectedEmail({ name, jobTitle, token }) {
  const surveyUrl = `${SURVEY_BASE_URL}/${token}`;
  return {
    subject: `CelcomDigi – Thank you for interviewing (${jobTitle})`,
    html: `
<p>Hi ${name},</p>
<p>Thank you for taking the time to interview for the ${jobTitle} position at CelcomDigi. It was a pleasure meeting you and learning about your experiences and aspirations.</p>
<p>After carefully reviewing all candidates, we have chosen to move forward with another candidate whose experience aligns more closely with the specific needs of this role.</p>
<p>We’re excited about the possibility of staying connected and hope you’ll continue to explore future opportunities with us via our Career Page and follow us for updates on LinkedIn.</p>
<p>We’d also appreciate your feedback on the interview process, as it helps us improve. Please take a moment to complete the survey here: 👉 ${surveyUrl} CelcomDigi Candidate Feedback Form</p>
<p>Thank you once again for considering CelcomDigi for your next career move. We wish you all the best and look forward to the possibility of working together to advance and inspire Malaysia #WeAreCelcomDigi</p>
<p>Best regards,<br/>CelcomDigi Talent Acquisition</p>`
  };
}

export function renderShortlistedEmail({ name, jobTitle, token }) {
  const surveyUrl = `${SURVEY_BASE_URL}/${token}`;
  return {
    subject: `Confirmation of Your Verbal Acceptance of Job Offer with CelcomDigi`,
    html: `
<p>Hi ${name},</p>
<p>Thank you for verbally accepting the job offer for the ${jobTitle} position at CelcomDigi.</p>
<p>Our onboarding team is preparing your Letter of Employment (LOE) and will be sending it to you via email very soon.</p>
<p>We’d also appreciate your feedback on the interview process, as it helps us improve.</p>
<p>Please take a moment to complete the survey here: 👉 ${surveyUrl} CelcomDigi Candidate Feedback Form 2025</p>
<p>If you have any questions or need further clarification, feel free to reach out — we're happy to assist and want to ensure you feel confident and excited about joining us.</p>
<p>We can’t wait to begin this journey of advancing and inspiring Malaysia together with you! #WeAreCelcomDigi</p>
<p>Follow CelcomDigi on LinkedIn and vote for us as Malaysia’s Most Preferred Employer at the GRADUAN Brand Awards.</p>
<p>Best regards,<br/>CelcomDigi Talent Acquisition</p>`
  };
}

export function renderReminderEmail({ name, token }) {
  const surveyUrl = `${SURVEY_BASE_URL}/${token}`;
  return {
    subject: `Reminder: Your feedback helps us improve – CelcomDigi Candidate Survey`,
    html: `
<p>Hi ${name},</p>
<p>Friendly reminder to share your feedback on your interview experience with CelcomDigi.</p>
<p>👉 ${surveyUrl} Complete the survey</p>
<p>Thank you!<br/>CelcomDigi Talent Acquisition</p>`
  };
}
