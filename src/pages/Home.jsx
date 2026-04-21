import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { siteConfig } from "../data/site"


const offerings = [
  {
    title: "Vinyasa Flow",
    desc: "Dynamic breath-led movement with creative sequencing.",
    color: "from-pink-500/20 to-orange-400/10",
  },
  {
    title: "Yin Yoga",
    desc: "Slow, deep release for body + nervous system reset.",
    color: "from-blue-400/20 to-cyan-300/10",
  },
  {
    title: "Power Yoga",
    desc: "Strong, focused practice to build heat and stability.",
    color: "from-purple-500/20 to-fuchsia-400/10",
  },
]

export default function Home() {
    const navigate = useNavigate()

  return (
     <div className="min-h-screen bg-[#07070c] text-neutral-100 overflow-x-hidden">

      {/* HERO */}
      <div className="relative min-h-[92vh] flex items-end px-6 md:px-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-70 h-full">
          <img src="/images/image1bailarinPichon.jpeg" className="w-full h-full object-cover" alt="Isabel in posa del Piccione e ballerina"/>
          <img src="/images/Scorpion.jpeg" className="w-full h-full object-cover" alt="Isabel in posa Scorpion" />
          <img src="/images/image2bailarinpichon.jpeg" className="w-full h-full object-cover" alt="Isabel in posa del Piccione e ballerina altra vista" />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-cyan-400/20" /> */}
        <div className="absolute inset-0 h-full bg-gradient-to-tr from-pink-500/20 via-transparent to-cyan-400/20" />
        {/* cambio colori */}
        <div className="absolute inset-0 bg-black/50" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-black/40 to-cyan-400/20" /> */}
         {/* 🔥 overlay SOLO sopra */}
  <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-black/70 to-transparent z-10" />

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
            <button onClick={() => navigate("/book")} className="rounded-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-semibold">
  Book Drop-in
</button>
            <button onClick={() => navigate("/classes")} className="rounded-full px-6 py-3 border border-cyan-300 text-cyan-200">
  View Sessions
</button>
          </div>
        </motion.div>
      </div>

      {/* MANIFESTO */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-semibold mb-6 text-pink-300">MANIFESTO</h2>
        <p className="text-neutral-300 text-lg leading-relaxed max-w-3xl">
          This is not wellness aesthetic. This is movement as expression.
          Built from contrast — softness and impact, silence and noise, structure and instinct.
        </p>
      </section>

      {/* CLASSES */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-5xl font-semibold mb-10 text-cyan-200">CLASSES</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {offerings.map((item, i) => (
            <motion.div
  key={item.title}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => navigate(`/classes?type=${encodeURIComponent(item.title)}`)}
  className={`cursor-pointer p-6 rounded-xl border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur transition`}
>
              <h3 className="text-2xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-neutral-200 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
            
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <h2 className="text-5xl font-semibold mb-4 text-orange-300">ABOUT</h2>
          <p className="text-neutral-300 leading-relaxed">
            Born from London street energy — now mixed with color, rhythm and expressive movement culture.
          </p>
        </div>
        <img
          src="/images/Wildthing.png"
          className="md:col-span-2 rounded-xl shadow-lg object-cover" alt="Isabel into wildthing"
        />
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-5xl font-semibold bg-gradient-to-r from-pink-400 to-cyan-300 bg-clip-text text-transparent">
          JOIN THE DROP
        </h2>
        <p className="text-neutral-400 mt-3">Practice in raw space. Move with color.</p>
       <button onClick={() => navigate("/book")} className="mt-8 rounded-full px-8 py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-semibold">
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