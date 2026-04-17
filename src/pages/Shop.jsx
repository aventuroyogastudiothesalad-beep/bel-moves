import { motion } from "framer-motion"
import { useState } from "react"
import { products } from "../data/shop"

const categories = ["All", "Equipment", "Digital", "Merch", "Classes"]

export default function Shop() {
  const [active, setActive] = useState("All")

  const filtered = active === "All"
    ? products
    : products.filter((p) => p.category === active)

  return (
    <div className="min-h-screen bg-[#07070c] text-neutral-100 overflow-x-hidden">

      {/* HEADER */}
      <div className="relative pt-40 pb-20 px-6 md:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <p className="uppercase tracking-[0.4em] text-xs mb-4 text-cyan-200">
            Mats · Merch · Digital
          </p>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[0.9]">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              SHOP
            </span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl leading-relaxed">
            Everything you need to build your practice. Shipped to your door or downloaded instantly.
          </p>
        </motion.div>
      </div>

      {/* FILTERS */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm transition-all ${
                active === cat
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold"
                  : "border border-white/20 text-neutral-400 hover:text-white hover:border-white/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
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
                <span className="text-xs uppercase tracking-widest text-neutral-500">{item.category}</span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-3xl font-semibold text-white">{item.price}</span>
                <button className="rounded-full px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">
                  Add to cart →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}