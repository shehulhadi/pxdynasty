/* ==========================================================================
   PXDynasty — auth.js (Supabase-backed)
   Landing page + login/signup + session + role routing + admin provisioning.
   Users are stored in Supabase. Sessions stay in localStorage (device cookie).
   ========================================================================== */

const AUTH_STORAGE_KEY = 'PXDynasty_auth_v1';
const ADMIN_CREDENTIALS = {
  email: 'admin@pxdynasty.local',
  password: 'px-admin-2026',
  name: 'Platform Admin',
};

function authAppDb()   { try { return DB; }    catch (e) { return null; } }
function authAppState(){ try { return state; } catch (e) { return null; } }
function sbc()         { return window.PXDynastySBC || null; }

/* Local session (device cookie). */
function authLoadSession() {
  try { return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)); }
  catch (e) { return null; }
}
function authSaveSession(session) {
  if (session) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  else localStorage.removeItem(AUTH_STORAGE_KEY);
}

/* Supabase helpers for the users table. */
async function usersGetByEmail(email) {
  const s = window.supabase && window.supabase.createClient(
    'https://ocsglgkombwwpamdijes.supabase.co',
    'sb_publishable_6HHZQ1MoXmpvi45SD2k9fw_Rj_c3gGB'
  );
  if (!s) return null;
  const { data, error } = await s.from('users').select('*').eq('email', email).limit(1);
  if (error) { console.error('usersGetByEmail', error); return null; }
  return (data && data[0]) || null;
}
async function usersGetById(id) {
  const s = window.supabase && window.supabase.createClient(
    'https://ocsglgkombwwpamdijes.supabase.co',
    'sb_publishable_6HHZQ1MoXmpvi45SD2k9fw_Rj_c3gGB'
  );
  if (!s) return null;
  const { data, error } = await s.from('users').select('*').eq('id', id).limit(1);
  if (error) { console.error('usersGetById', error); return null; }
  return (data && data[0]) || null;
}
async function usersInsert(row) {
  const s = window.supabase && window.supabase.createClient(
    'https://ocsglgkombwwpamdijes.supabase.co',
    'sb_publishable_6HHZQ1MoXmpvi45SD2k9fw_Rj_c3gGB'
  );
  if (!s) return { ok: false, error: 'Supabase SDK not loaded' };
  const { data, error } = await s.from('users').insert(row).select().single();
  if (error) { console.error('usersInsert', error); return { ok: false, error: error.message }; }
  return { ok: true, user: data };
}

function userRowToApp(u) {
  return {
    id: u.id,
    email: u.email,
    password: u.password,
    name: u.name,
    role: u.role,
    businessId: u.business_id,
    agentId: u.agent_id,
    customerId: u.customer_id,
    createdAt: u.created_at,
  };
}
function userAppToRow(u) {
  return {
    id: u.id,
    email: u.email,
    password: u.password,
    name: u.name,
    role: u.role,
    business_id: u.businessId || null,
    agent_id: u.agentId || null,
    customer_id: u.customerId || null,
  };
}

/* Ensure the hardcoded admin exists in Supabase. */
async function authEnsureAdmin() {
  const existing = await usersGetByEmail(ADMIN_CREDENTIALS.email);
  if (existing) return userRowToApp(existing);
  const row = {
    id: 'u-admin',
    email: ADMIN_CREDENTIALS.email,
    password: ADMIN_CREDENTIALS.password,
    name: ADMIN_CREDENTIALS.name,
    role: 'admin',
  };
  const res = await usersInsert(row);
  return res.ok ? userRowToApp(res.user) : null;
}

/* ---------- auth actions ---------- */

