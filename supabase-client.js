/* ==========================================================================
   PXDynasty — supabase-client.js
   Thin wrapper around the Supabase JS SDK.
   Provides: fetchAll(), and per-table insert/update/delete helpers.
   The rest of the app still talks to the DB object; this file keeps the
   DB object in sync with the cloud.
   ========================================================================== */

const SUPABASE_URL = 'https://ocsglgkombwwpamdijes.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6HHZQ1MoXmpvi45SD2k9fw_Rj_c3gGB';

let supabaseClient = null;

function sbcInit() {
  if (typeof window.supabase === 'undefined') {
    console.warn('Supabase SDK not loaded — running in local-only mode.');
    return null;
  }
  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return supabaseClient;
}

/* Map a snake_case row from Supabase to the camelCase shape the app uses. */
function sbcRowToBiz(r) {
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    ownerName: r.owner_name,
    phone: r.phone,
    email: r.email,
    address: r.address,
    rating: r.rating,
    verified: r.verified,
    status: r.status,
    deliveryEstimate: r.delivery_estimate,
    hue: r.hue,
    open: r.open,
    createdAt: r.created_at,
  };
}
function sbcRowToProduct(r) {
  return {
    id: r.id,
    businessId: r.business_id,
    name: r.name,
    category: r.category,
    description: r.description,
    sku: r.sku,
    price: Number(r.price),
    discountPrice: r.discount_price == null ? null : Number(r.discount_price),
    stock: r.stock,
    status: r.status,
    rating: r.rating,
    sales: r.sales,
    hue: r.hue,
    emoji: r.emoji,
    imageUrl: r.image_url,
    createdAt: r.created_at,
  };
}
function sbcRowToOrder(r) {
  return {
    id: r.id,
    orderNumber: r.order_number,
    customerId: r.customer_id,
    businessId: r.business_id,
    items: r.items,
    subtotal: Number(r.subtotal),
    deliveryFee: Number(r.delivery_fee),
    platformFee: Number(r.platform_fee),
    total: Number(r.total),
    status: r.status,
    paymentStatus: r.payment_status,
    agentId: r.agent_id,
    deliveryAddress: r.delivery_address,
    deliveryInstructions: r.delivery_instructions,
    customerName: r.customer_name,
    customerPhone: r.customer_phone,
    paymentMethod: r.payment_method,
    otp: r.otp,
    financial: r.financial,
    statusHistory: r.status_history,
    settled: r.settled,
    disputed: r.disputed || false,
    disputeReason: r.dispute_reason || null,
    disputeDetails: r.dispute_details || null,
    disputeAt: r.dispute_at || null,
    paymentReference: r.payment_reference || null,
    paymentVerifiedAt: r.payment_verified_at || null,
    pickupChecklist: r.pickup_checklist || {},
    createdAt: r.created_at,
  };
}
function sbcRowToCustomer(r) {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    addresses: r.addresses || [],
    paymentMethods: r.payment_methods || [],
    createdAt: r.created_at,
  };
}
function sbcRowToAgent(r) {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    vehicle: r.vehicle,
    status: r.status,
    verified: r.verified,
    rating: r.rating,
    operatingArea: r.operating_area,
    completedDeliveries: r.completed_deliveries,
    earningsToday: Number(r.earnings_today || 0),
    earningsWeek: Number(r.earnings_week || 0),
    earningsPending: Number(r.earnings_pending || 0),
    earningsPaid: Number(r.earnings_paid || 0),
    createdAt: r.created_at,
  };
}

