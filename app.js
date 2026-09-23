/* ==========================================================================
   PXDynasty — app.js
   Vanilla JS SPA. Data layer starts empty; a real backend can replace it
   by swapping the DB functions in section 3.
   ========================================================================== */

/* ==========================================================================
   1. ICONS
   ========================================================================== */
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>',
  explore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-6 2 2-6 6-2Z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2l2.3 11.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
  orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  account: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c1.6-3.6 4.5-5.5 7.5-5.5s5.9 1.9 7.5 5.5"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14 18 8Z"/><path d="M10.3 20a1.8 1.8 0 0 0 3.4 0"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12.5 2.5 2.5L16 9"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  errorCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.6 6.8L12 17.6 5.8 21l1.6-6.8-5.2-4.7 6.9-.7L12 2.5Z"/></svg>',
  verified: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5 14.6 4l3.5-.6 1 3.4 3 1.9-1.4 3.3 1.4 3.3-3 1.9-1 3.4-3.5-.6L12 22.5 9.4 20l-3.5.6-1-3.4-3-1.9 1.4-3.3-1.4-3.3 3-1.9 1-3.4 3.5.6L12 1.5Z"/><path d="m8.5 12.2 2.3 2.3 4.7-4.9" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>',
  bike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.2"/><circle cx="18.5" cy="17.5" r="3.2"/><path d="M5.5 17.5 10 8h4l3 5.5h2M10 8 8 5H6"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M11 20V4M18 20v-7"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h16v5M4 9l1 11h14l1-11M4 9h16"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 19c1.2-3.4 3.5-5 6.5-5s5.3 1.6 6.5 5"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.5 14.2c2.3.4 4 1.8 5 4.8"/></svg>',
  money: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 6v.01M18 18v.01"/></svg>',
  cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8v-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V19a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h13l-3 4.5L18 13H5"/></svg>',
  bell2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14 18 8Z"/><path d="M10.3 20a1.8 1.8 0 0 0 3.4 0"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="12" height="9.5" rx="1"/><path d="M13.5 10h4l3.5 3.5v3h-7.5"/><circle cx="5.5" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3.5h3.7l1.6 4.3-2 1.7a13.5 13.5 0 0 0 6.7 6.7l1.7-2 4.3 1.6v3.7c0 1-.9 1.8-1.9 1.7-9-1-15-7-16-16-.1-1 .7-1.9 1.9-1.9Z"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 5.5 18 11 8 21H2.5v-5.5L12.5 5.5Z"/><path d="m16.5 3.5 3.5 3.5"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5h16M9 6.5V4h6v2.5M6 6.5 7 20h10l1-13.5"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 16l4-4-4-4M20 12H9"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 4l9 6.5M4.5 10.5v8M9 10.5v8M15 10.5v8M19.5 10.5v8M2.5 21h19"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5 4.5 5.5v6c0 5 3.3 8.4 7.5 10 4.2-1.6 7.5-5 7.5-10v-6L12 2.5Z"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2.5h12v19l-2.5-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21.5v-19Z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
  gavel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 6.5 3 3M4 20h9M9.5 4l6 6-7 7-6-6 7-7Z"/></svg>',
  navArrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 8 18-8-4-8 4 8-18Z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
};

/* ==========================================================================
   2. CONFIGURATION (not mock data — real config the platform uses)
   ========================================================================== */

const CATEGORIES = [
  { id: 'groceries', name: 'Groceries', icon: '🧺' },
  { id: 'food', name: 'Food & Drinks', icon: '🍛' },
  { id: 'electronics', name: 'Electronics', icon: '🔌' },
  { id: 'phones', name: 'Phones', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'household', name: 'Household', icon: '🏠' },
  { id: 'provisions', name: 'Provisions', icon: '🛒' },
  { id: 'stationery', name: 'Stationery', icon: '✏️' },
  { id: 'building', name: 'Building', icon: '🧱' },
];

const NG_STATES_AREAS = ['Ikeja, Lagos', 'Yaba, Lagos', 'Lekki, Lagos', 'Surulere, Lagos', 'Wuse 2, Abuja', 'Garki, Abuja', 'Independence Layout, Enugu', 'GRA, Port Harcourt', 'Bodija, Ibadan', 'Sabon Gari, Kano'];

const ORDER_FLOW = ['placed', 'confirmed', 'preparing', 'ready_for_pickup', 'agent_assigned', 'picked_up', 'out_for_delivery', 'delivered'];
const ORDER_FLOW_LABEL = {
  placed: 'Order placed', confirmed: 'Business confirmed', preparing: 'Preparing order',
  ready_for_pickup: 'Ready for pickup', agent_assigned: 'Delivery agent assigned',
  picked_up: 'Picked up', out_for_delivery: 'Out for delivery', delivered: 'Delivered',
};

function categoryEmoji(cat) {
  const found = CATEGORIES.find((c) => c.id === cat);
  return found ? found.icon : '🛍️';
}

function defaultSettings() {
  return {
    commissionPercent: 5,
    platformServiceFeePercent: 1.5,
    platformServiceFeeMin: 300,
    baseDeliveryFee: 1000,
    agentSharePercent: 70,
    categoryCommission: { electronics: 4, phones: 4, building: 3.5 },
    zones: [
      { id: 'zone-a', name: 'Zone A', minKm: 0, maxKm: 3, fee: 700 },
      { id: 'zone-b', name: 'Zone B', minKm: 3, maxKm: 7, fee: 1000 },
      { id: 'zone-c', name: 'Zone C', minKm: 7, maxKm: 12, fee: 1500 },
    ],
  };
}

/* ==========================================================================
   3. DATABASE LAYER — localStorage today, swappable for a real API
   ========================================================================== */

const DB_KEY = 'PXDynasty_db_v1';

function emptyDb() {
  return {
    settings: defaultSettings(),
    businesses: [],
    products: [],
    customers: [],
    agents: [],
    orders: [],
    notifications: [],
    settlements: [],
    nextIds: { product: 1, order: 1, settlement: 1, notif: 1 },
  };
}

/* Local cache copy — used as a fallback if Supabase is unreachable. */
function loadDataLocal() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) {
    try { return Object.assign(emptyDb(), JSON.parse(raw)); } catch (e) { /* fall through */ }
  }
  return emptyDb();
}

/* Sync version used at module load: returns local cache so DB is never null.
   The async cloud fetch happens later and calls hydrateDb(). */
function loadData() {
  return loadDataLocal();
}

/* Async: replace DB's contents with the cloud copy. */
async function hydrateDb() {
  if (!window.PXDynastySBC) return false;
  const remote = await window.PXDynastySBC.fetchAll();
  if (!remote) return false;
  DB.businesses = remote.businesses;
  DB.products = remote.products;
  DB.orders = remote.orders;
  DB.customers = remote.customers;
  DB.agents = remote.agents;
  if (remote.notifications) DB.notifications = remote.notifications;
  // Mirror into local cache too.
  saveDataLocalOnly();
  return true;
}

/* Save to local cache AND push to Supabase. Fire-and-forget cloud writes. */
function saveData(db) {
  saveDataLocalOnly();
  cloudSyncAll();
}

function saveDataLocalOnly() {
  localStorage.setItem(DB_KEY, JSON.stringify(DB));
}

/* Push every record currently in DB back to Supabase (upserts).
   Idempotent: safe to call repeatedly. */
let _cloudSyncBusy = false;
async function cloudSyncAll() {
  if (!window.PXDynastySBC) return;
  if (_cloudSyncBusy) return;
  _cloudSyncBusy = true;
  try {
    const jobs = [];
    DB.businesses.forEach((b) => jobs.push(window.PXDynastySBC.upsertBusiness(b)));
    DB.products.forEach((p) => jobs.push(window.PXDynastySBC.upsertProduct(p)));
    DB.customers.forEach((c) => jobs.push(window.PXDynastySBC.upsertCustomer(c)));
    DB.agents.forEach((a) => jobs.push(window.PXDynastySBC.upsertAgent(a)));
    DB.orders.forEach((o) => jobs.push(window.PXDynastySBC.upsertOrder(o)));
    await Promise.all(jobs);
  } finally {
    _cloudSyncBusy = false;
  }
}

/* ==========================================================================
   4. GLOBAL STATE
   ========================================================================== */

const DB = loadData();

const state = {
  role: 'customer',
  view: 'home',
  params: {},
  cart: JSON.parse(localStorage.getItem('PXDynasty_cart') || '[]'),
  savedForLater: JSON.parse(localStorage.getItem('PXDynasty_saved') || '[]'),
  currentCustomerId: null,
  currentBusinessId: null,
  currentAgentId: null,
  selectedCategory: null,
  searchQuery: '',
  productFilters: { sort: 'popular', maxPrice: null, minRating: null },
  history: [],
};

function saveCart() { localStorage.setItem('PXDynasty_cart', JSON.stringify(state.cart)); }
function saveSaved() { localStorage.setItem('PXDynasty_saved', JSON.stringify(state.savedForLater)); }

/* ==========================================================================
   5. UTILITIES
   ========================================================================== */

function formatNaira(n) { return '₦' + Math.round(n || 0).toLocaleString('en-NG'); }
function genId(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 9); }
function genOrderNumber() { return 'MK-' + (10000 + Math.floor(Math.random() * 89999)); }
function genOtp() { return String(1000 + Math.floor(Math.random() * 9000)); }

/* Human-friendly random password: two short words + 4 digits.
   Example: "tiger-bread-2841" — easy to type and share over WhatsApp. */
function genReadablePassword() {
  const words = [
    'tiger','eagle','river','mango','sunset','stone','falcon','lion','cedar','ocean',
    'palm','star','moon','wind','fire','cloud','jade','onyx','amber','pearl',
    'kite','bread','mint','sage','clay','rain','gold','salt','honey','silk',
  ];
  const w1 = words[Math.floor(Math.random() * words.length)];
  const w2 = words[Math.floor(Math.random() * words.length)];
  const n = 1000 + Math.floor(Math.random() * 9000);
  return w1 + '-' + w2 + '-' + n;
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
}
function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function initials(name) { return String(name || '?').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(); }
function placeholderThumb(hue, emoji, big) {
  const size = big ? 'font-size:64px;' : 'font-size:30px;';
  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:hsl(${hue || 0},46%,90%);${size}">${emoji || '🛍️'}</div>`;
}

function toast(message, type) {
  const root = document.getElementById('toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = 'toast ' + (type || '');
  const icon = type === 'success' ? ICONS.checkCircle : (type === 'error' ? ICONS.errorCircle : ICONS.bell);
  el.innerHTML = icon + '<span>' + escapeHtml(message) + '</span>';
  root.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .25s ease'; setTimeout(() => el.remove(), 260); }, 2600);
}

function openModal(html) {
  const overlay = document.getElementById('modal-root');
  overlay.innerHTML = '<div class="modal-sheet">' + html + '</div>';
  overlay.classList.add('open');
}
function closeModal() {
  // Clear any chat polling if a chat modal was open.
  if (typeof stopChatPolling === 'function') stopChatPolling();
  _chatOrderId = null;
  document.getElementById('modal-root').classList.remove('open');
  document.getElementById('modal-root').innerHTML = '';
}
function confirmDialog(title, body, confirmLabel, onConfirm, danger) {
  openModal(`
    <div class="modal-head"><h3>${escapeHtml(title)}</h3>
      <button class="icon-btn" data-action="close-modal">${ICONS.x}</button>
    </div>
    <p class="text-muted" style="font-size:14px;">${escapeHtml(body)}</p>
    <div class="flex gap-10 mt-20">
      <button class="btn btn-outline btn-block" data-action="close-modal">Cancel</button>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'} btn-block" id="confirm-yes-btn">${escapeHtml(confirmLabel)}</button>
    </div>
  `);
  document.getElementById('confirm-yes-btn').addEventListener('click', () => { closeModal(); onConfirm(); });
}

/* ==========================================================================
   6. BUSINESS LOGIC LAYER
   ========================================================================== */

function getBusinesses(filter) {
  let list = DB.businesses.slice();
  if (filter && filter.status) list = list.filter((b) => b.status === filter.status);
  if (filter && filter.category) list = list.filter((b) => b.category === filter.category);
  return list;
}
function getBusiness(id) { return DB.businesses.find((b) => b.id === id); }

function getProducts(filter) {
  filter = filter || {};
  let list = DB.products.slice();
  if (filter.businessId) list = list.filter((p) => p.businessId === filter.businessId);
  if (filter.category) list = list.filter((p) => p.category === filter.category);
  if (filter.status) list = list.filter((p) => p.status === filter.status);
  else if (!filter.includeAll) list = list.filter((p) => p.status === 'active' || p.status === 'out_of_stock');
  if (filter.query) {
    const q = filter.query.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || (getBusiness(p.businessId) || {}).name?.toLowerCase().includes(q));
  }
  if (filter.maxPrice) list = list.filter((p) => (p.discountPrice || p.price) <= filter.maxPrice);
  if (filter.minRating) list = list.filter((p) => parseFloat(p.rating) >= filter.minRating);
  if (filter.sort === 'price_low') list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  else if (filter.sort === 'price_high') list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  else if (filter.sort === 'newest') list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (filter.sort === 'popular') list.sort((a, b) => (b.sales || 0) - (a.sales || 0));
  return list;
}
function getProduct(id) { return DB.products.find((p) => p.id === id); }

function getOrders(filter) {
  filter = filter || {};
  let list = DB.orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (filter.customerId) list = list.filter((o) => o.customerId === filter.customerId);
  if (filter.businessId) list = list.filter((o) => o.businessId === filter.businessId);
  if (filter.agentId) list = list.filter((o) => o.agentId === filter.agentId);
  if (filter.status) list = list.filter((o) => (Array.isArray(filter.status) ? filter.status.includes(o.status) : o.status === filter.status));
  return list;
}
function getOrder(id) { return DB.orders.find((o) => o.id === id); }
function getCustomer(id) { return DB.customers.find((c) => c.id === id); }
function getAgent(id) { return DB.agents.find((a) => a.id === id); }

function calcOrderFinancials(subtotal, settings) {
  const deliveryFee = settings.baseDeliveryFee;
  const platformFee = Math.round(subtotal * (settings.platformServiceFeePercent / 100) / 10) * 10 || settings.platformServiceFeeMin;
  const total = subtotal + deliveryFee + platformFee;
  const businessCommission = Math.round(subtotal * (settings.commissionPercent / 100));
  const businessReceives = subtotal - businessCommission;
  const agentPayment = Math.round(deliveryFee * (settings.agentSharePercent / 100));
  const platformGrossRevenue = platformFee + businessCommission + (deliveryFee - agentPayment);
  return { deliveryFee, platformFee, total, businessCommission, businessReceives, agentPayment, platformGrossRevenue };
}

function calculateOrderTotal(cartLines) {
  // Group cart lines by business so each gets its own delivery fee and
  // its own order at checkout.
  const byBiz = {};
  cartLines.forEach((l) => {
    const bid = l.product.businessId;
    (byBiz[bid] = byBiz[bid] || []).push(l);
  });

  const perBusiness = Object.keys(byBiz).map((bid) => {
    const items = byBiz[bid];
    const subtotal = items.reduce((s, l) => s + (l.product.discountPrice || l.product.price) * l.qty, 0);
    const calc = calcOrderFinancials(subtotal, DB.settings);
    return {
      businessId: bid,
      items,
      subtotal,
      deliveryFee: calc.deliveryFee,
      platformFee: calc.platformFee,
      total: calc.total,
      financial: {
        businessCommission: calc.businessCommission,
        businessReceives: calc.businessReceives,
        agentPayment: calc.agentPayment,
        platformGrossRevenue: calc.platformGrossRevenue,
      },
    };
  });

  const subtotal = perBusiness.reduce((s, b) => s + b.subtotal, 0);
  const deliveryFee = perBusiness.reduce((s, b) => s + b.deliveryFee, 0);
  const platformFee = perBusiness.reduce((s, b) => s + b.platformFee, 0);
  const total = perBusiness.reduce((s, b) => s + b.total, 0);
  return { subtotal, deliveryFee, platformFee, total, perBusiness, multiBusiness: perBusiness.length > 1 };
}

function buildOrderDraft(data) {
  const subtotal = data.items.reduce((s, it) => s + it.price * it.qty, 0);
  const calc = calcOrderFinancials(subtotal, DB.settings);
  return {
    id: genId('ord'),
    orderNumber: genOrderNumber(),
    customerId: data.customerId,
    businessId: data.businessId,
    items: data.items,
    subtotal,
    deliveryFee: calc.deliveryFee,
    platformFee: calc.platformFee,
    discount: 0,
    total: calc.total,
    status: 'placed',
    paymentStatus: 'paid',
    agentId: null,
    deliveryAddress: data.deliveryAddress,
    deliveryInstructions: data.deliveryInstructions || '',
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    paymentMethod: data.paymentMethod,
    otp: genOtp(),
    createdAt: new Date().toISOString(),
    statusHistory: [{ status: 'placed', time: new Date().toISOString() }],
    financial: {
      businessCommission: calc.businessCommission,
      businessReceives: calc.businessReceives,
      agentPayment: calc.agentPayment,
      platformGrossRevenue: calc.platformGrossRevenue,
    },
    settled: false,
  };
}

function createOrder(data) {
  const subtotal = data.items.reduce((s, it) => s + it.price * it.qty, 0);
  const calc = calcOrderFinancials(subtotal, DB.settings);
  const order = {
    id: genId('ord'),
    orderNumber: genOrderNumber(),
    customerId: data.customerId,
    businessId: data.businessId,
    items: data.items,
    subtotal,
    deliveryFee: calc.deliveryFee,
    platformFee: calc.platformFee,
    discount: 0,
    total: calc.total,
    status: 'placed',
    paymentStatus: 'paid',
    agentId: null,
    deliveryAddress: data.deliveryAddress,
    deliveryInstructions: data.deliveryInstructions || '',
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    paymentMethod: data.paymentMethod,
    otp: genOtp(),
    createdAt: new Date().toISOString(),
    statusHistory: [{ status: 'placed', time: new Date().toISOString() }],
    financial: {
      businessCommission: calc.businessCommission,
      businessReceives: calc.businessReceives,
      agentPayment: calc.agentPayment,
      platformGrossRevenue: calc.platformGrossRevenue,
    },
    settled: false,
  };
  DB.orders.unshift(order);
  pushNotification('business', order.businessId, 'New order received', `Order ${order.orderNumber} — ${formatNaira(order.total)}`, 'store');
  pushNotification('customer', order.customerId, 'Payment successful', `Order ${order.orderNumber} placed. Payment of ${formatNaira(order.total)} confirmed.`, 'checkCircle');
  pushNotification('admin', null, 'New order', `${order.orderNumber} placed.`, 'box');
  saveData(DB);
  // Push the order + the notification-bearing entities to Supabase right away.
  if (window.PXDynastySBC && window.PXDynastySBC.upsertOrder) {
    window.PXDynastySBC.upsertOrder(order).then((r) => {
      if (!r.ok) console.error('[order sync]', r.error);
    });
  }
  return order;
}

function updateOrderStatus(orderId, status, extra) {
  const order = getOrder(orderId);
  if (!order) return null;
  order.status = status;
  order.statusHistory.push({ status, time: new Date().toISOString() });
  if (extra) Object.assign(order, extra);
  if (status === 'confirmed') pushNotification('customer', order.customerId, 'Order confirmed', 'Your order was accepted.', 'checkCircle');
  if (status === 'preparing') pushNotification('customer', order.customerId, 'Preparing your order', `Order ${order.orderNumber} is being prepared.`, 'box');
  if (status === 'agent_assigned') {
    pushNotification('customer', order.customerId, 'Agent assigned', `A delivery agent has been assigned to order ${order.orderNumber}.`, 'bike');
    if (order.agentId) pushNotification('agent', order.agentId, 'New delivery job', `Order ${order.orderNumber} assigned to you.`, 'truck');
  }
  if (status === 'picked_up') pushNotification('customer', order.customerId, 'Order picked up', 'Your order has been picked up.', 'truck');
  if (status === 'out_for_delivery') pushNotification('customer', order.customerId, 'Agent is on the way', 'Your order is out for delivery.', 'bike');
  if (status === 'delivered') {
    pushNotification('customer', order.customerId, 'Order delivered', `Order ${order.orderNumber} has been delivered.`, 'checkCircle');
    const agent = order.agentId ? getAgent(order.agentId) : null;
    if (agent) {
      agent.completedDeliveries = (agent.completedDeliveries || 0) + 1;
      agent.earningsToday = (agent.earningsToday || 0) + order.financial.agentPayment;
      agent.earningsWeek = (agent.earningsWeek || 0) + order.financial.agentPayment;
      agent.earningsPending = (agent.earningsPending || 0) + order.financial.agentPayment;
      agent.status = 'online';
    }
  }
  if (status === 'cancelled') pushNotification('customer', order.customerId, 'Order cancelled', `Order ${order.orderNumber} was cancelled.`, 'errorCircle');
  saveData(DB);
  if (window.PXDynastySBC && window.PXDynastySBC.upsertOrder) {
    window.PXDynastySBC.upsertOrder(order).then((r) => {
      if (!r.ok) console.error('[order update sync]', r.error);
    });
  }
  return order;
}

function assignAgentToOrder(orderId, agentId) {
  const order = getOrder(orderId);
  const agent = getAgent(agentId);
  if (!order || !agent) return null;
  order.agentId = agentId;
  agent.status = 'delivering';
  updateOrderStatus(orderId, 'agent_assigned');
  return order;
}

function createSettlement(businessId) {
  const orders = getOrders({ businessId, status: 'delivered' }).filter((o) => !o.settled);
  if (!orders.length) return null;
  const grossSales = orders.reduce((s, o) => s + o.subtotal, 0);
  const commission = orders.reduce((s, o) => s + o.financial.businessCommission, 0);
  const net = grossSales - commission;
  const settlement = { id: genId('stl'), businessId, orderIds: orders.map((o) => o.id), grossSales, commission, refunds: 0, net, status: 'paid', date: new Date().toISOString() };
  orders.forEach((o) => { o.settled = true; });
  DB.settlements.unshift(settlement);
  pushNotification('business', businessId, 'Settlement processed', `${formatNaira(net)} has been settled.`, 'money');
  saveData(DB);
  return settlement;
}

function pushNotification(role, refId, title, body, icon) {
  const n = { id: genId('notif'), role, refId, title, body, time: new Date().toISOString(), read: false, icon: icon || 'bell' };
  DB.notifications.unshift(n);
  if (window.PXDynastySBC && window.PXDynastySBC.upsertNotification) {
    window.PXDynastySBC.upsertNotification(n).catch(() => {});
  }
}
function getNotifications(role, refId) {
  return DB.notifications.filter((n) => n.role === role && (refId == null || n.refId == null || n.refId === refId)).sort((a, b) => new Date(b.time) - new Date(a.time));
}
function unreadCount(role, refId) { return getNotifications(role, refId).filter((n) => !n.read).length; }
function DynastyllRead(role, refId) {
  const items = getNotifications(role, refId);
  items.forEach((n) => {
    if (!n.read) {
      n.read = true;
      if (window.PXDynastySBC && window.PXDynastySBC.upsertNotification) {
        window.PXDynastySBC.upsertNotification(n).catch(() => {});
      }
    }
  });
  saveDataLocalOnly();
}

function approveBusiness(id) { const b = getBusiness(id); if (b) { b.status = 'active'; b.verified = true; saveData(DB); } }
function rejectBusiness(id) { const b = getBusiness(id); if (b) { b.status = 'rejected'; saveData(DB); } }
function suspendBusiness(id) { const b = getBusiness(id); if (b) { b.status = 'suspended'; saveData(DB); } }
function reactivateBusiness(id) { const b = getBusiness(id); if (b) { b.status = 'active'; saveData(DB); } }
function approveProduct(id) { const p = getProduct(id); if (p) { p.status = 'active'; saveData(DB); } }
function rejectProduct(id) { const p = getProduct(id); if (p) { p.status = 'hidden'; saveData(DB); } }

/* ==========================================================================
   7. ROUTER
   ========================================================================== */

function navigate(view, params) {
  state.view = view;
  state.params = params || {};
  window.scrollTo(0, 0);
  render();
}
function switchRole(role) {
  const A = window.PXDynastyAuth;
  const user = A && A.currentUserSync ? A.currentUserSync() : null;
  if (!user || user.role !== 'admin') {
    if (A && A.logout) A.logout();
    return;
  }
  state.role = role;
  const defaults = { customer: 'home', business: 'overview', agent: 'jobs', admin: 'dashboard' };
  navigate(defaults[role]);
  closeRoleMenu();
}

/* ==========================================================================
   8. HEADER / SIDEBAR / BOTTOM NAV
   ========================================================================== */

const ROLE_LABEL = { customer: 'Customer', business: 'Business owner', agent: 'Delivery agent', admin: 'Platform admin' };
function roleSubtitle() {
  if (state.role === 'customer') { const c = getCustomer(state.currentCustomerId); return c ? c.name : 'Guest'; }
  if (state.role === 'business') { const b = getBusiness(state.currentBusinessId); return b ? b.name : 'No business'; }
  if (state.role === 'agent') { const a = getAgent(state.currentAgentId); return a ? a.name : 'No agent'; }
  return 'PXDynasty HQ';
}

function closeRoleMenu() { const m = document.getElementById('role-menu'); if (m) m.classList.remove('open'); }

