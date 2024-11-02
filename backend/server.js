// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use the Stripe API key from .env.local
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and raw data for Stripe webhooks
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' })); // Required for Stripe webhook signature verification

// Stripe Webhook Secret from environment variable
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Route to create a Stripe Checkout session with Affirm and Afterpay/Clearpay support
app.post('/create-checkout-session', async (req, res) => {
    const { priceId } = req.body; // Expecting price in cents from the frontend

    try {
        // Create Stripe checkout session with Affirm and Afterpay
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'affirm', 'afterpay_clearpay'], // Include both Affirm and Afterpay
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Accommodation Booking', // Adjust product name accordingly
                        },
                        unit_amount: priceId * 100, // Convert priceId (in dollars) to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://myalkalineveganjourney.com/success', // Success page
            cancel_url: 'https://myalkalineveganjourney.com/cancel', // Cancel page
        });

        // Send session ID to the frontend
        res.json({ id: session.id });
    } catch (err) {
        console.error('Error creating checkout session:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Stripe Webhook to handle events like payment success, failure, etc.
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature']; // Stripe signature to verify the request
    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.sendStatus(400); // Return 400 if verification fails
    }

    // Handle different types of Stripe events
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful:', paymentIntent);
            // Add your custom logic for successful payment here
            break;
        case 'payment_intent.payment_failed':
            const paymentFailed = event.data.object;
            console.log('PaymentIntent failed:', paymentFailed);
            // Handle payment failure logic here
            break;
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Checkout session completed:', session);
            // Fulfill the order or booking here
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Send acknowledgment back to Stripe
    res.json({ received: true });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
