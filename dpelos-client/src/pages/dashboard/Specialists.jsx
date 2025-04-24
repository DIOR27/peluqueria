import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Sheet } from "../../components/ui/Sheet";
import { Search } from "lucide-react";
import useSpecialistStore from "../../stores/specialistStore";
import SpecialistCard from "../../components/dashboard/specialists/SpecialistCard";
import EditSpecialist from "../../components/dashboard/specialists/EditSpecialist";
import SpecialistDetails from "../../components/dashboard/specialists/SpecialistDetails";
import useServiceStore from "../../stores/serviceStore";
import NewSpecialist from "../../components/dashboard/specialists/NewSpecialist";

export default function Specialists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewSpecialist, setIsNewSpecialist] = useState(false);

  const { specialists } = useSpecialistStore();
  const { services } = useServiceStore();
  const filteredSpecialists = specialists.filter(specialist =>
    specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialist.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecialistClick = (specialist, isEdit) => {
    setIsEditing(isEdit);
    setSelectedSpecialist(specialist);
    setIsSheetOpen(true);
  };

  const handleNewSpecialist = () => {
    setSelectedSpecialist(null);
    setIsNewSpecialist(true);
    setIsSheetOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsNewSpecialist(false);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedSpecialist(null);
    setIsEditing(false);
    setIsNewSpecialist(false);
  };

  const handleDelete = () => {
    // Aquí irá la lógica para eliminar el especialista
    console.log("Eliminar especialista:", selectedSpecialist.id);
    handleCloseSheet();
  };

  const handleServiceToggle = (serviceId) => {
    const currentServices = selectedSpecialist.services || [];
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter(id => id !== serviceId)
      : [...currentServices, serviceId];

    setSelectedSpecialist({
      ...selectedSpecialist,
      services: newServices
    });
  };

  const handleToggleStatus = (specialist) => {
    console.log("Toggle status for specialist:", specialist.id);
  };

  const editing = selectedSpecialist && isEditing;
  const viewing = selectedSpecialist && !isEditing;
  const newSpecialist = isNewSpecialist && !isEditing && !selectedSpecialist;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Especialistas</h1>
        <Button onClick={handleNewSpecialist}>Nuevo Especialista</Button>
      </div>

      <div className="mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar especialistas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialists.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            services={services}
            handleSpecialistClick={handleSpecialistClick}
            handleToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      <Sheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        title={newSpecialist ? "Nuevo Especialista" : selectedSpecialist?.name || "Detalles del Especialista"}
      >

        {editing ? (
          <EditSpecialist
            selectedSpecialist={selectedSpecialist}
            setSelectedSpecialist={setSelectedSpecialist}
            setIsSheetOpen={setIsSheetOpen}
            handleServiceToggle={handleServiceToggle}
            services={services}
            handleClose={handleCloseSheet}
          />
        ) : null}

        {viewing ? (
          <SpecialistDetails
            selectedSpecialist={selectedSpecialist}
            services={services}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : null}

        {newSpecialist ? (
          <NewSpecialist
            services={services}
            handleClose={handleCloseSheet}
          />
        ) : null}
      </Sheet>
    </div>
  );
}
