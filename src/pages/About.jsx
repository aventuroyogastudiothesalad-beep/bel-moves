import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { siteConfig } from "../data/site"

export default function About() {
  const navigate = useNavigate()
  const { about } = siteConfig

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
            {about.location}
          </p>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[0.9]">
            <span className="bg-gradient-to-r from-orange-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              {about.title}
            </span>
          </h1>
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={about.image}
              className="w-full rounded-2xl object-cover aspect-[4/5]"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 pt-4"
          >
            <h2 className="text-4xl font-semibold text-white">{about.subtitle}</h2>

            <div className="flex flex-col gap-5">
              <p className="text-neutral-300 leading-relaxed">{about.bio1}</p>
              <p className="text-neutral-300 leading-relaxed">{about.bio2}</p>
              <p className="text-pink-300 font-semibold text-lg">{about.bio3}</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/book")}
              className="rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold text-lg w-fit"
            >
              Book a class →
            </button>
          </motion.div>

        </div>
      </section>

    </div>
  )
}