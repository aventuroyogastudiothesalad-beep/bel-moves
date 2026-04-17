import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { classes } from "../data/classes"

export default function Classes() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#07070c] text-neutral-100 overflow-x-hidden">

      {/* HEADER */}
      <div className="relative pt-40 pb-20 px-6 md:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <p className="uppercase tracking-[0.4em] text-xs mb-4 text-cyan-200">
            London • Shoreditch
          </p>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[0.9]">
            <span className="bg-gradient-to-r from-pink-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
              CLASSES
            </span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl leading-relaxed">
            Every class is a drop-in. No membership. No commitment. Just show up and move.
          </p>
        </motion.div>
      </div>

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur flex flex-col gap-4`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest text-neutral-400">{item.tag}</span>
                <span className="text-2xl font-semibold text-white">{item.price}</span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="flex flex-col gap-1 text-xs text-neutral-400">
                <span>⏱ {item.duration} · {item.level}</span>
                <span>📅 {item.schedule}</span>
              </div>

              <button
  onClick={() => navigate(`/book?class=${item.id}`)}
  className="mt-auto rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
>
  Book this class →
</button>

              {/* <button className="mt-auto rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">
                Book this class →
              </button> */}
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}