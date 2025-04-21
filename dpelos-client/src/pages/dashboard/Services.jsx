import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Sheet } from "../../components/ui/Sheet";
import { Toggle } from "../../components/ui/Toggle";
import { Search, MoreVertical, Edit, Trash2, Clock, DollarSign, User } from "lucide-react";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewService, setIsNewService] = useState(false);

  const [specialists] = useState([
    { id: 1, name: "Carlos Rodríguez" },
    { id: 2, name: "Miguel Ángel" },
    { id: 3, name: "Daniel Torres" },
    { id: 4, name: "Roberto Sánchez" }
  ]);

  const [services] = useState([
    {
      id: 1,
      name: "Corte de Cabello",
      description: "Cortes modernos y clásicos adaptados a tu estilo y tipo de cabello.",
      duration: "30 min",
      price: "$15",
      category: "Cortes",
      isActive: false,
      specialists: [1, 2, 4] // IDs de los especialistas que pueden ofrecer este servicio
    },
    {
      id: 2,
      name: "Afeitado Tradicional",
      description: "Afeitado clásico con navaja y toallas calientes para una experiencia premium.",
      duration: "45 min",
      price: "$12",
      category: "Afeitado",
      isActive: true,
      specialists: [1, 2]
    },
    {
      id: 3,
      name: "Perfilado de Barba",
      description: "Dale forma y estilo a tu barba con nuestro servicio de perfilado profesional.",
      duration: "20 min",
      price: "$10",
      category: "Barba",
      isActive: false,
      specialists: [1, 2, 4]
    },
    {
      id: 4,
      name: "Coloración",
      description: "Servicios de coloración y tratamientos para un look renovado.",
      duration: "60 min",
      price: "$25",
      category: "Color",
      isActive: true,
      specialists: [2, 3]
    },
    {
      id: 5,
      name: "Tratamiento Capilar",
      description: "Tratamientos especializados para el cuidado y salud de tu cabello.",
      duration: "45 min",
      price: "$20",
      category: "Tratamientos",
      isActive: true,
      specialists: [3]
    }
  ]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsEditing(false);
    setIsNewService(false);
    setIsSheetOpen(true);
  };

  const handleNewService = () => {
    setSelectedService({
      id: services.length + 1,
      name: "",
      description: "",
      duration: "",
      price: "",
      category: "",
      isActive: true,
      specialists: [] // Array vacío para nuevos servicios
    });
    setIsEditing(true);
    setIsNewService(true);
    setIsSheetOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsNewService(false);
  };

  const handleDelete = () => {
    // Aquí irá la lógica para eliminar el servicio
    console.log("Eliminar servicio:", selectedService.id);
    setIsSheetOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewService) {
      // Aquí irá la lógica para crear un nuevo servicio
      console.log("Crear nuevo servicio:", selectedService);
    } else {
      // Aquí irá la lógica para actualizar el servicio
      console.log("Actualizar servicio:", selectedService);
    }
    setIsSheetOpen(false);
  };

  const handleSpecialistToggle = (specialistId) => {
    const currentSpecialists = selectedService.specialists || [];
    const newSpecialists = currentSpecialists.includes(specialistId)
      ? currentSpecialists.filter(id => id !== specialistId)
      : [...currentSpecialists, specialistId];
    
    setSelectedService({
      ...selectedService,
      specialists: newSpecialists
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <Button onClick={handleNewService}>Nuevo Servicio</Button>
      </div>

      <div className="mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
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
        ))}
      </div>

      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={isNewService ? "Nuevo Servicio" : (isEditing ? "Editar Servicio" : selectedService?.name)}
      >
        {selectedService && (
          <div className="space-y-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Servicio
                  </label>
                  <input
                    type="text"
                    value={selectedService.name}
                    onChange={(e) => setSelectedService({...selectedService, name: e.target.value})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={selectedService.description}
                    onChange={(e) => setSelectedService({...selectedService, description: e.target.value})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    rows="3"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duración
                    </label>
                    <input
                      type="text"
                      value={selectedService.duration}
                      onChange={(e) => setSelectedService({...selectedService, duration: e.target.value})}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio
                    </label>
                    <input
                      type="text"
                      value={selectedService.price}
                      onChange={(e) => setSelectedService({...selectedService, price: e.target.value})}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialistas
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {specialists.map(specialist => (
                      <label key={specialist.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedService.specialists?.includes(specialist.id)}
                          onChange={() => handleSpecialistToggle(specialist.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{specialist.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Toggle
                  checked={selectedService.isActive}
                  onChange={(value) => setSelectedService({...selectedService, isActive: value})}
                  label="Estado"
                />
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {isNewService ? "Crear" : "Guardar"}
                  </Button>
                </div>
              </form>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </Sheet>
    </div>
  );
}