function renderHeader() {
  const cartCount = state.cart.reduce((s, l) => s + l.qty, 0);
  const refId = state.role === 'customer' ? state.currentCustomerId : state.role === 'business' ? state.currentBusinessId : state.role === 'agent' ? state.currentAgentId : null;
  const unread = unreadCount(state.role, refId);

  let actions = '';
  if (state.role === 'customer') {
    actions += `<button class="icon-btn" data-action="nav" data-view="cart" title="Cart">${ICONS.cart}${cartCount ? `<span class="badge-dot">${cartCount}</span>` : ''}</button>`;
  }
  actions += `<button class="icon-btn" data-action="nav-notifications" title="Notifications">${ICONS.bell2}${unread ? `<span class="badge-dot">${unread}</span>` : ''}</button>`;

  return `
    <header class="app-header">
      <div class="brand" data-action="nav-home">
        <span class="brand-mark">PX</span>
        <span>PXDynasty</span>
      </div>
      <div class="header-search">
        <div style="position:relative;">
          <input id="header-search-input" type="text" placeholder="Search products, businesses, categories" value="${state.role === 'customer' && state.view === 'search' ? escapeHtml(state.searchQuery) : ''}" />
        </div>
      </div>
      <div class="header-spacer"></div>
      <div class="header-actions">
        ${actions}
        <div class="role-switcher">
          <button class="role-pill" data-action="toggle-role-menu">
            <span class="avatar">${initials(roleSubtitle())}</span>
            <span>${ROLE_LABEL[state.role]}</span>
          </button>
          <div class="role-menu" id="role-menu">
            <div class="role-menu-label">Signed in as ${escapeHtml(roleSubtitle())}</div>
            <button class="role-menu-item" data-auth="logout">
              <span class="dot" style="background:var(--color-error);"></span> Log out
            </button>
          </div>
        </div>
      </div>
    </header>`;
}

const CUSTOMER_TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'explore' },
  { id: 'cart', label: 'Cart', icon: 'cart' },
  { id: 'orders-list', label: 'Orders', icon: 'orders' },
  { id: 'profile', label: 'Account', icon: 'account' },
];
const AGENT_TABS = [
  { id: 'jobs', label: 'Jobs', icon: 'explore' },
  { id: 'active-delivery', label: 'Active', icon: 'truck' },
  { id: 'agent-earnings', label: 'Earnings', icon: 'wallet' },
  { id: 'agent-history', label: 'History', icon: 'orders' },
  { id: 'agent-profile', label: 'Profile', icon: 'account' },
];

const BUSINESS_NAV = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'biz-orders', label: 'Orders', icon: 'orders' },
  { id: 'biz-products', label: 'Products', icon: 'box' },
  { id: 'biz-catalog', label: 'Catalog', icon: 'grid' },
  { id: 'biz-customers', label: 'Customers', icon: 'users' },
  { id: 'biz-promotions', label: 'Promotions', icon: 'flag' },
  { id: 'biz-earnings', label: 'Earnings', icon: 'wallet' },
  { id: 'biz-analytics', label: 'Analytics', icon: 'chart' },
  { id: 'biz-store', label: 'Store', icon: 'store' },
  { id: 'biz-team', label: 'Team', icon: 'users' },
  { id: 'biz-settings', label: 'Settings', icon: 'cog' },
];
const STAFF_NAV = [
  { id: 'biz-orders', label: 'Orders', icon: 'orders' },
  { id: 'biz-products', label: 'Products', icon: 'box' },
  { id: 'biz-add-product', label: 'Add product', icon: 'plus' },
];

const ADMIN_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'admin-businesses', label: 'Businesses', icon: 'store' },
  { id: 'admin-customers', label: 'Customers', icon: 'users' },
  { id: 'admin-products', label: 'Products', icon: 'box' },
  { id: 'admin-orders', label: 'Orders', icon: 'orders' },
  { id: 'admin-agents', label: 'Delivery agents', icon: 'truck' },
  { id: 'admin-payments', label: 'Payments', icon: 'card' },
  { id: 'admin-settlements', label: 'Settlements', icon: 'wallet' },
  { id: 'admin-commissions', label: 'Commissions', icon: 'money' },
  { id: 'admin-zones', label: 'Delivery zones', icon: 'location' },
  { id: 'admin-disputes', label: 'Disputes', icon: 'gavel' },
  { id: 'admin-reports', label: 'Reports', icon: 'chart' },
  { id: 'admin-settings', label: 'Settings', icon: 'cog' },
];

function renderBottomNav() {
  const cartCount = state.cart.reduce((s, l) => s + l.qty, 0);
  const tabs = (state.role === 'customer')
    ? CUSTOMER_TABS
    : (state.role === 'agent')
      ? AGENT_TABS
      : (state.role === 'business')
        ? (state.isStaff
          ? [
              { id: 'biz-orders', label: 'Orders', icon: 'orders' },
              { id: 'biz-products', label: 'Products', icon: 'box' },
              { id: 'biz-add-product', label: 'Add', icon: 'plus' },
              { id: '__more', label: 'More', icon: 'menu' },
            ]
          : [
              { id: 'overview', label: 'Overview', icon: 'home' },
              { id: 'biz-orders', label: 'Orders', icon: 'orders' },
              { id: 'biz-products', label: 'Products', icon: 'box' },
              { id: 'biz-earnings', label: 'Earnings', icon: 'wallet' },
              { id: '__more', label: 'More', icon: 'menu' },
            ])
        : (state.role === 'admin')
          ? [
              { id: 'dashboard', label: 'Home', icon: 'home' },
              { id: 'admin-businesses', label: 'Businesses', icon: 'store' },
              { id: 'admin-orders', label: 'Orders', icon: 'orders' },
              { id: 'admin-payments', label: 'Payments', icon: 'card' },
              { id: '__more', label: 'More', icon: 'menu' },
            ]
          : [];

  if (!tabs.length) return '';
  return `<nav class="bottom-nav desktop-hide">
    ${tabs.map((t) => `
      <button class="bottom-nav-item ${state.view === t.id ? 'active' : ''}" data-action="${t.id === '__more' ? 'open-more-menu' : 'nav'}" data-view="${t.id}">
        ${ICONS[t.icon]}
        ${t.id === 'cart' && cartCount ? `<span class="cart-count">${cartCount}</span>` : ''}
        <span>${t.label}</span>
      </button>`).join('')}
  </nav>`;
}

/* Sheet that opens from the "More" tab for business/admin roles. */
function openMoreMenu() {
  const nav = state.role === 'business' ? BUSINESS_NAV : state.role === 'admin' ? ADMIN_NAV : [];
  const itemsHtml = nav.map((n) => `
    <button class="row-card pressable" style="display:block;width:100%;text-align:left;cursor:pointer;margin-bottom:8px;border:1px solid var(--color-border);"
      data-action="more-nav" data-view="${n.id}">
      <div class="flex items-center gap-10" style="padding:2px 4px;">
        ${ICONS[n.icon]}
        <span style="font-weight:600;font-size:14px;">${n.label}</span>
      </div>
    </button>
  `).join('');
  openModal(`
    <div class="modal-head">
      <h3>Menu</h3>
      <button class="icon-btn" data-action="close-modal">${ICONS.x}</button>
    </div>
    ${itemsHtml}
    <button class="btn btn-outline btn-block mt-12" data-action="do-logout">Log out</button>
  `);
}

function renderSidebar() {
  if (state.role !== 'business' && state.role !== 'admin') return '';
  const nav = state.role === 'admin'
    ? ADMIN_NAV
    : (state.isStaff ? STAFF_NAV : BUSINESS_NAV);
  return `<aside class="sidebar has-sidebar">
    ${nav.map((n) => `
      <a href="javascript:void(0)" class="sidebar-link ${state.view === n.id ? 'active' : ''}" data-action="nav" data-view="${n.id}">
        ${ICONS[n.icon]}<span>${n.label}</span>
      </a>`).join('')}
  </aside>`;
}

/* ==========================================================================
   9. ROOT RENDER
   ========================================================================== */

function render() {
  document.getElementById('header-root').innerHTML = renderHeader();
  document.getElementById('sidebar-root').innerHTML = renderSidebar();
  document.getElementById('bottomnav-root').innerHTML = renderBottomNav();
  const main = document.getElementById('main-scroll');
  main.classList.toggle('has-sidebar-pad', state.role === 'business' || state.role === 'admin');
  main.innerHTML = `<div class="content-wrap">${renderView()}</div>`;
  bindHeaderSearch();
  if (state.role === 'business' && state.view === 'biz-team') {
    loadStaffList();
  }
}

function renderView() {
  try {
    if (state.role === 'customer') return renderCustomerView();
    if (state.role === 'business') return renderBusinessView();
    if (state.role === 'agent') return renderAgentView();
    if (state.role === 'admin') return renderAdminView();
  } catch (e) {
    console.error(e);
    return emptyState('errorCircle', 'Something went wrong', 'This screen could not be loaded.', null);
  }
  return '';
}

function emptyState(icon, title, body, actionHtml) {
  return `<div class="empty-state">
    <div class="icon-wrap">${ICONS[icon] || ICONS.box}</div>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
    ${actionHtml || ''}
  </div>`;
}

function bindHeaderSearch() {
  const input = document.getElementById('header-search-input');
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { state.searchQuery = input.value; if (state.role === 'customer') navigate('search'); }
  });
}

/* ==========================================================================
   10. CUSTOMER VIEWS
   ========================================================================== */

function renderCustomerView() {
  switch (state.view) {
    case 'home': return customerHome();
    case 'explore': return customerExplore();
    case 'search': return customerSearch();
    case 'product': return customerProductDetail(state.params.id);
    case 'business': return customerBusinessStore(state.params.id);
    case 'cart': return customerCart();
    case 'checkout': return customerCheckout();
    case 'order-success': return customerOrderSuccess(state.params.orderId);
    case 'order-tracking': return customerOrderTracking(state.params.orderId);
    case 'orders-list': return customerOrdersList();
    case 'customer-order-detail': return customerOrderDetail(state.params.orderId);
    case 'profile': return customerProfile();
    case 'customer-addresses': return customerAddresses();
    case 'customer-payment-methods': return customerPaymentMethods();
    case 'customer-terms': return customerTerms();
    case 'customer-privacy': return customerPrivacy();
    case 'notifications': return notificationsView();
    default: return customerHome();
  }
}

function productCardHtml(p) {
  const biz = getBusiness(p.businessId) || { name: '' };
  const price = p.discountPrice || p.price;
  const outOfStock = p.status === 'out_of_stock' || p.stock === 0;
  return `<div class="product-card pressable" data-action="nav" data-view="product" data-id="${p.id}">
    <div class="thumb">
      ${p.imageUrl
        ? `<img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.name)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />`
        : placeholderThumb(p.hue, p.emoji)}
      ${outOfStock ? `<span class="stock-flag">Out of stock</span>` : ''}
      ${p.discountPrice ? `<span class="discount-flag">-${Math.round((1 - p.discountPrice / p.price) * 100)}%</span>` : ''}
    </div>
    <div class="body">
      <div class="biz-name">${escapeHtml(biz.name)}</div>
      <div class="p-name">${escapeHtml(p.name)}</div>
      <div class="rating-row">${ICONS.star} ${p.rating || '—'} <span class="text-faint">· ${p.sales || 0} sold</span></div>
      <div class="price-row"><span class="now">${formatNaira(price)}</span>${p.discountPrice ? `<span class="was">${formatNaira(p.price)}</span>` : ''}</div>
      <button class="add-cart-fab" ${outOfStock ? 'disabled' : ''} data-action="add-to-cart" data-id="${p.id}">${outOfStock ? 'Unavailable' : 'Add to cart'}</button>
    </div>
  </div>`;
}

function businessCardHtml(b) {
  return `<div class="business-card pressable" data-action="nav" data-view="business" data-id="${b.id}">
    <div class="cover">${placeholderThumb((b.hue + 40) % 360, categoryEmoji(b.category))}</div>
    <div class="logo">${initials(b.name)}</div>
    <div class="info">
      <div class="name">${escapeHtml(b.name)} ${b.verified ? `<span class="verified-badge">${ICONS.verified}</span>` : ''}</div>
      <div class="cat">${(CATEGORIES.find((c) => c.id === b.category) || {}).name || ''}</div>
      <div class="rating-row">${ICONS.star} ${b.rating} <span class="text-faint">· ${b.deliveryEstimate}min</span></div>
    </div>
  </div>`;
}

function customerHome() {
  const cust = getCustomer(state.currentCustomerId);
  const activeBiz = getBusinesses({ status: 'active' });
  const popularBiz = activeBiz.slice().sort((a, b) => b.rating - a.rating).slice(0, 8);
  const trending = getProducts({ sort: 'popular' }).slice(0, 8);
  const recommended = getProducts({}).slice(0, 8);

  const locationLine = cust && cust.addresses && cust.addresses[0]
    ? `Delivering to <strong style="color:var(--color-text)">${escapeHtml(cust.addresses[0].label)}</strong> · ${escapeHtml(cust.addresses[0].line.split(',').slice(-2).join(','))}`
    : `Set your <strong style="color:var(--color-text)">delivery address</strong>`;

  return `
    <div class="flex items-center gap-6 text-sm text-muted mb-0" style="margin-bottom:10px;">
      ${ICONS.location} <span>${locationLine}</span>
    </div>
    <div class="header-search" style="display:block;max-width:none;margin-bottom:14px;">
      <input type="text" placeholder="Search products, businesses, categories" id="home-search-input" />
    </div>

    <div class="hero-banner">
      <h2>Fresh stock, fast delivery</h2>
      <p>Shop from verified local businesses near you — one checkout, one delivery, no stress.</p>
      <button class="btn btn-accent btn-sm" data-action="nav" data-view="explore">Shop by category</button>
    </div>

    <div class="section-title-row"><h2>Shop by category</h2></div>
    <div class="category-scroll">
      ${CATEGORIES.map((c) => `
        <div class="category-chip pressable" data-action="pick-category" data-cat="${c.id}">
          <div class="icon">${c.icon}</div>
          <span>${c.name}</span>
        </div>`).join('')}
    </div>

    <div class="section-title-row"><h2>Popular businesses</h2><span class="link" data-action="nav" data-view="explore">See all</span></div>
    ${popularBiz.length ? `<div class="business-row-scroll">${popularBiz.map(businessCardHtml).join('')}</div>` : emptyState('store', 'No businesses yet', 'Businesses will appear here once they register.', null)}

    <div class="section-title-row"><h2>Trending products</h2><span class="link" data-action="nav" data-view="explore">See all</span></div>
    ${trending.length ? `<div class="product-grid">${trending.map(productCardHtml).join('')}</div>` : emptyState('box', 'No products yet', 'Products will appear here once businesses list them.', null)}

    ${recommended.length ? `<div class="section-title-row"><h2>Recommended for you</h2></div><div class="product-grid">${recommended.map(productCardHtml).join('')}</div>` : ''}
  `;
}

function customerExplore() {
  const cat = state.selectedCategory;
  const products = getProducts({ category: cat, sort: state.productFilters.sort, maxPrice: state.productFilters.maxPrice, minRating: state.productFilters.minRating });
  return `
    <div class="page-head"><div><h1>Explore</h1><div class="sub">${products.length} products available</div></div></div>
    <div class="category-scroll">
      <div class="category-chip pressable" data-action="pick-category" data-cat="">
        <div class="icon ${!cat ? 'active-icon' : ''}" style="${!cat ? 'border-color:var(--color-primary);background:var(--color-primary-tint);' : ''}">🛍️</div>
        <span style="${!cat ? 'color:var(--color-primary-dark)' : ''}">All</span>
      </div>
      ${CATEGORIES.map((c) => `
        <div class="category-chip pressable ${cat === c.id ? 'active' : ''}" data-action="pick-category" data-cat="${c.id}">
          <div class="icon">${c.icon}</div><span>${c.name}</span>
        </div>`).join('')}
    </div>
    <div class="flex gap-8" style="margin:8px 0 16px;overflow-x:auto;">
      <button class="chip ${state.productFilters.sort === 'popular' ? 'on' : ''}" data-action="set-sort" data-sort="popular">Popular</button>
      <button class="chip ${state.productFilters.sort === 'newest' ? 'on' : ''}" data-action="set-sort" data-sort="newest">Newest</button>
      <button class="chip ${state.productFilters.sort === 'price_low' ? 'on' : ''}" data-action="set-sort" data-sort="price_low">Price: Low to high</button>
      <button class="chip ${state.productFilters.sort === 'price_high' ? 'on' : ''}" data-action="set-sort" data-sort="price_high">Price: High to low</button>
      <button class="chip ${state.productFilters.minRating ? 'on' : ''}" data-action="toggle-rating-filter">${ICONS.star} 4.0+</button>
    </div>
    ${products.length ? `<div class="product-grid">${products.map(productCardHtml).join('')}</div>` : emptyState('box', 'No products found', 'Try a different category or clear your filters.', `<button class="btn btn-outline btn-sm" data-action="clear-filters">Clear filters</button>`)}
  `;
}

