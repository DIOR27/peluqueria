import { MoreVertical, Scissors } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";

export default function SpecialistCard({ specialist, handleSpecialistClick, services, handleToggleStatus }) {
  return (
    <div
      key={specialist.id}
      className={`bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow ${!specialist.isActive ? "opacity-60" : ""
        }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{specialist.name}</h3>
            <p className="text-sm text-gold-500">{specialist.position}</p>
            <span className={`text-xs font-medium ${specialist.isActive ? "text-green-600" : "text-gray-500"
              }`}>
              {specialist.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div className="relative">
            <Menu>
              <MenuButton className="p-1 hover:bg-gray-100 rounded-full focus:outline-none">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </MenuButton>
              <MenuItems
                anchor="left start"
                className="bg-white shadow-lg rounded-md flex flex-col border border-gray-200 text-sm text-gray-700 focus:outline-none"
              >
                <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                  <button
                    className="text-left font-medium"
                    // onClick={() => handleRowClick(appointment)}
                    onClick={() => handleSpecialistClick(specialist)}
                  >
                    Ver detalles
                  </button>
                </MenuItem>
                <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                  <button
                    className="text-left font-medium"
                    onClick={() => handleSpecialistClick(specialist, true)}
                  >
                    Editar
                  </button>
                </MenuItem>
                <MenuSeparator className="h-px bg-gray-200" />
                <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                  <button
                    className={`text-left font-medium ${specialist.isActive ? "text-red-500" : "text-green-500"} `}
                    onClick={() => handleToggleStatus(specialist)}
                  >
                    {specialist.isActive ? "Desactivar" : "Activar"}
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{specialist.bio}</p>
        {/* <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{specialist.schedule}</span>
          </div>
        </div> */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Servicios:</h4>
          <div className="flex flex-wrap gap-2">
            {specialist.services.map(serviceId => {
              const service = services.find(s => s.id === serviceId);
              return service ? (
                <span key={serviceId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                  <Scissors className="w-3 h-3 mr-1" />
                  {service.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
