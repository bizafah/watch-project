/* =========================================================
   CHRONOS — Luxury Timepieces
   Full interactivity: cart, wishlist, filter, sort, search,
   modal, testimonials carousel, newsletter, scroll reveal
   ========================================================= */

/* ---------- Watch catalog (prices in PKR, fabricated) ---------- */
const WATCHES = [
  {
    id: 1,
    name: "Le Chronographe Émeraude",
    brand: "La Maison",
    category: "luxury",
    price: 8450000,
    oldPrice: 9200000,
    badge: "Limited Edition",
    movement: "Caliber CH-7 Automatic",
    case: "39mm 18k White Gold",
    reserve: "72 hours",
    water: "50 meters",
    strap: "Hand-stitched Alligator",
    images: [
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=900&q=80",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=900&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80"
    ],
    description: "A 39mm white-gold case cradles a hand-guilloché emerald dial. The in-house Caliber CH-7 offers 72 hours of power reserve with a column-wheel chronograph beating at 28,800 vph."
  },
  {
    id: 2,
    name: "Offshore 1000",
    brand: "Offshore",
    category: "sport",
    price: 2340000,
    badge: "New",
    movement: "Caliber OF-21 Auto Chrono",
    case: "44mm Titanium & Ceramic",
    reserve: "60 hours",
    water: "1,000 meters",
    strap: "Vulcanised Rubber",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=80",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=900&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=900&q=80"
    ],
    description: "Engineered for the deep. Helium-escape valve, ceramic bezel, and 1,000m water resistance make the Offshore 1000 the most capable diver in the archive."
  },
  {
    id: 3,
    name: "Patrimoine Ultra-Thin",
    brand: "Patrimoine",
    category: "classic",
    price: 3120000,
    movement: "Caliber PT-90 Manual",
    case: "37mm 18k Rose Gold",
    reserve: "65 hours",
    water: "30 meters",
    strap: "Black Alligator",
    images: [
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=900&q=80",
      "https://images.unsplash.com/photo-1495856458515-0637185db551?w=900&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=900&q=80"
    ],
    description: "A whisper-thin 8.1mm case in 18k rose gold. Roman numerals, silver opaline dial, and a hand-wound caliber that pays tribute to 1950s dress watches."
  },
  {
    id: 4,
    name: "Nexus Hybrid S2",
    brand: "Nexus",
    category: "smart",
    price: 685000,
    badge: "Bestseller",
    movement: "Hybrid Caliber NX-2",
    case: "42mm Grade-5 Titanium",
    reserve: "14 days",
    water: "100 meters",
    strap: "FKM Rubber / Leather",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=80",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=900&q=80",
      "https://images.unsplash.com/photo-1606189934846-a527add8a77b?w=900&q=80"
    ],
    description: "Mechanical heart, digital brain. The Nexus S2 pairs a self-winding caliber with a sapphire touchscreen overlay, GPS, and 14-day battery life."
  },
  {
    id: 5,
    name: "Tourbillon Céleste",
    brand: "La Maison",
    category: "luxury",
    price: 14500000,
    badge: "Pièce Unique",
    movement: "Caliber CH-T9 Flying Tourbillon",
    case: "41mm 950 Platinum",
    reserve: "96 hours",
    water: "30 meters",
    strap: "Blue Alligator",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=900&q=80"
    ],
    description: "A flying tourbillon suspended against a midnight-blue aventurine dial. Hand-engraved platinum case, 96-hour reserve. Numbered edition of 8 pieces worldwide."
  },
  {
    id: 6,
    name: "Patrimoine Perpetual",
    brand: "Patrimoine",
    category: "classic",
    price: 4280000,
    movement: "Caliber PP-12 Perpetual Calendar",
    case: "39mm Steel & Gold",
    reserve: "48 hours",
    water: "50 meters",
    strap: "Brown Alligator",
    images: [
      "https://images.unsplash.com/photo-1495856458515-0637185db551?w=900&q=80",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=900&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=900&q=80"
    ],
    description: "Day, date, month, leap year, and moonphase — all displayed in perfect symmetry. A perpetual calendar that needs no correction until the year 2100."
  },
  {
    id: 7,
    name: "Offshore GT Racer",
    brand: "Offshore",
    category: "sport",
    price: 1980000,
    oldPrice: 2240000,
    movement: "Caliber OF-12 Chrono",
    case: "42mm Carbon & Steel",
    reserve: "55 hours",
    water: "200 meters",
    strap: "Black Calfskin Racing",
    images: [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=900&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=900&q=80"
    ],
    description: "Inspired by 1970s endurance racing. Carbon-fibre bezel, tachymeter scale, and a high-frequency chronograph calibrated to 1/10th of a second."
  },
  {
    id: 8,
    name: "Nexus Sport Pro",
    brand: "Nexus",
    category: "smart",
    price: 420000,
    badge: "New",
    movement: "Hybrid Caliber NX-Sport",
    case: "44mm Carbon Composite",
    reserve: "21 days",
    water: "200 meters",
    strap: "Silicone Sport",
    images: [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=900&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=80",
      "https://images.unsplash.com/photo-1606189934846-a527add8a77b?w=900&q=80"
    ],
    description: "Built for triathletes. 21-day solar-assisted battery, 200m water resistance, ECG, SpO₂, and full GPS tracking across 90+ activities."
  },
  {
    id: 9,
    name: "Royal Skeleton",
    brand: "La Maison",
    category: "luxury",
    price: 6850000,
    movement: "Caliber CH-S5 Skeleton",
    case: "40mm 18k Yellow Gold",
    reserve: "72 hours",
    water: "30 meters",
    strap: "Black Alligator",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80",
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=900&q=80"
    ],
    description: "A fully skeletonized movement hand-bevelled across 312 components. Every gear, spring, and bridge visible through double anti-reflective sapphire."
  },
  {
    id: 10,
    name: "Patrimoine Moonphase",
    brand: "Patrimoine",
    category: "classic",
    price: 1850000,
    oldPrice: 2120000,
    movement: "Caliber PM-4 Automatic",
    case: "38mm Steel",
    reserve: "42 hours",
    water: "50 meters",
    strap: "Blue Leather",
    images: [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=900&q=80",
      "https://images.unsplash.com/photo-1495856458515-0637185db551?w=900&q=80",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=900&q=80"
    ],
    description: "A guilloché silver dial with a precise astronomical moonphase accurate to one day every 122 years. Slim, elegant, endlessly classic."
  },
  {
    id: 11,
    name: "Offshore Diver Bronze",
    brand: "Offshore",
    category: "sport",
    price: 1620000,
    movement: "Caliber OF-D Bronze",
    case: "42mm Bronze & Steel",
    reserve: "70 hours",
    water: "300 meters",
    strap: "Aged Brown Leather",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=80",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=900&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=900&q=80"
    ],
    description: "Solid bronze case that develops a unique patina over time. Internal rotating bezel, 300m water resistance, and a 70-hour power reserve."
  },
  {
    id: 12,
    name: "Nexus Minimal",
    brand: "Nexus",
    category: "smart",
    price: 285000,
    movement: "Caliber NX-M Quartz",
    case: "39mm Steel",
    reserve: "2 years",
    water: "50 meters",
    strap: "Mesh Steel",
    images: [
      "https://images.unsplash.com/photo-1606189934846-a527add8a77b?w=900&q=80",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=900&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=80"
    ],
    description: "Discreet notifications, step tracking, and sleep analysis hidden beneath a clean analog dial. Two-year battery life, 39mm dress-watch proportions."
  }
];

