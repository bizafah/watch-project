/* =========================================================
   Watch Project — Admin Panel JS
   Fetches orders from Google Apps Script (Google Sheets)
   ========================================================= */

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxNxIi3nVAzx26GhO90wMt1Gaasg8goXk5I7xvMAJfcb5TFbAQ5r3WMZdSMNvoo4pwU4g/exec";

/* Expected columns from your Google Sheet (adjust to match):
   Timestamp | Name | Phone | City | Address | Item | Qty | Amount | Status | Notes
   Column index (0-based): adjust COLS below if your sheet differs */
const COLS = {
  timestamp: 0,
  name:      1,
  phone:     2,
  city:      3,
  address:   4,
  item:      5,
  qty:       6,
  amount:    7,
  status:    8,
  notes:     9
};

/* =========================================================
   State
   ========================================================= */
let allOrders  = [];
let filteredOrders = [];
let currentPage = 1;
const PAGE_SIZE  = 15;

/* =========================================================
   Utilities
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function toast(msg, isError = false) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.toggle("is-error", isError);
  el.classList.add("is-visible");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("is-visible"), 3000);
}

function fmtPKR(val) {
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ""));
  if (isNaN(n)) return val || "—";
  return "PKR " + n.toLocaleString("en-PK", { maximumFractionDigits: 0 });
}

function fmtDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  if (isNaN(d)) return val;
  return d.toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
}

function initials(name) {
  if (!name) return "?";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function statusBadge(status) {
  const s = (status || "unknown").toString().toLowerCase().trim();
  const known = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  const cls = known.includes(s) ? s : "unknown";
  return `<span class="badge badge--${cls}">${s || "unknown"}</span>`;
}

function getCell(row, key) {
  const idx = COLS[key];
  return (idx !== undefined && row[idx] !== undefined) ? row[idx] : "";
}

/* =========================================================
   Fetch from Google Sheets
   ========================================================= */
async function fetchOrders() {
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    /* Support two common Apps Script response shapes:
       1. { data: [[...], [...]] }   — rows array
       2. [[...], [...]]             — raw array
       3. { orders: [...] }          — named key */
    let rows = [];
    if (Array.isArray(json)) {
      rows = json;
    } else if (json.data && Array.isArray(json.data)) {
      rows = json.data;
    } else if (json.orders && Array.isArray(json.orders)) {
      rows = json.orders;
    } else if (json.values && Array.isArray(json.values)) {
      rows = json.values;
    } else {
      /* Try to find any array property */
      const arrayProp = Object.values(json).find(v => Array.isArray(v));
      if (arrayProp) rows = arrayProp;
    }

    /* Skip header row if first cell looks like a label */
    if (rows.length && typeof rows[0][0] === "string" &&
        rows[0][0].toLowerCase().includes("time")) {
      rows = rows.slice(1);
    }

    /* Normalize rows to objects */
    allOrders = rows.map((row, i) => ({
      _index: i + 1,
      _raw:   row,
      timestamp: getCell(row, "timestamp"),
      name:      getCell(row, "name"),
      phone:     getCell(row, "phone"),
      city:      getCell(row, "city"),
      address:   getCell(row, "address"),
      item:      getCell(row, "item"),
      qty:       getCell(row, "qty"),
      amount:    getCell(row, "amount"),
      status:    getCell(row, "status") || "pending",
      notes:     getCell(row, "notes")
    }));

    return allOrders;
  } catch (err) {
    console.error("Fetch error:", err);
    toast("Failed to load orders. Check console for details.", true);
    return [];
  }
}

/* =========================================================
   Dashboard
   ========================================================= */