async function authSignup(email, password, name) {
  email = String(email || '').trim().toLowerCase();
  name = String(name || '').trim();
  if (!email || !email.includes('@')) return { ok: false, error: 'Enter a valid email address.' };
  if (!name) return { ok: false, error: 'Enter your name.' };
  if (!password || password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };

  const existing = await usersGetByEmail(email);
  if (existing) return { ok: false, error: 'An account with that email already exists.' };

  const userId = 'u-' + Math.random().toString(36).slice(2, 10);
  const custId = 'cust-' + userId;
  const userRow = {
    id: userId,
    email, password, name,
    role: 'customer',
    customer_id: custId,
  };
  const ins = await usersInsert(userRow);
  if (!ins.ok) return { ok: false, error: ins.error };

  // Create the customer record in the DB + Supabase.
  const db = authAppDb();
  const cust = { id: custId, name, email, phone: '', addresses: [], paymentMethods: [] };
  if (db) {
    db.customers.push(cust);
    if (window.PXDynastySBC && window.PXDynastySBC.upsertCustomer) {
      window.PXDynastySBC.upsertCustomer(cust).catch(() => {});
    }
  }

  const user = userRowToApp(ins.user);
  authSaveSession({ userId: user.id, role: user.role, at: Date.now() });
  return { ok: true, user };
}

async function authLogin(email, password) {
  email = String(email || '').trim().toLowerCase();
  password = String(password || '');
  if (!email || !password) return { ok: false, error: 'Enter your email and password.' };

  // Admin check.
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const admin = await authEnsureAdmin();
    if (!admin) return { ok: false, error: 'Could not provision admin account.' };
    authSaveSession({ userId: admin.id, role: 'admin', at: Date.now() });
    return { ok: true, user: admin };
  }

  const row = await usersGetByEmail(email);
  if (!row || row.password !== password) {
    return { ok: false, error: 'Invalid email or password.' };
  }
  const user = userRowToApp(row);
  authSaveSession({ userId: user.id, role: user.role, at: Date.now() });
  return { ok: true, user };
}

function authLogout() {
  authSaveSession(null);
  const appState = authAppState();
  if (appState) { appState.role = 'customer'; appState.view = 'home'; }
  renderAuthGate();
}

async function authCurrentUser() {
  const session = authLoadSession();
  if (!session) return null;
  const row = await usersGetById(session.userId);
  return row ? userRowToApp(row) : null;
}

/* Synchronous cache of the current user, populated after login/hydration. */
let _currentUserCache = null;

function authCurrentUserSync() { return _currentUserCache; }

async function authIsLoggedInAsync() {
  const u = await authCurrentUser();
  return !!u;
}

/* Kept for compatibility with existing callers. Uses the cache when
   available; otherwise returns false (renderAuthGate is async now). */
function authIsLoggedIn() { return !!_currentUserCache; }

async function authApplySessionToApp() {
  const user = await authCurrentUser();
  if (!user) return false;
  _currentUserCache = user;
  const appState = authAppState();
  if (!appState) return false;

  if (user.role === 'admin') {
    appState.role = 'admin';
    appState.view = 'dashboard';
  } else if (user.role === 'business') {
    appState.role = 'business';
    appState.view = 'overview';
    appState.currentBusinessId = user.businessId || null;
    appState.isStaff = false;
  } else if (user.role === 'staff') {
    appState.role = 'business';
    appState.view = 'biz-orders';
    appState.currentBusinessId = user.businessId || null;
    appState.isStaff = true;
  } else if (user.role === 'agent') {
    appState.role = 'agent';
    appState.view = 'jobs';
    appState.currentAgentId = user.agentId || null;
  } else {
    appState.role = 'customer';
    appState.view = 'home';
    appState.currentCustomerId = user.customerId || null;
    // Backfill email/name on the customer record if missing.
    const db2 = authAppDb();
    if (db2 && user.customerId) {
      const cust = db2.customers.find((c) => c.id === user.customerId);
      if (cust) {
        let changed = false;
        if (!cust.email && user.email) { cust.email = user.email; changed = true; }
        if (!cust.name && user.name)  { cust.name = user.name; changed = true; }
        if (changed) {
          saveDataLocalOnly();
          if (window.PXDynastySBC && window.PXDynastySBC.upsertCustomer) {
            window.PXDynastySBC.upsertCustomer(cust).catch(() => {});
          }
        }
      }
    }
  }
  return true;
}

/* ---------- admin provisioning ---------- */