/* ---------- App state ---------- */
const state = {
  cart: [],            // [{ id, qty }]
  wishlist: [],       // [id, ...]
  activeFilter: "all",
  sort: "featured",
  visibleCount: 8,
  modalQty: 1
};

/* ---------- Helpers ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const fmtPKR = (n) => "PKR " + n.toLocaleString("en-PK", { maximumFractionDigits: 0 });

function findWatch(id) {
  return WATCHES.find(w => w.id === id);
}

function toast(msg, isError = false) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.toggle("is-error", isError);
  el.classList.add("is-visible");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("is-visible"), 2600);
}

/* =========================================================
   Render the watches grid
   ========================================================= */
function renderWatches() {
  const grid = $("#watchesGrid");
  let list = WATCHES.slice();

  // Filter
  if (state.activeFilter !== "all") {
    list = list.filter(w => w.category === state.activeFilter);
  }

  // Sort
  switch (state.sort) {
    case "price-asc":  list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "name-asc":   list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case "name-desc":  list.sort((a, b) => b.name.localeCompare(a.name)); break;
  }

  $("#watchesEmpty").hidden = list.length > 0;

  // Paginate (load more)
  const shown = list.slice(0, state.visibleCount);
  grid.innerHTML = shown.map(watchCardHTML).join("");

  // Bind card events
  $$(".watch-card", grid).forEach(card => {
    const id = parseInt(card.dataset.id, 10);

    card.addEventListener("click", (e) => {
      if (e.target.closest(".watch-card__wishlist") || e.target.closest(".watch-card__add")) return;
      openModal(id);
    });

    const addBtn = card.querySelector(".watch-card__add");
    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(id, 1);
      });
    }

    const wlBtn = card.querySelector(".watch-card__wishlist");
    if (wlBtn) {
      wlBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(id);
      });
    }
  });

  // Load more visibility
  const loadMoreWrap = $(".watches__more");
  loadMoreWrap.style.display = state.visibleCount >= list.length ? "none" : "block";
}

