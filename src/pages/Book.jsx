import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { client } from "../lib/sanity"

export default function Book() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const selectedClassId = params.get("class")

  const [classes, setClasses] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    classId: selectedClassId || "",
    message: "",
  })

  // 🔥 fetch tutte le classi da Sanity
  useEffect(() => {
    client.fetch(`*[_type == "class"]`)
      .then((data) => setClasses(data))
  }, [])

  // 🔥 aggiorna se arrivi da Home con classe selezionata
  useEffect(() => {
    if (selectedClassId) {
      setForm((prev) => ({
        ...prev,
        classId: selectedClassId
      }))
    }
  }, [selectedClassId])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.classId) return

    setSubmitted(true)

    // 👉 QUI DOPO METTI EmailJS / Stripe
    console.log("BOOKING:", form)
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

      {/* FORM */}
      <section className="max-w-2xl mx-auto px-6 pb-24">

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-2xl border border-white/10 bg-white/5 text-center"
          >
            <div className="text-5xl mb-4">🙏</div>
            <h2 className="text-3xl font-semibold text-white mb-3">
              You're booked!
            </h2>

            <p className="text-neutral-300">
              Thanks <span className="text-pink-300">{form.name}</span>!
              Isabel will contact you at{" "}
              <span className="text-cyan-300">{form.email}</span>.
            </p>

            <button
              onClick={() => {
                setSubmitted(false)
                setForm({ name: "", email: "", classId: "", message: "" })
              }}
              className="mt-8 rounded-full px-6 py-3 border border-white/20 text-neutral-300 hover:text-white"
            >
              Book another class
            </button>
          </motion.div>

        ) : (

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* NAME */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
            />

            {/* CLASS SELECT */}
            <select
              name="classId"
              value={form.classId}
              onChange={handleChange}
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
            >
              <option value="">Select a class</option>

              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title} — {c.schedule}
                </option>
              ))}

            </select>

            {/* MESSAGE */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message (optional)"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
            />

            {/* SUBMIT */}
            <button className="rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold">
              Reserve my spot →
            </button>

          </motion.form>

        )}
      </section>
    </div>
  )
}