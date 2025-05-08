import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Sheet } from "../../components/ui/Sheet";
import { Search } from "lucide-react";
import useServiceStore from "../../stores/serviceStore";
import useSpecialistStore from "../../stores/specialistStore";
import ServiceCard from "../../components/dashboard/services/ServiceCard";
import EditService from "../../components/dashboard/services/EditService";
import ServiceDetails from "../../components/dashboard/services/ServiceDetails";
import NewService from "../../components/dashboard/services/NewService";
import Input from "../../components/ui/Input";

export default function Services() {
  const services = useServiceStore((state) => state.services);
  const specialists = useSpecialistStore((state) => state.specialists);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewService, setIsNewService] = useState(false);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceClick = (service, isEdit) => {
    setIsEditing(isEdit);
    setSelectedService(service);
    setIsNewService(false);
    setIsSheetOpen(true);
  };

  const handleNewService = () => {
    setIsEditing(false);
    setIsNewService(true);
    setIsSheetOpen(true);
    setSelectedService(null);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditing(true);
    setIsNewService(false);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedService(null);
    setIsEditing(false);
    setIsNewService(false);
  };

  const handleDelete = () => {
    // Aquí irá la lógica para eliminar el servicio
    console.log("Eliminar servicio:", selectedService.id);
    handleCloseSheet();
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
      ? currentSpecialists.filter((id) => id !== specialistId)
      : [...currentSpecialists, specialistId];

    setSelectedService({
      ...selectedService,
      specialists: newSpecialists,
    });
  };

  const editing = selectedService && isEditing;
  const viewing = selectedService && !isEditing && !isNewService;
  const newService = isNewService && !isEditing;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <Button onClick={handleNewService}>Nuevo Servicio</Button>
      </div>

      <div className="mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar servicios..."
            className="pl-10 pr-4 py-2"
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
        title={
          newService
            ? "Nuevo Servicio"
            : editing
            ? "Editar Servicio"
            : selectedService?.name
        }
      >
        {editing ? (
          <EditService
            handleSubmit={handleSubmit}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            specialists={specialists}
            handleSpecialistToggle={handleSpecialistToggle}
            setIsSheetOpen={setIsSheetOpen}
            handleClose={handleCloseSheet}
          />
        ) : null}

        {viewing ? (
          <ServiceDetails
            selectedService={selectedService}
            specialists={specialists}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : null}

        {newService ? (
          <NewService
            specialists={specialists}
            handleClose={handleCloseSheet}
          />
        ) : null}
      </Sheet>
    </div>
  );
}
