import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { client } from "../lib/sanity"

export default function Home() {
  const navigate = useNavigate()
  const [latestClasses, setLatestClasses] = useState([])

  // 🔥 Fetch ultime 3 classi da Sanity
  useEffect(() => {
    client
      .fetch(`*[_type == "class"] | order(_createdAt desc)[0...3]`)
      .then((data) => setLatestClasses(data))
  }, [])

  return (
    <div className="min-h-screen bg-[#07070c] text-neutral-100 overflow-x-hidden">

      {/* HERO */}
      <div className="relative min-h-[92vh] flex items-end px-6 md:px-16 pb-16 overflow-hidden">

        {/* images */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-70 h-full">
          <img src="/images/image1bailarinPichon.jpeg" className="w-full h-full object-cover" />
          <img src="/images/Scorpion.jpeg" className="w-full h-full object-cover" />
          <img src="/images/image2bailarinpichon.jpeg" className="w-full h-full object-cover" />
        </div>

        {/* overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-cyan-400/20" />
        <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-black/70 to-transparent z-10" />

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <p className="uppercase tracking-[0.4em] text-xs mb-4 text-cyan-200">
            LDN • Street practice / Shoreditch energy
          </p>

          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[0.9]">
            <span className="bg-gradient-to-r from-pink-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
              BEL MOVES
            </span>
            <span className="block font-light text-neutral-200">
              ROCKET - CALI YOGA
            </span>
          </h1>

          <p className="mt-6 text-lg text-neutral-300 max-w-xl leading-relaxed">
            Raw movement. Breath. A practice between discipline, street energy and color.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/book")}
              className="rounded-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold"
            >
              Book Drop-in
            </button>

            <button
              onClick={() => navigate("/classes")}
              className="rounded-full px-6 py-3 border border-cyan-300 text-cyan-200"
            >
              View Sessions
            </button>
          </div>
        </motion.div>
      </div>

      {/* MANIFESTO */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-semibold mb-6 text-pink-300">
          MANIFESTO
        </h2>

        <p className="text-neutral-300 text-lg leading-relaxed max-w-3xl">
          This is not wellness aesthetic. This is movement as expression.
          Built from contrast — softness and impact, silence and noise, structure and instinct.
        </p>
      </section>

      {/* CLASSES (CMS DRIVEN) */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-5xl font-semibold mb-10 text-cyan-200">
          CLASSES
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {latestClasses.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/book?class=${item._id}`)}
              className="cursor-pointer p-6 rounded-xl border border-white/10 bg-gradient-to-br from-pink-500/20 to-cyan-400/10 backdrop-blur transition"
            >
              <span className="text-xs uppercase text-neutral-400">
                {item.level}
              </span>

              <h3 className="text-2xl font-semibold mb-2 text-white mt-2">
                {item.title}
              </h3>

              <p className="text-neutral-200 text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="text-xs text-neutral-400 mt-3">
                {item.duration}
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-5 gap-10 items-center">

        <div className="md:col-span-3">
          <h2 className="text-5xl font-semibold mb-4 text-orange-300">
            ABOUT
          </h2>

          <p className="text-neutral-300 leading-relaxed">
            Born from London street energy — now mixed with color, rhythm and expressive movement culture.
          </p>
        </div>

        <img
          src="/images/Wildthing.png"
          className="md:col-span-2 rounded-xl shadow-lg object-cover"
        />
      </section>

      {/* CTA */}
      <section className="py-24 text-center">

        <h2 className="text-5xl font-semibold bg-gradient-to-r from-pink-400 to-cyan-300 bg-clip-text text-transparent">
          JOIN THE DROP
        </h2>

        <p className="text-neutral-400 mt-3">
          Practice in raw space. Move with color.
        </p>

        <button
          onClick={() => navigate("/book")}
          className="mt-8 rounded-full px-8 py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-semibold"
        >
          Get Started
        </button>

      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs tracking-[0.4em] text-neutral-500 pb-10">
        © 2026 BEL MOVES — LONDON STREET PRACTICE
      </footer>

    </div>
  )
}