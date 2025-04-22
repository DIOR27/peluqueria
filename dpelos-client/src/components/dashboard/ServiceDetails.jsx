import { Edit, Trash2, User } from "lucide-react";
import { Button } from "../ui/Button";

export default function ServiceDetails({ selectedService, specialists, handleDelete, handleEdit }) {
  return (
    <div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Descripción</h4>
          <p className="mt-1">{selectedService.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Duración</h4>
            <p className="mt-1">{selectedService.duration}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Precio</h4>
            <p className="mt-1">{selectedService.price}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-500">Estado:</h4>
          <span className={`text-sm ${
            selectedService.isActive ? "text-green-600" : "text-gray-500"
          }`}>
            {selectedService.isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Especialistas</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedService.specialists?.map(specialistId => {
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
      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </Button>
        <Button onClick={handleEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>
    </div>
  );
}