/* Convert app objects to snake_case rows for Supabase. */
function sbcBizToRow(b) {
  return {
    id: b.id, name: b.name, category: b.category,
    owner_name: b.ownerName, phone: b.phone, email: b.email,
    address: b.address, rating: b.rating, verified: b.verified,
    status: b.status, delivery_estimate: b.deliveryEstimate,
    hue: b.hue, open: b.open,
  };
}
function sbcProductToRow(p) {
  return {
    id: p.id, business_id: p.businessId, name: p.name,
    category: p.category, description: p.description, sku: p.sku,
    price: p.price, discount_price: p.discountPrice, stock: p.stock,
    status: p.status, rating: p.rating, sales: p.sales,
    hue: p.hue, emoji: p.emoji, image_url: p.imageUrl || null,
  };
}
function sbcOrderToRow(o) {
  return {
    id: o.id, order_number: o.orderNumber, customer_id: o.customerId,
    business_id: o.businessId, items: o.items, subtotal: o.subtotal,
    delivery_fee: o.deliveryFee, platform_fee: o.platformFee, total: o.total,
    status: o.status, payment_status: o.paymentStatus, agent_id: o.agentId,
    delivery_address: o.deliveryAddress, delivery_instructions: o.deliveryInstructions,
    customer_name: o.customerName, customer_phone: o.customerPhone,
    payment_method: o.paymentMethod, otp: o.otp,
    financial: o.financial, status_history: o.statusHistory, settled: o.settled,
    disputed: !!o.disputed,
    dispute_reason: o.disputeReason || null,
    dispute_details: o.disputeDetails || null,
    dispute_at: o.disputeAt || null,
    payment_reference: o.paymentReference || null,
    payment_verified_at: o.paymentVerifiedAt || null,
    pickup_checklist: o.pickupChecklist || {},
  };
}
function sbcCustomerToRow(c) {
  return {
    id: c.id, name: c.name, email: c.email, phone: c.phone,
    addresses: c.addresses || [], payment_methods: c.paymentMethods || [],
  };
}
function sbcAgentToRow(a) {
  return {
    id: a.id, name: a.name, phone: a.phone, vehicle: a.vehicle,
    status: a.status, verified: a.verified, rating: a.rating,
    operating_area: a.operatingArea, completed_deliveries: a.completedDeliveries,
    earnings_today: a.earningsToday, earnings_week: a.earningsWeek,
    earnings_pending: a.earningsPending, earnings_paid: a.earningsPaid,
  };
}

/* Fetch everything from Supabase. Returns an object shaped like the app DB. */
async function sbcFetchAll() {
  const c = sbcInit();
  if (!c) return null;
  try {
    const [bizR, prodR, ordR, custR, agentR, notifR] = await Promise.all([
      c.from('businesses').select('*'),
      c.from('products').select('*'),
      c.from('orders').select('*'),
      c.from('customers').select('*'),
      c.from('agents').select('*'),
      c.from('notifications').select('*').order('created_at', { ascending: false }).limit(200),
    ]);
    if (bizR.error) throw bizR.error;
    return {
      businesses: (bizR.data || []).map(sbcRowToBiz),
      products: (prodR.data || []).map(sbcRowToProduct),
      orders: (ordR.data || []).map(sbcRowToOrder),
      customers: (custR.data || []).map(sbcRowToCustomer),
      agents: (agentR.data || []).map(sbcRowToAgent),
      notifications: notifR.error ? [] : (notifR.data || []).map(sbcRowToNotification),
    };
  } catch (e) {
    console.error('sbcFetchAll failed:', e);
    return null;
  }
}