async function authCreateBusinessAccount(opts) {
  opts = opts || {};
  const email = String(opts.email || '').trim().toLowerCase();
  const password = String(opts.password || '');
  const ownerName = String(opts.ownerName || '').trim();
  const businessName = String(opts.businessName || '').trim();
  const category = opts.category || 'groceries';
  const phone = String(opts.phone || '').trim();
  const address = String(opts.address || '').trim();

  if (!email || !email.includes('@')) return { ok: false, error: 'Enter a valid email.' };
  if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
  if (!businessName) return { ok: false, error: 'Enter the business name.' };

  const existing = await usersGetByEmail(email);
  if (existing) return { ok: false, error: 'An account with that email already exists.' };

  const bizId = 'biz-' + Math.random().toString(36).slice(2, 9);
  const bizRecord = {
    id: bizId,
    name: businessName,
    category,
    ownerName: ownerName || businessName,
    phone, email, address,
    rating: '—',
    verified: true,
    status: 'active',
    deliveryEstimate: 30,
    hue: Math.floor(Math.random() * 360),
    open: true,
    createdAt: new Date().toISOString(),
  };

  const db = authAppDb();
  if (db) {
    db.businesses.push(bizRecord);
    if (window.PXDynastySBC && window.PXDynastySBC.upsertBusiness) {
      const bizRes = await window.PXDynastySBC.upsertBusiness(bizRecord);
      if (!bizRes.ok) {
        console.error('business upsert failed', bizRes);
        return { ok: false, error: 'Business save failed: ' + (bizRes.error || 'unknown') };
      }
    } else {
      return { ok: false, error: 'Supabase client not available (window.PXDynastySBC missing)' };
    }
    try { saveDataLocalOnly(); } catch (e) {}
  }

  const userId = 'u-' + Math.random().toString(36).slice(2, 10);
  const userRow = {
    id: userId,
    email, password,
    name: ownerName || businessName,
    role: 'business',
    business_id: bizId,
  };
  const ins = await usersInsert(userRow);
  if (!ins.ok) return { ok: false, error: 'User insert failed: ' + ins.error };

  return { ok: true, user: userRowToApp(ins.user), business: bizRecord };
}

/* Create a staff user tied to the currently signed-in business owner.
   Only a business-role user can call this. */
async function authCreateStaffAccount(opts) {
  opts = opts || {};
  const email = String(opts.email || '').trim().toLowerCase();
  const password = String(opts.password || '');
  const name = String(opts.name || '').trim();

  if (!email || !email.includes('@')) return { ok: false, error: 'Enter a valid email.' };
  if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
  if (!name) return { ok: false, error: 'Enter a name.' };

  // The caller must be a business owner and know their business id.
  const caller = _currentUserCache;
  if (!caller || caller.role !== 'business') {
    return { ok: false, error: 'Only a business owner can create staff accounts.' };
  }
  const businessId = caller.businessId;
  if (!businessId) return { ok: false, error: 'No business attached to your account.' };

  const existing = await usersGetByEmail(email);
  if (existing) return { ok: false, error: 'An account with that email already exists.' };

  const userId = 'u-' + Math.random().toString(36).slice(2, 10);
  const userRow = {
    id: userId,
    email, password, name,
    role: 'staff',
    business_id: businessId,
  };
  const ins = await usersInsert(userRow);
  if (!ins.ok) return { ok: false, error: 'Staff insert failed: ' + ins.error };

  return { ok: true, user: userRowToApp(ins.user) };
}

/* Admin-only: update a user account (used for agent + business). */
async function authUpdateUserForRole(role, refId, patch) {
  if (!role || !refId) return { ok: false, error: 'Missing role or id.' };
  const s = window.supabase && window.supabase.createClient(
    'https://ocsglgkombwwpamdijes.supabase.co',
    'sb_publishable_6HHZQ1MoXmpvi45SD2k9fw_Rj_c3gGB'
  );
  if (!s) return { ok: false, error: 'Supabase SDK not loaded' };
  const col = role === 'business' ? 'business_id' : role === 'agent' ? 'agent_id' : null;
  if (!col) return { ok: false, error: 'Unsupported role.' };
  const { data: found, error: findErr } = await s.from('users')
    .select('id,email').eq(col, refId).eq('role', role).limit(1);
  if (findErr) return { ok: false, error: findErr.message };
  if (!found || !found.length) return { ok: false, error: 'No ' + role + ' login found.' };
  const { error: updErr } = await s.from('users').update(patch).eq('id', found[0].id);
  if (updErr) return { ok: false, error: updErr.message };
  return { ok: true, email: found[0].email };
}

