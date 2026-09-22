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
      await window.PXDynastySBC.upsertAgent(agentRecord);
    }
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
    <div class="auth-shell">
      <div class="auth-hero">
        <div class="auth-blobs">
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
          <div class="blob blob-3"></div>
        </div>
        <div class="auth-hero-inner">
          <div class="auth-brand">
            <span class="brand-mark" style="width:38px;height:38px;font-size:17px;">PX</span>
            <span>PXDynasty</span>
          </div>
          <p class="auth-eyebrow">Local marketplace · delivered</p>
          <h1 class="auth-title">
            Everything local.<br/>
            <span class="auth-title-accent">Delivered to your door.</span>
          </h1>
          <p class="auth-lead">
            PXDynasty connects neighbourhood businesses and customers with fast,
            reliable delivery — one checkout, one delivery, one platform.
          </p>
          <div class="auth-cta-row">
            <button class="btn btn-primary" data-auth="show-signup">Create a customer account</button>
            <button class="btn btn-outline" data-auth="show-login">Sign in</button>
          </div>
          <div class="auth-meta-row">
            <div class="auth-meta-item"><strong>Local</strong><span>Support nearby businesses</span></div>
            <div class="auth-meta-item"><strong>Fast</strong><span>Same-day delivery</span></div>
            <div class="auth-meta-item"><strong>Simple</strong><span>Pay once, we handle the rest</span></div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-right-inner">
          <div class="auth-panel" id="auth-panel">
            ${renderAuthPanel('login')}
          </div>
        </div>
      </div>
    </div>
    <section class="landing-how">
      <div class="landing-how-inner">
        <p class="auth-eyebrow" style="color:var(--color-accent-dark)">How it works</p>
        <h2 class="landing-h2">Three steps. No friction.</h2>
        <div class="landing-steps">
          <div class="landing-step"><div class="landing-step-num">1</div><h3>Browse local</h3><p>See what's fresh at businesses around you — shops, farms, kitchens, all in one place.</p></div>
          <div class="landing-step"><div class="landing-step-num">2</div><h3>One checkout</h3><p>Pay once. We split the payment between the business and the delivery agent automatically.</p></div>
          <div class="landing-step"><div class="landing-step-num">3</div><h3>Tracked delivery</h3><p>A verified agent picks up your order and brings it to your door.</p></div>
        </div>
      </div>
    </section>
    <section class="landing-trust">
      <div class="landing-trust-inner">
        <div class="trust-item"><strong>Every business verified</strong><span>We review each seller before they go live.</span></div>
        <div class="trust-item"><strong>Your money held safely</strong><span>Businesses only get paid when you receive your order.</span></div>
        <div class="trust-item"><strong>Real delivery agents</strong><span>Tracked, rated, and accountable for every delivery.</span></div>
      </div>
    </section>
  `;
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
  if (action === 'show-login') { authShowPanel('login'); return; }
  if (action === 'show-signup') { authShowPanel('signup'); return; }
  if (action === 'do-login') {
    const { email, password } = authReadForm();
    authShowError('Signing in…');
    const res = await authLogin(email, password);
    if (!res.ok) { authShowError(res.error); return; }
    await renderAuthGate();
    return;
  }
  if (action === 'do-signup') {
    const { name, email, password } = authReadForm();
    authShowError('Creating account…');
    const res = await authSignup(email, password, name);
    if (!res.ok) { authShowError(res.error); return; }
    await renderAuthGate();
    return;
  }
  if (action === 'logout') { authLogout(); return; }
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
};
