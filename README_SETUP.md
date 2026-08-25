# IronCore Fitness — Project Status & Google Sheets Setup Guide

Everything in your project is saved, organized, and ready.

---

## 🔗 Your Important Links

- **Live Website (Vercel)**: https://ironcore-gym-demo-phi.vercel.app
- **GitHub Repository**: https://github.com/rbscbe369/iron-core-gym-demo
- **Your Google Sheet**: https://docs.google.com/spreadsheets/d/19S5jH6dpVVM6UN1WoE6BI-p9GOtUjzHf2KZA7BzZbPk/edit?usp=sharing

---

## 🎯 When You Come Back — 3 Simple Steps:

### Step 1: Open Apps Script
1. Open your Google Sheet link above.
2. Click **Extensions** > **Apps Script** in the top menu.

### Step 2: Paste the Code
Delete any text in the editor and paste this:

```javascript
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
```

### Step 3: Deploy and Copy the Link
1. Click **Deploy** (blue button, top-right) > **New deployment**.
2. Click the gear icon > select **Web app**.
3. Set **Execute as**: `Me` and **Who has access**: `Anyone`.
4. Click **Deploy** and copy the **Web app URL** (the link that ends in `/exec`).

### Step 4: Paste Link in Chat
Come back to this chat and paste that link. Everything else will be finished and deployed automatically!
