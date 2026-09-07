/**
 * ==============================================================================
 * IronCore Fitness — Google Sheets Webhook Backend
 * ==============================================================================
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new) and create a new blank spreadsheet.
 * 2. Rename the spreadsheet to "IronCore Gym - Trial Bookings".
 * 3. Click Extensions > Apps Script in the top menu bar.
 * 4. Replace everything in the Code.gs editor with the code below.
 * 5. Click "Save" (disk icon).
 * 6. Click the blue "Deploy" button (top right) > "New deployment".
 * 7. Click the gear icon next to "Select type" > choose "Web app".
 * 8. Set the following options:
 *    - Description: "IronCore Booking Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (CRITICAL: Do NOT choose 'Only myself')
 * 9. Click "Deploy", grant permissions if prompted, and copy the "Web app URL" 
 *    (looks like https://script.google.com/macros/s/AKfycb.../exec).
 * 10. Paste that URL into index.html replacing GOOGLE_SCRIPT_WEBHOOK_URL.
 * ==============================================================================
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.slot,
    data.goal,
    data.plan,
    data.coach,
    data.id
  ]);
  return ContentService.createTextOutput(JSON.stringify({status: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput("IronCore Fitness Webhook Endpoint is ACTIVE and ready for submissions.");
}
