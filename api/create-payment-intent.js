import Stripe from "stripe"

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const { amount, classTitle, customerName, customerEmail } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "gbp",
      receipt_email: customerEmail,
      metadata: { classTitle, customerName, customerEmail },
    })

    return res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}