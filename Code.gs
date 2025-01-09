// This script labels and archives emails in Gmail automatically
function labelAndArchiveEmails() {
  // Label name to apply
  const labelName = "Auto Archived"; // Change this to your desired label

  // Create the label if it doesn’t exist
  let label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }

  // Search for emails to process (e.g., emails in the Inbox)
  const query = "in:inbox older_than:7d"; // Emails older than 7 days
  const threads = GmailApp.search(query);

  threads.forEach(thread => {
    // Apply the label
    label.addToThread(thread);

    // Archive the thread
    thread.moveToArchive();
  });

  console.log(`${threads.length} emails labeled and archived.`);
}

// Optionally, you can set this script to run automatically using a trigger
function createTrigger() {
  // Create a time-driven trigger to run daily
  ScriptApp.newTrigger("labelAndArchiveEmails")
    .timeBased()
    .everyDays(1) // Change frequency if needed
    .atHour(9) // Run at 9 AM
    .create();
}