function renderDashboard() {
  const total     = allOrders.length;
  const confirmed = allOrders.filter(o => o.status.toLowerCase() === "confirmed").length;
  const pending   = allOrders.filter(o => o.status.toLowerCase() === "pending").length;

  const revenue = allOrders.reduce((sum, o) => {
    const n = parseFloat(String(o.amount).replace(/[^0-9.]/g, ""));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  $("#statTotalOrders").textContent = total;
  $("#statConfirmed").textContent   = confirmed;
  $("#statPending").textContent     = pending;
  $("#statRevenue").textContent     = fmtPKR(revenue);
  $("#sidebarOrderCount").textContent = total;

  /* Recent 5 orders */
  const recent = allOrders.slice(-5).reverse();
  const tbody  = $("#recentOrdersBody");
  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="table__empty">No orders found.</td></tr>`;
    return;
  }
  tbody.innerHTML = recent.map(o => `
    <tr>
      <td><span style="color:var(--text-faint);font-size:12px;">#${o._index}</span></td>
      <td>
        <div class="cell-name">
          <div class="cell-avatar">${initials(o.name)}</div>
          <span class="cell-name-text">${o.name || "—"}</span>
        </div>
      </td>
      <td>${o.item || "—"}</td>
      <td class="cell-amount">${fmtPKR(o.amount)}</td>
      <td>${statusBadge(o.status)}</td>
      <td style="color:var(--text-dim);font-size:12px;">${fmtDate(o.timestamp)}</td>
    </tr>
  `).join("");
}

/* =========================================================
   Orders view
   ========================================================= */
function applyOrderFilters() {
  const q      = ($("#orderSearch").value || "").toLowerCase().trim();
  const status = $("#statusFilter").value;

  filteredOrders = allOrders.filter(o => {
    const matchStatus = status === "all" || o.status.toLowerCase() === status;
    const matchSearch = !q ||
      (o.name  || "").toLowerCase().includes(q) ||
      (o.item  || "").toLowerCase().includes(q) ||
      (o.phone || "").toLowerCase().includes(q) ||
      (o.city  || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  currentPage = 1;
  renderOrdersTable();
  renderPagination();
  $("#ordersCount").textContent = `${filteredOrders.length} order${filteredOrders.length !== 1 ? "s" : ""}`;
}

function renderOrdersTable() {
  const tbody = $("#ordersTableBody");
  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = filteredOrders.slice(start, start + PAGE_SIZE);

  if (slice.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="table__empty">No orders match your filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = slice.map(o => `
    <tr>
      <td style="color:var(--text-faint);font-size:12px;">#${o._index}</td>
      <td>
        <div class="cell-name">
          <div class="cell-avatar">${initials(o.name)}</div>
          <div>
            <div class="cell-name-text">${o.name || "—"}</div>
            <div class="cell-name-sub">${o.city || ""}</div>
          </div>
        </div>
      </td>
      <td style="color:var(--text-dim);font-size:12px;">${o.phone || "—"}</td>
      <td>${o.item || "—"}</td>
      <td style="text-align:center;">${o.qty || "1"}</td>
      <td class="cell-amount">${fmtPKR(o.amount)}</td>
      <td>${statusBadge(o.status)}</td>
      <td style="color:var(--text-dim);font-size:12px;white-space:nowrap;">${fmtDate(o.timestamp)}</td>
      <td>
        <button class="action-btn" data-action="view" data-idx="${o._index - 1}" title="View details">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </td>
    </tr>
  `).join("");

  /* Bind row actions */
  $$("[data-action='view']", tbody).forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx, 10);
      openOrderModal(allOrders[idx]);
    });
  });
}

function renderPagination() {
  const container = $("#ordersPagination");
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  if (totalPages <= 1) { container.innerHTML = ""; return; }

  let html = `
    <button class="page-btn" id="pagePrev" ${currentPage === 1 ? "disabled" : ""}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>`;

  for (let p = 1; p <= totalPages; p++) {
    if (totalPages > 7 && Math.abs(p - currentPage) > 2 && p !== 1 && p !== totalPages) {
      if (p === 2 || p === totalPages - 1) html += `<span style="color:var(--text-faint);padding:0 4px;">…</span>`;
      continue;
    }
    html += `<button class="page-btn ${p === currentPage ? "is-active" : ""}" data-page="${p}">${p}</button>`;
  }

  html += `
    <button class="page-btn" id="pageNext" ${currentPage === totalPages ? "disabled" : ""}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>`;

  container.innerHTML = html;

  container.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.dataset.page, 10);
      renderOrdersTable();
      renderPagination();
    });
  });

  const prev = container.querySelector("#pagePrev");
  const next = container.querySelector("#pageNext");
  if (prev) prev.addEventListener("click", () => { if (currentPage > 1) { currentPage--; renderOrdersTable(); renderPagination(); } });
  if (next) next.addEventListener("click", () => { if (currentPage < totalPages) { currentPage++; renderOrdersTable(); renderPagination(); } });
}

/* =========================================================
   Customers view
   ========================================================= */
function renderCustomers() {
  const tbody = $("#customersTableBody");

  /* Aggregate by phone number */
  const map = {};
  allOrders.forEach(o => {
    const key = (o.phone || o.name || "unknown").trim();
    if (!map[key]) {
      map[key] = {
        name:      o.name || "—",
        phone:     o.phone || "—",
        city:      o.city || "—",
        orders:    0,
        total:     0,
        lastOrder: o.timestamp
      };
    }
    map[key].orders++;
    const n = parseFloat(String(o.amount).replace(/[^0-9.]/g, ""));
    if (!isNaN(n)) map[key].total += n;
    if (new Date(o.timestamp) > new Date(map[key].lastOrder)) {
      map[key].lastOrder = o.timestamp;
    }
  });

  const customers = Object.values(map).sort((a, b) => b.total - a.total);

  if (customers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="table__empty">No customers found.</td></tr>`;
    return;
  }

  tbody.innerHTML = customers.map((c, i) => `
    <tr>
      <td style="color:var(--text-faint);font-size:12px;">${i + 1}</td>
      <td>
        <div class="cell-name">
          <div class="cell-avatar">${initials(c.name)}</div>
          <span class="cell-name-text">${c.name}</span>
        </div>
      </td>
      <td style="color:var(--text-dim);font-size:12px;">${c.phone}</td>
      <td style="color:var(--text-dim);">${c.city}</td>
      <td style="text-align:center;font-weight:600;">${c.orders}</td>
      <td class="cell-amount">${fmtPKR(c.total)}</td>
      <td style="color:var(--text-dim);font-size:12px;">${fmtDate(c.lastOrder)}</td>
    </tr>
  `).join("");
}

/* =========================================================
   Order detail modal
   ========================================================= */
function openOrderModal(order) {
  const modal = $("#orderModal");
  const body  = $("#modalBody");

  body.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <dt>Order #</dt>
        <dd>${order._index}</dd>
      </div>
      <div class="detail-item">
        <dt>Date</dt>
        <dd>${fmtDate(order.timestamp)}</dd>
      </div>
      <div class="detail-item">
        <dt>Customer Name</dt>
        <dd>${order.name || "—"}</dd>
      </div>
      <div class="detail-item">
        <dt>Phone</dt>
        <dd>${order.phone || "—"}</dd>
      </div>
      <div class="detail-item">
        <dt>City</dt>
        <dd>${order.city || "—"}</dd>
      </div>
      <div class="detail-item">
        <dt>Status</dt>
        <dd>${statusBadge(order.status)}</dd>
      </div>
      <div class="detail-item detail-full">
        <dt>Delivery Address</dt>
        <dd>${order.address || "—"}</dd>
      </div>
    </div>

    <div class="modal-divider"></div>

    <div class="detail-grid">
      <div class="detail-item detail-full">
        <dt>Item / Watch</dt>
        <dd style="font-size:16px;font-family:var(--serif);">${order.item || "—"}</dd>
      </div>
      <div class="detail-item">
        <dt>Quantity</dt>
        <dd>${order.qty || "1"}</dd>
      </div>
      <div class="detail-item">
        <dt>Amount</dt>
        <dd style="color:var(--gold-bright);font-family:var(--serif);font-size:18px;">${fmtPKR(order.amount)}</dd>
      </div>
      ${order.notes ? `
      <div class="detail-item detail-full">
        <dt>Notes</dt>
        <dd style="color:var(--text-dim);">${order.notes}</dd>
      </div>` : ""}
    </div>

    <div class="modal-divider"></div>

    <div class="status-update">
      <label for="modalStatusSelect">Update Status:</label>
      <select class="select" id="modalStatusSelect">
        <option value="pending"   ${order.status.toLowerCase() === "pending"   ? "selected" : ""}>Pending</option>
        <option value="confirmed" ${order.status.toLowerCase() === "confirmed" ? "selected" : ""}>Confirmed</option>
        <option value="shipped"   ${order.status.toLowerCase() === "shipped"   ? "selected" : ""}>Shipped</option>
        <option value="delivered" ${order.status.toLowerCase() === "delivered" ? "selected" : ""}>Delivered</option>
        <option value="cancelled" ${order.status.toLowerCase() === "cancelled" ? "selected" : ""}>Cancelled</option>
      </select>
      <button class="btn btn--primary btn--sm" id="saveStatus">Save</button>
    </div>
  `;

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";

  /* Save status button — sends update back to Apps Script */
  $("#saveStatus", body).addEventListener("click", async () => {
    const newStatus = $("#modalStatusSelect", body).value;
    await updateOrderStatus(order._index, newStatus);
    order.status = newStatus;
    /* refresh badge in modal */
    body.querySelector(".badge").outerHTML;
    const badgeEl = body.querySelector(".badge");
    if (badgeEl) {
      badgeEl.className = `badge badge--${newStatus.toLowerCase()}`;
      badgeEl.innerHTML = `<span></span>${newStatus}`;
    }
    renderOrdersTable();
    renderDashboard();
    closeModal();
  });
}

async function updateOrderStatus(rowIndex, status) {
  /* POST back to Apps Script to update the status cell */
  try {
    const params = new URLSearchParams({ row: rowIndex, status });
    await fetch(`${SHEET_URL}?${params}`, { method: "GET" });
    toast(`Status updated to "${status}"`);
  } catch (err) {
    toast("Could not save status. Check your Apps Script permissions.", true);
    console.error(err);
  }
}

function closeModal() {
  $("#orderModal").classList.remove("is-open");
  document.body.style.overflow = "";
}

/* =========================================================
   Navigation / Views
   ========================================================= */
function switchView(viewName) {
  $$(".view").forEach(v => v.classList.remove("is-active"));
  $$(".sidebar__link").forEach(l => l.classList.remove("is-active"));
  const target = $(`#view-${viewName}`);
  if (target) target.classList.add("is-active");
  const link = $(`.sidebar__link[data-view="${viewName}"]`);
  if (link) link.classList.add("is-active");
  closeSidebar();
}

function openSidebar() {
  $("#sidebar").classList.add("is-open");
  const ov = $("#sidebarOverlay");
  ov.style.display = "block";
  requestAnimationFrame(() => ov.classList.add("is-visible"));
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  $("#sidebar").classList.remove("is-open");
  const ov = $("#sidebarOverlay");
  ov.classList.remove("is-visible");
  setTimeout(() => { ov.style.display = "none"; }, 300);
  document.body.style.overflow = "";
}

/* =========================================================
   Load & refresh
   ========================================================= */
async function loadData() {
  /* Show loading state in tables */
  const tbodies = ["recentOrdersBody", "ordersTableBody", "customersTableBody"];
  tbodies.forEach(id => {
    const el = $(`#${id}`);
    if (el) el.innerHTML = `<tr><td colspan="9" class="table__loading"><span class="spinner"></span> Loading…</td></tr>`;
  });

  await fetchOrders();
  filteredOrders = [...allOrders];
  renderDashboard();
  renderOrdersTable();
  renderPagination();
  renderCustomers();
  $("#ordersCount").textContent = `${allOrders.length} order${allOrders.length !== 1 ? "s" : ""}`;
}

/* =========================================================
   Init
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* Sidebar navigation */
  $$(".sidebar__link[data-view]").forEach(link => {
    link.addEventListener("click", () => switchView(link.dataset.view));
  });

  /* Dashboard "View all" button */
  $$("[data-view-link]").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.viewLink));
  });

  /* Mobile topbar */
  $("#sidebarToggle").addEventListener("click", openSidebar);
  $("#sidebarOverlay").addEventListener("click", closeSidebar);
  $("#topbarRefresh").addEventListener("click", () => { loadData(); toast("Refreshing orders…"); });

  /* Refresh buttons */
  $("#refreshDashboard").addEventListener("click", () => { loadData(); toast("Dashboard refreshed"); });
  $("#refreshOrders").addEventListener("click",    () => { loadData(); toast("Orders refreshed"); });
  $("#refreshCustomers").addEventListener("click", () => { loadData(); toast("Customers refreshed"); });

  /* Order filters */
  $("#orderSearch").addEventListener("input",  applyOrderFilters);
  $("#statusFilter").addEventListener("change", applyOrderFilters);

  /* Modal close */
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* Initial load */
  loadData();
});