function customerSearch() {
  const q = state.searchQuery.trim();
  const products = q ? getProducts({ query: q }) : [];
  const businesses = q ? getBusinesses({ status: 'active' }).filter((b) => b.name.toLowerCase().includes(q.toLowerCase())) : [];
  if (!q) {
    return `<div class="page-head"><h1>Search</h1></div>
      <div class="header-search" style="display:block;max-width:none;margin-bottom:16px;"><input id="home-search-input" type="text" placeholder="Search products, businesses, categories" /></div>`;
  }
  return `
    <div class="page-head"><h1>Results for "${escapeHtml(q)}"</h1><div class="sub">${products.length + businesses.length} results</div></div>
    <div class="header-search" style="display:block;max-width:none;margin-bottom:16px;"><input id="home-search-input" type="text" placeholder="Search products, businesses, categories" value="${escapeHtml(q)}" /></div>
    ${businesses.length ? `<div class="section-title-row"><h2>Businesses</h2></div>${businesses.map((b) => businessListItemHtml(b)).join('')}` : ''}
    ${products.length ? `<div class="section-title-row"><h2>Products</h2></div><div class="product-grid">${products.map(productCardHtml).join('')}</div>` : ''}
    ${!products.length && !businesses.length ? emptyState('search', 'No results found', `We couldn't find anything for "${q}".`, null) : ''}
  `;
}

function businessListItemHtml(b) {
  return `<div class="business-list-item pressable" data-action="nav" data-view="business" data-id="${b.id}">
    <div class="logo-sq">${initials(b.name)}</div>
    <div style="flex:1;min-width:0;">
      <div class="flex items-center gap-6"><strong>${escapeHtml(b.name)}</strong>${b.verified ? `<span class="verified-badge">${ICONS.verified}</span>` : ''}</div>
      <div class="text-sm text-muted">${(CATEGORIES.find((c) => c.id === b.category) || {}).name || ''} · ${escapeHtml(b.address)}</div>
      <div class="rating-row">${ICONS.star} ${b.rating} <span class="text-faint">· ${b.open ? 'Open now' : 'Closed'}</span></div>
    </div>
  </div>`;
}

function backBtn(label) {
  return `<button class="eyebrow-back" data-action="back">${ICONS.chevronLeft} ${escapeHtml(label || 'Back')}</button>`;
}

function customerProductDetail(id) {
  const p = getProduct(id);
  if (!p) return emptyState('box', 'Product not found', 'This product may have been removed.', null);
  const biz = getBusiness(p.businessId) || { name: '' };
  const price = p.discountPrice || p.price;
  const outOfStock = p.status === 'out_of_stock' || p.stock === 0;
  const qty = state.params.qty || 1;
  return `
    ${backBtn('Back')}
    <div class="grid-2">
      <div><div class="card card-flush" style="aspect-ratio:1/1;overflow:hidden;">
        ${p.imageUrl
          ? `<img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.name)}" style="width:100%;height:100%;object-fit:cover;" />`
          : placeholderThumb(p.hue, p.emoji, true)}
      </div></div>
      <div>
        <div class="flex items-center gap-6" style="margin-top:14px;">
          <span class="chip">${(CATEGORIES.find((c) => c.id === p.category) || {}).name || ''}</span>
          ${outOfStock ? `<span class="status-badge status-error">Out of stock</span>` : `<span class="status-badge status-success">In stock</span>`}
        </div>
        <h1 style="font-size:22px;margin-top:10px;">${escapeHtml(p.name)}</h1>
        <div class="flex items-center gap-6 pressable" style="cursor:pointer;" data-action="nav" data-view="business" data-id="${biz.id}">
          <span class="text-muted" style="font-size:13.5px;">${escapeHtml(biz.name)}</span>
        </div>
        <div class="rating-row" style="margin-top:6px;">${ICONS.star} <strong>${p.rating}</strong> <span class="text-faint">· ${p.sales || 0} sold · ${p.stock} left</span></div>
        <div class="price-row" style="margin-top:10px;">
          <span class="now" style="font-size:24px;">${formatNaira(price)}</span>
          ${p.discountPrice ? `<span class="was" style="font-size:15px;">${formatNaira(p.price)}</span>` : ''}
        </div>
        <hr class="divider" />
        <p class="text-muted" style="font-size:14px;">${escapeHtml(p.description)}</p>
        <div class="form-group" style="margin-top:14px;"><label>Specifications</label>
          <div class="text-sm text-muted">SKU: ${escapeHtml(p.sku)}</div>
        </div>
        <div class="form-group"><label>Quantity</label>
          <div class="qty-stepper">
            <button data-action="detail-qty" data-dir="-1">−</button>
            <span id="detail-qty-val">${qty}</span>
            <button data-action="detail-qty" data-dir="1">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="sticky-bottom-bar">
      <button class="btn btn-outline btn-block" ${outOfStock ? 'disabled' : ''} data-action="add-to-cart" data-id="${p.id}" data-qty="${qty}">Add to cart</button>
      <button class="btn btn-primary btn-block" ${outOfStock ? 'disabled' : ''} data-action="buy-now" data-id="${p.id}" data-qty="${qty}">Buy now</button>
    </div>
  `;
}

function customerBusinessStore(id) {
  const b = getBusiness(id);
  if (!b) return emptyState('store', 'Business not found', '', null);
  const products = getProducts({ businessId: id });
  return `
    ${backBtn('Back')}
    <div class="card card-flush">
      <div style="height:120px;">${placeholderThumb((b.hue + 40) % 360, categoryEmoji(b.category))}</div>
      <div style="padding:16px;">
        <div class="flex items-center gap-8">
          <div class="logo-sq" style="width:52px;height:52px;">${initials(b.name)}</div>
          <div>
            <div class="flex items-center gap-6"><h2 style="font-size:18px;">${escapeHtml(b.name)}</h2>${b.verified ? `<span class="verified-badge">${ICONS.verified}</span>` : ''}</div>
            <div class="rating-row">${ICONS.star} ${b.rating} <span class="text-faint">· ${(CATEGORIES.find((c) => c.id === b.category) || {}).name || ''}</span></div>
          </div>
        </div>
        <div class="flex gap-8 mt-12" style="flex-wrap:wrap;">
          <span class="status-badge ${b.open ? 'status-success' : 'status-neutral'}">${b.open ? 'Open now' : 'Closed'}</span>
          <span class="chip">${ICONS.location} ${escapeHtml(b.address)}</span>
          <span class="chip">${ICONS.clock} ${b.deliveryEstimate} min delivery</span>
        </div>
      </div>
    </div>
    <div class="section-title-row"><h2>Products (${products.length})</h2></div>
    ${products.length ? `<div class="product-grid">${products.map(productCardHtml).join('')}</div>` : emptyState('box', 'No products yet', 'This business has not listed any products.', null)}
  `;
}

/* ------------------------------ CART -------------------------------- */

function cartLines() {
  return state.cart.map((l) => ({ ...l, product: getProduct(l.productId) })).filter((l) => l.product);
}

function customerCart() {
  const lines = cartLines();
  if (!lines.length) {
    return `<div class="page-head"><h1>Your cart</h1></div>
      ${emptyState('cart', 'Your cart is empty', 'Browse the marketplace and add products you love.', `<button class="btn btn-primary btn-sm" data-action="nav" data-view="explore">Start shopping</button>`)}
      ${state.savedForLater.length ? savedForLaterHtml() : ''}`;
  }
  const totals = calculateOrderTotal(lines);
  return `
    <div class="page-head"><h1>Your cart</h1><div class="sub">${lines.length} item(s)${totals.multiBusiness ? ' · from ' + totals.perBusiness.length + ' shops' : ''}</div></div>
    ${totals.multiBusiness ? `<div class="card mt-0" style="background:var(--color-accent-tint);border-color:var(--color-accent);">
      <strong style="font-size:13px;color:var(--color-accent-dark);">Multiple shops in your cart</strong>
      <p class="text-sm mt-8" style="margin-bottom:0;color:var(--color-accent-dark);">You'll pay once, but each shop delivers its own items separately.</p>
    </div>` : ''}
    ${totals.perBusiness.map((g) => {
      const b = getBusiness(g.businessId) || { name: 'Business' };
      return `<div class="card mt-12">
        <div class="flex items-center justify-between">
          <strong style="font-size:13px;">${escapeHtml(b.name)}</strong>
          <span class="text-sm text-muted">${g.items.length} item${g.items.length === 1 ? '' : 's'}</span>
        </div>
        <div class="mt-8">${g.items.map((l) => cartLineHtml(l)).join('')}</div>
        <hr class="divider" />
        <div class="summary-row"><span>Subtotal</span><span class="val">${formatNaira(g.subtotal)}</span></div>
        <div class="summary-row"><span>Delivery from this shop</span><span class="val">${formatNaira(g.deliveryFee)}</span></div>
      </div>`;
    }).join('')}
    ${state.savedForLater.length ? savedForLaterHtml() : ''}
    <div class="card mt-16">
      <div class="summary-row"><span>Product subtotal</span><span class="val">${formatNaira(totals.subtotal)}</span></div>
      <div class="summary-row"><span>Delivery fees (${totals.perBusiness.length} shop${totals.perBusiness.length === 1 ? '' : 's'})</span><span class="val">${formatNaira(totals.deliveryFee)}</span></div>
      <div class="summary-row"><span>Platform/service fees</span><span class="val">${formatNaira(totals.platformFee)}</span></div>
      <div class="form-group mt-12 mb-0"><label>Coupon code</label><div class="flex gap-8"><input type="text" placeholder="Enter coupon code" id="coupon-input" /><button class="btn btn-outline btn-sm" data-action="apply-coupon">Apply</button></div></div>
      <div class="summary-row total"><span>Total</span><span>${formatNaira(totals.total)}</span></div>
    </div>
    <div class="sticky-bottom-bar">
      <button class="btn btn-primary btn-block" data-action="nav" data-view="checkout">Proceed to checkout — ${formatNaira(totals.total)}</button>
    </div>
  `;
}

function cartLineHtml(l) {
  const price = l.product.discountPrice || l.product.price;
  return `<div class="cart-line">
    ${placeholderThumbInline(l.product)}
    <div style="flex:1;min-width:0;">
      <div style="font-size:13.5px;font-weight:700;">${escapeHtml(l.product.name)}</div>
      <div class="text-sm text-muted">${formatNaira(price)} each</div>
      <div class="flex items-center justify-between mt-8">
        <div class="qty-stepper">
          <button data-action="cart-qty" data-id="${l.product.id}" data-dir="-1">−</button>
          <span>${l.qty}</span>
          <button data-action="cart-qty" data-id="${l.product.id}" data-dir="1">+</button>
        </div>
        <div class="flex gap-10">
          <button class="btn-ghost btn-sm" style="padding:4px 6px;" data-action="save-for-later" data-id="${l.product.id}">Save</button>
          <button class="btn-ghost btn-sm" style="padding:4px 6px;color:var(--color-error);" data-action="remove-from-cart" data-id="${l.product.id}">Remove</button>
        </div>
      </div>
    </div>
  </div>`;
}
function placeholderThumbInline(p) {
  return `<div class="thumb-sm" style="width:62px;height:62px;border-radius:10px;overflow:hidden;">${placeholderThumb(p.hue, p.emoji)}</div>`;
}

function savedForLaterHtml() {
  const items = state.savedForLater.map((id) => getProduct(id)).filter(Boolean);
  if (!items.length) return '';
  return `<div class="section-title-row"><h2>Saved for later</h2></div>
    <div class="card">
      ${items.map((p) => `<div class="cart-line">
        ${placeholderThumbInline(p)}
        <div style="flex:1;min-width:0;">
          <div style="font-size:13.5px;font-weight:700;">${escapeHtml(p.name)}</div>
          <div class="text-sm text-muted">${formatNaira(p.discountPrice || p.price)}</div>
          <div class="flex gap-10 mt-8">
            <button class="btn btn-outline btn-sm" data-action="move-to-cart" data-id="${p.id}">Move to cart</button>
            <button class="btn-ghost btn-sm" style="color:var(--color-error);" data-action="remove-saved" data-id="${p.id}">Remove</button>
          </div>
        </div>
      </div>`).join('')}
    </div>`;
}

/* ------------------------------ CHECKOUT -------------------------------- */

function customerCheckout() {
  const lines = cartLines();
  if (!lines.length) return emptyState('cart', 'Your cart is empty', 'Add products before checking out.', `<button class="btn btn-primary btn-sm" data-action="nav" data-view="explore">Start shopping</button>`);
  const step = state.params.step || 1;
  const cust = getCustomer(state.currentCustomerId) || { name: '', phone: '', addresses: [] };
  const totals = calculateOrderTotal(lines);
  const checkoutData = state.checkoutData || (state.checkoutData = {
    name: cust.name, phone: cust.phone,
    address: (cust.addresses[0] || {}).line || '',
    instructions: '', paymentMethod: 'card',
  });

  const steps = ['Address', 'Details', 'Summary', 'Payment', 'Done'];
  const segs = steps.map((s, i) => `<div class="seg ${i < step ? 'done' : ''}"></div>`).join('');

  let body = '';
  if (step === 1) {
    const addrs = cust.addresses || [];
    const defaultAddr = addrs.find((a) => a.isDefault) || addrs[0];
    const selectedId = checkoutData.addressId || (defaultAddr ? defaultAddr.id : null);
    if (!checkoutData.addressId && defaultAddr) {
      checkoutData.addressId = defaultAddr.id;
      checkoutData.address = defaultAddr.line;
    }
    body = `<div class="card">
      <div class="form-group"><label>Delivery address</label>
        ${addrs.length
          ? `<select id="ck-address">${addrs.map((a) => `<option value="${a.id}" ${selectedId === a.id ? 'selected' : ''}>${escapeHtml(a.label)}${a.isDefault ? ' (default)' : ''} — ${escapeHtml(a.line)}</option>`).join('')}</select>`
          : `<input type="text" id="ck-address-freeform" placeholder="Enter your delivery address" value="${escapeHtml(checkoutData.address)}" />`}
      </div>
      <div class="flex gap-8">
        <button class="btn btn-outline btn-sm" data-action="address-open">${ICONS.plus} Add address</button>
        <button class="btn btn-ghost btn-sm" data-action="nav" data-view="customer-addresses">Manage addresses</button>
      </div>
    </div>`;
  } else if (step === 2) {
    const authUser = window.PXDynastyAuth && window.PXDynastyAuth.currentUserSync && window.PXDynastyAuth.currentUserSync();
    const fallbackEmail = checkoutData.email || (cust && cust.email) || (authUser && authUser.email) || '';
    body = `<div class="card">
      <div class="form-group"><label>Full name</label><input type="text" id="ck-name" value="${escapeHtml(checkoutData.name)}" /></div>
      <div class="form-group"><label>Phone number</label><input type="tel" id="ck-phone" value="${escapeHtml(checkoutData.phone)}" /></div>
      <div class="form-group"><label>Email (for payment receipt)</label><input type="email" id="ck-email" value="${escapeHtml(fallbackEmail)}" placeholder="you@example.com" /></div>
      <div class="form-group mb-0"><label>Delivery instructions (optional)</label><textarea id="ck-instructions" placeholder="e.g. Call when you arrive at the gate">${escapeHtml(checkoutData.instructions)}</textarea></div>
    </div>`;
  } else if (step === 3) {
    const bizBlocks = totals.perBusiness.map((g) => {
      const b = getBusiness(g.businessId) || { name: 'Business' };
      return `<div class="card mt-12">
        <div class="flex items-center justify-between">
          <strong style="font-size:13px;">${escapeHtml(b.name)}</strong>
          <span class="text-sm text-muted">${g.items.length} item${g.items.length === 1 ? '' : 's'}</span>
        </div>
        <div class="mt-8">${g.items.map((l) => `<div class="summary-row"><span>${l.qty} × ${escapeHtml(l.product.name)}</span><span class="val">${formatNaira((l.product.discountPrice || l.product.price) * l.qty)}</span></div>`).join('')}</div>
        <hr class="divider" />
        <div class="summary-row"><span>Subtotal</span><span class="val">${formatNaira(g.subtotal)}</span></div>
        <div class="summary-row"><span>Delivery</span><span class="val">${formatNaira(g.deliveryFee)}</span></div>
        <div class="summary-row"><span>Platform fee</span><span class="val">${formatNaira(g.platformFee)}</span></div>
        <div class="summary-row total" style="font-size:14px;"><span>Shop subtotal</span><span>${formatNaira(g.total)}</span></div>
      </div>`;
    }).join('');
    body = `
      ${totals.multiBusiness ? `<div class="card" style="background:var(--color-accent-tint);border-color:var(--color-accent);">
        <strong style="font-size:13px;color:var(--color-accent-dark);">${totals.perBusiness.length} separate deliveries</strong>
        <p class="text-sm mt-8" style="margin-bottom:0;color:var(--color-accent-dark);">Each shop packs and sends its items separately. You'll pay once at the end.</p>
      </div>` : ''}
      ${bizBlocks}
      <div class="card mt-16">
        <div class="summary-row"><span>Product subtotal</span><span class="val">${formatNaira(totals.subtotal)}</span></div>
        <div class="summary-row"><span>Delivery fees</span><span class="val">${formatNaira(totals.deliveryFee)}</span></div>
        <div class="summary-row"><span>Platform fees</span><span class="val">${formatNaira(totals.platformFee)}</span></div>
        <div class="summary-row total"><span>Total to pay</span><span>${formatNaira(totals.total)}</span></div>
      </div>
      <div class="card mt-12">
        <strong style="font-size:13px;">Deliver to</strong>
        <p class="text-sm text-muted mt-8" style="margin-bottom:0;">${escapeHtml(checkoutData.name)} · ${escapeHtml(checkoutData.phone)}<br/>${escapeHtml(checkoutData.address)}</p>
      </div>`;
  } else if (step === 4) {
    body = `<div class="card">
      <strong style="font-size:13px;">Select payment method</strong>
      <div class="radio-card-group mt-12">
        ${[['card', 'Bank card', ICONS.card], ['transfer', 'Bank transfer', ICONS.bank], ['wallet', 'PXDynasty wallet', ICONS.wallet], ['cashless', 'Other cashless payment', ICONS.shield]].map(([val, label, icon]) => `
          <label class="radio-card ${checkoutData.paymentMethod === val ? 'selected' : ''}">
            <input type="radio" name="pm" value="${val}" ${checkoutData.paymentMethod === val ? 'checked' : ''} data-action="set-payment-method" />
            ${icon}<span>${label}</span>
          </label>`).join('')}
      </div>
    </div>
    <div class="card mt-12">
      <div class="summary-row total" style="border-top:none;margin-top:0;padding-top:0;"><span>Total to pay</span><span>${formatNaira(totals.total)}</span></div>
      <p class="text-sm text-muted" style="margin-top:8px;">${ICONS.shield} Payment is processed securely. The delivery agent will never collect payment from you.</p>
    </div>
    <div id="payment-processing-area"></div>`;
  }

  return `
    ${backBtn('Back')}
    <div class="page-head"><h1>Checkout</h1><div class="sub">Step ${step} of 5 — ${steps[step - 1]}</div></div>
    <div class="checkout-steps">${segs}</div>
    ${body}
    <div class="sticky-bottom-bar">
      ${step > 1 ? `<button class="btn btn-outline" data-action="checkout-step" data-dir="-1">Back</button>` : ''}
      ${step < 4 ? `<button class="btn btn-primary btn-block" data-action="checkout-step" data-dir="1">Continue</button>` : ''}
      ${step === 4 ? `<button class="btn btn-primary btn-block" data-action="place-order">Pay ${formatNaira(totals.total)}</button>` : ''}
    </div>
  `;
}

function customerOrderSuccess(orderId) {
  const order = getOrder(orderId);
  if (!order) return emptyState('errorCircle', 'Order not found', '', null);
  const biz = getBusiness(order.businessId) || { name: 'Business', deliveryEstimate: 30 };
  return `
    <div class="flex-col items-center" style="text-align:center;padding:26px 10px 10px;">
      <div class="icon-wrap icon-wrap-lg" style="background:var(--color-success-tint);color:var(--color-success);">${ICONS.checkCircle}</div>
      <h1 style="margin-top:16px;">Payment successful</h1>
      <p class="text-muted">Your order has been placed and sent to ${escapeHtml(biz.name)}.</p>
    </div>
    <div class="card mt-12">
      <div class="summary-row"><span>Order number</span><span class="val">${order.orderNumber}</span></div>
      <div class="summary-row"><span>Amount paid</span><span class="val">${formatNaira(order.total)}</span></div>
      <div class="summary-row"><span>Business</span><span class="val">${escapeHtml(biz.name)}</span></div>
      <hr class="divider" />
      <strong style="font-size:13px;">Items</strong>
      <div class="mt-8">${order.items.map((it) => `<div class="summary-row"><span>${it.qty} × ${escapeHtml(it.name)}</span><span class="val">${formatNaira(it.price * it.qty)}</span></div>`).join('')}</div>
    </div>
    <div class="flex gap-10 mt-16">
      <button class="btn btn-outline btn-block" data-action="nav" data-view="explore">Continue shopping</button>
      <button class="btn btn-primary btn-block" data-action="nav" data-view="order-tracking" data-order-id="${order.id}">Track order</button>
    </div>
  `;
}

function customerOrderTracking(orderId) {
  const order = getOrder(orderId);
  if (!order) return emptyState('errorCircle', 'Order not found', '', null);
  const biz = getBusiness(order.businessId) || { name: 'Business' };
  const agent = order.agentId ? getAgent(order.agentId) : null;
  const cancelled = order.status === 'cancelled';
  const awaitingConfirm = order.status === 'out_for_delivery';
  const disputed = !!order.disputed;
  return `
    ${backBtn('Back')}
    <div class="page-head">
      <div><h1>Order ${order.orderNumber}</h1><div class="sub">${escapeHtml(biz.name)} · ${formatDate(order.createdAt)}</div></div>
      ${orderStatusBadge(order.status)}
    </div>

    ${cancelled ? `<div class="card" style="border-color:var(--color-error);background:var(--color-error-tint);"><strong style="color:var(--color-error);">This order was cancelled.</strong><p class="text-sm mt-8" style="margin-bottom:0;color:var(--color-error);">A refund of ${formatNaira(order.total)} has been processed to your original payment method.</p></div>` : ''}

    ${disputed ? `<div class="card" style="border-color:var(--color-warning);background:var(--color-warning-tint);"><strong style="color:var(--color-warning);">Problem reported</strong><p class="text-sm mt-8" style="margin-bottom:0;color:var(--color-warning);">Our team is reviewing your report. We'll be in touch shortly.</p></div>` : ''}

    ${awaitingConfirm ? `
      <div class="card" style="border-color:var(--color-accent);background:var(--color-accent-tint);">
        <strong style="color:var(--color-accent-dark);font-size:15px;">Your order is arriving</strong>
        <p class="text-sm mt-8" style="margin-bottom:14px;color:var(--color-accent-dark);">The delivery agent is on the way. Once they hand over your items, please confirm receipt here.</p>
        <div class="flex gap-8">
          <button class="btn btn-primary btn-block" data-action="customer-confirm-delivery" data-order-id="${order.id}">${ICONS.check} I received my order</button>
          <button class="btn btn-outline btn-block" data-action="customer-report-problem" data-order-id="${order.id}">Report a problem</button>
        </div>
      </div>
    ` : ''}

    ${!cancelled && !awaitingConfirm ? `<div class="map-placeholder mt-12">${ICONS.location}<span style="margin-left:6px;">Live map preview — agent location updates in real deployment</span></div>` : ''}

    ${agent ? `
      <div class="card mt-12">
        <strong style="font-size:13px;">Your delivery agent</strong>
        <div class="flex items-center gap-12 mt-12">
          <div class="avatar" style="width:46px;height:46px;border-radius:50%;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:var(--font-display);">${initials(agent.name)}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;">${escapeHtml(agent.name)}</div>
            <div class="text-sm text-muted">${escapeHtml(agent.vehicle)}${agent.operatingArea ? ' · ' + escapeHtml(agent.operatingArea) : ''}</div>
          </div>
          ${agent.phone ? `<a class="icon-btn" style="background:var(--color-primary);color:#fff;" href="tel:${escapeHtml(agent.phone)}" aria-label="Call agent">${ICONS.phone}</a>` : ''}
        </div>
      </div>
    ` : ''}

    <div class="card mt-12">
      <strong style="font-size:13px;">Items</strong>
      <div class="mt-8">
        ${order.items.map((it) => `<div class="summary-row"><span>${it.qty} × ${escapeHtml(it.name)}</span><span class="val">${formatNaira(it.price * it.qty)}</span></div>`).join('')}
      </div>
      <hr class="divider" />
      <div class="summary-row"><span>Subtotal</span><span class="val">${formatNaira(order.subtotal)}</span></div>
      <div class="summary-row"><span>Delivery fee</span><span class="val">${formatNaira(order.deliveryFee)}</span></div>
      <div class="summary-row"><span>Platform fee</span><span class="val">${formatNaira(order.platformFee)}</span></div>
      <div class="summary-row total"><span>Total paid</span><span>${formatNaira(order.total)}</span></div>
    </div>

    <div class="card mt-12">
      <strong style="font-size:13px;">Delivering to</strong>
      <p class="text-sm text-muted mt-8" style="margin-bottom:0;">${escapeHtml(order.customerName || '')}${order.customerPhone ? ' · ' + escapeHtml(order.customerPhone) : ''}<br/>${escapeHtml(order.deliveryAddress)}</p>
      ${order.deliveryInstructions ? `<p class="text-sm text-faint mt-8" style="margin-bottom:0;">${escapeHtml(order.deliveryInstructions)}</p>` : ''}
    </div>

    <div class="card mt-12">
      <strong style="font-size:13px;">Order status</strong>
      <div class="timeline mt-12">
        ${ORDER_FLOW.map((step, i) => {
          const entry = order.statusHistory.find((h) => h.status === step);
          const done = !!entry;
          const currentIdx = ORDER_FLOW.indexOf(order.status);
          const isCurrent = i === currentIdx && !cancelled;
          return `<div class="timeline-step ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}">
            <div class="rail"><div class="node">${ICONS.check}</div>${i < ORDER_FLOW.length - 1 ? '<div class="line"></div>' : ''}</div>
            <div class="content"><div class="t-title">${ORDER_FLOW_LABEL[step]}</div>${entry ? `<div class="t-time">${formatDate(entry.time)}</div>` : ''}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="flex gap-10 mt-16">
      <button class="btn btn-outline btn-block" data-action="nav" data-view="customer-order-detail" data-order-id="${order.id}">Order details</button>
      ${orderChatButton(order.id, 'Chat with business')}
    </div>
  `;
}

function orderStatusBadge(status) {
  const map = { placed: 'status-info', confirmed: 'status-info', preparing: 'status-warn', ready_for_pickup: 'status-accent', agent_assigned: 'status-warn', picked_up: 'status-accent', out_for_delivery: 'status-accent', delivered: 'status-success', cancelled: 'status-error', refunded: 'status-error', disputed: 'status-error' };
  return `<span class="status-badge ${map[status] || 'status-neutral'}">${status.replace(/_/g, ' ')}</span>`;
}

function customerOrdersList() {
  const tab = state.params.tab || 'active';
  const all = getOrders({ customerId: state.currentCustomerId });
  const active = all.filter((o) => !['delivered', 'cancelled'].includes(o.status));
  const completed = all.filter((o) => o.status === 'delivered');
  const cancelled = all.filter((o) => o.status === 'cancelled');
  const list = { active, completed, cancelled }[tab];
  return `
    <div class="page-head"><h1>Your orders</h1></div>
    <div class="tab-bar">
      ${[['active', 'Active (' + active.length + ')'], ['completed', 'Completed (' + completed.length + ')'], ['cancelled', 'Cancelled (' + cancelled.length + ')']].map(([id, label]) => `<button class="${tab === id ? 'active' : ''}" data-action="orders-tab" data-tab="${id}">${label}</button>`).join('')}
    </div>
    ${list.length ? `<div class="row-cards">${list.map((o) => customerOrderCardHtml(o)).join('')}</div>` : emptyState('orders', 'No orders here', 'Orders in this category will show up here.', null)}
  `;
}

function customerOrderCardHtml(o) {
  const biz = getBusiness(o.businessId) || { name: 'Business' };
  return `<div class="row-card">
    <div class="row-card-top"><span class="row-card-title">${o.orderNumber}</span>${orderStatusBadge(o.status)}</div>
    <div class="row-card-sub">${escapeHtml(biz.name)} · ${formatDate(o.createdAt)}</div>
    <div class="row-card-sub">${o.items.length} item(s) · ${formatNaira(o.total)}</div>
    <div class="row-card-actions">
      <button class="btn btn-outline btn-sm" data-action="nav" data-view="customer-order-detail" data-order-id="${o.id}">View</button>
      ${!['delivered', 'cancelled'].includes(o.status) ? `<button class="btn btn-primary btn-sm" data-action="nav" data-view="order-tracking" data-order-id="${o.id}">Track order</button>` : `<button class="btn btn-accent btn-sm" data-action="reorder" data-order-id="${o.id}">Reorder</button>`}
    </div>
  </div>`;
}

function customerOrderDetail(orderId) {
  const order = getOrder(orderId);
  if (!order) return emptyState('errorCircle', 'Order not found', '', null);
  const biz = getBusiness(order.businessId) || { name: 'Business' };
  return `
    ${backBtn('Back')}
    <div class="page-head"><div><h1>${order.orderNumber}</h1><div class="sub">${escapeHtml(biz.name)} · ${formatDate(order.createdAt)}</div></div>${orderStatusBadge(order.status)}</div>
    <div class="card">
      <strong style="font-size:13px;">Items</strong>
      <div class="mt-8">${order.items.map((it) => `<div class="summary-row"><span>${it.qty} × ${escapeHtml(it.name)}</span><span class="val">${formatNaira(it.price * it.qty)}</span></div>`).join('')}</div>
      <hr class="divider" />
      <div class="summary-row"><span>Subtotal</span><span class="val">${formatNaira(order.subtotal)}</span></div>
      <div class="summary-row"><span>Delivery fee</span><span class="val">${formatNaira(order.deliveryFee)}</span></div>
      <div class="summary-row"><span>Platform fee</span><span class="val">${formatNaira(order.platformFee)}</span></div>
      <div class="summary-row total"><span>Total paid</span><span>${formatNaira(order.total)}</span></div>
    </div>
    <div class="card mt-12"><strong style="font-size:13px;">Delivery information</strong>
      <p class="text-sm text-muted mt-8" style="margin-bottom:0;">${escapeHtml(order.customerName || '')}<br/>${escapeHtml(order.deliveryAddress)}</p>
    </div>
    <div class="flex gap-10 mt-16">
      ${!['delivered', 'cancelled'].includes(order.status) ? `<button class="btn btn-primary btn-block" data-action="nav" data-view="order-tracking" data-order-id="${order.id}">Track order</button>` : `<button class="btn btn-accent btn-block" data-action="reorder" data-order-id="${order.id}">Reorder</button>`}
    </div>
    <div class="mt-12">${orderChatButton(order.id, 'Chat about this order')}</div>
  `;
}

function customerProfile() {
  const cust = getCustomer(state.currentCustomerId);
  if (!cust) {
    return `<div class="page-head"><h1>Account</h1></div>
      ${emptyState('account', 'No account yet', 'Once a customer is registered, their profile will appear here.', null)}`;
  }
  const rows = [
    ['customer-addresses', 'Saved addresses', ICONS.location, (cust.addresses || []).length + ' saved'],
    ['customer-payment-methods', 'Payment methods', ICONS.card, (cust.paymentMethods || []).length + ' saved'],
    ['orders-list', 'Order history', ICONS.orders, ''],
    ['notifications', 'Notifications', ICONS.bell, unreadCount('customer', cust.id) + ' unread'],
  ];
  return `
    <div class="page-head"><h1>Account</h1></div>
    <div class="card flex items-center gap-12">
      <div class="avatar" style="width:52px;height:52px;border-radius:50%;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:700;font-size:18px;">${initials(cust.name)}</div>
      <div><strong style="font-size:15px;">${escapeHtml(cust.name)}</strong><div class="text-sm text-muted">${escapeHtml(cust.phone)} · ${escapeHtml(cust.email || '')}</div></div>
    </div>
    <div class="card mt-12" style="padding:0;">
      ${rows.map(([view, label, icon, meta]) => `
        <div class="flex items-center justify-between pressable" style="padding:14px 16px;border-bottom:1px solid var(--color-border);cursor:pointer;" data-action="nav" data-view="${view}">
          <div class="flex items-center gap-10">${icon}<span style="font-weight:600;font-size:14px;">${label}</span></div>
          <div class="flex items-center gap-6 text-muted text-sm">${meta} ${ICONS.chevronRight}</div>
        </div>`).join('')}
    </div>
  `;
}

function customerAddresses() {
  const cust = getCustomer(state.currentCustomerId);
  const addrs = cust ? (cust.addresses || []) : [];
  return `${backBtn('Account')}
    <div class="page-head"><h1>Saved addresses</h1><div class="sub">${addrs.length} saved</div></div>
    ${addrs.length ? `<div class="row-cards">${addrs.map((a) => `
      <div class="row-card">
        <div class="row-card-top">
          <span class="row-card-title">${escapeHtml(a.label)}${a.isDefault ? ' <span class="status-badge status-success" style="margin-left:6px;">Default</span>' : ''}</span>
        </div>
        <div class="row-card-sub">${escapeHtml(a.line)}</div>
        ${a.phone ? `<div class="row-card-sub">${escapeHtml(a.phone)}</div>` : ''}
        <div class="row-card-actions">
          <button class="btn btn-outline btn-sm" data-action="address-open" data-id="${a.id}">Edit</button>
          ${!a.isDefault ? `<button class="btn btn-outline btn-sm" data-action="address-set-default" data-id="${a.id}">Set default</button>` : ''}
          <button class="btn btn-danger btn-sm" data-action="address-delete" data-id="${a.id}">Delete</button>
        </div>
      </div>`).join('')}</div>` : emptyState('location', 'No saved addresses', 'Add your first delivery address to speed up checkout.', null)}
    <button class="btn btn-primary btn-block mt-16" data-action="address-open">${ICONS.plus} Add new address</button>`;
}

function openAddressModal(editId) {
  const cust = getCustomer(state.currentCustomerId) || {};
  const existing = editId ? (cust.addresses || []).find((a) => a.id === editId) : null;
  const isFirstEver = (cust.addresses || []).length === 0;
  openModal(`
    <div class="modal-head">
      <h3>${existing ? 'Edit address' : 'Add address'}</h3>
      <button class="icon-btn" data-action="close-modal">${ICONS.x}</button>
    </div>
    <div class="form-group"><label>Label</label>
      <input type="text" id="ad-label" placeholder="e.g. Home, Office" value="${existing ? escapeHtml(existing.label) : ''}" />
    </div>
    <div class="form-group"><label>Full address</label>
      <textarea id="ad-line" placeholder="Street, area, city" style="min-height:70px;">${existing ? escapeHtml(existing.line) : ''}</textarea>
    </div>
    <div class="form-group"><label>Phone for this address (optional)</label>
      <input type="tel" id="ad-phone" placeholder="080..." value="${existing ? escapeHtml(existing.phone || '') : ''}" />
    </div>
    <label class="radio-card ${(existing && existing.isDefault) || isFirstEver ? 'selected' : ''}" style="margin-bottom:12px;cursor:pointer;">
      <input type="checkbox" id="ad-default" ${(existing && existing.isDefault) || isFirstEver ? 'checked' : ''} ${isFirstEver ? 'disabled' : ''} />
      <span style="font-size:13.5px;">${isFirstEver ? 'Use as my default address' : 'Set as default address'}</span>
    </label>
    <div class="auth-error" id="ad-error"></div>
    <button class="btn btn-primary btn-block mt-12" data-action="address-save" data-id="${editId || ''}">${existing ? 'Save changes' : 'Add address'}</button>
  `);
}
function customerPaymentMethods() {
  const cust = getCustomer(state.currentCustomerId);
  const pref = cust ? (cust.preferredPaymentMethod || 'card') : 'card';
  const methods = [
    ['card', 'Bank card', 'Pay with any Nigerian or international card', ICONS.card],
    ['transfer', 'Bank transfer', 'Pay via your bank app — instant confirmation', ICONS.bank],
    ['wallet', 'PXDynasty wallet', 'Pay from your top-up balance (coming soon)', ICONS.wallet],
    ['cashless', 'Other cashless payment', 'USSD, QR, or other methods', ICONS.shield],
  ];
  return `${backBtn('Account')}
    <div class="page-head"><h1>Payment preference</h1><div class="sub">Your default at checkout</div></div>
    <div class="card" style="background:var(--color-surface-alt);">
      <p class="text-sm" style="margin:0;">${ICONS.shield} PXDynasty does not store your card details. You'll enter them securely at Paystack each time. This preference just sets your default.</p>
    </div>
    <div class="row-cards mt-12">
      ${methods.map(([val, label, desc, icon]) => `
        <div class="row-card pressable" style="cursor:pointer;${pref === val ? 'border-color:var(--color-primary);background:var(--color-primary-tint);' : ''}" data-action="set-payment-preference" data-method="${val}">
          <div class="flex items-center gap-10">
            ${icon}
            <div style="flex:1;">
              <div style="font-weight:700;font-size:14px;">${label}</div>
              <div class="text-sm text-muted">${desc}</div>
            </div>
            ${pref === val ? `<span class="status-badge status-success">Default</span>` : ''}
          </div>
        </div>
      `).join('')}
    </div>`;
}

function customerTerms() {
  return `${backBtn('Account')}
    <div class="page-head"><h1>Terms of service</h1></div>
    <div class="card"><div style="font-size:13.5px;line-height:1.7;color:var(--color-text-muted);">
      <p>PXDynasty is a local marketplace connecting customers, businesses, and delivery agents in Nigeria. By using this platform you agree to the following:</p>
      <p><strong style="color:var(--color-text);">1. Orders.</strong> When you place an order, you commit to paying the listed price. Orders are fulfilled by independent businesses. PXDynasty coordinates and processes payment.</p>
      <p><strong style="color:var(--color-text);">2. Delivery.</strong> Delivery is provided by independent agents. Timelines vary. PXDynasty facilitates but does not itself own delivery vehicles.</p>
      <p><strong style="color:var(--color-text);">3. Refunds.</strong> If an order is not delivered or is materially different from what was described, you may open a dispute within 24 hours. Refunds are processed via the original payment method.</p>
      <p><strong style="color:var(--color-text);">4. Conduct.</strong> Do not misuse the platform, harass other users, or attempt to circumvent payment.</p>
      <p><strong style="color:var(--color-text);">5. Changes.</strong> These terms may be updated. Continued use means acceptance.</p>
    </div></div>
  `;
}

function customerPrivacy() {
  return `${backBtn('Account')}
    <div class="page-head"><h1>Privacy policy</h1></div>
    <div class="card"><div style="font-size:13.5px;line-height:1.7;color:var(--color-text-muted);">
      <p>We take your privacy seriously.</p>
      <p><strong style="color:var(--color-text);">What we collect.</strong> Name, email, phone, delivery address, and order history. For payment, your card details are handled by Paystack — we never see or store them.</p>
      <p><strong style="color:var(--color-text);">How we use it.</strong> To fulfil orders, communicate about deliveries, and improve the platform. We don't sell your data.</p>
      <p><strong style="color:var(--color-text);">Who sees it.</strong> The business fulfilling your order sees your name, phone, and delivery address. The delivery agent sees the same to complete the delivery.</p>
      <p><strong style="color:var(--color-text);">Your rights.</strong> You can request a copy of your data or ask for it to be deleted by contacting support.</p>
    </div></div>
  `;
}

function openHelpModal() {
  openModal(`
    <div class="modal-head"><h3>Help & support</h3><button class="icon-btn" data-action="close-modal">${ICONS.x}</button></div>
    <p class="text-sm text-muted">Reach us for order issues, disputes, or questions.</p>
    <div class="row-cards mt-12" style="gap:8px;">
      <a class="row-card" href="https://wa.me/2349063200718" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        ${ICONS.phone}<div><div style="font-weight:700;font-size:14px;">WhatsApp</div><div class="text-sm text-muted">Fastest — usually within minutes</div></div>
      </a>
      <a class="row-card" href="mailto:hello@pxdynasty.com" style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        ${ICONS.receipt}<div><div style="font-weight:700;font-size:14px;">Email</div><div class="text-sm text-muted">hello@pxdynasty.com</div></div>
      </a>
    </div>
  `);
}

function notificationsView() {
  const refId = state.role === 'customer' ? state.currentCustomerId : state.role === 'business' ? state.currentBusinessId : state.role === 'agent' ? state.currentAgentId : null;
  const list = getNotifications(state.role, refId);
  DynastyllRead(state.role, refId);
  return `${backBtn('Back')}
    <div class="page-head"><h1>Notifications</h1></div>
    ${list.length ? `<div class="card">${list.map((n) => `
      <div class="notif-item">
        <div class="n-icon">${ICONS[n.icon] || ICONS.bell}</div>
        <div><div class="n-title">${escapeHtml(n.title)}</div><p class="text-sm text-muted" style="margin:2px 0 0;">${escapeHtml(n.body)}</p><div class="n-time">${timeAgo(n.time)}</div></div>
      </div>`).join('')}</div>` : emptyState('bell', 'No notifications yet', 'Updates about your orders will appear here.', null)}
  `;
}

/* ==========================================================================
   11. BUSINESS DASHBOARD VIEWS
   ========================================================================== */

const STAFF_ALLOWED_VIEWS = new Set([
  'biz-orders', 'biz-order-detail', 'biz-products', 'biz-add-product', 'notifications'
]);

function renderBusinessView() {
  const biz = getBusiness(state.currentBusinessId);
  if (!biz) return emptyState('store', 'No business', 'No business is currently signed in.', null);
  if (state.isStaff && !STAFF_ALLOWED_VIEWS.has(state.view)) {
    return emptyState('shield', 'Not available to staff', 'Ask the business owner for access to this section.', `<button class="btn btn-primary btn-sm" data-action="nav" data-view="biz-orders">Go to Orders</button>`);
  }
  switch (state.view) {
    case 'overview': return businessOverview(biz);
    case 'biz-orders': return businessOrders(biz);
    case 'biz-order-detail': return businessOrderDetail(state.params.orderId);
    case 'biz-products': return businessProducts(biz);
    case 'biz-add-product': return businessAddProduct(biz, state.params.editId);
    case 'biz-catalog': return businessCatalog(biz);
    case 'biz-customers': return businessCustomers(biz);
    case 'biz-promotions': return businessPromotions(biz);
    case 'biz-earnings': return businessEarnings(biz);
    case 'biz-analytics': return businessAnalytics(biz);
    case 'biz-store': return businessStoreProfile(biz);
    case 'biz-settings': return businessSettings(biz);
    case 'biz-team': return businessTeam(biz);
    case 'notifications': return notificationsView();
    default: return businessOverview(biz);
  }
}

function metricCard(label, value, delta) {
  return `<div class="metric-card"><div class="label">${label}</div><div class="value">${value}</div>${delta ? `<div class="delta up">${delta}</div>` : ''}</div>`;
}

function businessOverview(biz) {
  const orders = getOrders({ businessId: biz.id });
  const today = orders.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString());
  const pending = orders.filter((o) => ['placed', 'confirmed', 'preparing'].includes(o.status));
  const products = getProducts({ businessId: biz.id, includeAll: true });
  const pendingSettlement = orders.filter((o) => o.status === 'delivered' && !o.settled).reduce((s, o) => s + o.financial.businessReceives, 0);
  const availableBalance = DB.settlements.filter((s) => s.businessId === biz.id).reduce((s, st) => s + st.net, 0);
  return `
    <div class="page-head"><div><h1>Overview</h1><div class="sub">${escapeHtml(biz.name)}</div></div>
      <button class="btn btn-primary btn-sm" data-action="nav" data-view="biz-add-product">${ICONS.plus} Add product</button>
    </div>
    <div class="metric-grid">
      ${metricCard('Today\'s sales', formatNaira(today.reduce((s, o) => s + o.subtotal, 0)), today.length + ' orders today')}
      ${metricCard('Pending orders', pending.length, 'need action')}
      ${metricCard('Products', products.length, products.filter((p) => p.status === 'active').length + ' active')}
      ${metricCard('Available balance', formatNaira(availableBalance), 'withdrawable')}
    </div>
    <div class="grid-2 mt-16">
      <div>
        <div class="section-title-row" style="margin-top:0;"><h2>Recent orders</h2><span class="link" data-action="nav" data-view="biz-orders">See all</span></div>
        ${orders.length ? `<div class="row-cards">${orders.slice(0, 5).map((o) => businessOrderCardHtml(o)).join('')}</div>` : emptyState('orders', 'No orders yet', 'New orders from customers will appear here.', null)}
      </div>
      <div>
        <div class="section-title-row" style="margin-top:0;"><h2>Settlement</h2></div>
        <div class="card">
          <div class="summary-row"><span>Pending settlement</span><span class="val">${formatNaira(pendingSettlement)}</span></div>
          <div class="summary-row"><span>Available balance</span><span class="val">${formatNaira(availableBalance)}</span></div>
        </div>
      </div>
    </div>
  `;
}

const BIZ_ORDER_STATUS_STEPS = { placed: 'confirmed', confirmed: 'preparing', preparing: 'ready_for_pickup' };
const BIZ_ORDER_STATUS_ACTION_LABEL = { placed: 'Accept order', confirmed: 'Start preparing', preparing: 'Mark ready for pickup' };

function businessOrders(biz) {
  const filterStatus = state.params.status || 'all';
  let orders = getOrders({ businessId: biz.id });
  if (filterStatus !== 'all') orders = orders.filter((o) => o.status === filterStatus);
  return `
    <div class="page-head"><h1>Orders</h1></div>
    <div class="tab-bar">
      ${[['all', 'All'], ['placed', 'New'], ['confirmed', 'Accepted'], ['preparing', 'Preparing'], ['ready_for_pickup', 'Ready'], ['agent_assigned', 'With agent'], ['delivered', 'Completed'], ['cancelled', 'Cancelled']].map(([id, label]) => `<button class="${filterStatus === id ? 'active' : ''}" data-action="biz-orders-filter" data-status="${id}">${label}</button>`).join('')}
    </div>
    ${orders.length ? `<div class="row-cards">${orders.map((o) => businessOrderCardHtml(o, true)).join('')}</div>` : emptyState('orders', 'No orders here', 'Try a different filter.', null)}
  `;
}

function businessOrderCardHtml(o, withActions) {
  const cust = getCustomer(o.customerId) || { name: 'Customer' };
  const nextAction = BIZ_ORDER_STATUS_STEPS[o.status];
  return `<div class="row-card">
    <div class="row-card-top"><span class="row-card-title">${o.orderNumber}</span>${orderStatusBadge(o.status)}</div>
    <div class="row-card-sub">${escapeHtml(cust.name)} · ${o.items.length} item(s) · ${formatNaira(o.total)}</div>
    <div class="row-card-sub">${timeAgo(o.createdAt)}</div>
    <div class="row-card-actions">
      <button class="btn btn-outline btn-sm" data-action="nav" data-view="biz-order-detail" data-order-id="${o.id}">View</button>
      ${withActions && nextAction ? `<button class="btn btn-primary btn-sm" data-action="biz-advance-order" data-order-id="${o.id}" data-next="${nextAction}">${BIZ_ORDER_STATUS_ACTION_LABEL[o.status]}</button>` : ''}
      ${withActions && o.status === 'placed' ? `<button class="btn btn-danger btn-sm" data-action="biz-cancel-order" data-order-id="${o.id}">Cancel</button>` : ''}
    </div>
  </div>`;
}

function businessOrderDetail(orderId) {
  const order = getOrder(orderId);
  if (!order) return emptyState('errorCircle', 'Order not found', '', null);
  const cust = getCustomer(order.customerId) || { name: 'Customer' };
  const agent = order.agentId ? getAgent(order.agentId) : null;
  const nextAction = BIZ_ORDER_STATUS_STEPS[order.status];
  return `
    ${backBtn('Orders')}
    <div class="page-head"><div><h1>${order.orderNumber}</h1><div class="sub">${formatDate(order.createdAt)}</div></div>${orderStatusBadge(order.status)}</div>
    <div class="grid-2">
      <div>
        <div class="card"><strong style="font-size:13px;">Items</strong>
          <div class="mt-8">${order.items.map((it) => `<div class="summary-row"><span>${it.qty} × ${escapeHtml(it.name)}</span><span class="val">${formatNaira(it.price * it.qty)}</span></div>`).join('')}</div>
          <hr class="divider" />
          <div class="summary-row"><span>Subtotal</span><span class="val">${formatNaira(order.subtotal)}</span></div>
        </div>
        <div class="card mt-12">
          <strong style="font-size:13px;">Customer & delivery</strong>
          <p class="text-sm text-muted mt-8" style="margin-bottom:0;">${escapeHtml(cust.name)}${cust.phone ? ' · ' + escapeHtml(cust.phone) : ''}<br/>${escapeHtml(order.deliveryAddress)}</p>
          ${order.deliveryInstructions ? `<p class="text-sm text-faint mt-8" style="margin-bottom:0;">Instructions: ${escapeHtml(order.deliveryInstructions)}</p>` : ''}
          ${cust.phone ? `<div class="flex gap-8 mt-12">
            <a class="btn btn-outline btn-sm" href="tel:${escapeHtml(cust.phone)}">${ICONS.phone} Call customer</a>
          </div>` : ''}
        </div>
        ${agent ? `
          <div class="card mt-12">
            <strong style="font-size:13px;">Assigned agent</strong>
            <p class="text-sm text-muted mt-8" style="margin-bottom:0;">${escapeHtml(agent.name)} · ${agent.vehicle}${agent.operatingArea ? ' · ' + escapeHtml(agent.operatingArea) : ''}</p>
            ${agent.phone ? `<div class="flex gap-8 mt-12">
              <a class="btn btn-outline btn-sm" href="tel:${escapeHtml(agent.phone)}">${ICONS.phone} Call agent</a>
            </div>` : ''}
          </div>` : ''}
        <div class="card mt-12">
          <strong style="font-size:13px;">Payment</strong>
          <div class="summary-row"><span>Subtotal</span><span class="val">${formatNaira(order.subtotal)}</span></div>
          <div class="summary-row"><span>Delivery fee</span><span class="val">${formatNaira(order.deliveryFee)}</span></div>
          <div class="summary-row"><span>Platform fee</span><span class="val">${formatNaira(order.platformFee)}</span></div>
          <div class="summary-row total"><span>Customer paid</span><span>${formatNaira(order.total)}</span></div>
          <hr class="divider" />
          <div class="summary-row"><span>Platform commission</span><span class="val">−${formatNaira(order.financial.businessCommission)}</span></div>
          <div class="summary-row" style="font-weight:700;color:var(--color-text);"><span>You will receive</span><span>${formatNaira(order.financial.businessReceives)}</span></div>
        </div>
      </div>
      <div>
        <div class="card"><strong style="font-size:13px;">Timeline</strong>
          <div class="timeline mt-12">${order.statusHistory.map((h, i) => `<div class="timeline-step done"><div class="rail"><div class="node">${ICONS.check}</div>${i < order.statusHistory.length - 1 ? '<div class="line"></div>' : ''}</div><div class="content"><div class="t-title">${ORDER_FLOW_LABEL[h.status] || h.status}</div><div class="t-time">${formatDate(h.time)}</div></div></div>`).join('')}</div>
        </div>
        <div class="mt-12">${orderChatButton(order.id, 'Chat about this order')}</div>
        ${nextAction ? `<button class="btn btn-primary btn-block mt-12" data-action="biz-advance-order" data-order-id="${order.id}" data-next="${nextAction}">${BIZ_ORDER_STATUS_ACTION_LABEL[order.status]}</button>` : ''}
        ${order.status === 'agent_assigned' && !order.agentId ? `<button class="btn btn-outline btn-block mt-8" data-action="biz-request-agent" data-order-id="${order.id}">Request a delivery agent</button>` : ''}
        ${order.status !== 'cancelled' && order.status !== 'delivered' ? `<button class="btn btn-danger btn-block mt-8" data-action="biz-cancel-order" data-order-id="${order.id}">Cancel order</button>` : ''}
      </div>
    </div>
  `;
}

const PRODUCT_STATUS_LABEL = { active: 'Active', out_of_stock: 'Out of stock', draft: 'Draft', hidden: 'Hidden', pending: 'Pending approval' };
const PRODUCT_STATUS_CLASS = { active: 'status-success', out_of_stock: 'status-error', draft: 'status-neutral', hidden: 'status-neutral', pending: 'status-warn' };

function businessProducts(biz) {
  const filterStatus = state.params.status || 'all';
  let products = getProducts({ businessId: biz.id, includeAll: true });
  if (filterStatus !== 'all') products = products.filter((p) => p.status === filterStatus);
  return `
    <div class="page-head"><h1>Products</h1><button class="btn btn-primary btn-sm" data-action="nav" data-view="biz-add-product">${ICONS.plus} Add product</button></div>
    <div class="tab-bar">
      ${['all', 'active', 'out_of_stock', 'draft', 'pending', 'hidden'].map((s) => `<button class="${filterStatus === s ? 'active' : ''}" data-action="biz-products-filter" data-status="${s}">${s === 'all' ? 'All' : PRODUCT_STATUS_LABEL[s]}</button>`).join('')}
    </div>
    ${products.length ? `<div class="row-cards mobile-only-cards">
      ${products.map((p) => `<div class="row-card">
        <div class="flex gap-10">
          <div class="thumb-sm" style="overflow:hidden;">${placeholderThumb(p.hue, p.emoji)}</div>
          <div style="flex:1;">
            <div class="row-card-top" style="margin-bottom:0;"><span class="row-card-title">${escapeHtml(p.name)}</span><span class="status-badge ${PRODUCT_STATUS_CLASS[p.status]}">${PRODUCT_STATUS_LABEL[p.status]}</span></div>
            <div class="row-card-sub">${formatNaira(p.discountPrice || p.price)} · Stock: ${p.stock} · ${p.sales || 0} sold</div>
          </div>
        </div>
        <div class="row-card-actions">
          <button class="btn btn-outline btn-sm" data-action="nav" data-view="biz-add-product" data-edit-id="${p.id}">Edit</button>
          <button class="btn btn-danger btn-sm" data-action="biz-delete-product" data-id="${p.id}">Delete</button>
        </div>
      </div>`).join('')}
    </div>` : emptyState('box', 'No products', 'Add your first product to start selling.', `<button class="btn btn-primary btn-sm" data-action="nav" data-view="biz-add-product">Add product</button>`)}
  `;
}

function businessAddProduct(biz, editId) {
  const editing = editId ? getProduct(editId) : null;
  return `
    ${backBtn('Products')}
    <div class="page-head"><h1>${editing ? 'Edit product' : 'Add product'}</h1></div>
    <div class="card">
      <div class="form-group"><label>Product image</label>
        <div class="image-upload-box" id="pf-image-box" style="cursor:pointer;position:relative;overflow:hidden;">
          ${editing && editing.imageUrl
            ? `<img src="${escapeHtml(editing.imageUrl)}" alt="" style="max-height:180px;margin:0 auto;border-radius:var(--radius-sm);" />`
            : `${ICONS.box}<div>Tap to choose a photo from your device</div>`}
          <input type="file" id="pf-image" accept="image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;" />
        </div>
        <div class="hint" id="pf-image-status"></div>
      </div>
      <div class="form-group"><label>Product name</label><input type="text" id="pf-name" value="${editing ? escapeHtml(editing.name) : ''}" placeholder="e.g. Fresh Tomatoes (Basket)" /></div>
      <div class="form-row">
        <div class="form-group"><label>Category</label>
          <select id="pf-category">${CATEGORIES.map((c) => `<option value="${c.id}" ${editing && editing.category === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label>SKU</label><input type="text" id="pf-sku" value="${editing ? escapeHtml(editing.sku) : 'SKU-' + Math.floor(1000 + Math.random() * 8999)}" /></div>
      </div>
      <div class="form-group"><label>Description</label><textarea id="pf-desc" placeholder="Describe your product">${editing ? escapeHtml(editing.description) : ''}</textarea></div>
      <div class="form-row">
        <div class="form-group"><label>Price (₦)</label><input type="number" id="pf-price" value="${editing ? editing.price : ''}" placeholder="0" /></div>
        <div class="form-group"><label>Discount price (₦, optional)</label><input type="number" id="pf-discount" value="${editing && editing.discountPrice ? editing.discountPrice : ''}" placeholder="0" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Stock quantity</label><input type="number" id="pf-stock" value="${editing ? editing.stock : ''}" placeholder="0" /></div>
        <div class="form-group"><label>Status</label>
          <select id="pf-status">${['draft', 'active', 'hidden'].map((s) => `<option value="${s}" ${editing && editing.status === s ? 'selected' : ''}>${PRODUCT_STATUS_LABEL[s]}</option>`).join('')}</select>
        </div>
      </div>
    </div>
    <div class="sticky-bottom-bar">
      <button class="btn btn-outline btn-block" data-action="back">Cancel</button>
      <button class="btn btn-primary btn-block" data-action="save-product" data-edit-id="${editId || ''}">${editing ? 'Save changes' : 'Add product'}</button>
    </div>
  `;
}

function businessCatalog(biz) {
  const products = getProducts({ businessId: biz.id, includeAll: true });
  const byCat = {};
  products.forEach((p) => { (byCat[p.category] = byCat[p.category] || []).push(p); });
  return `
    <div class="page-head"><h1>Catalog</h1></div>
    <div class="section-title-row" style="margin-top:0;"><h2>Categories</h2></div>
    ${Object.keys(byCat).length ? `<div class="row-cards">${Object.keys(byCat).map((cat) => `<div class="row-card flex items-center justify-between"><div class="flex items-center gap-10"><span style="font-size:20px;">${categoryEmoji(cat)}</span><span style="font-weight:700;">${(CATEGORIES.find((c) => c.id === cat) || {}).name}</span></div><span class="text-muted text-sm">${byCat[cat].length} products</span></div>`).join('')}</div>` : emptyState('grid', 'No catalog yet', 'Add products to see them organized by category.', null)}
  `;
}

function businessCustomers(biz) {
  const orders = getOrders({ businessId: biz.id });
  const byCustomer = {};
  orders.forEach((o) => { (byCustomer[o.customerId] = byCustomer[o.customerId] || []).push(o); });
  const rows = Object.keys(byCustomer).map((cid) => {
    const c = getCustomer(cid) || { name: 'Customer' };
    const ords = byCustomer[cid];
    return { c, count: ords.length, total: ords.reduce((s, o) => s + o.total, 0) };
  }).sort((a, b) => b.total - a.total);
  return `
    <div class="page-head"><h1>Customers</h1><div class="sub">${rows.length} customers have ordered from your store</div></div>
    ${rows.length ? `<div class="row-cards">${rows.map((r) => `<div class="row-card flex items-center justify-between"><div><div style="font-weight:700;font-size:13.5px;">${escapeHtml(r.c.name)}</div><div class="text-sm text-muted">${escapeHtml(r.c.phone || '')}</div></div><div class="text-right"><div style="font-weight:700;">${formatNaira(r.total)}</div><div class="text-sm text-muted">${r.count} orders</div></div></div>`).join('')}</div>` : emptyState('users', 'No customers yet', 'Customers who order from you will show up here.', null)}
  `;
}

function businessPromotions(biz) {
  return `
    <div class="page-head"><h1>Promotions</h1></div>
    ${emptyState('flag', 'No promotions', 'Create discounts and offers for your customers — coming soon.', null)}
  `;
}

function businessEarnings(biz) {
  const orders = getOrders({ businessId: biz.id, status: 'delivered' });
  const grossSales = orders.reduce((s, o) => s + o.subtotal, 0);
  const commission = orders.reduce((s, o) => s + o.financial.businessCommission, 0);
  const net = grossSales - commission;
  const pendingOrders = orders.filter((o) => !o.settled);
  const pendingSettlement = pendingOrders.reduce((s, o) => s + o.financial.businessReceives, 0);
  const settlements = DB.settlements.filter((s) => s.businessId === biz.id);
  const availableBalance = settlements.reduce((s, st) => s + st.net, 0);
  return `
    <div class="page-head"><h1>Earnings</h1></div>
    <div class="metric-grid">
      ${metricCard('Gross sales', formatNaira(grossSales), orders.length + ' orders')}
      ${metricCard('Platform commission', '-' + formatNaira(commission), '')}
      ${metricCard('Net earnings', formatNaira(net), '')}
      ${metricCard('Available balance', formatNaira(availableBalance), '')}
    </div>
    <div class="card mt-16">
      <div class="flex items-center justify-between">
        <div><strong style="font-size:14px;">Pending settlement</strong><div class="text-sm text-muted">${pendingOrders.length} delivered order(s) awaiting payout</div></div>
        <div style="font-weight:800;font-size:18px;">${formatNaira(pendingSettlement)}</div>
      </div>
      ${pendingOrders.length ? `<button class="btn btn-primary btn-block mt-12" data-action="biz-request-settlement">Request settlement</button>` : ''}
    </div>
    <div class="section-title-row"><h2>Settlement history</h2></div>
    ${settlements.length ? `<div class="row-cards">${settlements.map((s) => `<div class="row-card flex items-center justify-between"><div><div style="font-weight:700;font-size:13.5px;">${formatDate(s.date)}</div><div class="text-sm text-muted">Gross ${formatNaira(s.grossSales)} · Commission -${formatNaira(s.commission)}</div></div><div class="text-right"><div style="font-weight:800;">${formatNaira(s.net)}</div><span class="status-badge status-success">Paid</span></div></div>`).join('')}</div>` : emptyState('wallet', 'No settlements yet', 'Your settlement history will appear here after your first payout.', null)}
  `;
}

function businessAnalytics(biz) {
  const orders = getOrders({ businessId: biz.id });
  const products = getProducts({ businessId: biz.id, includeAll: true });
  const best = products.slice().sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 5);
  return `
    <div class="page-head"><h1>Analytics</h1></div>
    <div class="metric-grid">
      ${metricCard('Orders', orders.length, '')}
      ${metricCard('Avg order value', formatNaira(orders.length ? orders.reduce((s, o) => s + o.total, 0) / orders.length : 0), '')}
      ${metricCard('Customers', new Set(orders.map((o) => o.customerId)).size, '')}
      ${metricCard('Products', products.length, '')}
    </div>
    <div class="section-title-row"><h2>Best-selling products</h2></div>
    ${best.length ? `<div class="row-cards">${best.map((p) => `<div class="row-card flex items-center justify-between"><span style="font-weight:700;font-size:13.5px;">${escapeHtml(p.name)}</span><span class="text-muted text-sm">${p.sales || 0} sold</span></div>`).join('')}</div>` : emptyState('chart', 'No data yet', 'Sales analytics will appear here once orders start coming in.', null)}
  `;
}

function businessStoreProfile(biz) {
  return `
    <div class="page-head"><h1>Store profile</h1></div>
    <div class="card">
      <div class="form-group"><label>Store name</label><input type="text" value="${escapeHtml(biz.name)}" /></div>
      <div class="form-group"><label>Owner</label><input type="text" value="${escapeHtml(biz.ownerName || '')}" /></div>
      <div class="form-row"><div class="form-group"><label>Phone</label><input type="text" value="${escapeHtml(biz.phone || '')}" /></div><div class="form-group"><label>Email</label><input type="email" value="${escapeHtml(biz.email || '')}" /></div></div>
      <div class="form-group"><label>Address</label><input type="text" value="${escapeHtml(biz.address || '')}" /></div>
      <div class="form-group mb-0 flex items-center justify-between" style="flex-direction:row;">
        <label class="mb-0">Store is currently accepting orders</label>
        <input type="checkbox" ${biz.open ? 'checked' : ''} style="width:20px;height:20px;" data-action="toggle-store-open" />
      </div>
    </div>
    <button class="btn btn-primary btn-block mt-16" data-action="toast-success" data-msg="Store profile updated">Save changes</button>
  `;
}

function businessSettings(biz) {
  return `
    <div class="page-head"><h1>Settings</h1></div>
    <div class="card">
      <strong style="font-size:13px;">Bank / settlement information</strong>
      <div class="form-row mt-12"><div class="form-group"><label>Bank name</label><input type="text" value="" /></div><div class="form-group"><label>Account number</label><input type="text" value="" /></div></div>
      <div class="form-group mb-0"><label>Account name</label><input type="text" value="" /></div>
    </div>
    <button class="btn btn-primary btn-block mt-16" data-action="toast-success" data-msg="Settings saved">Save settings</button>
  `;
}

/* ==========================================================================
   12. DELIVERY AGENT VIEWS
   ========================================================================== */

function renderAgentView() {
  const agent = getAgent(state.currentAgentId);
  if (!agent) return emptyState('bike', 'No agent signed in', 'Register a delivery agent to get started.', null);
  switch (state.view) {
    case 'jobs': return agentJobs(agent);
    case 'active-delivery': return agentActiveDelivery(agent);
    case 'agent-earnings': return agentEarnings(agent);
    case 'agent-history': return agentHistory(agent);
    case 'agent-profile': return agentProfile(agent);
    case 'notifications': return notificationsView();
    default: return agentJobs(agent);
  }
}

function distanceForOrder(order) { return (1.5 + ((order.orderNumber.slice(-2) * 1) % 9)).toFixed(1); }

function agentJobs(agent) {
  const availableOrders = getOrders({ status: ['ready_for_pickup', 'preparing'] })
    .filter((o) => !o.agentId)
    .slice(0, 12);
  const isOffline = agent.status === 'offline';
  const todayStr = new Date().toDateString();
  const myOrders = getOrders({ agentId: agent.id });
  const todaysDone = myOrders.filter((o) => o.status === 'delivered' && new Date(o.createdAt).toDateString() === todayStr).length;
  const pendingMine = myOrders.filter((o) => ['agent_assigned', 'picked_up', 'out_for_delivery'].includes(o.status)).length;
  const statusColor = isOffline ? 'var(--color-text-muted)' : 'var(--color-success)';
  const statusLabel = isOffline ? 'Offline — not receiving jobs' : 'Online — receiving jobs';
  return `
    <div class="page-head"><div><h1>Delivery jobs</h1><div class="sub">${escapeHtml(agent.name)} · ${agent.vehicle}</div></div>
      <button class="chip ${agent.status === 'online' ? 'on' : ''}" data-action="toggle-agent-status">${isOffline ? 'Go online' : 'Go offline'}</button>
    </div>

    <div class="card" style="display:flex;align-items:center;gap:10px;padding:12px 14px;">
      <span style="width:10px;height:10px;border-radius:50%;background:${statusColor};flex-shrink:0;"></span>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:13.5px;">${statusLabel}</div>
        <div class="text-sm text-muted">${escapeHtml(agent.operatingArea || 'No operating area set')}</div>
      </div>
    </div>

    <div class="metric-grid mt-12">
      ${metricCard('Delivered today', todaysDone, 'completed')}
      ${metricCard('Pending', pendingMine, 'in progress')}
      ${metricCard('Lifetime completed', agent.completedDeliveries || 0, '')}
      ${metricCard('Today\'s earnings', formatNaira(agent.earningsToday || 0), '')}
    </div>

    ${isOffline ? emptyState('bike', 'You are offline', 'Go online to start receiving delivery job offers.', `<button class="btn btn-primary btn-sm" data-action="toggle-agent-status">Go online</button>`) : `
    <div class="section-title-row" style="margin-top:20px;"><h2>Available jobs${availableOrders.length ? ' · ' + availableOrders.length : ''}</h2></div>
    ${availableOrders.length ? `<div class="row-cards">${availableOrders.map((o) => agentJobCardHtml(o)).join('')}</div>` : emptyState('box', 'No jobs available right now', 'New delivery jobs appear here as businesses prepare orders. Pull to refresh in a moment.', null)}
    `}
  `;
}

function agentJobCardHtml(o) {
  const biz = getBusiness(o.businessId) || { name: 'Business', address: '' };
  const dist = distanceForOrder(o);
  return `<div class="row-card">
    <div class="row-card-top"><span class="row-card-title">${o.orderNumber}</span><span class="status-badge status-accent">${formatNaira(o.financial.agentPayment)}</span></div>
    <div class="row-card-sub">${ICONS.store} Pickup: ${escapeHtml(biz.name)}, ${escapeHtml(biz.address)}</div>
    <div class="row-card-sub">${ICONS.location} Drop-off: ${escapeHtml(o.deliveryAddress).slice(0, 40)}...</div>
    <div class="row-card-sub">${dist} km · Est. ${Math.round(dist * 6 + 10)} min · ${o.items.length} item(s)</div>
    <div class="row-card-actions">
      <button class="btn btn-outline btn-sm" data-action="agent-reject-job" data-order-id="${o.id}">Reject</button>
      <button class="btn btn-primary btn-sm" data-action="agent-accept-job" data-order-id="${o.id}">Accept delivery</button>
    </div>
  </div>`;
}

function agentActiveDelivery(agent) {
  const active = getOrders({ agentId: agent.id, status: ['agent_assigned', 'picked_up', 'out_for_delivery'] })[0];
  if (!active) return emptyState('truck', 'No active delivery', 'Accept a job from the Jobs tab to get started.', `<button class="btn btn-primary btn-sm" data-action="nav" data-view="jobs">View jobs</button>`);
  const biz = getBusiness(active.businessId) || { name: 'Business', address: '', phone: '' };
  const cust = getCustomer(active.customerId) || { name: 'Customer', phone: '' };
  const stage = active.status;
  const elapsed = (() => {
    const mins = Math.max(0, Math.floor((Date.now() - new Date(active.createdAt).getTime()) / 60000));
    if (mins < 60) return mins + ' min';
    const h = Math.floor(mins / 60); const m = mins % 60;
    return h + 'h ' + m + 'm';
  })();
  const stageLabel = stage === 'agent_assigned' ? 'Pickup pending'
    : stage === 'picked_up' ? 'On the way to customer'
    : 'Out for delivery';
  return `
    <div class="page-head">
      <div><h1>Active delivery</h1><div class="sub">${escapeHtml(stageLabel)} · ${elapsed} elapsed</div></div>
      <span class="status-badge status-accent">${formatNaira(active.financial.agentPayment)}</span>
    </div>

    <div class="card">
      <div class="flex items-center justify-between"><strong>${active.orderNumber}</strong>${orderStatusBadge(active.status)}</div>
      <hr class="divider" />
      <div class="flex items-start gap-10"><div style="color:var(--color-primary);">${ICONS.store}</div>
        <div style="flex:1;">
          <div class="text-sm text-faint" style="text-transform:uppercase;letter-spacing:.05em;font-weight:700;">Pickup from</div>
          <strong style="font-size:14px;">${escapeHtml(biz.name)}</strong>
          <div class="text-sm text-muted">${escapeHtml(biz.address || 'No address on file')}</div>
          ${biz.phone ? `<div class="text-sm text-muted">${escapeHtml(biz.phone)}</div>` : ''}
        </div>
      </div>
      <div class="flex items-start gap-10 mt-12"><div style="color:var(--color-accent-dark);">${ICONS.location}</div>
        <div style="flex:1;">
          <div class="text-sm text-faint" style="text-transform:uppercase;letter-spacing:.05em;font-weight:700;">Deliver to</div>
          <strong style="font-size:14px;">${escapeHtml(cust.name)}</strong>
          ${cust.phone ? `<div class="text-sm text-muted">${escapeHtml(cust.phone)}</div>` : ''}
          <div class="text-sm text-muted">${escapeHtml(active.deliveryAddress)}</div>
        </div>
      </div>
      ${active.deliveryInstructions ? `<p class="text-sm text-faint mt-12" style="margin-bottom:0;padding:8px 10px;background:var(--color-surface-alt);border-radius:8px;">Note from customer: ${escapeHtml(active.deliveryInstructions)}</p>` : ''}
    </div>

    <div class="card mt-12">
      <div class="flex items-center justify-between"><strong style="font-size:13px;">Items to pick up</strong><span class="text-sm text-muted">${active.items.length} item${active.items.length === 1 ? '' : 's'}</span></div>
      <div class="mt-8">${active.items.map((it) => `<div class="summary-row"><span>${it.qty} × ${escapeHtml(it.name)}</span></div>`).join('')}</div>
    </div>

    <div class="card mt-12" style="background:var(--color-primary-tint);border-color:var(--color-primary);">
      <div class="flex items-center justify-between">
        <span class="text-sm" style="color:var(--color-primary-dark);font-weight:700;">You will earn</span>
        <strong style="font-size:20px;color:var(--color-primary-dark);">${formatNaira(active.financial.agentPayment)}</strong>
      </div>
      <p class="text-sm mt-8" style="margin-bottom:0;color:var(--color-primary-dark);">Paid out to your account after the customer confirms delivery.</p>
    </div>

    <div class="flex gap-10 mt-12">
      ${biz.phone ? `<a class="btn btn-outline btn-block" href="tel:${escapeHtml(biz.phone)}">${ICONS.phone} Call business</a>` : ''}
      ${cust.phone ? `<a class="btn btn-outline btn-block" href="tel:${escapeHtml(cust.phone)}">${ICONS.phone} Call customer</a>` : ''}
    </div>

    <div class="map-placeholder mt-12">${ICONS.navArrow}<span style="margin-left:6px;">Navigation preview</span></div>

    ${stage === 'out_for_delivery' ? `
      <div class="card mt-12" style="background:var(--color-accent-tint);border-color:var(--color-accent);">
        <strong style="font-size:13px;color:var(--color-accent-dark);">Waiting for customer confirmation</strong>
        <p class="text-sm mt-8" style="margin-bottom:0;color:var(--color-accent-dark);">The customer confirms receipt from their own app once you hand over the order. You'll see the order complete automatically.</p>
      </div>
    ` : ''}

    <div class="mt-12">${orderChatButton(active.id, 'Message customer / business')}</div>

    <div class="sticky-bottom-bar">
      ${stage === 'agent_assigned' ? `<button class="btn btn-primary btn-block" data-action="agent-confirm-pickup" data-order-id="${active.id}">Confirm pickup from business</button>` : ''}
      ${stage === 'picked_up' ? `<button class="btn btn-primary btn-block" data-action="agent-start-transit" data-order-id="${active.id}">Start delivery to customer</button>` : ''}
      ${stage === 'out_for_delivery' ? `<button class="btn btn-outline btn-block" data-action="agent-force-delivered" data-order-id="${active.id}">Customer not available — mark delivered</button>` : ''}
    </div>
  `;
}

function agentEarnings(agent) {
  const history = getOrders({ agentId: agent.id, status: 'delivered' });
  const lifetime = history.reduce((s, o) => s + (o.financial.agentPayment || 0), 0);
  const avg = history.length ? Math.round(lifetime / history.length) : 0;

  // 7-day chart data
  const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d; });
  const perDay = days.map((d) => {
    const dayStr = d.toDateString();
    return history.filter((o) => new Date(o.createdAt).toDateString() === dayStr)
                  .reduce((s, o) => s + (o.financial.agentPayment || 0), 0);
  });
  const maxDay = Math.max(...perDay, 1);

  return `
    <div class="page-head"><h1>Earnings</h1></div>

    <div class="card" style="background:linear-gradient(120deg,var(--color-primary-dark) 0%,var(--color-primary) 100%);color:#fff;border:none;">
      <div class="text-sm" style="opacity:.85;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">Available balance</div>
      <div style="font-family:var(--font-display);font-size:34px;font-weight:700;margin:6px 0 4px;">${formatNaira(agent.earningsPending || 0)}</div>
      <div class="text-sm" style="opacity:.85;">Pending payout to your bank account</div>
    </div>

    <div class="metric-grid mt-12">
      ${metricCard('Today', formatNaira(agent.earningsToday || 0), '')}
      ${metricCard('This week', formatNaira(agent.earningsWeek || 0), '')}
      ${metricCard('Lifetime', formatNaira(lifetime), '')}
      ${metricCard('Paid out', formatNaira(agent.earningsPaid || 0), '')}
    </div>

    <div class="card mt-12">
      <strong style="font-size:13px;">Last 7 days</strong>
      <div class="bar-chart" style="margin-top:14px;">
        ${perDay.map((v, i) => `<div class="bar-col">
          <div class="bar" style="height:${Math.max(4, (v / maxDay) * 110)}px;"></div>
          <span class="lbl">${days[i].toLocaleDateString('en-NG', { weekday: 'short' })}</span>
        </div>`).join('')}
      </div>
      <p class="text-sm text-muted mt-12" style="margin-bottom:0;">Avg per delivery: <strong style="color:var(--color-text);">${formatNaira(avg)}</strong></p>
    </div>

    <div class="section-title-row"><h2>Delivery history</h2><span class="text-sm text-muted">${history.length} total</span></div>
    ${history.length ? `<div class="row-cards">${history.slice(0, 15).map((o) => {
      const b = getBusiness(o.businessId) || {};
      return `<div class="row-card">
        <div class="row-card-top">
          <span class="row-card-title">${o.orderNumber}</span>
          <span style="font-weight:800;color:var(--color-success);">+${formatNaira(o.financial.agentPayment)}</span>
        </div>
        <div class="row-card-sub">${escapeHtml(b.name || '')}</div>
        <div class="row-card-sub">${formatDate(o.createdAt)}</div>
      </div>`;
    }).join('')}</div>` : emptyState('wallet', 'No earnings yet', 'Completed deliveries will appear here.', null)}
  `;
}

function agentHistory(agent) {
  const all = getOrders({ agentId: agent.id });
  return `
    <div class="page-head"><h1>Delivery history</h1></div>
    ${all.length ? `<div class="row-cards">${all.map((o) => `<div class="row-card">
      <div class="row-card-top"><span class="row-card-title">${o.orderNumber}</span>${orderStatusBadge(o.status)}</div>
      <div class="row-card-sub">${escapeHtml((getBusiness(o.businessId) || {}).name || '')} → ${escapeHtml(o.deliveryAddress).slice(0, 34)}...</div>
      <div class="row-card-sub">${formatDate(o.createdAt)} · Earning: ${formatNaira(o.financial.agentPayment)}</div>
    </div>`).join('')}</div>` : emptyState('orders', 'No delivery history yet', 'Your completed deliveries will show up here.', null)}
  `;
}

function agentProfile(agent) {
  const lifetimeOrders = getOrders({ agentId: agent.id, status: 'delivered' });
  const lifetimeEarned = lifetimeOrders.reduce((s, o) => s + (o.financial.agentPayment || 0), 0);
  const memberSince = agent.createdAt ? new Date(agent.createdAt).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' }) : '—';
  const auth = window.PXDynastyAuth && window.PXDynastyAuth.currentUserSync && window.PXDynastyAuth.currentUserSync();
  return `
    <div class="page-head"><h1>Profile</h1></div>

    <div class="card" style="text-align:center;padding:22px 16px;">
      <div style="width:72px;height:72px;border-radius:50%;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:700;font-size:26px;margin:0 auto 12px;">${initials(agent.name)}</div>
      <strong style="font-size:18px;">${escapeHtml(agent.name)}</strong>
      ${agent.verified ? `<div class="flex items-center gap-6 mt-8" style="justify-content:center;color:var(--color-primary);font-weight:700;font-size:13px;">${ICONS.verified} Verified agent</div>` : `<div class="text-sm text-muted mt-8">Verification pending</div>`}
      <div class="text-sm text-muted mt-8">Member since ${memberSince}</div>
    </div>

    <div class="metric-grid mt-12">
      ${metricCard('Completed', agent.completedDeliveries || 0, 'deliveries')}
      ${metricCard('Rating', (agent.rating && agent.rating !== '—') ? '⭐ ' + agent.rating : 'No ratings yet', '')}
      ${metricCard('Lifetime earned', formatNaira(lifetimeEarned), '')}
      ${metricCard('Pending payout', formatNaira(agent.earningsPending || 0), '')}
    </div>

    <div class="card mt-12">
      <strong style="font-size:13px;">Details</strong>
      <div class="summary-row mt-8"><span>Phone</span><span class="val">${escapeHtml(agent.phone || 'Not set')}</span></div>
      <div class="summary-row"><span>Vehicle</span><span class="val">${escapeHtml(agent.vehicle || '—')}</span></div>
      <div class="summary-row"><span>Operating area</span><span class="val">${escapeHtml(agent.operatingArea || 'Not set')}</span></div>
      <div class="summary-row"><span>Status</span><span class="val" style="text-transform:capitalize;">${escapeHtml(agent.status || 'offline')}</span></div>
      ${auth ? `<div class="summary-row"><span>Login email</span><span class="val" style="font-size:12.5px;">${escapeHtml(auth.email)}</span></div>` : ''}
    </div>

    <div class="card mt-12" style="padding:0;">
      <div class="flex items-center justify-between pressable" style="padding:14px 16px;border-bottom:1px solid var(--color-border);cursor:pointer;" data-action="contact-support">
        <div class="flex items-center gap-10">${ICONS.phone}<span style="font-weight:600;font-size:14px;">Contact support</span></div>
        ${ICONS.chevronRight}
      </div>
      <div class="flex items-center justify-between pressable" style="padding:14px 16px;cursor:pointer;" data-action="nav" data-view="agent-earnings">
        <div class="flex items-center gap-10">${ICONS.wallet}<span style="font-weight:600;font-size:14px;">View earnings</span></div>
        ${ICONS.chevronRight}
      </div>
    </div>

    <button class="btn btn-outline btn-block mt-16" style="color:var(--color-error);border-color:var(--color-error);" data-action="do-logout">
      ${ICONS.logout} Log out
    </button>
  `;
}

/* ==========================================================================
   13. ADMIN DASHBOARD VIEWS
   ========================================================================== */

function renderAdminView() {
  switch (state.view) {
    case 'dashboard': return adminDashboard();
    case 'admin-businesses': return adminBusinesses();
    case 'admin-business-detail': return adminBusinessDetail(state.params.id);
    case 'admin-business-new': return adminBusinessNew();
    case 'admin-business-edit': return adminBusinessEdit(state.params.id);
    case 'admin-agent-new': return adminAgentNew();
    case 'admin-customers': return adminCustomers();
    case 'admin-products': return adminProducts();
    case 'admin-orders': return adminOrders();
    case 'admin-order-detail': return adminOrderDetail(state.params.orderId);
    case 'admin-agents': return adminAgents();
    case 'admin-agent-detail': return adminAgentDetail(state.params.id);
    case 'admin-agent-edit': return adminAgentEdit(state.params.id);
    case 'admin-payments': return adminPayments();
    case 'admin-settlements': return adminSettlements();
    case 'admin-commissions': return adminCommissions();
    case 'admin-zones': return adminZones();
    case 'admin-disputes': return adminDisputes();
    case 'admin-reports': return adminReports();
    case 'admin-settings': return adminSettingsView();
    case 'notifications': return notificationsView();
    default: return adminDashboard();
  }
}

function adminDashboard() {
  const orders = getOrders({});
  const today = orders.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString());
  const gmv = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.subtotal, 0);
  const platformRevenue = orders.filter((o) => o.status === 'delivered').reduce((s, o) => s + o.financial.platformGrossRevenue, 0);
  const active = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status));
  const completed = orders.filter((o) => o.status === 'delivered');
  const cancelled = orders.filter((o) => o.status === 'cancelled');
  const pendingSettlements = orders.filter((o) => o.status === 'delivered' && !o.settled).length;
  return `
    <div class="page-head"><div><h1>Dashboard</h1><div class="sub">Platform-wide performance</div></div></div>
    <div class="metric-grid">
      ${metricCard('Total GMV', formatNaira(gmv), orders.length + ' orders')}
      ${metricCard('Platform revenue', formatNaira(platformRevenue), 'net of payouts')}
      ${metricCard('Today\'s orders', today.length, '')}
      ${metricCard('Active orders', active.length, '')}
    </div>
    <div class="metric-grid mt-12">
      ${metricCard('Completed orders', completed.length, '')}
      ${metricCard('Cancelled orders', cancelled.length, '')}
      ${metricCard('Active businesses', getBusinesses({ status: 'active' }).length, '')}
      ${metricCard('Active agents', DB.agents.filter((a) => a.status !== 'offline').length, '')}
    </div>
    <div class="section-title-row"><h2>Needs attention</h2></div>
    <div class="row-cards">
      <div class="row-card flex items-center justify-between"><span class="text-sm">Pending business approvals</span><span class="status-badge status-warn">${getBusinesses({ status: 'pending' }).length}</span></div>
      <div class="row-card flex items-center justify-between"><span class="text-sm">Pending settlements</span><span class="status-badge status-warn">${pendingSettlements}</span></div>
    </div>

    <div class="section-title-row"><h2>Quick actions</h2></div>
    <div class="row-cards">
      <div class="row-card pressable" style="cursor:pointer;" data-action="nav" data-view="admin-business-new">
        <div class="flex items-center gap-10">
          <div class="logo-sq" style="width:40px;height:40px;font-size:14px;">${ICONS.store}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;">Create a business</div>
            <div class="text-sm text-muted">Provision a new seller account with login</div>
          </div>
          ${ICONS.chevronRight}
        </div>
      </div>
      <div class="row-card pressable" style="cursor:pointer;" data-action="nav" data-view="admin-agent-new">
        <div class="flex items-center gap-10">
          <div class="logo-sq" style="width:40px;height:40px;font-size:14px;">${ICONS.bike}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;">Create a delivery agent</div>
            <div class="text-sm text-muted">Provision a new rider account with login</div>
          </div>
          ${ICONS.chevronRight}
        </div>
      </div>
      <div class="row-card pressable" style="cursor:pointer;" data-action="nav" data-view="admin-businesses">
        <div class="flex items-center gap-10">
          <div class="logo-sq" style="width:40px;height:40px;font-size:14px;">${ICONS.users}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;">All businesses</div>
            <div class="text-sm text-muted">View, approve, suspend</div>
          </div>
          ${ICONS.chevronRight}
        </div>
      </div>
      <div class="row-card pressable" style="cursor:pointer;" data-action="nav" data-view="admin-orders">
        <div class="flex items-center gap-10">
          <div class="logo-sq" style="width:40px;height:40px;font-size:14px;">${ICONS.orders}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;">All orders</div>
            <div class="text-sm text-muted">Track and manage every order</div>
          </div>
          ${ICONS.chevronRight}
        </div>
      </div>
      <div class="row-card pressable" style="cursor:pointer;" data-action="nav" data-view="admin-agents">
        <div class="flex items-center gap-10">
          <div class="logo-sq" style="width:40px;height:40px;font-size:14px;">${ICONS.bike}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;">All delivery agents</div>
            <div class="text-sm text-muted">Manage your fleet</div>
          </div>
          ${ICONS.chevronRight}
        </div>
      </div>
    </div>
  `;
}

function adminOrderCardHtml(o) {
  return `<div class="row-card">
    <div class="row-card-top"><span class="row-card-title">${o.orderNumber}</span>${orderStatusBadge(o.status)}</div>
    <div class="row-card-sub">${escapeHtml((getCustomer(o.customerId) || {}).name || '')} → ${escapeHtml((getBusiness(o.businessId) || {}).name || '')}</div>
    <div class="row-card-sub">${formatNaira(o.total)} · ${timeAgo(o.createdAt)}</div>
    <div class="row-card-actions"><button class="btn btn-outline btn-sm" data-action="nav" data-view="admin-order-detail" data-order-id="${o.id}">View</button></div>
  </div>`;
}

const BIZ_STATUS_CLASS = { active: 'status-success', pending: 'status-warn', rejected: 'status-error', suspended: 'status-error' };

function adminBusinesses() {
  const filterStatus = state.params.status || 'all';
  let list = DB.businesses;
  if (filterStatus !== 'all') list = list.filter((b) => b.status === filterStatus);
  return `
    <div class="page-head"><h1>Businesses</h1>
      <button class="btn btn-primary btn-sm" data-action="nav" data-view="admin-business-new">${ICONS.plus} Create business</button>
    </div>
    <div class="tab-bar">
      ${['all', 'pending', 'active', 'suspended', 'rejected'].map((s) => `<button class="${filterStatus === s ? 'active' : ''}" data-action="admin-biz-filter" data-status="${s}">${s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}</button>`).join('')}
    </div>
    ${list.length ? `<div class="row-cards">${list.map((b) => {
      const orders = getOrders({ businessId: b.id });
      const revenue = orders.filter((o) => o.status === 'delivered').reduce((s, o) => s + o.subtotal, 0);
      return `<div class="row-card">
        <div class="flex gap-10">
          <div class="logo-sq" style="width:44px;height:44px;font-size:14px;">${initials(b.name)}</div>
          <div style="flex:1;">
            <div class="row-card-top" style="margin-bottom:0;"><span class="row-card-title">${escapeHtml(b.name)}</span><span class="status-badge ${BIZ_STATUS_CLASS[b.status]}">${b.status}</span></div>
            <div class="row-card-sub">${escapeHtml(b.ownerName || '')} · ${escapeHtml(b.address || '')}</div>
            <div class="row-card-sub">${orders.length} orders · ${formatNaira(revenue)} revenue</div>
          </div>
        </div>
        <div class="row-card-actions">
          <button class="btn btn-outline btn-sm" data-action="nav" data-view="admin-business-detail" data-id="${b.id}">View</button>
          <button class="btn btn-outline btn-sm" data-action="nav" data-view="admin-business-edit" data-id="${b.id}">Edit</button>
          ${b.status === 'pending' ? `<button class="btn btn-primary btn-sm" data-action="admin-approve-biz" data-id="${b.id}">Approve</button><button class="btn btn-danger btn-sm" data-action="admin-reject-biz" data-id="${b.id}">Reject</button>` : ''}
          ${b.status === 'active' ? `<button class="btn btn-danger btn-sm" data-action="admin-suspend-biz" data-id="${b.id}">Suspend</button>` : ''}
          ${b.status === 'suspended' ? `<button class="btn btn-primary btn-sm" data-action="admin-reactivate-biz" data-id="${b.id}">Reactivate</button>` : ''}
        </div>
      </div>`;
    }).join('')}</div>` : emptyState('store', 'No businesses', 'Businesses will appear here once they register.', null)}
  `;
}

function adminBusinessDetail(id) {
  const b = getBusiness(id);
  if (!b) return emptyState('store', 'Not found', '', null);
  const orders = getOrders({ businessId: id });
  const products = getProducts({ businessId: id, includeAll: true });
  const revenue = orders.filter((o) => o.status === 'delivered').reduce((s, o) => s + o.subtotal, 0);
  return `
    ${backBtn('Businesses')}
    <div class="page-head">
      <div><h1>${escapeHtml(b.name)}</h1><div class="sub">${escapeHtml(b.ownerName || '')} · ${escapeHtml(b.phone || '')} · ${escapeHtml(b.email || '')}</div></div>
      <div class="flex gap-8 items-center">
        <span class="status-badge ${BIZ_STATUS_CLASS[b.status]}">${b.status}</span>
        <button class="btn btn-outline btn-sm" data-action="nav" data-view="admin-business-edit" data-id="${b.id}">${ICONS.edit} Edit</button>
      </div>
    </div>
    <div class="metric-grid">
      ${metricCard('Orders', orders.length, '')}
      ${metricCard('Revenue', formatNaira(revenue), '')}
      ${metricCard('Products', products.length, '')}
      ${metricCard('Rating', '⭐ ' + (b.rating || '—'), '')}
    </div>
    <div class="flex gap-10 mt-16">
      ${b.status === 'pending' ? `<button class="btn btn-primary btn-block" data-action="admin-approve-biz" data-id="${b.id}">Approve business</button><button class="btn btn-danger btn-block" data-action="admin-reject-biz" data-id="${b.id}">Reject</button>` : ''}
      ${b.status === 'active' ? `<button class="btn btn-danger btn-block" data-action="admin-suspend-biz" data-id="${b.id}">Suspend business</button>` : ''}
      ${b.status === 'suspended' ? `<button class="btn btn-primary btn-block" data-action="admin-reactivate-biz" data-id="${b.id}">Reactivate business</button>` : ''}
    </div>
  `;
}

function adminCustomers() {
  const q = (state.params.q || '').toLowerCase();
  let list = DB.customers;
  if (q) list = list.filter((c) => c.name.toLowerCase().includes(q) || (c.phone || '').includes(q));
  return `
    <div class="page-head"><h1>Customers</h1></div>
    <input type="text" placeholder="Search customers by name or phone" id="admin-cust-search" value="${escapeHtml(state.params.q || '')}" style="margin-bottom:14px;" />
    ${list.length ? `<div class="row-cards">${list.map((c) => {
      const orders = getOrders({ customerId: c.id });
      return `<div class="row-card flex items-center justify-between"><div><div style="font-weight:700;font-size:13.5px;">${escapeHtml(c.name)}</div><div class="text-sm text-muted">${escapeHtml(c.phone || '')} · ${orders.length} orders</div></div></div>`;
    }).join('')}</div>` : emptyState('users', 'No customers', 'Customers will appear here once they register.', null)}
  `;
}

function adminProducts() {
  const filterStatus = state.params.status || 'pending';
  let list = getProducts({ includeAll: true, status: filterStatus === 'all' ? undefined : filterStatus });
  return `
    <div class="page-head"><h1>Product moderation</h1></div>
    <div class="tab-bar">
      ${['pending', 'active', 'hidden', 'all'].map((s) => `<button class="${filterStatus === s ? 'active' : ''}" data-action="admin-products-filter" data-status="${s}">${s[0].toUpperCase() + s.slice(1)}</button>`).join('')}
    </div>
    ${list.length ? `<div class="row-cards">${list.map((p) => `<div class="row-card">
      <div class="flex gap-10">
        <div class="thumb-sm" style="overflow:hidden;">${placeholderThumb(p.hue, p.emoji)}</div>
        <div style="flex:1;">
          <div class="row-card-top" style="margin-bottom:0;"><span class="row-card-title">${escapeHtml(p.name)}</span><span class="status-badge ${PRODUCT_STATUS_CLASS[p.status]}">${PRODUCT_STATUS_LABEL[p.status]}</span></div>
          <div class="row-card-sub">${escapeHtml((getBusiness(p.businessId) || {}).name || '')} · ${formatNaira(p.discountPrice || p.price)}</div>
        </div>
      </div>
      <div class="row-card-actions">
        ${p.status === 'pending' ? `<button class="btn btn-primary btn-sm" data-action="admin-approve-product" data-id="${p.id}">Approve</button><button class="btn btn-danger btn-sm" data-action="admin-reject-product" data-id="${p.id}">Reject</button>` : `<button class="btn btn-outline btn-sm" data-action="admin-hide-product" data-id="${p.id}">${p.status === 'hidden' ? 'Unhide' : 'Hide'}</button>`}
      </div>
    </div>`).join('')}</div>` : emptyState('box', 'Nothing to review', 'No products in this filter.', null)}
  `;
}

function adminOrders() {
  const filterStatus = state.params.status || 'all';
  let list = getOrders({});
  if (filterStatus !== 'all') list = list.filter((o) => o.status === filterStatus);
  return `
    <div class="page-head"><h1>Order management</h1><div class="sub">${list.length} orders</div></div>
    <div class="tab-bar">
      ${['all', 'placed', 'confirmed', 'preparing', 'ready_for_pickup', 'agent_assigned', 'picked_up', 'out_for_delivery', 'delivered', 'cancelled'].map((s) => `<button class="${filterStatus === s ? 'active' : ''}" data-action="admin-orders-filter" data-status="${s}">${s === 'all' ? 'All' : s.replace(/_/g, ' ')}</button>`).join('')}
    </div>
    ${list.length ? `<div class="row-cards mobile-only-cards">${list.map((o) => adminOrderCardHtml(o)).join('')}</div>` : emptyState('orders', 'No orders', 'Orders will appear here once customers start buying.', null)}
  `;
}

function adminOrderDetail(orderId) {
  const o = getOrder(orderId);
  if (!o) return emptyState('errorCircle', 'Order not found', '', null);
  const biz = getBusiness(o.businessId) || { name: 'Business' };
  const cust = getCustomer(o.customerId) || { name: 'Customer' };
  const agent = o.agentId ? getAgent(o.agentId) : null;
  return `
    ${backBtn('Orders')}
    <div class="page-head"><div><h1>${o.orderNumber}</h1><div class="sub">${formatDate(o.createdAt)}</div></div>${orderStatusBadge(o.status)}</div>
    <div class="mt-0 mb-12" style="margin-bottom:12px;">${orderChatButton(o.id, 'Open order chat')}</div>
    <div class="grid-2">
      <div>
        <div class="card">
          <strong style="font-size:13px;">Parties</strong>
          <div class="summary-row"><span>Customer</span><span class="val">${escapeHtml(cust.name)}</span></div>
          <div class="summary-row"><span>Business</span><span class="val">${escapeHtml(biz.name)}</span></div>
          <div class="summary-row"><span>Agent</span><span class="val">${agent ? escapeHtml(agent.name) : 'Not yet assigned'}</span></div>
        </div>
        <div class="card mt-12"><strong style="font-size:13px;">Items</strong>
          <div class="mt-8">${o.items.map((it) => `<div class="summary-row"><span>${it.qty} × ${escapeHtml(it.name)}</span><span class="val">${formatNaira(it.price * it.qty)}</span></div>`).join('')}</div>
        </div>
        ${!agent && !['delivered', 'cancelled'].includes(o.status) ? `
        <div class="card mt-12">
          <strong style="font-size:13px;">Assign delivery agent</strong>
          <select id="admin-assign-agent-select" class="mt-8">${DB.agents.map((a) => `<option value="${a.id}">${escapeHtml(a.name)} — ${a.vehicle}${a.status === 'offline' ? ' (offline)' : ''}</option>`).join('') || '<option>No agents registered</option>'}</select>
          <button class="btn btn-primary btn-block mt-8" data-action="admin-assign-agent" data-order-id="${o.id}">Assign agent</button>
        </div>` : ''}
      </div>
      <div>
        <div class="card">
          <strong style="font-size:13px;">Financial breakdown</strong>
          <div class="summary-row"><span>Product total</span><span class="val">${formatNaira(o.subtotal)}</span></div>
          <div class="summary-row"><span>Delivery fee</span><span class="val">${formatNaira(o.deliveryFee)}</span></div>
          <div class="summary-row"><span>Platform fee</span><span class="val">${formatNaira(o.platformFee)}</span></div>
          <div class="summary-row total"><span>Customer paid</span><span>${formatNaira(o.total)}</span></div>
          <hr class="divider" />
          <div class="summary-row"><span>Business commission</span><span class="val">${formatNaira(o.financial.businessCommission)}</span></div>
          <div class="summary-row"><span>Business receives</span><span class="val">${formatNaira(o.financial.businessReceives)}</span></div>
          <div class="summary-row"><span>Agent delivery payment</span><span class="val">${formatNaira(o.financial.agentPayment)}</span></div>
          <div class="summary-row total"><span>Platform gross revenue</span><span>${formatNaira(o.financial.platformGrossRevenue)}</span></div>
        </div>
      </div>
    </div>
  `;
}

const AGENT_STATUS_CLASS = { online: 'status-success', offline: 'status-neutral', delivering: 'status-accent' };

function adminAgents() {
  const filterStatus = state.params.status || 'all';
  let list = DB.agents;
  if (filterStatus !== 'all') list = list.filter((a) => a.status === filterStatus);
  return `
    <div class="page-head"><h1>Delivery agents</h1>
      <button class="btn btn-primary btn-sm" data-action="nav" data-view="admin-agent-new">${ICONS.plus} Create agent</button>
    </div>
    <div class="tab-bar">
      ${['all', 'online', 'delivering', 'offline'].map((s) => `<button class="${filterStatus === s ? 'active' : ''}" data-action="admin-agents-filter" data-status="${s}">${s[0].toUpperCase() + s.slice(1)}</button>`).join('')}
    </div>
    ${list.length ? `<div class="row-cards">${list.map((a) => `<div class="row-card flex items-center justify-between">
      <div><div style="font-weight:700;font-size:13.5px;">${escapeHtml(a.name)} <span class="status-badge ${AGENT_STATUS_CLASS[a.status]}">${a.status}</span></div><div class="text-sm text-muted">${a.vehicle} · ⭐ ${a.rating || '—'} · ${a.completedDeliveries || 0} deliveries</div></div>
      <div class="flex gap-8">
        <button class="btn btn-outline btn-sm" data-action="nav" data-view="admin-agent-detail" data-id="${a.id}">View</button>
        <button class="btn btn-outline btn-sm" data-action="nav" data-view="admin-agent-edit" data-id="${a.id}">Edit</button>
      </div>
    </div>`).join('')}</div>` : emptyState('bike', 'No delivery agents', 'Agents will appear here once they register.', null)}
  `;
}

function adminAgentDetail(id) {
  const a = getAgent(id);
  if (!a) return emptyState('bike', 'Not found', '', null);
  const orders = getOrders({ agentId: id });
  return `
    ${backBtn('Delivery agents')}
    <div class="page-head">
      <div><h1>${escapeHtml(a.name)}</h1><div class="sub">${escapeHtml(a.phone || '')} · ${a.vehicle} · ${escapeHtml(a.operatingArea || '')}</div></div>
      <div class="flex gap-8 items-center">
        <span class="status-badge ${AGENT_STATUS_CLASS[a.status]}">${a.status}</span>
        <button class="btn btn-outline btn-sm" data-action="nav" data-view="admin-agent-edit" data-id="${a.id}">${ICONS.edit} Edit</button>
      </div>
    </div>
    <div class="metric-grid">
      ${metricCard('Completed', a.completedDeliveries || 0, '')}
      ${metricCard('Rating', '⭐ ' + (a.rating || '—'), '')}
      ${metricCard('Pending earnings', formatNaira(a.earningsPending || 0), '')}
      ${metricCard('Paid earnings', formatNaira(a.earningsPaid || 0), '')}
    </div>
    <div class="section-title-row"><h2>Recent deliveries</h2></div>
    ${orders.length ? `<div class="row-cards">${orders.slice(0, 8).map((o) => `<div class="row-card flex items-center justify-between"><span style="font-weight:700;font-size:13.5px;">${o.orderNumber}</span>${orderStatusBadge(o.status)}</div>`).join('')}</div>` : `<p class="text-muted text-sm">No deliveries yet.</p>`}
  `;
}

function adminPayments() {
  const orders = getOrders({});
  const successful = orders.filter((o) => o.paymentStatus === 'paid');
  const refunded = orders.filter((o) => o.paymentStatus === 'refunded');
  return `
    <div class="page-head"><h1>Payments</h1></div>
    <div class="metric-grid">
      ${metricCard('Successful', successful.length, '')}
      ${metricCard('Pending', 0, '')}
      ${metricCard('Failed', 0, '')}
      ${metricCard('Refunds', refunded.length, '')}
    </div>
    <div class="section-title-row"><h2>Transactions</h2></div>
    ${orders.length ? `<div class="row-cards mobile-only-cards">${orders.slice(0, 20).map((o) => `<div class="row-card">
      <div class="row-card-top"><span class="row-card-title" style="font-family:monospace;font-size:12px;">TXN-${o.id.toUpperCase()}</span><span class="status-badge ${o.paymentStatus === 'paid' ? 'status-success' : 'status-error'}">${o.paymentStatus}</span></div>
      <div class="row-card-sub">${o.orderNumber} · ${escapeHtml((getCustomer(o.customerId) || {}).name || '')} · ${formatNaira(o.total)}</div>
    </div>`).join('')}</div>` : emptyState('card', 'No transactions', 'Payments will appear here once orders start flowing.', null)}
  `;
}

function adminSettlements() {
  const businesses = getBusinesses({ status: 'active' });
  const pendingRows = businesses.map((b) => {
    const delivered = getOrders({ businessId: b.id, status: 'delivered' });
    const pending = delivered.filter((o) => !o.settled);
    const grossSales = pending.reduce((s, o) => s + o.subtotal, 0);
    const commission = pending.reduce((s, o) => s + o.financial.businessCommission, 0);
    const net = grossSales - commission;
    return pending.length ? { b, grossSales, commission, net } : null;
  }).filter(Boolean);
  return `
    <div class="page-head"><h1>Settlements</h1></div>
    ${pendingRows.length ? `<div class="row-cards">${pendingRows.map(({ b, grossSales, commission, net }) => `<div class="row-card">
      <div class="row-card-top"><span class="row-card-title">${escapeHtml(b.name)}</span><span class="status-badge status-warn">Pending</span></div>
      <div class="row-card-sub">Gross sales ${formatNaira(grossSales)} · Commission -${formatNaira(commission)}</div>
      <div class="row-card-sub" style="font-weight:800;color:var(--color-text);">Net settlement: ${formatNaira(net)}</div>
      <div class="row-card-actions"><button class="btn btn-primary btn-sm" data-action="admin-process-settlement" data-id="${b.id}">Process settlement</button></div>
    </div>`).join('')}</div>` : emptyState('wallet', 'No pending settlements', 'All caught up — nothing is awaiting payout.', null)}
    <div class="section-title-row"><h2>Settlement history</h2></div>
    ${DB.settlements.length ? `<div class="row-cards">${DB.settlements.map((s) => `<div class="row-card flex items-center justify-between"><div><div style="font-weight:700;font-size:13.5px;">${escapeHtml((getBusiness(s.businessId) || {}).name || '')}</div><div class="text-sm text-muted">${formatDate(s.date)}</div></div><div class="text-right"><div style="font-weight:800;">${formatNaira(s.net)}</div><span class="status-badge status-success">Paid</span></div></div>`).join('')}</div>` : `<p class="text-muted text-sm">No settlements processed yet.</p>`}
  `;
}

function adminCommissions() {
  const s = DB.settings;
  return `
    <div class="page-head"><h1>Commission settings</h1></div>
    <div class="card">
      <strong style="font-size:13px;">Default rates</strong>
      <div class="form-row mt-12">
        <div class="form-group"><label>Marketplace commission (%)</label><input type="number" id="cs-commission" value="${s.commissionPercent}" /></div>
        <div class="form-group"><label>Platform service fee (%)</label><input type="number" id="cs-service" value="${s.platformServiceFeePercent}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Base delivery fee (₦)</label><input type="number" id="cs-delivery" value="${s.baseDeliveryFee}" /></div>
        <div class="form-group"><label>Agent share of delivery fee (%)</label><input type="number" id="cs-agent-share" value="${s.agentSharePercent}" /></div>
      </div>
    </div>
    <button class="btn btn-primary btn-block mt-16" data-action="save-commission-settings">Save commission settings</button>
  `;
}

function adminZones() {
  const zones = DB.settings.zones;
  return `
    <div class="page-head"><h1>Delivery zones</h1></div>
    <div class="row-cards">
      ${zones.map((z) => `<div class="row-card zone-card flex items-center justify-between">
        <div><div style="font-weight:700;font-size:14px;">${escapeHtml(z.name)}</div><div class="text-sm text-muted">${z.minKm}–${z.maxKm} km</div></div>
        <div class="text-right"><div style="font-weight:800;">${formatNaira(z.fee)}</div><div class="text-sm text-muted">delivery fee</div></div>
      </div>`).join('')}
    </div>
  `;
}

function adminDisputes() {
  return `
    <div class="page-head"><h1>Disputes</h1></div>
    ${emptyState('gavel', 'No disputes', 'Opened disputes will appear here for review.', null)}
  `;
}

function adminReports() {
  const orders = getOrders({});
  const delivered = orders.filter((o) => o.status === 'delivered');
  return `
    <div class="page-head"><h1>Reports</h1></div>
    <div class="metric-grid">
      ${metricCard('Daily sales', formatNaira(delivered.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString()).reduce((s, o) => s + o.subtotal, 0)), '')}
      ${metricCard('Platform revenue', formatNaira(delivered.reduce((s, o) => s + o.financial.platformGrossRevenue, 0)), '')}
      ${metricCard('Business revenue', formatNaira(delivered.reduce((s, o) => s + o.financial.businessReceives, 0)), '')}
      ${metricCard('Agent earnings', formatNaira(delivered.reduce((s, o) => s + o.financial.agentPayment, 0)), '')}
    </div>
  `;
}

function adminSettingsView() {
  return `
    <div class="page-head"><h1>Platform settings</h1></div>
    <div class="card">
      <strong style="font-size:13px;">General</strong>
      <div class="form-group mt-12"><label>Platform name</label><input type="text" value="PXDynasty" /></div>
      <div class="form-group mb-0"><label>Support phone number</label><input type="text" value="" /></div>
    </div>
    <button class="btn btn-primary btn-block mt-16" data-action="toast-success" data-msg="Platform settings saved">Save settings</button>
  `;
}

function adminBusinessNew() {
  return `
    ${backBtn('Businesses')}
    <div class="page-head"><h1>Create business</h1><div class="sub">Creates a business account and a user login</div></div>
    <div class="card">
      <strong style="font-size:13px;">Business details</strong>
      <div class="form-group mt-12"><label>Business name</label><input type="text" id="cb-bizName" placeholder="e.g. Shehu Poultry Farm" /></div>
      <div class="form-row">
        <div class="form-group"><label>Owner name</label><input type="text" id="cb-ownerName" placeholder="e.g. Shehu Yusuf" /></div>
        <div class="form-group"><label>Category</label>
          <select id="cb-category">${CATEGORIES.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Phone</label><input type="tel" id="cb-phone" placeholder="080..." /></div>
        <div class="form-group"><label>Address</label><input type="text" id="cb-address" placeholder="e.g. Sabon Gari, Kano" /></div>
      </div>
    </div>
    <div class="card mt-12">
      <strong style="font-size:13px;">Login credentials</strong>
      <p class="text-sm text-muted mt-8">Share these with the business owner. They log in at this same page.</p>
      <div class="form-row">
        <div class="form-group"><label>Email</label><input type="email" id="cb-email" placeholder="owner@example.com" /></div>
        <div class="form-group">
          <label>Password (min 6 chars)</label>
          <div class="flex gap-8">
            <input type="text" id="cb-password" placeholder="Tap generate →" style="flex:1;" />
            <button type="button" class="btn btn-outline btn-sm" data-action="gen-password" data-target="cb-password">Generate</button>
          </div>
        </div>
      </div>
      <div class="auth-error" id="cb-error" style="margin:6px 0 0;"></div>
    </div>
    <div class="sticky-bottom-bar">
      <button class="btn btn-outline btn-block" data-action="back">Cancel</button>
      <button class="btn btn-primary btn-block" data-action="admin-create-business">Create business</button>
    </div>
  `;
}

function adminBusinessEdit(id) {
  const b = getBusiness(id);
  if (!b) return emptyState('store', 'Not found', 'This business no longer exists.', null);
  return `
    ${backBtn('Businesses')}
    <div class="page-head"><h1>Edit business</h1><div class="sub">${escapeHtml(b.name)}</div></div>
    <div class="card">
      <strong style="font-size:13px;">Business details</strong>
      <div class="form-group mt-12"><label>Business name</label><input type="text" id="eb-bizName" value="${escapeHtml(b.name)}" /></div>
      <div class="form-row">
        <div class="form-group"><label>Owner name</label><input type="text" id="eb-ownerName" value="${escapeHtml(b.ownerName || '')}" /></div>
        <div class="form-group"><label>Category</label>
          <select id="eb-category">${CATEGORIES.map((c) => `<option value="${c.id}" ${c.id === b.category ? 'selected' : ''}>${c.name}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Phone</label><input type="tel" id="eb-phone" value="${escapeHtml(b.phone || '')}" /></div>
        <div class="form-group"><label>Email</label><input type="email" id="eb-email" value="${escapeHtml(b.email || '')}" /></div>
      </div>
      <div class="form-group"><label>Address</label><input type="text" id="eb-address" value="${escapeHtml(b.address || '')}" /></div>
      <div class="form-row">
        <div class="form-group"><label>Status</label>
          <select id="eb-status">
            ${['active','pending','suspended','rejected'].map((s) => `<option value="${s}" ${s === b.status ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Verified</label>
          <select id="eb-verified">
            <option value="true" ${b.verified ? 'selected' : ''}>Yes</option>
            <option value="false" ${!b.verified ? 'selected' : ''}>No</option>
          </select>
        </div>
      </div>
      <div class="auth-error" id="eb-error" style="margin:6px 0 0;"></div>
    </div>

    <div class="card mt-12">
      <strong style="font-size:13px;">Reset owner password</strong>
      <p class="text-sm text-muted mt-8">Use this if the owner has lost access. The new password works immediately — old one stops working.</p>
      <div class="form-group mt-12">
        <label>New password (min 6 chars)</label>
        <div class="flex gap-8">
          <input type="text" id="eb-newPassword" placeholder="Tap generate →" style="flex:1;" />
          <button type="button" class="btn btn-outline btn-sm" data-action="gen-password" data-target="eb-newPassword">Generate</button>
        </div>
      </div>
      <div class="auth-error" id="eb-pw-error" style="margin:6px 0 0;"></div>
      <button class="btn btn-primary btn-block mt-12" data-action="admin-reset-password" data-id="${b.id}">Reset password</button>
    </div>

    <div class="sticky-bottom-bar">
      <button class="btn btn-outline btn-block" data-action="back">Cancel</button>
      <button class="btn btn-primary btn-block" data-action="admin-update-business" data-id="${b.id}">Save changes</button>
    </div>
  `;
}

function adminAgentEdit(id) {
  const a = getAgent(id);
  if (!a) return emptyState('bike', 'Not found', 'This agent no longer exists.', null);
  return `
    ${backBtn('Delivery agents')}
    <div class="page-head"><h1>Edit agent</h1><div class="sub">${escapeHtml(a.name)}</div></div>
    <div class="card">
      <strong style="font-size:13px;">Agent details</strong>
      <div class="form-row mt-12">
        <div class="form-group"><label>Full name</label><input type="text" id="ea-name" value="${escapeHtml(a.name)}" /></div>
        <div class="form-group"><label>Phone</label><input type="tel" id="ea-phone" value="${escapeHtml(a.phone || '')}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Vehicle</label>
          <select id="ea-vehicle">
            ${['Motorcycle','Bicycle','Tricycle (Keke)','Van','Car'].map((v) => `<option value="${v}" ${v === a.vehicle ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Operating area</label><input type="text" id="ea-area" value="${escapeHtml(a.operatingArea || '')}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Status</label>
          <select id="ea-status">
            ${['online','offline','delivering'].map((s) => `<option value="${s}" ${s === a.status ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Verified</label>
          <select id="ea-verified">
            <option value="true" ${a.verified ? 'selected' : ''}>Yes</option>
            <option value="false" ${!a.verified ? 'selected' : ''}>No</option>
          </select>
        </div>
      </div>
      <div class="auth-error" id="ea-error" style="margin:6px 0 0;"></div>
    </div>

    <div class="card mt-12">
      <strong style="font-size:13px;">Reset agent password</strong>
      <p class="text-sm text-muted mt-8">Use this if the agent lost access to their login.</p>
      <div class="form-group mt-12">
        <label>New password (min 6 chars)</label>
        <div class="flex gap-8">
          <input type="text" id="ea-newPassword" placeholder="Tap generate →" style="flex:1;" />
          <button type="button" class="btn btn-outline btn-sm" data-action="gen-password" data-target="ea-newPassword">Generate</button>
        </div>
      </div>
      <div class="auth-error" id="ea-pw-error" style="margin:6px 0 0;"></div>
      <button class="btn btn-primary btn-block mt-12" data-action="admin-reset-agent-password" data-id="${a.id}">Reset password</button>
    </div>

    <div class="sticky-bottom-bar">
      <button class="btn btn-outline btn-block" data-action="back">Cancel</button>
      <button class="btn btn-primary btn-block" data-action="admin-update-agent" data-id="${a.id}">Save changes</button>
    </div>
  `;
}

function adminAgentNew() {
  return `
    ${backBtn('Delivery agents')}
    <div class="page-head"><h1>Create delivery agent</h1><div class="sub">Creates an agent account and a user login</div></div>
    <div class="card">
      <strong style="font-size:13px;">Agent details</strong>
      <div class="form-row mt-12">
        <div class="form-group"><label>Full name</label><input type="text" id="ca-name" placeholder="e.g. Musa Ibrahim" /></div>
        <div class="form-group"><label>Phone</label><input type="tel" id="ca-phone" placeholder="080..." /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Vehicle</label>
          <select id="ca-vehicle">
            <option>Motorcycle</option><option>Bicycle</option><option>Tricycle (Keke)</option><option>Van</option><option>Car</option>
          </select>
        </div>
        <div class="form-group"><label>Operating area</label><input type="text" id="ca-area" placeholder="e.g. Sabon Gari, Kano" /></div>
      </div>
    </div>
    <div class="card mt-12">
      <strong style="font-size:13px;">Login credentials</strong>
      <p class="text-sm text-muted mt-8">Share these with the agent.</p>
      <div class="form-row">
        <div class="form-group"><label>Email</label><input type="email" id="ca-email" placeholder="agent@example.com" /></div>
        <div class="form-group">
          <label>Password (min 6 chars)</label>
          <div class="flex gap-8">
            <input type="text" id="ca-password" placeholder="Tap generate →" style="flex:1;" />
            <button type="button" class="btn btn-outline btn-sm" data-action="gen-password" data-target="ca-password">Generate</button>
          </div>
        </div>
      </div>
      <div class="auth-error" id="ca-error" style="margin:6px 0 0;"></div>
    </div>
    <div class="sticky-bottom-bar">
      <button class="btn btn-outline btn-block" data-action="back">Cancel</button>
      <button class="btn btn-primary btn-block" data-action="admin-create-agent">Create agent</button>
    </div>
  `;
}

function businessTeam(biz) {
  return `
    <div class="page-head"><h1>Team</h1><div class="sub">Staff accounts for ${escapeHtml(biz.name)}</div></div>
    <div class="card">
      <strong style="font-size:13px;">Add a staff member</strong>
      <p class="text-sm text-muted mt-8">Staff can add products and process orders. They cannot see earnings, settings, customers, or delete products.</p>
      <div class="form-row mt-12">
        <div class="form-group"><label>Full name</label><input type="text" id="st-name" placeholder="e.g. Fatima Umar" /></div>
        <div class="form-group"><label>Phone (optional)</label><input type="tel" id="st-phone" placeholder="080…" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Email</label><input type="email" id="st-email" placeholder="staff@example.com" /></div>
        <div class="form-group">
          <label>Password (min 6 chars)</label>
          <div class="flex gap-8">
            <input type="text" id="st-password" placeholder="Tap generate →" style="flex:1;" />
            <button type="button" class="btn btn-outline btn-sm" data-action="gen-password" data-target="st-password">Generate</button>
          </div>
        </div>
      </div>
      <div class="auth-error" id="st-error" style="margin:6px 0 0;"></div>
      <button class="btn btn-primary btn-block mt-12" data-action="biz-create-staff">Create staff account</button>
    </div>
    <div class="section-title-row"><h2>Staff members</h2></div>
    <div class="row-cards" id="st-list">
      <div class="text-sm text-muted">Loading…</div>
    </div>
  `;
}

async function loadStaffList() {
  const wrap = document.getElementById('st-list');
  if (!wrap) return;
  const A = window.PXDynastyAuth;
  if (!A || !A.listStaff) { wrap.innerHTML = '<div class="text-sm text-muted">Auth module not ready.</div>'; return; }
  const staff = await A.listStaff();
  if (!staff.length) {
    wrap.innerHTML = '<div class="text-sm text-muted">No staff accounts yet.</div>';
    return;
  }
  wrap.innerHTML = staff.map((u) => `
    <div class="row-card flex items-center justify-between">
      <div>
        <div style="font-weight:700;font-size:13.5px;">${escapeHtml(u.name || '(no name)')}</div>
        <div class="text-sm text-muted">${escapeHtml(u.email)}</div>
      </div>
      <span class="status-badge status-accent">Staff</span>
    </div>
  `).join('');
}

/* ==========================================================================
   ORDER CHAT — per-order messaging between customer, business, agent, admin
   ========================================================================== */

let _chatOrderId = null;
let _chatPollTimer = null;
let _chatLastIds = new Set();

function currentSenderInfo() {
  const u = window.PXDynastyAuth && window.PXDynastyAuth.currentUserSync && window.PXDynastyAuth.currentUserSync();
  if (u) {
    let name = u.name || u.email || 'User';
    let role = u.role;
    if (role === 'business' && state.currentBusinessId) {
      const b = getBusiness(state.currentBusinessId);
      if (b && b.name) name = b.name;
    } else if (role === 'agent' && state.currentAgentId) {
      const a = getAgent(state.currentAgentId);
      if (a && a.name) name = a.name;
    } else if (role === 'admin') {
      name = 'Platform Admin';
    } else if (role === 'staff' && state.currentBusinessId) {
      const b = getBusiness(state.currentBusinessId);
      if (b) name = (u.name || 'Staff') + ' · ' + b.name;
    }
    return { id: u.id || ('u-' + role), role, name };
  }
  // Fallback — no auth module.
  return { id: 'anon-' + state.role, role: state.role, name: state.role };
}

function stopChatPolling() {
  if (_chatPollTimer) { clearInterval(_chatPollTimer); _chatPollTimer = null; }
}

function renderChatMessages(messages) {
  const wrap = document.getElementById('chat-messages');
  if (!wrap) return;
  const me = currentSenderInfo();
  if (!messages.length) {
    wrap.innerHTML = '<div class="text-sm text-muted" style="text-align:center;padding:20px 6px;">No messages yet. Say something to get started.</div>';
    return;
  }
  wrap.innerHTML = messages.map((m) => {
    const mine = m.senderId === me.id || (m.senderRole === me.role && m.senderName === me.name);
    return `<div style="display:flex;flex-direction:column;align-items:${mine ? 'flex-end' : 'flex-start'};margin-bottom:10px;">
      <div style="font-size:11px;color:var(--color-text-faint);margin-bottom:3px;">${escapeHtml(m.senderName || m.senderRole || 'User')} · ${timeAgo(m.createdAt)}</div>
      <div style="max-width:80%;padding:9px 12px;border-radius:14px;font-size:13.5px;line-height:1.4;${mine
        ? 'background:var(--color-primary);color:#fff;border-bottom-right-radius:3px;'
        : 'background:var(--color-surface-alt);color:var(--color-text);border-bottom-left-radius:3px;'}">${escapeHtml(m.body)}</div>
    </div>`;
  }).join('');
  wrap.scrollTop = wrap.scrollHeight;
}

async function loadChatMessages(orderId) {
  if (!window.PXDynastySBC || !window.PXDynastySBC.fetchMessages) return;
  const messages = await window.PXDynastySBC.fetchMessages(orderId);
  // Only re-render if the set changed, so we don't steal scroll position.
  const ids = new Set(messages.map((m) => m.id));
  if (ids.size === _chatLastIds.size) {
    let same = true;
    for (const id of ids) { if (!_chatLastIds.has(id)) { same = false; break; } }
    if (same) return;
  }
  _chatLastIds = ids;
  renderChatMessages(messages);
}

function openOrderChat(orderId) {
  const order = getOrder(orderId);
  if (!order) { toast('Order not found', 'error'); return; }
  stopChatPolling();
  _chatOrderId = orderId;
  _chatLastIds = new Set();

  openModal(`
    <div class="modal-head">
      <div>
        <h3>Order chat · ${escapeHtml(order.orderNumber)}</h3>
        <div class="text-sm text-muted" style="margin-top:2px;">${escapeHtml((getBusiness(order.businessId) || {}).name || '')}</div>
      </div>
      <button class="icon-btn" data-action="close-modal">${ICONS.x}</button>
    </div>
    <div id="chat-messages" style="max-height:340px;overflow-y:auto;padding:10px 4px 6px;border-radius:var(--radius-sm);background:var(--color-bg);"></div>
    <div style="display:flex;gap:8px;margin-top:12px;">
      <input type="text" id="chat-input" placeholder="Type a message…" style="flex:1;" autocomplete="off" />
      <button class="btn btn-primary" data-action="chat-send" data-order-id="${order.id}">${ICONS.send || ''} Send</button>
    </div>
  `);

  loadChatMessages(orderId);
  _chatPollTimer = setInterval(() => loadChatMessages(orderId), 4000);

  // Enter to send.
  const input = document.getElementById('chat-input');
  if (input) {
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const btn = document.querySelector('[data-action="chat-send"]');
        if (btn) btn.click();
      }
    });
  }
}

async function sendChatMessage(orderId) {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const body = String(input.value || '').trim();
  if (!body) return;
  const me = currentSenderInfo();
  const msg = {
    id: 'msg-' + Math.random().toString(36).slice(2, 10),
    orderId,
    senderId: me.id,
    senderRole: me.role,
    senderName: me.name,
    body,
    createdAt: new Date().toISOString(),
  };
  input.value = '';
  // Optimistic render
  const wrap = document.getElementById('chat-messages');
  if (wrap) {
    wrap.insertAdjacentHTML('beforeend', `<div style="display:flex;flex-direction:column;align-items:flex-end;margin-bottom:10px;">
      <div style="font-size:11px;color:var(--color-text-faint);margin-bottom:3px;">${escapeHtml(me.name)} · just now</div>
      <div style="max-width:80%;padding:9px 12px;border-radius:14px;font-size:13.5px;line-height:1.4;background:var(--color-primary);color:#fff;border-bottom-right-radius:3px;">${escapeHtml(body)}</div>
    </div>`);
    wrap.scrollTop = wrap.scrollHeight;
  }
  if (window.PXDynastySBC && window.PXDynastySBC.insertMessage) {
    const r = await window.PXDynastySBC.insertMessage(msg);
    if (!r.ok) toast('Message failed to send: ' + (r.error || ''), 'error');
  } else {
    toast('Message service unavailable', 'error');
  }
}

function orderChatButton(orderId, label) {
  return `<button class="btn btn-outline btn-block" data-action="open-order-chat" data-order-id="${orderId}">${ICONS.bell2 || ''} ${escapeHtml(label || 'Message')}</button>`;
}

/* ==========================================================================
   14. EVENT DELEGATION
   ========================================================================== */

function goBack() {
  if (state.history.length) {
    const prev = state.history.pop();
    state.view = prev.view;
    state.params = prev.params;
    render();
  } else {
    switchRole(state.role);
  }
}

const _navigate = navigate;
navigate = function (view, params) {
  state.history.push({ view: state.view, params: state.params });
  if (state.history.length > 25) state.history.shift();
  _navigate(view, params);
};

function addToCart(productId, qty) {
  qty = qty || 1;
  const existing = state.cart.find((l) => l.productId === productId);
  if (existing) existing.qty += qty; else state.cart.push({ productId, qty });
  saveCart();
  toast('Added to cart', 'success');
}

function handleAction(el, ev) {
  const action = el.dataset.action;
  switch (action) {
    case 'nav': {
      const params = {};
      if (el.dataset.id) params.id = el.dataset.id;
      if (el.dataset.orderId) params.orderId = el.dataset.orderId;
      if (el.dataset.editId) params.editId = el.dataset.editId;
      navigate(el.dataset.view, params);
      break;
    }
    case 'nav-home': navigate(state.role === 'customer' ? 'home' : state.role === 'business' ? 'overview' : state.role === 'agent' ? 'jobs' : 'dashboard'); break;
    case 'nav-notifications': navigate('notifications'); break;
    case 'back': goBack(); break;
    case 'toggle-role-menu': document.getElementById('role-menu').classList.toggle('open'); break;
    case 'switch-role': switchRole(el.dataset.role); break;

    case 'pick-category': state.selectedCategory = el.dataset.cat || null; if (state.view !== 'explore') navigate('explore'); else render(); break;
    case 'set-sort': state.productFilters.sort = el.dataset.sort; render(); break;
    case 'toggle-rating-filter': state.productFilters.minRating = state.productFilters.minRating ? null : 4; render(); break;
    case 'clear-filters': state.productFilters = { sort: 'popular', maxPrice: null, minRating: null }; state.selectedCategory = null; render(); break;
    case 'quick-search': state.searchQuery = el.dataset.q; navigate('search'); break;

    case 'detail-qty': {
      const dir = parseInt(el.dataset.dir, 10);
      const cur = parseInt(document.getElementById('detail-qty-val').textContent, 10);
      const next = Math.max(1, cur + dir);
      document.getElementById('detail-qty-val').textContent = next;
      document.querySelectorAll('[data-action="add-to-cart"], [data-action="buy-now"]').forEach((b) => (b.dataset.qty = next));
      break;
    }
    case 'add-to-cart':
      ev && ev.stopPropagation && ev.stopPropagation();
      addToCart(el.dataset.id, parseInt(el.dataset.qty || '1', 10));
      break;
    case 'buy-now': addToCart(el.dataset.id, parseInt(el.dataset.qty || '1', 10)); navigate('cart'); break;
    case 'cart-qty': {
      const line = state.cart.find((l) => l.productId === el.dataset.id);
      if (!line) break;
      line.qty += parseInt(el.dataset.dir, 10);
      if (line.qty <= 0) state.cart = state.cart.filter((l) => l.productId !== el.dataset.id);
      saveCart(); render();
      break;
    }
    case 'remove-from-cart': state.cart = state.cart.filter((l) => l.productId !== el.dataset.id); saveCart(); render(); toast('Removed from cart'); break;
    case 'save-for-later': {
      state.cart = state.cart.filter((l) => l.productId !== el.dataset.id);
      if (!state.savedForLater.includes(el.dataset.id)) state.savedForLater.push(el.dataset.id);
      saveCart(); saveSaved(); render();
      break;
    }
    case 'move-to-cart': state.savedForLater = state.savedForLater.filter((id) => id !== el.dataset.id); addToCart(el.dataset.id, 1); saveSaved(); render(); break;
    case 'remove-saved': state.savedForLater = state.savedForLater.filter((id) => id !== el.dataset.id); saveSaved(); render(); break;
    case 'apply-coupon': toast('Coupons coming soon', 'info'); break;

    case 'checkout-step': {
      const dir = parseInt(el.dataset.dir, 10);
      const cur = state.params.step || 1;
      captureCheckoutStepInputs(cur);
      const next = Math.max(1, Math.min(4, cur + dir));
      navigate('checkout', { step: next });
      break;
    }
    case 'set-payment-method': state.checkoutData.paymentMethod = el.value; render(); break;
    case 'add-address-inline': toast('Address form coming soon', 'info'); break;
    case 'place-order': placeOrderFlow(); break;

    case 'orders-tab': navigate('orders-list', { tab: el.dataset.tab }); break;
    case 'reorder': {
      const o = getOrder(el.dataset.orderId);
      if (o) o.items.forEach((it) => addToCart(it.productId, it.qty));
      navigate('cart');
      break;
    }
    case 'contact-support': toast('Support contact coming soon', 'info'); break;
    case 'call-agent': toast('Calling delivery agent...', 'info'); break;

    case 'biz-orders-filter': navigate('biz-orders', { status: el.dataset.status }); break;
    case 'biz-advance-order': updateOrderStatus(el.dataset.orderId, el.dataset.next); render(); toast('Order updated', 'success'); break;
    case 'biz-cancel-order': confirmDialog('Cancel this order?', 'The customer will be notified and refunded in full.', 'Cancel order', () => { updateOrderStatus(el.dataset.orderId, 'cancelled'); render(); toast('Order cancelled', 'success'); }, true); break;
    case 'biz-products-filter': navigate('biz-products', { status: el.dataset.status }); break;
    case 'biz-toggle-product': { const p = getProduct(el.dataset.id); if (p) { p.status = el.dataset.to; saveData(DB); render(); } break; }
    case 'biz-delete-product': confirmDialog('Delete this product?', 'This action cannot be undone.', 'Delete', () => { DB.products = DB.products.filter((p) => p.id !== el.dataset.id); saveData(DB); render(); toast('Product deleted', 'success'); }, true); break;
    case 'save-product': saveProductForm(el.dataset.editId); break;
    case 'biz-request-settlement': { const s = createSettlement(state.currentBusinessId); render(); toast(s ? 'Settlement requested' : 'No pending settlement', s ? 'success' : 'info'); break; }
    case 'toggle-store-open': { const b = getBusiness(state.currentBusinessId); if (b) { b.open = el.checked; saveData(DB); } break; }
    case 'save-commission-settings': toast('Commission settings saved', 'success'); render(); break;

    case 'toggle-agent-status': { const a = getAgent(state.currentAgentId); if (a) { a.status = a.status === 'offline' ? 'online' : 'offline'; saveData(DB); render(); } break; }
    case 'agent-accept-job': assignAgentToOrder(el.dataset.orderId, state.currentAgentId); navigate('active-delivery'); toast('Delivery accepted', 'success'); break;
    case 'agent-reject-job': toast('Job passed to next available agent', 'info'); render(); break;
    case 'agent-confirm-pickup': updateOrderStatus(el.dataset.orderId, 'picked_up'); render(); toast('Pickup confirmed', 'success'); break;
    case 'agent-start-transit': updateOrderStatus(el.dataset.orderId, 'out_for_delivery'); render(); toast('On the way to customer', 'success'); break;
    case 'agent-open-otp': openOtpModal(el.dataset.orderId); break;
    case 'agent-force-delivered': {
      const id = el.dataset.orderId;
      confirmDialog(
        'Mark as delivered?',
        'Only do this if you have actually handed the order to the customer. The customer will not be able to confirm themselves after this.',
        'Yes, mark delivered',
        () => {
          updateOrderStatus(id, 'delivered');
          render();
          toast('Order marked delivered', 'success');
        }
      );
      break;
    }
    case 'customer-confirm-delivery': {
      const id = el.dataset.orderId;
      const order = getOrder(id);
      if (!order) break;
      confirmDialog(
        'Confirm you received your order?',
        'Only confirm if the items have been handed to you. This completes the delivery.',
        'Yes, I received my order',
        () => {
          updateOrderStatus(id, 'delivered');
          render();
          toast('Thanks for confirming — enjoy your order!', 'success');
        }
      );
      break;
    }
    case 'customer-report-problem': {
      const id = el.dataset.orderId;
      openModal(`
        <div class="modal-head"><h3>Report a problem</h3><button class="icon-btn" data-action="close-modal">${ICONS.x}</button></div>
        <p class="text-sm text-muted">Tell us what went wrong and our team will follow up.</p>
        <div class="form-group mt-12"><label>What happened?</label>
          <select id="rp-reason">
            <option value="not_delivered">I did not receive my order</option>
            <option value="wrong_items">Wrong or missing items</option>
            <option value="damaged">Items arrived damaged</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div class="form-group"><label>Details (optional)</label><textarea id="rp-details" placeholder="Add any notes about the issue…"></textarea></div>
        <button class="btn btn-primary btn-block" data-action="customer-submit-report" data-order-id="${id}">Submit report</button>
      `);
      break;
    }
    case 'customer-submit-report': {
      const id = el.dataset.orderId;
      const reason = (document.getElementById('rp-reason') || {}).value || 'other';
      const details = (document.getElementById('rp-details') || {}).value || '';
      const order = getOrder(id);
      if (order) {
        order.disputed = true;
        order.disputeReason = reason;
        order.disputeDetails = details;
        order.disputeAt = new Date().toISOString();
        pushNotification('admin', null, 'New dispute', `Order ${order.orderNumber}: ${reason}`, 'gavel');
        pushNotification('business', order.businessId, 'Dispute opened', `Customer reported: ${reason}`, 'gavel');
        saveData(DB);
        if (window.PXDynastySBC && window.PXDynastySBC.upsertOrder) {
          window.PXDynastySBC.upsertOrder(order).catch(() => {});
        }
      }
      closeModal();
      toast('Report submitted — support will follow up', 'success');
      render();
      break;
    }

    case 'admin-biz-filter': navigate('admin-businesses', { status: el.dataset.status }); break;
    case 'admin-approve-biz': approveBusiness(el.dataset.id); render(); toast('Business approved', 'success'); break;
    case 'admin-reject-biz': confirmDialog('Reject this business?', 'They will be notified to correct and resubmit.', 'Reject', () => { rejectBusiness(el.dataset.id); render(); toast('Business rejected', 'info'); }, true); break;
    case 'admin-suspend-biz': confirmDialog('Suspend this business?', 'Their storefront will be taken offline immediately.', 'Suspend', () => { suspendBusiness(el.dataset.id); render(); toast('Business suspended', 'info'); }, true); break;
    case 'admin-reactivate-biz': reactivateBusiness(el.dataset.id); render(); toast('Business reactivated', 'success'); break;
    case 'admin-products-filter': navigate('admin-products', { status: el.dataset.status }); break;
    case 'admin-approve-product': approveProduct(el.dataset.id); render(); toast('Product approved', 'success'); break;
    case 'admin-reject-product': rejectProduct(el.dataset.id); render(); toast('Product rejected', 'info'); break;
    case 'admin-hide-product': { const p = getProduct(el.dataset.id); if (p) { p.status = p.status === 'hidden' ? 'active' : 'hidden'; saveData(DB); render(); } break; }
    case 'admin-orders-filter': navigate('admin-orders', { status: el.dataset.status }); break;
    case 'admin-assign-agent': {
      const sel = document.getElementById('admin-assign-agent-select');
      if (!sel || !sel.value) { toast('No agent available to assign', 'error'); break; }
      assignAgentToOrder(el.dataset.orderId, sel.value); render(); toast('Agent assigned', 'success');
      break;
    }
    case 'admin-agents-filter': navigate('admin-agents', { status: el.dataset.status }); break;
    case 'admin-create-business': {
      const A = window.PXDynastyAuth;
      if (!A || !A.createBusinessAccount) { toast('Auth module not loaded', 'error'); break; }
      const errEl0 = document.getElementById('cb-error'); if (errEl0) errEl0.textContent = 'Creating…';
      A.createBusinessAccount({
        businessName: (document.getElementById('cb-bizName') || {}).value || '',
        ownerName:    (document.getElementById('cb-ownerName') || {}).value || '',
        category:     (document.getElementById('cb-category') || {}).value || 'groceries',
        phone:        (document.getElementById('cb-phone') || {}).value || '',
        address:      (document.getElementById('cb-address') || {}).value || '',
        email:        (document.getElementById('cb-email') || {}).value || '',
        password:     (document.getElementById('cb-password') || {}).value || '',
      }).then((res) => {
        const errEl = document.getElementById('cb-error');
        if (!res.ok) {
          if (errEl) errEl.textContent = res.error || '(no error message)';
          toast(res.error || 'Create business failed', 'error');
          return;
        }
        if (errEl) errEl.textContent = '';
        toast('Business created: ' + res.business.name, 'success');
        navigate('admin-businesses');
      }).catch((e) => {
        const errEl = document.getElementById('cb-error');
        if (errEl) errEl.textContent = 'Exception: ' + String(e);
        toast('Exception: ' + String(e), 'error');
      });
      break;
    }
    case 'admin-create-agent': {
      const A = window.PXDynastyAuth;
      if (!A || !A.createAgentAccount) { toast('Auth module not loaded', 'error'); break; }
      const errEl0 = document.getElementById('ca-error'); if (errEl0) errEl0.textContent = 'Creating…';
      A.createAgentAccount({
        name:    (document.getElementById('ca-name') || {}).value || '',
        phone:   (document.getElementById('ca-phone') || {}).value || '',
        vehicle: (document.getElementById('ca-vehicle') || {}).value || 'Motorcycle',
        operatingArea: (document.getElementById('ca-area') || {}).value || '',
        email:    (document.getElementById('ca-email') || {}).value || '',
        password: (document.getElementById('ca-password') || {}).value || '',
      }).then((res) => {
        const errEl = document.getElementById('ca-error');
        if (!res.ok) {
          if (errEl) errEl.textContent = res.error || '(no error message)';
          toast(res.error || 'Create agent failed', 'error');
          return;
        }
        if (errEl) errEl.textContent = '';
        toast('Agent created: ' + res.agent.name, 'success');
        navigate('admin-agents');
      }).catch((e) => {
        const errEl = document.getElementById('ca-error');
        if (errEl) errEl.textContent = 'Exception: ' + String(e);
        toast('Exception: ' + String(e), 'error');
      });
      break;
    }
    case 'admin-process-settlement': { createSettlement(el.dataset.id); render(); toast('Settlement processed', 'success'); break; }

    case 'gen-password': {
      const targetId = el.dataset.target;
      const elIn = document.getElementById(targetId);
      if (!elIn) break;
      const pw = genReadablePassword();
      elIn.value = pw;
      // Also select so the user can long-press → copy.
      elIn.focus();
      elIn.select && elIn.select();
      toast('Password generated — long-press the field to copy', 'success');
      break;
    }
    case 'admin-update-agent': {
      const id = el.dataset.id;
      const a = getAgent(id);
      if (!a) { toast('Agent not found', 'error'); break; }
      a.name = (document.getElementById('ea-name') || {}).value || a.name;
      a.phone = (document.getElementById('ea-phone') || {}).value || '';
      a.vehicle = (document.getElementById('ea-vehicle') || {}).value || a.vehicle;
      a.operatingArea = (document.getElementById('ea-area') || {}).value || '';
      a.status = (document.getElementById('ea-status') || {}).value || a.status;
      const vEl = document.getElementById('ea-verified');
      a.verified = vEl ? vEl.value === 'true' : a.verified;
      saveData(DB);
      if (window.PXDynastySBC && window.PXDynastySBC.upsertAgent) {
        window.PXDynastySBC.upsertAgent(a).then((r) => {
          if (!r.ok) toast('Saved locally but cloud sync failed: ' + r.error, 'error');
        });
      }
      toast('Agent updated', 'success');
      navigate('admin-agent-detail', { id });
      break;
    }
    case 'admin-reset-agent-password': {
      const id = el.dataset.id;
      const newPw = (document.getElementById('ea-newPassword') || {}).value || '';
      const errBox = document.getElementById('ea-pw-error');
      if (errBox) errBox.textContent = '';
      const A = window.PXDynastyAuth;
      if (!A || !A.resetAgentPassword) { toast('Auth module not loaded', 'error'); break; }
      if (!newPw || newPw.length < 6) {
        if (errBox) errBox.textContent = 'Password must be at least 6 characters.';
        break;
      }
      A.resetAgentPassword(id, newPw).then((res) => {
        if (!res.ok) {
          if (errBox) errBox.textContent = res.error;
          toast(res.error, 'error');
          return;
        }
        toast('Password reset for ' + res.email, 'success');
        const elIn = document.getElementById('ea-newPassword'); if (elIn) elIn.value = '';
      });
      break;
    }
    case 'admin-reset-password': {
      const id = el.dataset.id;
      const newPw = (document.getElementById('eb-newPassword') || {}).value || '';
      const errBox = document.getElementById('eb-pw-error');
      if (errBox) errBox.textContent = '';
      const A = window.PXDynastyAuth;
      if (!A || !A.resetBusinessOwnerPassword) { toast('Auth module not loaded', 'error'); break; }
      if (!newPw || newPw.length < 6) {
        if (errBox) errBox.textContent = 'Password must be at least 6 characters.';
        break;
      }
      A.resetBusinessOwnerPassword(id, newPw).then((res) => {
        if (!res.ok) {
          if (errBox) errBox.textContent = res.error;
          toast(res.error, 'error');
          return;
        }
        toast('Password reset for ' + res.email, 'success');
        const elIn = document.getElementById('eb-newPassword'); if (elIn) elIn.value = '';
      });
      break;
    }
    case 'admin-update-business': {
      const id = el.dataset.id;
      const b = getBusiness(id);
      if (!b) { toast('Business not found', 'error'); break; }
      b.name = (document.getElementById('eb-bizName') || {}).value || b.name;
      b.ownerName = (document.getElementById('eb-ownerName') || {}).value || b.ownerName;
      b.category = (document.getElementById('eb-category') || {}).value || b.category;
      b.phone = (document.getElementById('eb-phone') || {}).value || '';
      b.email = (document.getElementById('eb-email') || {}).value || '';
      b.address = (document.getElementById('eb-address') || {}).value || '';
      b.status = (document.getElementById('eb-status') || {}).value || b.status;
      const vEl = document.getElementById('eb-verified');
      b.verified = vEl ? vEl.value === 'true' : b.verified;
      saveData(DB);
      if (window.PXDynastySBC && window.PXDynastySBC.upsertBusiness) {
        window.PXDynastySBC.upsertBusiness(b).then((r) => {
          if (!r.ok) toast('Saved locally but cloud sync failed: ' + r.error, 'error');
        });
      }
      toast('Business updated', 'success');
      navigate('admin-business-detail', { id });
      break;
    }
    case 'biz-create-staff': {
      const A = window.PXDynastyAuth;
      if (!A || !A.createStaffAccount) { toast('Auth module not loaded', 'error'); break; }
      const errEl0 = document.getElementById('st-error'); if (errEl0) errEl0.textContent = 'Creating…';
      A.createStaffAccount({
        name:     (document.getElementById('st-name') || {}).value || '',
        phone:    (document.getElementById('st-phone') || {}).value || '',
        email:    (document.getElementById('st-email') || {}).value || '',
        password: (document.getElementById('st-password') || {}).value || '',
      }).then((res) => {
        if (!res.ok) {
          const errEl = document.getElementById('st-error'); if (errEl) errEl.textContent = res.error;
          toast(res.error, 'error');
          return;
        }
        toast('Staff account created: ' + res.user.email, 'success');
        const errEl = document.getElementById('st-error'); if (errEl) errEl.textContent = '';
        document.getElementById('st-name').value = '';
        document.getElementById('st-phone').value = '';
        document.getElementById('st-email').value = '';
        document.getElementById('st-password').value = '';
        loadStaffList();
      });
      break;
    }
    case 'open-order-chat': openOrderChat(el.dataset.orderId); break;
    case 'address-open': openAddressModal(el.dataset.id || null); break;
    case 'address-save': {
      const id = el.dataset.id || '';
      const cust = getCustomer(state.currentCustomerId);
      if (!cust) break;
      const label = ((document.getElementById('ad-label') || {}).value || '').trim();
      const line = ((document.getElementById('ad-line') || {}).value || '').trim();
      const phone = ((document.getElementById('ad-phone') || {}).value || '').trim();
      const isDefault = (document.getElementById('ad-default') || {}).checked || false;
      const errBox = document.getElementById('ad-error');
      if (!label) { if (errBox) errBox.textContent = 'Enter a label.'; break; }
      if (!line) { if (errBox) errBox.textContent = 'Enter the address.'; break; }
      cust.addresses = cust.addresses || [];
      if (id) {
        const a = cust.addresses.find((x) => x.id === id);
        if (a) {
          a.label = label; a.line = line; a.phone = phone;
          if (isDefault) cust.addresses.forEach((x) => { x.isDefault = false; });
          a.isDefault = isDefault;
        }
      } else {
        const newId = 'addr-' + Math.random().toString(36).slice(2, 8);
        const firstEver = cust.addresses.length === 0;
        if (isDefault || firstEver) cust.addresses.forEach((x) => { x.isDefault = false; });
        cust.addresses.push({ id: newId, label, line, phone, isDefault: isDefault || firstEver });
        if (!state.checkoutData) state.checkoutData = {};
        state.checkoutData.addressId = newId;
        state.checkoutData.address = line;
      }
      saveDataLocalOnly();
      if (window.PXDynastySBC && window.PXDynastySBC.upsertCustomer) window.PXDynastySBC.upsertCustomer(cust).catch(() => {});
      closeModal();
      toast(id ? 'Address updated' : 'Address added', 'success');
      render();
      break;
    }
    case 'address-delete': {
      const id = el.dataset.id;
      const cust = getCustomer(state.currentCustomerId);
      if (!cust) break;
      confirmDialog('Delete this address?', 'You can add it again later.', 'Delete', () => {
        cust.addresses = (cust.addresses || []).filter((x) => x.id !== id);
        const stillDefault = (cust.addresses || []).some((x) => x.isDefault);
        if (!stillDefault && cust.addresses[0]) cust.addresses[0].isDefault = true;
        saveDataLocalOnly();
        if (window.PXDynastySBC && window.PXDynastySBC.upsertCustomer) window.PXDynastySBC.upsertCustomer(cust).catch(() => {});
        toast('Address deleted', 'success');
        render();
      }, true);
      break;
    }
    case 'address-set-default': {
      const id = el.dataset.id;
      const cust = getCustomer(state.currentCustomerId);
      if (!cust) break;
      (cust.addresses || []).forEach((x) => { x.isDefault = (x.id === id); });
      saveDataLocalOnly();
      if (window.PXDynastySBC && window.PXDynastySBC.upsertCustomer) window.PXDynastySBC.upsertCustomer(cust).catch(() => {});
      toast('Default address updated', 'success');
      render();
      break;
    }
    case 'set-payment-preference': {
      const method = el.dataset.method;
      const cust = getCustomer(state.currentCustomerId);
      if (!cust) break;
      cust.preferredPaymentMethod = method;
      if (state.checkoutData) state.checkoutData.paymentMethod = method;
      saveDataLocalOnly();
      if (window.PXDynastySBC && window.PXDynastySBC.upsertCustomer) window.PXDynastySBC.upsertCustomer(cust).catch(() => {});
      toast('Payment preference saved', 'success');
      render();
      break;
    }
    case 'open-terms': navigate('customer-terms'); break;
    case 'open-privacy': navigate('customer-privacy'); break;
    case 'open-help': openHelpModal(); break;
    case 'chat-send': sendChatMessage(el.dataset.orderId); break;
    case 'open-more-menu': openMoreMenu(); break;
    case 'more-nav': closeModal(); navigate(el.dataset.view); break;
    case 'do-logout':
      closeModal();
      if (window.PXDynastyAuth && window.PXDynastyAuth.logout) window.PXDynastyAuth.logout();
      break;
    case 'toast-info': toast(el.dataset.msg, 'info'); break;
    case 'toast-success': toast(el.dataset.msg, 'success'); break;
    case 'close-modal': closeModal(); break;
    default: break;
  }
}

function captureCheckoutStepInputs(step) {
  if (step === 1) {
    const sel = document.getElementById('ck-address');
    if (sel) {
      const cust = getCustomer(state.currentCustomerId);
      const addr = cust && cust.addresses ? cust.addresses.find((a) => a.id === sel.value) : null;
      if (addr) { state.checkoutData.addressId = addr.id; state.checkoutData.address = addr.line; }
    }
    const freeform = document.getElementById('ck-address-freeform');
    if (freeform) state.checkoutData.address = freeform.value;
  } else if (step === 2) {
    const name = document.getElementById('ck-name'), phone = document.getElementById('ck-phone'), instr = document.getElementById('ck-instructions'), email = document.getElementById('ck-email');
    if (name) state.checkoutData.name = name.value;
    if (phone) state.checkoutData.phone = phone.value;
    if (email) state.checkoutData.email = email.value;
    if (instr) state.checkoutData.instructions = instr.value;

    // Persist phone + email onto the customer record so they're pre-filled next time.
    const cust = getCustomer(state.currentCustomerId);
    if (cust) {
      if (phone && phone.value) cust.phone = phone.value;
      if (email && email.value) cust.email = email.value;
      saveDataLocalOnly();
      if (window.PXDynastySBC && window.PXDynastySBC.upsertCustomer) {
        window.PXDynastySBC.upsertCustomer(cust).catch(() => {});
      }
    }
  }
}

async function placeOrderFlow() {
  const lines = cartLines();
  if (!lines.length) return;

  const cd = state.checkoutData;
  const totals = calculateOrderTotal(lines);

  // We need an email for Paystack. Fall back to the signed-in customer's email.
  const cust = getCustomer(state.currentCustomerId) || {};
  const authUser = window.PXDynastyAuth && window.PXDynastyAuth.currentUserSync && window.PXDynastyAuth.currentUserSync();
  const email = (cd && cd.email || '').trim()
              || (cust.email || '').trim()
              || (authUser && authUser.email || '').trim();
  if (!email) {
    toast('An email address is required to pay. Go back and add it on the details step.', 'error');
    return;
  }

  const area = document.getElementById('payment-processing-area');
  const payBtn = document.querySelector('.sticky-bottom-bar button');
  if (payBtn) payBtn.disabled = true;
  if (area) {
    area.innerHTML = `<div class="card mt-12 flex-col items-center" style="text-align:center;padding:26px;">
      <div class="skeleton" style="width:44px;height:44px;border-radius:50%;margin-bottom:12px;"></div>
      <strong>Opening secure payment…</strong>
      <p class="text-sm text-muted mt-8">Pay with your card, bank transfer, or USSD. Do not close this screen.</p>
    </div>`;
  }

  const Pay = window.PXDynastyPay;
  if (!Pay || !Pay.ready()) {
    if (area) area.innerHTML = '';
    if (payBtn) payBtn.disabled = false;
    toast('Payment is not available right now — try again in a moment.', 'error');
    return;
  }

  const result = await Pay.checkout({
    email,
    amountNaira: totals.total,
    customerName: cd.name,
    customerPhone: cd.phone,
    metadata: {
      customerId: state.currentCustomerId,
      businessId: lines[0].product.businessId,
    },
  });

  if (!result.ok) {
    if (area) area.innerHTML = '';
    if (payBtn) payBtn.disabled = false;
    if (result.reason === 'cancelled') {
      toast('Payment cancelled', 'info');
    } else {
      toast('Payment failed: ' + (result.message || 'unknown'), 'error');
    }
    return;
  }

  // Payment succeeded at Paystack. Now verify server-side before creating the order.
  if (area) {
    area.innerHTML = `<div class="card mt-12 flex-col items-center" style="text-align:center;padding:26px;">
      <strong>Verifying payment…</strong>
      <p class="text-sm text-muted mt-8">Almost done. Do not close this screen.</p>
    </div>`;
  }

  // Build one draft per business (from the checkout totals).
  const cartTotals = calculateOrderTotal(lines);
  const drafts = cartTotals.perBusiness.map((g) => buildOrderDraft({
    customerId: state.currentCustomerId,
    businessId: g.businessId,
    items: g.items.map((l) => ({ productId: l.productId, name: l.product.name, price: l.product.discountPrice || l.product.price, qty: l.qty })),
    deliveryAddress: cd.address,
    deliveryInstructions: cd.instructions,
    customerName: cd.name,
    customerPhone: cd.phone,
    paymentMethod: cd.paymentMethod,
  }));

  if (!window.PXDynastySBC || !window.PXDynastySBC.verifyPayment) {
    if (area) area.innerHTML = '';
    if (payBtn) payBtn.disabled = false;
    toast('Server verification unavailable. Please contact support with reference ' + result.reference, 'error');
    return;
  }

  const verify = await window.PXDynastySBC.verifyPayment(result.reference, drafts);

  if (!verify.ok) {
    if (area) area.innerHTML = `<div class="card mt-12" style="text-align:center;padding:22px;border-color:var(--color-error);background:var(--color-error-tint);">
      <strong style="color:var(--color-error);">Payment could not be verified</strong>
      <p class="text-sm mt-8" style="color:var(--color-error);margin-bottom:0;">${escapeHtml(verify.error || 'Unknown error')}. Save this reference and contact support: <strong>${escapeHtml(result.reference)}</strong></p>
    </div>`;
    toast('Payment verification failed', 'error');
    return;
  }

  // Verification succeeded — the Edge Function already inserted the orders.
  // Mirror them into the local cache so the customer sees them immediately.
  const now = new Date().toISOString();
  drafts.forEach((d) => {
    d.paymentReference = result.reference;
    d.paymentVerifiedAt = now;
    DB.orders.unshift(d);
  });
  saveDataLocalOnly();

  state.cart = [];
  saveCart();
  state.checkoutData = null;

  // Route to the first order's success page (contains the grand total).
  navigate('order-success', { orderId: drafts[0].id });
}

let _pendingProductImageUrl = null;

function saveProductForm(editId) {
  const name = document.getElementById('pf-name').value.trim();
  if (!name) { toast('Product name is required', 'error'); return; }
  const price = parseFloat(document.getElementById('pf-price').value) || 0;
  if (price <= 0) { toast('Enter a valid price', 'error'); return; }
  const category = document.getElementById('pf-category').value;
  const discount = parseFloat(document.getElementById('pf-discount').value) || null;
  const stock = parseInt(document.getElementById('pf-stock').value, 10) || 0;
  const status = document.getElementById('pf-status').value;
  const desc = document.getElementById('pf-desc').value;
  const sku = document.getElementById('pf-sku').value;

  if (editId) {
    const p = getProduct(editId);
    if (p) Object.assign(p, {
      name, category, price, discountPrice: discount, stock,
      status: stock === 0 ? 'out_of_stock' : status,
      description: desc, sku,
      imageUrl: _pendingProductImageUrl || p.imageUrl || null,
    });
    toast('Product updated', 'success');
  } else {
    DB.products.push({
      id: genId('prod'),
      businessId: state.currentBusinessId,
      name, category,
      description: desc || name,
      sku, price, discountPrice: discount, stock,
      status: stock === 0 ? 'out_of_stock' : status,
      rating: '—', sales: 0,
      hue: Math.floor(Math.random() * 360),
      emoji: categoryEmoji(category),
      imageUrl: _pendingProductImageUrl || null,
      createdAt: new Date().toISOString(),
    });
    toast('Product added', 'success');
  }
  _pendingProductImageUrl = null;
  saveData(DB);
  navigate('biz-products');
}

function openOtpModal(orderId) {
  const order = getOrder(orderId);
  if (!order) return;
  openModal(`
    <div class="modal-head"><h3>Confirm delivery</h3><button class="icon-btn" data-action="close-modal">${ICONS.x}</button></div>
    <p class="text-sm text-muted">Ask the customer for their 4-digit delivery code and enter it below.</p>
    <div class="otp-box mt-16" style="justify-content:center;">
      ${[0, 1, 2, 3].map((i) => `<input class="digit" maxlength="1" inputmode="numeric" data-otp-idx="${i}" style="text-align:center;" />`).join('')}
    </div>
    <button class="btn btn-primary btn-block mt-16" id="otp-confirm-btn">Confirm delivery</button>
  `);
  const inputs = document.querySelectorAll('[data-otp-idx]');
  inputs.forEach((inp, i) => {
    inp.addEventListener('input', () => { if (inp.value && inputs[i + 1]) inputs[i + 1].focus(); });
  });
  document.getElementById('otp-confirm-btn').addEventListener('click', () => {
    const code = Array.from(inputs).map((i) => i.value).join('');
    if (code.length < 4) { toast('Enter the full 4-digit code', 'error'); return; }
    if (code !== order.otp) { toast('Incorrect code', 'error'); return; }
    updateOrderStatus(orderId, 'delivered');
    closeModal();
    render();
    toast('Delivery confirmed — earnings updated', 'success');
  });
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  const roleMenu = document.getElementById('role-menu');
  const rolePill = e.target.closest('.role-pill');
  if (roleMenu && roleMenu.classList.contains('open') && !rolePill && !roleMenu.contains(e.target)) roleMenu.classList.remove('open');
  const overlay = document.getElementById('modal-root');
  if (overlay && e.target === overlay) closeModal();
  if (!el) return;
  handleAction(el, e);
});

document.addEventListener('change', async (e) => {
  if (e.target && e.target.id === 'pf-image' && e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const status = document.getElementById('pf-image-status');
    if (status) status.textContent = 'Uploading…';
    const sbcMod = window.PXDynastySBC;
    if (!sbcMod || !sbcMod.uploadProductImage) {
      if (status) status.textContent = 'Upload module not available.';
      return;
    }
    const res = await sbcMod.uploadProductImage(file);
    if (!res.ok) {
      if (status) status.textContent = 'Upload failed: ' + (res.error || 'unknown');
      toast('Image upload failed', 'error');
      return;
    }
    _pendingProductImageUrl = res.url;
    if (status) status.textContent = 'Uploaded ✓';
    const box = document.getElementById('pf-image-box');
    if (box) {
      const img = document.createElement('img');
      img.src = res.url;
      img.alt = '';
      img.style.maxHeight = '180px';
      img.style.margin = '0 auto';
      img.style.borderRadius = 'var(--radius-sm)';
      // Clear old placeholder content but keep the file input.
      box.querySelectorAll('svg, div').forEach((n) => n.remove());
      box.insertBefore(img, box.querySelector('input'));
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.target && e.target.id === 'home-search-input' && e.key === 'Enter') { state.searchQuery = e.target.value; navigate('search'); }
  if (e.target && e.target.id === 'admin-cust-search' && e.key === 'Enter') { navigate('admin-customers', { q: e.target.value }); }
});

/* ==========================================================================
   15. INIT
   ========================================================================== */

async function boot() {
  try {
    const ok = await hydrateDb();
    console.log('hydrateDb:', ok ? 'loaded from Supabase' : 'using local cache');
  } catch (e) {
    console.warn('hydrateDb failed:', e);
  }

  if (window.PXDynastyAuth && typeof window.PXDynastyAuth.renderAuthGate === 'function') {
    await window.PXDynastyAuth.renderAuthGate();
  } else {
    render();
  }
}

boot();
