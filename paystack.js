/* ==========================================================================
   PXDynasty — paystack.js
   Wraps Paystack Popup for the customer checkout flow.

   Note: this prototype trusts the success callback from the Paystack popup
   and does NOT verify the transaction server-side. That's acceptable for
   testing. For production, add a small server endpoint (Cloudflare Worker,
   Supabase Edge Function, etc.) that verifies the transaction reference
   before marking the order as paid.
   ========================================================================== */

const PAYSTACK_PUBLIC_KEY = 'pk_test_e77882ebd074681649a77e80f7efb0b4a7b55a07';

function paystackReady() {
  return typeof window.PaystackPop !== 'undefined';
}

/* Open Paystack checkout for the given order draft.
   Returns a Promise resolving to:
     { ok: true, reference }           — payment succeeded
     { ok: false, reason: 'cancelled' } — user closed the popup
     { ok: false, reason: 'error', message } — configuration or SDK problem */
function paystackCheckout({ email, amountNaira, customerName, customerPhone, metadata }) {
  return new Promise((resolve) => {
    if (!paystackReady()) {
      resolve({ ok: false, reason: 'error', message: 'Paystack SDK not loaded' });
      return;
    }
    if (!email) {
      resolve({ ok: false, reason: 'error', message: 'Customer email is required for payment' });
      return;
    }
    if (!amountNaira || amountNaira <= 0) {
      resolve({ ok: false, reason: 'error', message: 'Invalid amount' });
      return;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: Math.round(amountNaira * 100), // kobo
        currency: 'NGN',
        metadata: Object.assign({
          custom_fields: [
            { display_name: 'Customer name', variable_name: 'customer_name', value: customerName || '' },
            { display_name: 'Phone',         variable_name: 'customer_phone', value: customerPhone || '' },
          ],
        }, metadata || {}),
        callback: (response) => {
          resolve({ ok: true, reference: response.reference });
        },
        onClose: () => {
          resolve({ ok: false, reason: 'cancelled' });
        },
      });
      handler.openIframe();
    } catch (e) {
      resolve({ ok: false, reason: 'error', message: String(e && e.message || e) });
    }
  });
}

window.PXDynastyPay = {
  ready: paystackReady,
  checkout: paystackCheckout,
  publicKey: PAYSTACK_PUBLIC_KEY,
};
