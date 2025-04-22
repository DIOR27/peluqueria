import { MoreVertical, Scissors } from "lucide-react";

export default function SpecialistCard({ specialist, handleSpecialistClick }) {
  const services = [
    { id: 1, name: "Corte de Cabello" },
    { id: 2, name: "Afeitado Tradicional" },
    { id: 3, name: "Perfilado de Barba" },
    { id: 4, name: "Coloración" },
    { id: 5, name: "Tratamiento Capilar" }
  ];

  return (
    <div
      key={specialist.id}
      className={`bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow ${
        !specialist.isActive ? "opacity-60" : ""
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{specialist.name}</h3>
            <p className="text-sm text-gold-500">{specialist.position}</p>
            <span className={`text-xs font-medium ${
              specialist.isActive ? "text-green-600" : "text-gray-500"
            }`}>
              {specialist.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div className="relative">
            <button
              className="p-1 hover:bg-gray-100 rounded-full"
              onClick={() => handleSpecialistClick(specialist)}
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
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