/* Upsert (insert or replace) a single row. Fire-and-forget; log errors. */
async function sbcUpsert(table, row) {
  const c = sbcInit();
  if (!c) return { ok: false, error: 'no client' };
  try {
    const { error } = await c.from(table).upsert(row);
    if (error) { console.error('upsert', table, error); return { ok: false, error: error.message }; }
    return { ok: true };
  } catch (e) {
    console.error('upsert exception', table, e);
    return { ok: false, error: String(e) };
  }
}
async function sbcDelete(table, id) {
  const c = sbcInit();
  if (!c) return { ok: false, error: 'no client' };
  try {
    const { error } = await c.from(table).delete().eq('id', id);
    if (error) { console.error('delete', table, error); return { ok: false, error: error.message }; }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/* Upload a File to the product-images bucket. Returns { ok, url }. */
async function sbcUploadProductImage(file) {
  const c = sbcInit();
  if (!c) return { ok: false, error: 'no client' };
  if (!file) return { ok: false, error: 'no file' };
  const ext = (file.name && file.name.split('.').pop()) || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  try {
    const { error } = await c.storage.from('product-images').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/jpeg',
    });
    if (error) { console.error('upload', error); return { ok: false, error: error.message }; }
    const { data } = c.storage.from('product-images').getPublicUrl(path);
    return { ok: true, url: data.publicUrl };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

function sbcRowToNotification(r) {
  return {
    id: r.id,
    role: r.role,
    refId: r.ref_id,
    title: r.title,
    body: r.body,
    icon: r.icon,
    read: r.read || false,
    time: r.created_at,
  };
}
function sbcNotificationToRow(n) {
  return {
    id: n.id,
    role: n.role,
    ref_id: n.refId || null,
    title: n.title || '',
    body: n.body || '',
    icon: n.icon || 'bell',
    read: !!n.read,
  };
}

/* Call the Supabase Edge Function that verifies a Paystack payment.
   Returns { ok: true, order } | { ok: false, error } | { ok: true, already_processed: true, order } */
async function sbcVerifyPayment(reference, orderDrafts) {
  const url = SUPABASE_URL + '/functions/v1/dynamic-service';
  const drafts = Array.isArray(orderDrafts) ? orderDrafts : [orderDrafts];
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
      },
      body: JSON.stringify({ reference, orderDrafts: drafts }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.ok) {
      return { ok: false, error: data.error || ('HTTP ' + r.status), detail: data.detail };
    }
    return data;
  } catch (e) {
    return { ok: false, error: 'Network error: ' + String(e) };
  }
}

/* ---- Messages (order chat) ---- */

function sbcRowToMessage(r) {
  return {
    id: r.id,
    orderId: r.order_id,
    channel: r.channel || 'all',
    senderId: r.sender_id,
    senderRole: r.sender_role,
    senderName: r.sender_name,
    body: r.body,
    createdAt: r.created_at,
  };
}
function sbcMessageToRow(m) {
  return {
    id: m.id,
    order_id: m.orderId,
    channel: m.channel || 'all',
    sender_id: m.senderId,
    sender_role: m.senderRole,
    sender_name: m.senderName,
    body: m.body,
  };
}

async function sbcFetchMessages(orderId) {
  const c = sbcInit();
  if (!c || !orderId) return [];
  const { data, error } = await c.from('messages')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: true });
  if (error) { console.error('fetchMessages', error); return []; }
  return (data || []).map(sbcRowToMessage);
}

async function sbcInsertMessage(msg) {
  const c = sbcInit();
  if (!c) return { ok: false, error: 'no client' };
  const { error } = await c.from('messages').insert(sbcMessageToRow(msg));
  if (error) { console.error('insertMessage', error); return { ok: false, error: error.message }; }
  return { ok: true };
}

/* Expose globally for app.js to call. */
window.PXDynastySBC = {
  init: sbcInit,
  fetchAll: sbcFetchAll,
  upsertBusiness: (b) => sbcUpsert('businesses', sbcBizToRow(b)),
  upsertProduct:  (p) => sbcUpsert('products', sbcProductToRow(p)),
  upsertOrder:    (o) => sbcUpsert('orders', sbcOrderToRow(o)),
  upsertCustomer: (c) => sbcUpsert('customers', sbcCustomerToRow(c)),
  upsertAgent:    (a) => sbcUpsert('agents', sbcAgentToRow(a)),
  deleteBusiness: (id) => sbcDelete('businesses', id),
  deleteProduct:  (id) => sbcDelete('products', id),
  uploadProductImage: sbcUploadProductImage,
  upsertNotification: (n) => sbcUpsert('notifications', sbcNotificationToRow(n)),
  verifyPayment: sbcVerifyPayment,
  fetchMessages: sbcFetchMessages,
  insertMessage: sbcInsertMessage,
};