function watchCardHTML(w) {
  const wlActive = state.wishlist.includes(w.id);
  const oldPriceHTML = w.oldPrice ? `<span class="watch-card__price-old">${fmtPKR(w.oldPrice)}</span>` : "";
  const badgeHTML = w.badge ? `<span class="watch-card__badge">${w.badge}</span>` : "";
  return `
    <article class="watch-card" data-id="${w.id}">
      <div class="watch-card__media">
        ${badgeHTML}
        <button class="watch-card__wishlist ${wlActive ? "is-active" : ""}" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="watch-card__img" style="background-image:url('${w.images[0]}');"></div>
        <div class="watch-card__quick">View details</div>
      </div>
      <div class="watch-card__body">
        <span class="watch-card__brand">${w.brand}</span>
        <h3 class="watch-card__name">${w.name}</h3>
        <p class="watch-card__meta">${w.case} · ${w.movement.split(" ").slice(0,2).join(" ")}</p>
        <div class="watch-card__foot">
          <span class="watch-card__price">${fmtPKR(w.price)}${oldPriceHTML}</span>
          <button class="watch-card__add">Add +</button>
        </div>
      </div>
    </article>
  `;
}

/* =========================================================
   Filters & sort
   ========================================================= */
function bindFilters() {
  $$("#filterGroup .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$("#filterGroup .filter-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.activeFilter = btn.dataset.filter;
      state.visibleCount = 8;
      renderWatches();
    });
  });

  $("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderWatches();
  });

  $("#loadMore").addEventListener("click", () => {
    state.visibleCount += 4;
    renderWatches();
  });

  // Collection cards jump to filtered grid
  $$(".collection-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const filter = card.dataset.filter;
      if (!filter) return;
      const btn = $(`#filterGroup .filter-btn[data-filter="${filter}"]`);
      if (btn) btn.click();
    });
  });
}

/* =========================================================
   Cart logic
   ========================================================= */
function addToCart(id, qty = 1) {
  const w = findWatch(id);
  if (!w) return;
  const existing = state.cart.find(c => c.id === id);
  if (existing) existing.qty += qty;
  else state.cart.push({ id, qty });
  renderCart();
  updateCounts();
  toast(`${w.name} added to your selection`);
  openCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(c => c.id !== id);
  renderCart();
  updateCounts();
}

function changeQty(id, delta) {
  const item = state.cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    renderCart();
    updateCounts();
  }
}

function clearCart() {
  state.cart = [];
  renderCart();
  updateCounts();
  toast("Your selection has been cleared");
}

function cartSubtotal() {
  return state.cart.reduce((sum, c) => {
    const w = findWatch(c.id);
    return sum + (w ? w.price * c.qty : 0);
  }, 0);
}

