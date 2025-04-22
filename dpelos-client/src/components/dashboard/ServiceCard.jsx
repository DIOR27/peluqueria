import { Clock, DollarSign, MoreVertical, User } from "lucide-react";

export default function ServiceCard({ service, handleServiceClick, specialists }) {
  return (
    <div
      key={service.id}
      className={`bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow ${
        !service.isActive ? "opacity-60" : ""
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
            <span className={`text-xs font-medium ${
              service.isActive ? "text-green-600" : "text-gray-500"
            }`}>
              {service.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div className="relative">
            <button
              className="p-1 hover:bg-gray-100 rounded-full"
              onClick={() => handleServiceClick(service)}
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{service.description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{service.price}</span>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Especialistas:</h4>
          <div className="flex flex-wrap gap-2">
            {service.specialists.map(specialistId => {
              const specialist = specialists.find(s => s.id === specialistId);
              return specialist ? (
                <span key={specialistId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <User className="w-3 h-3 mr-1" />
                  {specialist.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
