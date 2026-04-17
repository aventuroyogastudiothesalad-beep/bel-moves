import { motion } from "framer-motion"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { classes } from "../data/classes"


export default function Book() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get("class") || ""



  const [form, setForm] = useState({
    name: "",
    email: "",
    classId: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.classId) return
    setSubmitted(true)
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
            <h2 className="text-3xl font-semibold text-white mb-3">You're booked!</h2>
            <p className="text-neutral-300">
              Thanks <span className="text-pink-300">{form.name}</span>! Isabel will confirm your spot at{" "}
              <span className="text-cyan-300">{form.email}</span> within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", email: "", classId: "", message: "" }) }}
              className="mt-8 rounded-full px-6 py-3 border border-white/20 text-neutral-300 hover:text-white hover:border-white/40 text-sm transition-colors"
            >
              Book another class
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Isabel García"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-pink-500/50 transition-colors"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-pink-500/50 transition-colors"
              />
            </div>

            {/* CLASS SELECT */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Choose a class
              </label>
              <select
                name="classId"
                value={form.classId}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-pink-500/50 transition-colors appearance-none"
              >
                <option value="" disabled className="bg-[#07070c]">Select a class...</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#07070c]">
                    {c.title} — {c.schedule} ({c.price})
                  </option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Message <span className="text-neutral-600">(optional)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any injuries, questions or special requests..."
                rows={4}
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
              />
            </div>

            {/* SUBMIT */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold text-lg mt-2"
            >
              Reserve my spot →
            </motion.button>

          </motion.form>
        )}
      </section>

    </div>
  )
}