function renderCart() {
  const wrap = $("#cartItems");
  const foot = $("#cartFoot");
  if (state.cart.length === 0) {
    wrap.innerHTML = `
      <div class="cart__empty" id="cartEmpty">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
        <p>Your selection is empty.</p>
        <span>Add a timepiece to begin your collection.</span>
      </div>`;
    foot.hidden = true;
    return;
  }
  foot.hidden = false;
  wrap.innerHTML = state.cart.map(c => {
    const w = findWatch(c.id);
    return `
      <div class="cart-item" data-id="${w.id}">
        <div class="cart-item__img" style="background-image:url('${w.images[0]}');"></div>
        <div>
          <div class="cart-item__name">${w.name}</div>
          <div class="cart-item__meta">${w.brand} · ${w.case.split(" ").slice(0,3).join(" ")}</div>
          <div class="cart-item__qty">
            <button data-act="dec" aria-label="Decrease">−</button>
            <span>${c.qty}</span>
            <button data-act="inc" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <span class="cart-item__price">${fmtPKR(w.price * c.qty)}</span>
          <button class="cart-item__remove" data-act="remove">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  // Bind qty buttons
  $$(".cart-item", wrap).forEach(item => {
    const id = parseInt(item.dataset.id, 10);
    item.querySelector('[data-act="inc"]').addEventListener("click", () => changeQty(id, 1));
    item.querySelector('[data-act="dec"]').addEventListener("click", () => changeQty(id, -1));
    item.querySelector('[data-act="remove"]').addEventListener("click", () => removeFromCart(id));
  });

  $("#cartSubtotal").textContent = fmtPKR(cartSubtotal());
  $("#cartTotal").textContent = fmtPKR(cartSubtotal());
}

function updateCounts() {
  const cartCount = state.cart.reduce((s, c) => s + c.qty, 0);
  const wlCount = state.wishlist.length;
  const cartBadge = $("#cartCount");
  const wlBadge = $("#wishlistCount");
  cartBadge.textContent = cartCount;
  wlBadge.textContent = wlCount;
  cartBadge.classList.toggle("is-visible", cartCount > 0);
  wlBadge.classList.toggle("is-visible", wlCount > 0);
  $("#cartDrawerCount").textContent = cartCount;
  $("#wishlistDrawerCount").textContent = wlCount;
}

/* =========================================================
   Wishlist
   ========================================================= */
function toggleWishlist(id) {
  const w = findWatch(id);
  if (!w) return;
  const idx = state.wishlist.indexOf(id);
  if (idx === -1) {
    state.wishlist.push(id);
    toast(`${w.name} saved to wishlist`);
  } else {
    state.wishlist.splice(idx, 1);
    toast(`${w.name} removed from wishlist`);
  }
  renderWishlist();
  renderWatches();
  updateCounts();
}

function renderWishlist() {
  const wrap = $("#wishlistItems");
  if (state.wishlist.length === 0) {
    wrap.innerHTML = `
      <div class="cart__empty">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <p>No saved timepieces yet.</p>
        <span>Tap the heart on any watch to save it here.</span>
      </div>`;
    return;
  }
  wrap.innerHTML = state.wishlist.map(id => {
    const w = findWatch(id);
    return `
      <div class="cart-item" data-id="${w.id}">
        <div class="cart-item__img" style="background-image:url('${w.images[0]}');"></div>
        <div>
          <div class="cart-item__name">${w.name}</div>
          <div class="cart-item__meta">${w.brand} · ${fmtPKR(w.price)}</div>
          <button class="cart-item__remove" data-act="move" style="color: var(--gold); margin-top:8px;">Move to cart →</button>
        </div>
        <div class="cart-item__right">
          <button class="cart-item__remove" data-act="remove">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  $$(".cart-item", wrap).forEach(item => {
    const id = parseInt(item.dataset.id, 10);
    item.querySelector('[data-act="remove"]').addEventListener("click", () => toggleWishlist(id));
    item.querySelector('[data-act="move"]').addEventListener("click", () => {
      addToCart(id, 1);
      toggleWishlist(id);
    });
  });
}

/* =========================================================
   Product modal
   ========================================================= */
function openModal(id) {
  const w = findWatch(id);
  if (!w) return;
  state.modalQty = 1;
  const wlActive = state.wishlist.includes(id);

  const panel = $("#productModalPanel");
  panel.innerHTML = `
    <button class="icon-btn modal__close" data-modal-close aria-label="Close">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
    </button>
    <div class="modal__layout">
      <div class="modal__gallery">
        <div class="modal__main-img" id="modalMainImg" style="background-image:url('${w.images[0]}');"></div>
        <div class="modal__thumbs">
          ${w.images.map((img, i) => `
            <button class="modal__thumb ${i === 0 ? "is-active" : ""}" data-img="${img}" style="background-image:url('${img}');"></button>
          `).join("")}
        </div>
      </div>
      <div class="modal__body">
        <div class="modal__brand">${w.brand}</div>
        <h2 class="modal__name">${w.name}</h2>
        <p class="modal__desc">${w.description}</p>
        <dl class="modal__specs">
          <div class="modal__spec"><dt>Movement</dt><dd>${w.movement}</dd></div>
          <div class="modal__spec"><dt>Case</dt><dd>${w.case}</dd></div>
          <div class="modal__spec"><dt>Power Reserve</dt><dd>${w.reserve}</dd></div>
          <div class="modal__spec"><dt>Water Resistance</dt><dd>${w.water}</dd></div>
          <div class="modal__spec"><dt>Strap</dt><dd>${w.strap}</dd></div>
          <div class="modal__spec"><dt>Warranty</dt><dd>2 years international</dd></div>
        </dl>
        <div class="modal__price">
          <span class="modal__price-now">${fmtPKR(w.price)}</span>
          ${w.oldPrice ? `<span class="modal__price-old">${fmtPKR(w.oldPrice)}</span>` : ""}
        </div>
        <div class="modal__actions">
          <div class="modal__qty">
            <button id="modalQtyDec" aria-label="Decrease">−</button>
            <span id="modalQtyVal">1</span>
            <button id="modalQtyInc" aria-label="Increase">+</button>
          </div>
          <button class="btn btn--primary" id="modalAddCart" style="flex:1;">Add to Selection</button>
          <button class="icon-btn" id="modalWishlist" style="border: 1px solid var(--line-strong); ${wlActive ? "color: var(--gold-bright);" : ""}" aria-label="Save to wishlist">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="${wlActive ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="modal__assurance">
          <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg> 2-year warranty</span>
          <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h13v10H3z"/><path d="M16 10h4l1 3v4h-5"/></svg> Free shipping</span>
          <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L3 7v6c0 5 9 9 9 9s9-4 9-9V7z"/></svg> Authenticity guaranteed</span>
        </div>
      </div>
    </div>
  `;

  $("#productModal").classList.add("is-open");
  document.body.style.overflow = "hidden";

  // Thumbnails
  $$(".modal__thumb", panel).forEach(t => {
    t.addEventListener("click", () => {
      $$(".modal__thumb", panel).forEach(x => x.classList.remove("is-active"));
      t.classList.add("is-active");
      $("#modalMainImg").style.backgroundImage = `url('${t.dataset.img}')`;
    });
  });

  // Qty
  const valEl = $("#modalQtyVal");
  $("#modalQtyDec").addEventListener("click", () => {
    state.modalQty = Math.max(1, state.modalQty - 1);
    valEl.textContent = state.modalQty;
  });
  $("#modalQtyInc").addEventListener("click", () => {
    state.modalQty = Math.min(10, state.modalQty + 1);
    valEl.textContent = state.modalQty;
  });

  // Add to cart
  $("#modalAddCart").addEventListener("click", () => {
    addToCart(id, state.modalQty);
    closeModal();
  });

  // Wishlist
  $("#modalWishlist").addEventListener("click", () => {
    toggleWishlist(id);
    const active = state.wishlist.includes(id);
    const btn = $("#modalWishlist");
    btn.style.color = active ? "var(--gold-bright)" : "";
    const svg = btn.querySelector("svg");
    svg.setAttribute("fill", active ? "currentColor" : "none");
  });

  // Close handlers
  $$("[data-modal-close]", panel).forEach(b => b.addEventListener("click", closeModal));
  $("#productModal .modal__backdrop").addEventListener("click", closeModal);
}

function closeModal() {
  $("#productModal").classList.remove("is-open");
  document.body.style.overflow = "";
}

/* =========================================================
   Search
   ========================================================= */
function bindSearch() {
  const panel = $("#searchPanel");
  const input = $("#searchInput");
  const results = $("#searchResults");

  $("#searchToggle").addEventListener("click", () => {
    panel.classList.add("is-open");
    setTimeout(() => input.focus(), 100);
  });
  $("#searchClose").addEventListener("click", closeSearch);

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ""; return; }
    const matches = WATCHES.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.brand.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q) ||
      w.movement.toLowerCase().includes(q)
    );
    if (matches.length === 0) {
      results.innerHTML = `<div class="search-result" style="justify-content:center; color: var(--text-faint);">No timepieces match "${q}"</div>`;
      return;
    }
    results.innerHTML = matches.slice(0, 6).map(w => `
      <div class="search-result" data-id="${w.id}">
        <div class="search-result__thumb" style="background-image:url('${w.images[0]}');"></div>
        <div>
          <div class="search-result__name">${w.name}</div>
          <div class="search-result__meta">${w.brand} · ${w.case}</div>
        </div>
        <div class="search-result__price">${fmtPKR(w.price)}</div>
      </div>
    `).join("");

    $$(".search-result", results).forEach(r => {
      r.addEventListener("click", () => {
        closeSearch();
        openModal(parseInt(r.dataset.id, 10));
      });
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (panel.classList.contains("is-open")) closeSearch();
      if ($("#productModal").classList.contains("is-open")) closeModal();
      closeDrawers();
    }
  });
}

