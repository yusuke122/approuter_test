// This is your test secret API key.
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  const customer = await stripe.customers.create()//クレカに加え銀行振込も追加
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    /*
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.

    automatic_payment_methods: {
      enabled: true,
    },
    */
    //amount: Number(amount),
    // card: cardElement,
    customer:customer.id,
    currency: 'jpy',
    payment_method_types: ['customer_balance', 'card'],
    payment_method_data: {
      type: 'customer_balance',
    },
    payment_method_options: {
      customer_balance: {
        funding_type: 'bank_transfer',
        bank_transfer: {
         type: 'jp_bank_transfer',
        },
      },
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

};