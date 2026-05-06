import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { client } from "../lib/sanity"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// ─── STRIPE FORM (inner component) ───────────────────────────────────────────
function CheckoutForm({ onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState(null)

  const handlePay = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setPaying(true)
    setError(null)

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })

    if (error) {
      setError(error.message)
      setPaying(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col gap-5 mt-6">
      <PaymentElement />
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      <button
        type="submit"
        disabled={paying || !stripe}
        className="rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold disabled:opacity-50"
      >
        {paying ? "Processing..." : "Pay now →"}
      </button>
    </form>
  )
}

// ─── MAIN BOOK COMPONENT ──────────────────────────────────────────────────────
export default function Book() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const selectedClassId = params.get("class")

  const [classes, setClasses] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  const [loadingPayment, setLoadingPayment] = useState(false)
  const [isFree, setIsFree] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    classId: selectedClassId || "",
    message: "",
  })

  useEffect(() => {
    client
      .fetch(`*[_type == "class"]{ _id, title, price, priceAmount }`)
      .then((data) => setClasses(data))
  }, [])

  useEffect(() => {
    if (selectedClassId) {
      setForm((prev) => ({ ...prev, classId: selectedClassId }))
    }
  }, [selectedClassId])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // reset payment if class changes
    if (e.target.name === "classId") {
      setClientSecret(null)
      setIsFree(false)
    }
  }

  const selectedClass = classes.find((c) => c._id === form.classId)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.classId) return

    setError(null)

    // caso FREE o senza prezzo
    if (!selectedClass?.priceAmount) {
      setIsFree(true)
      setSubmitted(true)
      return
    }

    // caso PAGAMENTO
    setLoadingPayment(true)
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedClass.priceAmount,
          classTitle: selectedClass.title,
          customerName: form.name,
          customerEmail: form.email,
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setClientSecret(data.clientSecret)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoadingPayment(false)
    }
  }

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#f472b6",
        colorBackground: "#0f0f18",
        colorText: "#ffffff",
        borderRadius: "12px",
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#07070c] text-neutral-100 overflow-x-hidden">

      {/* HEADER */}
      <div className="relative pt-40 pb-20 px-6 md:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <p className="uppercase tracking-[0.4em] text-xs mb-4 text-cyan-200">
            Drop-in · No membership
          </p>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[0.9]">
            <span className="bg-gradient-to-r from-orange-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              BOOK
            </span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl leading-relaxed">
            Reserve your spot. Isabel will confirm via email within 24 hours.
          </p>
        </motion.div>
      </div>

      {/* FORM / PAYMENT / SUCCESS */}
      <section className="max-w-2xl mx-auto px-6 pb-24">

        {/* ── SUCCESS ── */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-2xl border border-white/10 bg-white/5 text-center"
          >
            <div className="text-5xl mb-4">🙏</div>
            <h2 className="text-3xl font-semibold text-white mb-3">
              {isFree ? "You're booked!" : "Payment confirmed!"}
            </h2>
            <p className="text-neutral-300">
              Thanks <span className="text-pink-300">{form.name}</span>!{" "}
              {isFree
                ? "Isabel will contact you at "
                : "A receipt has been sent to "}
              <span className="text-cyan-300">{form.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setClientSecret(null)
                setIsFree(false)
                setForm({ name: "", email: "", classId: "", message: "" })
              }}
              className="mt-8 rounded-full px-6 py-3 border border-white/20 text-neutral-300 hover:text-white"
            >
              Book another class
            </button>
          </motion.div>

        ) : clientSecret ? (

          /* ── STRIPE PAYMENT ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-sm text-neutral-400">Booking</p>
              <p className="text-white font-semibold">{selectedClass?.title}</p>
              <p className="text-pink-300 font-semibold">{selectedClass?.price}</p>
            </div>

            <Elements stripe={stripePromise} options={stripeOptions}>
              <CheckoutForm onSuccess={() => setSubmitted(true)} />
            </Elements>

            <button
              onClick={() => setClientSecret(null)}
              className="mt-4 text-sm text-neutral-500 hover:text-neutral-300"
            >
              ← Back
            </button>
          </motion.div>

        ) : (

          /* ── BOOKING FORM ── */
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
            />

            <select
              name="classId"
              value={form.classId}
              onChange={handleChange}
              className="bg-[#07070c] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-pink-500/50 transition-colors"
            >
              <option value="" disabled className="bg-[#07070c] text-white">
                Select a class...
              </option>
              {classes.map((c) => (
                <option key={c._id} value={c._id} className="bg-[#07070c] text-white">
                  {c.title} {c.price ? `— ${c.price}` : ""}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message (optional)"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
            />

            {/* mostra prezzo selezionato */}
            {selectedClass && (
              <div className="text-sm text-neutral-400 px-1">
                {selectedClass.priceAmount
                  ? <>Total: <span className="text-pink-300 font-semibold">{selectedClass.price}</span></>
                  : <span className="text-cyan-300">Free / contact for price</span>
                }
              </div>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loadingPayment}
              className="rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold disabled:opacity-50"
            >
              {loadingPayment
                ? "Loading..."
                : selectedClass?.priceAmount
                  ? `Pay ${selectedClass.price} →`
                  : "Reserve my spot →"
              }
            </button>

          </motion.form>
        )}
      </section>
    </div>
  )
}