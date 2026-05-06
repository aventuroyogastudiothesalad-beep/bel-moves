import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { amount, classTitle, customerName, customerEmail } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // £15 → 1500 centesimi
      currency: "gbp",
      receipt_email: customerEmail,
      metadata: {
        classTitle,
        customerName,
        customerEmail,
      },
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}