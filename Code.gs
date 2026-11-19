// =========================================================
//  Watch Project — Google Apps Script
//  Handles GET requests from the storefront (read orders)
//  and status updates from the admin panel.
//
//  Sheet structure (Row 1 = headers):
//  A: Timestamp | B: Name | C: Phone | D: City
//  E: Address   | F: Item | G: Qty   | H: Amount
//  I: Status    | J: Notes
// =========================================================

var SHEET_NAME = "Orders"; // Change if your sheet tab has a different name

// ---------------------------------------------------------
//  doGet — called by both the storefront and the admin panel
// ---------------------------------------------------------
function doGet(e) {
  var params = e.parameter;

  // --- Status update from admin panel ---
  // URL: ?row=5&status=confirmed
  if (params.row && params.status) {
    return updateStatus(parseInt(params.row), params.status);
  }

  // --- Read all orders (default) ---
  return getOrders();
}

// ---------------------------------------------------------
//  doPost — called when the storefront submits a new order
// ---------------------------------------------------------
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    return saveOrder(data);
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ---------------------------------------------------------
//  getOrders — reads all rows and returns as JSON array
// ---------------------------------------------------------
function getOrders() {
  try {
    var sheet = getSheet();
    var lastRow = sheet.getLastRow();

    // No data yet (only header row or empty)
    if (lastRow < 2) {
      return jsonResponse({ data: [] });
    }

    // Read all rows except header (row 1)
    var range = sheet.getRange(2, 1, lastRow - 1, 10);
    var values = range.getValues();

    return jsonResponse({ data: values });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ---------------------------------------------------------
//  saveOrder — appends a new order row
// ---------------------------------------------------------
function saveOrder(data) {
  try {
    var sheet = getSheet();

    var row = [
      new Date(),                        // A: Timestamp
      data.name      || "",              // B: Name
      data.phone     || "",              // C: Phone
      data.city      || "",              // D: City
      data.address   || "",              // E: Address
      data.item      || "",              // F: Item / Watch name
      data.qty       || 1,              // G: Quantity
      data.amount    || 0,              // H: Amount (PKR)
      "pending",                         // I: Status (always starts pending)
      data.notes     || ""              // J: Notes
    ];

    sheet.appendRow(row);

    return jsonResponse({ success: true, message: "Order saved." });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ---------------------------------------------------------
//  updateStatus — updates column I (status) for a given row
//  rowIndex is 1-based order index (not sheet row number)
//  Sheet row = rowIndex + 1  (because row 1 is the header)
// ---------------------------------------------------------
function updateStatus(orderIndex, status) {
  try {
    var allowed = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    var clean   = status.toString().toLowerCase().trim();

    if (!allowed.includes(clean)) {
      return jsonResponse({ success: false, error: "Invalid status: " + status });
    }

    var sheet    = getSheet();
    var sheetRow = orderIndex + 1; // +1 to skip header row

    if (sheetRow < 2 || sheetRow > sheet.getLastRow()) {
      return jsonResponse({ success: false, error: "Row out of range: " + sheetRow });
    }

    // Column 9 = I = Status
    sheet.getRange(sheetRow, 9).setValue(clean);

    return jsonResponse({ success: true, message: "Status updated to: " + clean });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ---------------------------------------------------------
//  Helpers
// ---------------------------------------------------------
function getSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Auto-create sheet and headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp", "Name", "Phone", "City",
      "Address", "Item", "Qty", "Amount (PKR)",
      "Status", "Notes"
    ]);

    // Style the header row
    var header = sheet.getRange(1, 1, 1, 10);
    header.setFontWeight("bold");
    header.setBackground("#1a1a2e");
    header.setFontColor("#c5a47e");

    // Set column widths
    sheet.setColumnWidth(1, 160); // Timestamp
    sheet.setColumnWidth(2, 140); // Name
    sheet.setColumnWidth(3, 120); // Phone
    sheet.setColumnWidth(4, 100); // City
    sheet.setColumnWidth(5, 200); // Address
    sheet.setColumnWidth(6, 180); // Item
    sheet.setColumnWidth(7, 60);  // Qty
    sheet.setColumnWidth(8, 120); // Amount
    sheet.setColumnWidth(9, 100); // Status
    sheet.setColumnWidth(10, 180);// Notes
  }

  return sheet;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
