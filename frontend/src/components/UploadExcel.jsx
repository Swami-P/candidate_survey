import React from "react";
export default function UploadExcel() {
  return (
    <div className="card">
      <h3>Upload Excel</h3>
      <p>Upload your Excel to the S3 bucket (service-excel). Columns: Name, Email, Status (Rejected/Shortlisted), Job Title (optional). The Lambda will parse and create candidates.</p>
      <p><strong>Tip:</strong> Use AWS Console or Amplify Storage to upload the file.</p>
    </div>
  );
}
