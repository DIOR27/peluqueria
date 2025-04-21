import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Settings, Calendar, Users, Scissors, MoreVertical, LogOut } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Citas", href: "/dashboard", icon: Calendar },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Especialistas", href: "/dashboard/specialists", icon: Users },
  { name: "Servicios", href: "/dashboard/services", icon: Scissors },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock data - Esto debería venir de tu estado global o contexto de autenticación
  const user = {
    name: "Juan Pérez",
    email: "juan@dpelos.com"
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
        <h1 className="text-xl font-semibold">D'Pelos Admin</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="relative border-b border-gray-200 p-4">
      {isMenuOpen && (
          <div className="absolute left-4 top-[-50px] right-4 mt-2 bg-white rounded-md shadow-lg py-1">
            <button
              onClick={() => {
                // Aquí irá la lógica para cerrar sesión
                console.log("Cerrar sesión");
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-white font-medium">
            {getInitials(user.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
