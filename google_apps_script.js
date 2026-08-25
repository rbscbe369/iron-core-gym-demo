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
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevent concurrent write collisions

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Auto-create clean styled header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Phone",
        "Slot",
        "Goal",
        "Plan",
        "Coach",
        "LeadID"
      ]);
      
      // Style headers: Charcoal background with Flame Orange text
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#1E1B18");
      headerRange.setFontColor("#FF5A2B");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Arial");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "GMT", "yyyy-MM-dd HH:mm:ss");
    var name = data.name || "N/A";
    var phone = data.phone || "N/A";
    var slot = data.slot || "N/A";
    var goal = data.goal || "General Fitness";
    var plan = data.plan || "Not Specified";
    var coach = data.coach || "Any Available";
    var leadId = data.id || ("LEAD_" + new Date().getTime());

    // Append new lead row matching: Timestamp | Name | Phone | Slot | Goal | Plan | Coach | LeadID
    sheet.appendRow([
      timestamp,
      name,
      phone,
      slot,
      goal,
      plan,
      coach,
      leadId
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded successfully in Google Sheet",
      leadId: leadId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("IronCore Fitness Webhook Endpoint is ACTIVE and ready for submissions.");
}
