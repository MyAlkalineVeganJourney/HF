// payment.js

require('dotenv').config({ path: '.env.local' });
const express = require('express');
const bodyParser = require('body-parser');
const { createPaymentIntent } = require('./stripeService'); // Import the stripeService

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' }));

// Stripe Webhook Secret from environment variable
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Endpoint to create a payment intent
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, paymentMethodTypes } = req.body;

    try {
        const paymentIntent = await createPaymentIntent(amount, currency, paymentMethodTypes);
        res.json({ clientSecret: paymentIntent.client_secret }); // Send the clientSecret to the frontend
    } catch (err) {
        console.error('Error creating payment intent:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Stripe Webhook to handle events like payment success, failure, etc.
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.sendStatus(400);
    }

    // Handle different types of Stripe events
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful:', paymentIntent);
            break;
        case 'payment_intent.payment_failed':
            const paymentFailed = event.data.object;
            console.log('PaymentIntent failed:', paymentFailed);
            break;
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Checkout session completed:', session);
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
