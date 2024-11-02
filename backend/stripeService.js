// stripeService.js (backend)

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency, paymentMethodTypes) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: paymentMethodTypes, // Multiple options: 'card', 'affirm', 'afterpay_clearpay', etc.
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        throw error;
    }
};

module.exports = { createPaymentIntent };
