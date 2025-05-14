import { useState } from "react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavLinks({mobile=false}) {
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <header className={`sticky top-4 z-50 bg-black p-4 px-6 flex justify-between items-center mt-4 ${!isMenuOpen ? 'rounded-full' : ''}`}>
      <Link to="/">
        <img src="/dpelos.svg" className="w-[100px] text-white" />
      </Link>
      <Button variant="ghost" className="md:hidden text-gold-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24}/> : <Menu size={24} />}
      </Button>
      <nav className="hidden md:flex items-center space-x-8">
        <NavLinks/>
        <Link to="/agendar">
          <Button size="sm" className="rounded-full">Agendar ahora</Button>
        </Link>
      </nav>
      {isMenuOpen ? (
        <div className="absolute top-full left-0 right-0 bg-black border-b border-gold-500 shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks mobile />
            <Link to="/agendar">
              <Button className="bg-gold-600 hover:bg-gold-700 text-noir-900 font-semibold w-full">
                Agendar Ahora
              </Button>
            </Link>
          </div>
        </div>
      ): null}
    </header>
  );
}
