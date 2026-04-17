import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import Classes from "./pages/Classes"
import Shop from "./pages/Shop"
import Book from "./pages/Book"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/book" element={<Book />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App