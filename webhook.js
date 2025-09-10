const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody || req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
      break;
    case 'invoice.payment_succeeded':
      console.log("Subscription payment succeeded");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

async function handleCheckoutSessionCompleted(session){
  const userId = session.metadata?.userId;
  const listingId = session.metadata?.listingId;
  console.log("Pago recibido para usuario:", userId, " listing:", listingId);
  // TODO: actualizar Supabase con SUPABASE_SERVICE_KEY
}