async function authResetAgentPassword(agentId, newPassword) {
  return authUpdateUserForRole('agent', agentId, { password: newPassword });
}

/* Admin-only: change the password of the user account tied to a business. */
async function authResetBusinessOwnerPassword(businessId, newPassword) {
  if (!businessId) return { ok: false, error: 'No business id.' };
  if (!newPassword || newPassword.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
  const s = window.supabase && window.supabase.createClient(
    'https://ocsglgkombwwpamdijes.supabase.co',
    'sb_publishable_6HHZQ1MoXmpvi45SD2k9fw_Rj_c3gGB'
  );
  if (!s) return { ok: false, error: 'Supabase SDK not loaded' };
  // Find the business-role user linked to this business.
  const { data: found, error: findErr } = await s.from('users')
    .select('id,email,role')
    .eq('business_id', businessId)
    .eq('role', 'business')
    .limit(1);
  if (findErr) return { ok: false, error: findErr.message };
  if (!found || !found.length) return { ok: false, error: 'No business-owner login found for this business.' };
  const { error: updErr } = await s.from('users').update({ password: newPassword }).eq('id', found[0].id);
  if (updErr) return { ok: false, error: updErr.message };
  return { ok: true, email: found[0].email };
}

async function authListStaffForCurrentBusiness() {
  const caller = _currentUserCache;
  if (!caller || caller.role !== 'business' || !caller.businessId) return [];
  const s = window.supabase && window.supabase.createClient(
    'https://ocsglgkombwwpamdijes.supabase.co',
    'sb_publishable_6HHZQ1MoXmpvi45SD2k9fw_Rj_c3gGB'
  );
  if (!s) return [];
  const { data, error } = await s.from('users')
    .select('*')
    .eq('role', 'staff')
    .eq('business_id', caller.businessId);
  if (error) { console.error('listStaff', error); return []; }
  return (data || []).map(userRowToApp);
}

async function authCreateAgentAccount(opts) {
  opts = opts || {};
  const email = String(opts.email || '').trim().toLowerCase();
  const password = String(opts.password || '');
  const name = String(opts.name || '').trim();
  const phone = String(opts.phone || '').trim();
  const vehicle = opts.vehicle || 'Motorcycle';
  const operatingArea = String(opts.operatingArea || '').trim();

  if (!email || !email.includes('@')) return { ok: false, error: 'Enter a valid email.' };
  if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
  if (!name) return { ok: false, error: 'Enter the agent name.' };

  const existing = await usersGetByEmail(email);
  if (existing) return { ok: false, error: 'An account with that email already exists.' };

  const agentId = 'agent-' + Math.random().toString(36).slice(2, 9);
  const agentRecord = {
    id: agentId, name, phone, vehicle,
    status: 'offline', verified: true, rating: '—', operatingArea,
    completedDeliveries: 0,
    earningsToday: 0, earningsWeek: 0, earningsPending: 0, earningsPaid: 0,
    createdAt: new Date().toISOString(),
  };

  const db = authAppDb();
  if (db) {
    db.agents.push(agentRecord);
    if (window.PXDynastySBC && window.PXDynastySBC.upsertAgent) {
      const agRes = await window.PXDynastySBC.upsertAgent(agentRecord);
      if (!agRes || !agRes.ok) {
        return { ok: false, error: 'Agent save failed: ' + ((agRes && agRes.error) || 'unknown') };
      }
    } else {
      return { ok: false, error: 'Supabase client not available (window.PXDynastySBC missing)' };
    }
    try { saveDataLocalOnly(); } catch (e) {}
  }

  const userId = 'u-' + Math.random().toString(36).slice(2, 10);
  const userRow = {
    id: userId,
    email, password, name,
    role: 'agent',
    agent_id: agentId,
  };
  const ins = await usersInsert(userRow);
  if (!ins.ok) return { ok: false, error: ins.error };

  return { ok: true, user: userRowToApp(ins.user), agent: agentRecord };
}

/* ---------- landing page ---------- */

function renderLandingPage() {
  return `
    <div class="landing-shell">

      <!-- NAV -->
      <header class="landing-nav">
        <div class="landing-nav-inner">
          <div class="landing-logo">
            <span class="landing-logo-mark">PX</span>
            <span class="landing-logo-text">PXDynasty</span>
          </div>
          <a href="javascript:void(0)" class="landing-signin" data-auth="show-login">Sign in</a>
        </div>
      </header>

      <!-- HERO -->
      <section class="landing-hero">
        <div class="landing-hero-inner">
          <p class="landing-eyebrow">Local marketplace · Yola &amp; beyond</p>
          <h1 class="landing-h1">
            One checkout.<br/>
            Every shop in town.
          </h1>
          <p class="landing-lede">
            Order from several local businesses in a single cart. Pay once.
            Each shop prepares and delivers its own items to your door.
          </p>
          <div class="landing-actions">
            <button class="btn btn-primary" data-auth="show-signup">Start shopping</button>
            <a href="javascript:void(0)" class="landing-link" data-auth="show-merchant">Own a business? Talk to us <span aria-hidden="true">→</span></a>
          </div>

          <div class="landing-proof" id="landing-proof">
            <span class="proof-item"><strong id="proof-biz">—</strong> local merchants</span>
            <span class="proof-dot">·</span>
            <span class="proof-item"><strong id="proof-prod">—</strong> products listed</span>
            <span class="proof-dot">·</span>
            <span class="proof-item"><strong id="proof-ord">—</strong> orders processed</span>
          </div>
        </div>
      </section>

      <!-- PRODUCT PREVIEW -->
      <section class="landing-preview">
        <div class="landing-preview-inner">
          <div class="preview-card">
            <div class="preview-thumb">
              <div class="preview-thumb-inner">🍗</div>
            </div>
            <div class="preview-body">
              <div class="preview-biz">PX Poultry</div>
              <div class="preview-name">Live Broiler — whole bird</div>
              <div class="preview-rating">★ 4.8 · 12 sold</div>
              <div class="preview-price">₦8,500</div>
              <div class="preview-cta">Add to cart</div>
            </div>
          </div>
          <div class="preview-text">
            <h2>Real products. Real shops. Real delivery.</h2>
            <p>Every listing is from a verified local business. Browse their actual stock, prices, and photos — no middleman guessing.</p>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="landing-how">
        <div class="landing-how-inner">
          <p class="landing-eyebrow">How it works</p>
          <h2 class="landing-h2">Three steps. No friction.</h2>

          <div class="landing-steps">
            <div class="landing-step">
              <div class="landing-step-num">01</div>
              <h3>Browse shops near you</h3>
              <p>Pick items from any combination of local businesses. Your cart keeps them organised by shop automatically.</p>
            </div>
            <div class="landing-step">
              <div class="landing-step-num">02</div>
              <h3>Pay once for everything</h3>
              <p>One secure payment covers every shop in your cart. We split the total and settle each business fairly.</p>
            </div>
            <div class="landing-step">
              <div class="landing-step-num">03</div>
              <h3>Each shop delivers to you</h3>
              <p>Your orders arrive separately — fresh from each kitchen, shop, or farm. Track every delivery in real time.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- MERCHANT INVITE -->
      <section class="landing-merchant">
        <div class="landing-merchant-inner">
          <div class="landing-merchant-text">
            <p class="landing-eyebrow">For business owners</p>
            <h2 class="landing-h2">Run a shop or farm?</h2>
            <p>PXDynasty gives you an online storefront, order management, and delivery coordination — without needing your own website or logistics team.</p>
          </div>
          <button class="btn btn-primary" data-auth="show-merchant">Get in touch</button>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="landing-footer">
        <div class="landing-footer-inner">
          <div class="footer-brand">
            <span class="landing-logo-mark" style="width:28px;height:28px;font-size:13px;">PX</span>
            <span style="font-weight:700;">PXDynasty</span>
          </div>
          <p class="footer-line">Operated by Ma'aka Store Businesses · Yola, Adamawa State</p>
          <div class="footer-links">
            <a href="javascript:void(0)" data-auth="show-terms">Terms</a>
            <a href="javascript:void(0)" data-auth="show-privacy">Privacy</a>
            <a href="javascript:void(0)" data-auth="show-help">Help</a>
            <a href="javascript:void(0)" data-auth="show-login">Sign in</a>
          </div>
        </div>
      </footer>

    </div>

    <!-- AUTH MODAL container — the login/signup/merchant form lives here -->
    <div class="landing-auth-overlay" id="landing-auth-overlay" hidden>
      <div class="landing-auth-sheet" id="landing-auth-sheet"></div>
    </div>
  `;
}

function renderLandingProofCounts() {
  // Fire-and-forget: fetch counts and update the strip. If it fails, leave dashes.
  if (!window.PXDynastySBC || !window.PXDynastySBC.fetchCounts) return;
  window.PXDynastySBC.fetchCounts().then((counts) => {
    if (!counts) return;
    const set = (id, n) => { const el = document.getElementById(id); if (el) el.textContent = n; };
    set('proof-biz', counts.businesses);
    set('proof-prod', counts.products);
    set('proof-ord', counts.orders);
  }).catch(() => {});
}

function openLandingAuth(mode) {
  const overlay = document.getElementById('landing-auth-overlay');
  const sheet = document.getElementById('landing-auth-sheet');
  if (!overlay || !sheet) return;

  if (mode === 'merchant') {
    sheet.innerHTML = `
      <div class="landing-auth-card">
        <button class="landing-auth-close" data-auth="close-auth">×</button>
        <p class="landing-eyebrow">For business owners</p>
        <h2>Talk to us about selling on PXDynasty</h2>
        <p class="text-muted" style="margin-bottom:18px;">Tell us about your business. We'll set up your storefront and send you login details.</p>

        <div class="form-group"><label>Business name</label><input type="text" id="lm-bizName" placeholder="e.g. Shehu Poultry Farm" /></div>
        <div class="form-group"><label>Owner name</label><input type="text" id="lm-ownerName" placeholder="Your name" /></div>
        <div class="form-row">
          <div class="form-group"><label>Phone</label><input type="tel" id="lm-phone" placeholder="080…" /></div>
          <div class="form-group"><label>Email</label><input type="email" id="lm-email" placeholder="you@example.com" /></div>
        </div>
        <div class="form-group"><label>What do you sell?</label><textarea id="lm-desc" placeholder="e.g. fresh poultry, eggs, and frozen chicken" style="min-height:70px;"></textarea></div>
        <div class="auth-error" id="lm-error"></div>
        <button class="btn btn-primary btn-block mt-8" data-auth="submit-merchant">Send enquiry</button>
      </div>
    `;
  } else {
    sheet.innerHTML = `
      <div class="landing-auth-card">
        <button class="landing-auth-close" data-auth="close-auth">×</button>
        <div id="auth-panel">${renderAuthPanel(mode)}</div>
      </div>
    `;
  }
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLandingAuth() {
  const overlay = document.getElementById('landing-auth-overlay');
  if (overlay) overlay.hidden = true;
  document.body.style.overflow = '';
}

async function submitMerchantEnquiry() {
  const errEl = document.getElementById('lm-error');
  if (errEl) errEl.textContent = '';
  const bizName = (document.getElementById('lm-bizName') || {}).value || '';
  const ownerName = (document.getElementById('lm-ownerName') || {}).value || '';
  const phone = (document.getElementById('lm-phone') || {}).value || '';
  const email = (document.getElementById('lm-email') || {}).value || '';
  const desc = (document.getElementById('lm-desc') || {}).value || '';

  if (!bizName.trim()) { if (errEl) errEl.textContent = 'Enter your business name.'; return; }
  if (!phone.trim() && !email.trim()) { if (errEl) errEl.textContent = 'Enter a phone or email so we can reach you.'; return; }

  const ticket = {
    id: 'sup-' + Math.random().toString(36).slice(2, 10),
    orderId: null,
    openedById: 'public-' + Math.random().toString(36).slice(2, 8),
    openedByRole: 'public',
    openedByName: ownerName || bizName,
    subject: 'Merchant signup enquiry',
    body: `Business: ${bizName}\nOwner: ${ownerName}\nPhone: ${phone}\nEmail: ${email}\n\nWhat they sell: ${desc}`,
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  if (window.PXDynastySBC && window.PXDynastySBC.insertTicket) {
    const r = await window.PXDynastySBC.insertTicket(ticket);
    if (!r.ok) { if (errEl) errEl.textContent = 'Failed: ' + (r.error || ''); return; }
  }

  closeLandingAuth();
  alert('Thanks — we\'ll be in touch shortly.');
}

function renderAuthPanel(mode) {
  if (mode === 'signup') {
    return `
      <div class="auth-card">
        <h2>Create your account</h2>
        <p class="text-sm text-muted">Sign up as a customer to shop. Business and delivery-agent accounts are created by the platform admin.</p>
        <div class="form-group"><label>Full name</label><input type="text" id="au-name" placeholder="e.g. Amina Bello" autocomplete="name" /></div>
        <div class="form-group"><label>Email</label><input type="email" id="au-email" placeholder="you@example.com" autocomplete="email" /></div>
        <div class="form-group"><label>Password</label><input type="password" id="au-password" placeholder="At least 6 characters" autocomplete="new-password" /></div>
        <div class="auth-error" id="au-error"></div>
        <button class="btn btn-primary btn-block" data-auth="do-signup">Create account</button>
        <p class="text-sm text-muted mt-16" style="text-align:center;">Already have an account?
          <a href="javascript:void(0)" data-auth="show-login" style="color:var(--color-primary-dark);font-weight:700;">Sign in</a></p>
      </div>
    `;
  }
  return `
    <div class="auth-card">
      <h2>Sign in</h2>
      <p class="text-sm text-muted">Welcome back. Enter your details to continue.</p>
      <div class="form-group"><label>Email</label><input type="email" id="au-email" placeholder="you@example.com" autocomplete="email" /></div>
      <div class="form-group"><label>Password</label><input type="password" id="au-password" placeholder="Your password" autocomplete="current-password" /></div>
      <div class="auth-error" id="au-error"></div>
      <button class="btn btn-primary btn-block" data-auth="do-login">Sign in</button>
      <p class="text-sm text-muted mt-16" style="text-align:center;">New here?
        <a href="javascript:void(0)" data-auth="show-signup" style="color:var(--color-primary-dark);font-weight:700;">Create an account</a></p>
    </div>
  `;
}

/* ---------- auth gate ---------- */

async function renderAuthGate() {
  const appEl = document.getElementById('app');
  const toastEl = document.getElementById('toast-root');
  const modalEl = document.getElementById('modal-root');

  // Refresh cache from Supabase if a session exists.
  const user = await authCurrentUser();
  _currentUserCache = user;

  if (user) {
    appEl.classList.remove('auth-mode');
    appEl.innerHTML = `
      <div id="header-root"></div>
      <div class="app-body">
        <div id="sidebar-root"></div>
        <main class="main-scroll" id="main-scroll"></main>
      </div>
      <div id="bottomnav-root"></div>
    `;
    await authApplySessionToApp();
    if (typeof render === 'function') render();
    return;
  }

  appEl.classList.add('auth-mode');
  appEl.innerHTML = renderLandingPage();
  if (toastEl) toastEl.innerHTML = '';
  if (modalEl) { modalEl.classList.remove('open'); modalEl.innerHTML = ''; }
  if (typeof renderLandingProofCounts === 'function') renderLandingProofCounts();
}

/* ---------- event wiring ---------- */

function authShowPanel(mode) {
  const panel = document.getElementById('auth-panel');
  if (!panel) return;
  panel.innerHTML = renderAuthPanel(mode);
}
function authShowError(msg) {
  const el = document.getElementById('au-error');
  if (el) el.textContent = msg || '';
}
function authReadForm() {
  return {
    name: (document.getElementById('au-name') || {}).value || '',
    email: (document.getElementById('au-email') || {}).value || '',
    password: (document.getElementById('au-password') || {}).value || '',
  };
}

document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-auth]');
  if (!el) return;
  const action = el.dataset.auth;

  // Landing interactions
  if (action === 'show-login') { openLandingAuth('login'); return; }
  if (action === 'show-signup') { openLandingAuth('signup'); return; }
  if (action === 'show-merchant') { openLandingAuth('merchant'); return; }
  if (action === 'close-auth') { closeLandingAuth(); return; }
  if (action === 'submit-merchant') { submitMerchantEnquiry(); return; }
  if (action === 'show-terms') { openLandingInfo('terms'); return; }
  if (action === 'show-privacy') { openLandingInfo('privacy'); return; }
  if (action === 'show-help') { openLandingInfo('help'); return; }

  // Auth submit (form lives in the modal)
  if (action === 'do-login') {
    const { email, password } = authReadForm();
    authShowError('Signing in…');
    const res = await authLogin(email, password);
    if (!res.ok) { authShowError(res.error); return; }
    closeLandingAuth();
    await renderAuthGate();
    return;
  }
  if (action === 'do-signup') {
    const { name, email, password } = authReadForm();
    authShowError('Creating account…');
    const res = await authSignup(email, password, name);
    if (!res.ok) { authShowError(res.error); return; }
    closeLandingAuth();
    await renderAuthGate();
    return;
  }
  if (action === 'logout') { authLogout(); return; }
});