function closeSearch() {
  const panel = $("#searchPanel");
  panel.classList.remove("is-open");
  $("#searchInput").value = "";
  $("#searchResults").innerHTML = "";
}

/* =========================================================
   Drawers (mobile menu, cart, wishlist)
   ========================================================= */
function openCart()      { openDrawer("cart"); }
function openMobileMenu(){ openDrawer("menu"); }
function openWishlist()  { openDrawer("wishlist"); }

function openDrawer(which) {
  closeDrawers();
  const drawer =
    which === "cart"      ? $("#cartDrawer") :
    which === "wishlist"  ? $("#wishlistDrawer") :
                            $("#mobileMenu");
  drawer.classList.add("is-open");
  $("#overlay").classList.add("is-visible");
  document.body.style.overflow = "hidden";
}

function closeDrawers() {
  $$(".drawer").forEach(d => d.classList.remove("is-open"));
  $("#overlay").classList.remove("is-visible");
  document.body.style.overflow = "";
}

function bindDrawers() {
  $("#cartToggle").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeDrawers);
  $("#wishlistToggle").addEventListener("click", openWishlist);
  $("#wishlistClose").addEventListener("click", closeDrawers);
  $("#menuToggle").addEventListener("click", openMobileMenu);
  $("#menuClose").addEventListener("click", closeDrawers);

  $("#overlay").addEventListener("click", closeDrawers);

  // Drawer links close drawer on click
  $$(".drawer__link").forEach(link => {
    link.addEventListener("click", closeDrawers);
  });

  // Cart actions
  $("#clearCart").addEventListener("click", clearCart);
  $("#checkoutBtn").addEventListener("click", () => {
    if (state.cart.length === 0) return;
    toast("Checkout is a demo — your selection has been noted");
  });

  // Featured add-to-cart
  const featuredAdd = document.querySelector("[data-featured-add]");
  if (featuredAdd) {
    featuredAdd.addEventListener("click", () => addToCart(1, 1));
  }
}

