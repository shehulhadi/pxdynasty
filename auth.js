/* ==========================================================================
   PXDynasty — auth.js
   Landing page + login/signup + session + role routing + admin provisioning.
   localStorage-only (prototype). Swappable for Supabase later.
   ========================================================================== */

const AUTH_STORAGE_KEY = 'PXDynasty_auth_v1';
const USERS_STORAGE_KEY = 'PXDynasty_users_v1';

const ADMIN_CREDENTIALS = {
  email: 'admin@pxdynasty.local',
  password: 'px-admin-2026',
  name: 'Platform Admin',
};

/* Reach app.js's top-level consts (DB, state) safely. */
function authAppDb()   { try { return DB; }    catch (e) { return null; } }
function authAppState(){ try { return state; } catch (e) { return null; } }

/* ---------- storage ---------- */

function authLoadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || []; }
  catch (e) { return []; }
}
function authSaveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}
function authLoadSession() {
  try { return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)); }
  catch (e) { return null; }
}
function authSaveSession(session) {
  if (session) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  else localStorage.removeItem(AUTH_STORAGE_KEY);
}

function authEnsureAdmin() {
  const users = authLoadUsers();
  const found = users.find((u) => u.email === ADMIN_CREDENTIALS.email);
  if (!found) {
    users.push({
      id: 'u-admin',
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password,
      name: ADMIN_CREDENTIALS.name,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    authSaveUsers(users);
  }
}

/* ---------- auth actions ---------- */

function authSignup(email, password, name) {
  email = String(email || '').trim().toLowerCase();
  name = String(name || '').trim();
  if (!email || !email.includes('@')) return { ok: false, error: 'Enter a valid email address.' };
  if (!name) return { ok: false, error: 'Enter your name.' };
  if (!password || password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };

  const users = authLoadUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'An account with that email already exists.' };
  }

  const user = {
    id: 'u-' + Math.random().toString(36).slice(2, 10),
    email, password, name,
    role: 'customer',
    createdAt: new Date().toISOString(),
  };

  const db = authAppDb();
  if (db) {
    const cust = {
      id: 'cust-' + user.id,
      name: user.name,
      email: user.email,
      phone: '',
      addresses: [],
      paymentMethods: [],
    };
    db.customers.push(cust);
    saveData(db);
    user.customerId = cust.id;
  }

  users.push(user);
  authSaveUsers(users);
  authSaveSession({ userId: user.id, role: user.role, at: Date.now() });
  return { ok: true, user };
}

function authLogin(email, password) {
  email = String(email || '').trim().toLowerCase();
  password = String(password || '');
  if (!email || !password) return { ok: false, error: 'Enter your email and password.' };

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    authEnsureAdmin();
    const users = authLoadUsers();
    const admin = users.find((u) => u.email === ADMIN_CREDENTIALS.email);
    authSaveSession({ userId: admin.id, role: 'admin', at: Date.now() });
    return { ok: true, user: admin };
  }

  const users = authLoadUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return { ok: false, error: 'Invalid email or password.' };
  authSaveSession({ userId: user.id, role: user.role, at: Date.now() });
  return { ok: true, user };
}

function authLogout() {
  authSaveSession(null);
  const appState = authAppState();
  if (appState) {
    appState.role = 'customer';
    appState.view = 'home';
  }
  renderAuthGate();
}

function authCurrentUser() {
  const session = authLoadSession();
  if (!session) return null;
  const users = authLoadUsers();
  return users.find((u) => u.id === session.userId) || null;
}

function authIsLoggedIn() { return !!authCurrentUser(); }

