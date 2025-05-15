import { useState } from "react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavLinks({ mobile = false }) {
  const defaultLinkClass = "font-medium text-white hover:text-gold-400";
  const linkClass = mobile ? `block py-2 ${defaultLinkClass}` : defaultLinkClass;

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <a href="#our-services" className={linkClass} onClick={(e) => handleSmoothScroll(e, "our-services")}>Servicios</a>
      <a href="#our-schedule" className={linkClass} onClick={(e) => handleSmoothScroll(e, "our-schedule")}>Horarios</a>
      <a href="#our-team" className={linkClass} onClick={(e) => handleSmoothScroll(e, "our-team")}>Conócenos</a>
    </>
  )
}

function ReservationPopup({ open, onClose }) {
  const [codigo, setCodigo] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">Consultar Cita</h2>
        <label htmlFor="codigo-reserva" className="block text-sm font-medium text-gray-700 mb-2">
          Código de Reserva
        </label>
        <input
          id="codigo-reserva"
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gold-500"
          placeholder="Ingresa el código"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
        />
        <Button className="w-full" onClick={() => {/* Aquí puedes manejar la consulta */}}>
          Consultar
        </Button>
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <header className={`sticky top-4 z-50 bg-black p-4 px-6 flex justify-between items-center mt-4 ${!isMenuOpen ? 'rounded-full' : ''}`}>
        <Link to="/">
          <img src="/dpelos.svg" className="w-[100px] text-white" />
        </Link>
        <Button variant="ghost" className="md:hidden text-gold-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <button
            type="button"
            className="font-medium text-white hover:text-gold-400 transition-colors"
            onClick={() => setShowPopup(true)}
          >
            Consultar citas
          </button>
          <Link to="/agendar">
            <Button size="sm" className="rounded-full">Agendar ahora</Button>
          </Link>
        </nav>
        {isMenuOpen ? (
          <div className="absolute top-full left-0 right-0 bg-black border-b border-gold-500 shadow-lg md:hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <NavLinks mobile />
              <button
                type="button"
                className="font-medium text-white hover:text-gold-400 transition-colors w-full text-left py-2"
                onClick={() => setShowPopup(true)}
              >
                Consultar citas
              </button>
              <Link to="/agendar">
                <Button className="bg-gold-600 hover:bg-gold-700 text-noir-900 font-semibold w-full">
                  Agendar Ahora
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </header>
      <ReservationPopup open={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}