/* =========================================================
   Testimonials carousel
   ========================================================= */
function bindTestimonials() {
  const dots = $$("#testimonialDots .dot");
  let current = 0;
  let timer;

  function show(idx) {
    $$(".testimonial").forEach((t, i) => t.classList.toggle("is-active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    current = idx;
  }

  function next() {
    show((current + 1) % dots.length);
  }

  dots.forEach((d, i) => d.addEventListener("click", () => {
    show(i);
    resetTimer();
  }));

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }
  resetTimer();
}

/* =========================================================
   Newsletter
   ========================================================= */
function bindNewsletter() {
  const form = $("#newsletterForm");
  const msg = $("#newsletterMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#newsletterEmail").value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      msg.textContent = "Please enter a valid email address.";
      msg.classList.add("is-error");
      return;
    }
    msg.textContent = "Welcome to the Inner Circle — check your inbox.";
    msg.classList.remove("is-error");
    $("#newsletterEmail").value = "";
    setTimeout(() => { msg.textContent = ""; }, 4000);
  });
}

/* =========================================================
   Scroll reveal
   ========================================================= */
function bindReveal() {
  const targets = $$(".collection-card, .craft__step, .journal-card, .featured__media, .featured__body, .section-head, .watch-card");
  targets.forEach(t => t.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(t => io.observe(t));
}

/* =========================================================
   Header scroll effect
   ========================================================= */
function bindHeaderScroll() {
  const header = $("#header");
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > 80) {
      header.style.background = "rgba(10,10,10,0.95)";
      header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
    } else {
      header.style.background = "rgba(10,10,10,0.78)";
      header.style.boxShadow = "none";
    }
    lastScroll = y;
  }, { passive: true });
}

/* =========================================================
   Init
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderWatches();
  renderCart();
  renderWishlist();
  updateCounts();
  bindFilters();
  bindDrawers();
  bindSearch();
  bindTestimonials();
  bindNewsletter();
  bindReveal();
  bindHeaderScroll();
});