/* Simple read-only info modal used by the footer links. */
function openLandingInfo(kind) {
  const overlay = document.getElementById('landing-auth-overlay');
  const sheet = document.getElementById('landing-auth-sheet');
  if (!overlay || !sheet) return;
  const bodies = {
    terms: `<h2>Terms of service</h2>
      <p class="text-muted" style="line-height:1.7;">PXDynasty connects customers, local businesses, and delivery agents. When you place an order, the business fulfils it and the platform processes payment via Paystack. Disputes must be raised within 24 hours of delivery.</p>
      <p class="text-muted" style="line-height:1.7;">Businesses are responsible for the accuracy of their listings. Delivery agents are independent contractors. Full terms available on request.</p>`,
    privacy: `<h2>Privacy policy</h2>
      <p class="text-muted" style="line-height:1.7;">We collect your name, phone, email, delivery address, and order history. Card data is handled entirely by Paystack and never touches PXDynasty systems.</p>
      <p class="text-muted" style="line-height:1.7;">The business fulfilling your order and the delivery agent see only the information needed to complete the delivery. We do not sell your data.</p>`,
    help: `<h2>Help &amp; support</h2>
      <p class="text-muted" style="line-height:1.7;">For order issues, use the <strong>Contact support</strong> button on any order page. For general enquiries or business onboarding, reach us on WhatsApp at <strong>+234 906 320 0718</strong> or email <strong>hello@pxdynasty.com</strong>.</p>`,
  };
  sheet.innerHTML = `
    <div class="landing-auth-card">
      <button class="landing-auth-close" data-auth="close-auth">×</button>
      ${bodies[kind] || ''}
    </div>
  `;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

/* Close on backdrop click. */
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('landing-auth-overlay');
  if (overlay && !overlay.hidden && e.target === overlay) closeLandingAuth();
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const t = e.target;
  if (!t) return;
  if (t.id === 'au-name' || t.id === 'au-email' || t.id === 'au-password') {
    const signupVisible = document.getElementById('au-name');
    const action = signupVisible ? 'do-signup' : 'do-login';
    const btn = document.querySelector(`[data-auth="${action}"]`);
    if (btn) btn.click();
  }
});

/* ---------- expose ---------- */

window.PXDynastyAuth = {
  currentUser: authCurrentUser,
  currentUserSync: authCurrentUserSync,
  isLoggedIn: authIsLoggedIn,
  logout: authLogout,
  applySessionToApp: authApplySessionToApp,
  renderAuthGate,
  createBusinessAccount: authCreateBusinessAccount,
  createAgentAccount: authCreateAgentAccount,
  createStaffAccount: authCreateStaffAccount,
  listStaff: authListStaffForCurrentBusiness,
  resetBusinessOwnerPassword: authResetBusinessOwnerPassword,
  resetAgentPassword: authResetAgentPassword,
};