function authApplySessionToApp() {
  const user = authCurrentUser();
  if (!user) return false;
  const appState = authAppState();
  if (!appState) return false;

  if (user.role === 'admin') {
    appState.role = 'admin';
    appState.view = 'dashboard';
    appState.currentAdminId = user.id;
  } else if (user.role === 'business') {
    appState.role = 'business';
    appState.view = 'overview';
    appState.currentBusinessId = user.businessId || null;
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

function authCreateBusinessAccount(opts) {
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

  const users = authLoadUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'An account with that email already exists.' };
  }

  const bizId = 'biz-' + Math.random().toString(36).slice(2, 9);
  const bizRecord = {
    id: bizId,
    name: businessName,
    category,
    ownerName: ownerName || businessName,
    phone,
    email,
    address,
    rating: '—',
    verified: true,
    status: 'active',
    deliveryEstimate: 30,
    hue: Math.floor(Math.random() * 360),
    open: true,
    createdAt: new Date().toISOString(),
  };
  const db = authAppDb();
  if (db) { db.businesses.push(bizRecord); saveData(db); }

  const user = {
    id: 'u-' + Math.random().toString(36).slice(2, 10),
    email, password,
    name: ownerName || businessName,
    role: 'business',
    businessId: bizId,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  authSaveUsers(users);

  return { ok: true, user, business: bizRecord };
}

function authCreateAgentAccount(opts) {
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

  const users = authLoadUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'An account with that email already exists.' };
  }

  const agentId = 'agent-' + Math.random().toString(36).slice(2, 9);
  const agentRecord = {
    id: agentId,
    name, phone, vehicle,
    status: 'offline',
    verified: true,
    rating: '—',
    operatingArea,
    completedDeliveries: 0,
    earningsToday: 0, earningsWeek: 0, earningsPending: 0, earningsPaid: 0,
    createdAt: new Date().toISOString(),
  };
  const db = authAppDb();
  if (db) { db.agents.push(agentRecord); saveData(db); }

  const user = {
    id: 'u-' + Math.random().toString(36).slice(2, 10),
    email, password,
    name,
    role: 'agent',
    agentId,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  authSaveUsers(users);

  return { ok: true, user, agent: agentRecord };
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
          <div class="landing-step">
            <div class="landing-step-num">1</div>
            <h3>Browse local</h3>
            <p>See what's fresh at businesses around you — shops, farms, kitchens, all in one place.</p>
          </div>
          <div class="landing-step">
            <div class="landing-step-num">2</div>
            <h3>One checkout</h3>
            <p>Pay once. We split the payment between the business and the delivery agent automatically.</p>
          </div>
          <div class="landing-step">
            <div class="landing-step-num">3</div>
            <h3>Tracked delivery</h3>
            <p>A verified agent picks up your order and brings it to your door. You can watch every step.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="landing-trust">
      <div class="landing-trust-inner">
        <div class="trust-item">
          <strong>Every business verified</strong>
          <span>We review each seller before they go live.</span>
        </div>
        <div class="trust-item">
          <strong>Your money held safely</strong>
          <span>Businesses only get paid when you receive your order.</span>
        </div>
        <div class="trust-item">
          <strong>Real delivery agents</strong>
          <span>Tracked, rated, and accountable for every delivery.</span>
        </div>
      </div>
    </section>
  `;
}

function renderAuthPanel(mode) {
  if (mode === 'signup') {
    return `
      <div class="auth-card">
        <h2>Create your account</h2>
        <p class="text-sm text-muted">Sign up as a customer to shop. Business and delivery-agent
          accounts are created by the platform admin.</p>
        <div class="form-group">
          <label>Full name</label>
          <input type="text" id="au-name" placeholder="e.g. Amina Bello" autocomplete="name" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="au-email" placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="au-password" placeholder="At least 6 characters" autocomplete="new-password" />
        </div>
        <div class="auth-error" id="au-error"></div>
        <button class="btn btn-primary btn-block" data-auth="do-signup">Create account</button>
        <p class="text-sm text-muted mt-16" style="text-align:center;">
          Already have an account?
          <a href="javascript:void(0)" data-auth="show-login" style="color:var(--color-primary-dark);font-weight:700;">Sign in</a>
        </p>
      </div>
    `;
  }
  return `
    <div class="auth-card">
      <h2>Sign in</h2>
      <p class="text-sm text-muted">Welcome back. Enter your details to continue.</p>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="au-email" placeholder="you@example.com" autocomplete="email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="au-password" placeholder="Your password" autocomplete="current-password" />
      </div>
      <div class="auth-error" id="au-error"></div>
      <button class="btn btn-primary btn-block" data-auth="do-login">Sign in</button>
      <p class="text-sm text-muted mt-16" style="text-align:center;">
        New here?
        <a href="javascript:void(0)" data-auth="show-signup" style="color:var(--color-primary-dark);font-weight:700;">Create an account</a>
      </p>
    </div>
  `;
}

/* ---------- auth gate ---------- */

function renderAuthGate() {
  const appEl = document.getElementById('app');
  const toastEl = document.getElementById('toast-root');
  const modalEl = document.getElementById('modal-root');

  if (authIsLoggedIn()) {
    appEl.classList.remove('auth-mode');
    appEl.innerHTML = `
      <div id="header-root"></div>
      <div class="app-body">
        <div id="sidebar-root"></div>
        <main class="main-scroll" id="main-scroll"></main>
      </div>
      <div id="bottomnav-root"></div>
    `;
    authApplySessionToApp();
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

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-auth]');
  if (!el) return;
  const action = el.dataset.auth;
  if (action === 'show-login') { authShowPanel('login'); return; }
  if (action === 'show-signup') { authShowPanel('signup'); return; }
  if (action === 'do-login') {
    const { email, password } = authReadForm();
    const res = authLogin(email, password);
    if (!res.ok) { authShowError(res.error); return; }
    renderAuthGate();
    return;
  }
  if (action === 'do-signup') {
    const { name, email, password } = authReadForm();
    const res = authSignup(email, password, name);
    if (!res.ok) { authShowError(res.error); return; }
    renderAuthGate();
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
  isLoggedIn: authIsLoggedIn,
  logout: authLogout,
  applySessionToApp: authApplySessionToApp,
  renderAuthGate,
  createBusinessAccount: authCreateBusinessAccount,
  createAgentAccount: authCreateAgentAccount,
};
