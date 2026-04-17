import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-16 py-5">
      <Link to="/" className="text-white font-semibold tracking-widest text-sm">
        BEL MOVES
      </Link>
      <div className="flex gap-8 items-center">
        <Link to="/classes" className="text-neutral-400 hover:text-white text-sm transition-colors">
          Classes
        </Link>
        <Link to="/about" className="text-neutral-400 hover:text-white text-sm transition-colors">
          About
        </Link>
        <Link to="/shop" className="text-neutral-400 hover:text-white text-sm transition-colors">
          Shop
        </Link>
        <Link to="/book" className="rounded-full px-4 py-1.5 bg-gradient-to-r from-pink-500 to-orange-400 text-black text-sm font-semibold">
  Book
</Link>
        {/* <button className="rounded-full px-4 py-1.5 bg-gradient-to-r from-pink-500 to-orange-400 text-black text-sm font-semibold">
          Book
        </button> */}
      </div>
    </nav>
  )
}