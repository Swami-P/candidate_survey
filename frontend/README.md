# Candidate Post Interview Survey — Frontend (React + Vite)

## Quick Demo
Open `index.html` in CodeSandbox and append `?demo=1` to the URL to enable mock API.
Example routes:
- Admin: `/` (with `?demo=1`)
- Reports: `/reports` (with `?demo=1`)
- Survey page: `/s/tok_demo_123?demo=1`

## Production Setup
Update `src/api.js`:
- Set `API_BASE` to your API Gateway URL
Deploy with AWS Amplify Hosting and map custom domain (e.g., `survey.celcomdigi.com`).
