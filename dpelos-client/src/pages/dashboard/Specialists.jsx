import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Sheet } from "../../components/ui/Sheet";
import { Toggle } from "../../components/ui/Toggle";
import { Search, MoreVertical, Edit, Trash2, Clock, User, Mail, Phone, Scissors } from "lucide-react";

export default function Specialists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewSpecialist, setIsNewSpecialist] = useState(false);

  const [services] = useState([
    { id: 1, name: "Corte de Cabello" },
    { id: 2, name: "Afeitado Tradicional" },
    { id: 3, name: "Perfilado de Barba" },
    { id: 4, name: "Coloración" },
    { id: 5, name: "Tratamiento Capilar" }
  ]);

  const [specialists] = useState([
    {
      id: 1,
      name: "Carlos Rodríguez",
      position: "Master Barber",
      email: "carlos@dpelos.com",
      phone: "123456789",
      schedule: "Lunes a Viernes: 9:00 - 18:00",
      bio: "Con más de 15 años de experiencia en el mundo de la barbería, especializado en cortes clásicos y modernos.",
      isActive: true,
      image: "/barber-8.jpg",
      services: [1, 2, 3] // IDs de los servicios que ofrece
    },
    {
      id: 2,
      name: "Miguel Ángel",
      position: "Senior Barber",
      email: "miguel@dpelos.com",
      phone: "987654321",
      schedule: "Lunes a Sábado: 10:00 - 19:00",
      bio: "Experto en afeitado tradicional y perfilado de barba, con un enfoque en la atención personalizada.",
      isActive: true,
      image: "/barber-6.jpg",
      services: [1, 2, 3, 4]
    },
    {
      id: 3,
      name: "Daniel Torres",
      position: "Colorist & Stylist",
      email: "daniel@dpelos.com",
      phone: "456789123",
      schedule: "Martes a Sábado: 11:00 - 20:00",
      bio: "Especialista en coloración y tratamientos capilares, siempre a la vanguardia de las últimas tendencias.",
      isActive: true,
      image: "/barber-7.jpg",
      services: [4, 5]
    },
    {
      id: 4,
      name: "Roberto Sánchez",
      position: "Barber & Stylist",
      email: "roberto@dpelos.com",
      phone: "789123456",
      schedule: "Miércoles a Domingo: 12:00 - 21:00",
      bio: "Joven talento con gran habilidad para cortes modernos y estilos innovadores.",
      isActive: false,
      image: "/barber-5.jpg",
      services: [1, 3]
    }
  ]);

  const filteredSpecialists = specialists.filter(specialist =>
    specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialist.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecialistClick = (specialist) => {
    setSelectedSpecialist(specialist);
    setIsEditing(false);
    setIsNewSpecialist(false);
    setIsSheetOpen(true);
  };

  const handleNewSpecialist = () => {
    setSelectedSpecialist({
      id: specialists.length + 1,
      name: "",
      position: "",
      email: "",
      phone: "",
      schedule: "",
      bio: "",
      isActive: true,
      image: "",
      services: [] // Array vacío para nuevos especialistas
    });
    setIsEditing(true);
    setIsNewSpecialist(true);
    setIsSheetOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsNewSpecialist(false);
  };

  const handleDelete = () => {
    // Aquí irá la lógica para eliminar el especialista
    console.log("Eliminar especialista:", selectedSpecialist.id);
    setIsSheetOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewSpecialist) {
      // Aquí irá la lógica para crear un nuevo especialista
      console.log("Crear nuevo especialista:", selectedSpecialist);
    } else {
      // Aquí irá la lógica para actualizar el especialista
      console.log("Actualizar especialista:", selectedSpecialist);
    }
    setIsSheetOpen(false);
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialists.map((specialist) => (
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
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{specialist.schedule}</span>
                </div>
              </div>
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
        ))}
      </div>

      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={isNewSpecialist ? "Nuevo Especialista" : (isEditing ? "Editar Especialista" : selectedSpecialist?.name)}
      >
        {selectedSpecialist && (
          <div className="space-y-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={selectedSpecialist.name}
                    onChange={(e) => setSelectedSpecialist({...selectedSpecialist, name: e.target.value})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={selectedSpecialist.position}
                    onChange={(e) => setSelectedSpecialist({...selectedSpecialist, position: e.target.value})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Biografía
                  </label>
                  <textarea
                    value={selectedSpecialist.bio}
                    onChange={(e) => setSelectedSpecialist({...selectedSpecialist, bio: e.target.value})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    rows="3"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={selectedSpecialist.email}
                      onChange={(e) => setSelectedSpecialist({...selectedSpecialist, email: e.target.value})}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={selectedSpecialist.phone}
                      onChange={(e) => setSelectedSpecialist({...selectedSpecialist, phone: e.target.value})}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horario
                  </label>
                  <input
                    type="text"
                    value={selectedSpecialist.schedule}
                    onChange={(e) => setSelectedSpecialist({...selectedSpecialist, schedule: e.target.value})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servicios
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map(service => (
                      <label key={service.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedSpecialist.services?.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                        />
                        <span className="text-sm text-gray-700">{service.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Toggle
                  checked={selectedSpecialist.isActive}
                  onChange={(value) => setSelectedSpecialist({...selectedSpecialist, isActive: value})}
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
                    {isNewSpecialist ? "Crear" : "Guardar"}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Cargo</h4>
                    <p className="mt-1">{selectedSpecialist.position}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Biografía</h4>
                    <p className="mt-1">{selectedSpecialist.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Email</h4>
                      <p className="mt-1">{selectedSpecialist.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Teléfono</h4>
                      <p className="mt-1">{selectedSpecialist.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Horario</h4>
                    <p className="mt-1">{selectedSpecialist.schedule}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-500">Estado:</h4>
                    <span className={`text-sm ${
                      selectedSpecialist.isActive ? "text-green-600" : "text-gray-500"
                    }`}>
                      {selectedSpecialist.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Servicios</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedSpecialist.services?.map(serviceId => {
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
