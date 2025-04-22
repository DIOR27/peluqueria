import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Sheet } from "../../components/ui/Sheet";
import { Search} from "lucide-react";
import useServiceStore from "../../stores/serviceStore";
import useSpecialistStore from "../../stores/specialistStore";
import ServiceCard from "../../components/dashboard/ServiceCard";
import EditService from "../../components/dashboard/EditService";
import ServiceDetails from "../../components/dashboard/ServiceDetails";

export default function Services() {
  const services = useServiceStore(state => state.services);
  const specialists = useSpecialistStore(state => state.specialists);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewService, setIsNewService] = useState(false);

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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            specialists={specialists}
            handleServiceClick={handleServiceClick}
          />
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
              <EditService
                handleSubmit={handleSubmit}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                specialists={specialists}
                handleSpecialistToggle={handleSpecialistToggle}
                setIsSheetOpen={setIsSheetOpen}
              />
            ) : (
              <ServiceDetails
                selectedService={selectedService}
                specialists={specialists}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )}
          </div>
        )}
      </Sheet>
    </div>
  );
}