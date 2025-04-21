import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Sheet } from "../../components/ui/Sheet";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockClients = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", phone: "123456789", lastVisit: "2024-03-15" },
    { id: 2, name: "María García", email: "maria@example.com", phone: "987654321", lastVisit: "2024-03-14" },
    { id: 3, name: "Pedro López", email: "pedro@example.com", phone: "1122334455", lastVisit: "2024-03-13" },
    { id: 4, name: "Ana Torres", email: "ana@example.com", phone: "6677889900", lastVisit: "2024-03-12" },
    { id: 5, name: "Luis Martínez", email: "luis@example.com", phone: "5544332211", lastVisit: "2024-03-11" },
    { id: 6, name: "Laura Sánchez", email: "laura@example.com", phone: "9988776655", lastVisit: "2024-03-10" },
    { id: 7, name: "Miguel Ángel Herrera", email: "miguel@example.com", phone: "4455667788", lastVisit: "2024-03-09" },
    { id: 8, name: "Sofía Díaz", email: "sofia@example.com", phone: "3344556677", lastVisit: "2024-03-08" },
    { id: 9, name: "Diego García", email: "diego@example.com", phone: "2233445566", lastVisit: "2024-03-07" },
    { id: 10, name: "Camila Rodríguez", email: "camila@example.com", phone: "7788990011", lastVisit: "2024-03-06" },
    { id: 11, name: "Andrés Torres", email: "andres@example.com", phone: "6677889900", lastVisit: "2024-03-05" },
    { id: 12, name: "Valeria Herrera", email: "valeria@example.com", phone: "5544332211", lastVisit: "2024-03-04" },
    { id: 13, name: "Jorge Sánchez", email: "jorge@example.com", phone: "9988776655", lastVisit: "2024-03-03" },
    { id: 14, name: "Carolina Díaz", email: "carolina@example.com", phone: "3344556677", lastVisit: "2024-03-02" },
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setIsSheetOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button>Nuevo Cliente</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última visita
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedClients.map((client) => (
              <tr
                key={client.id}
                onClick={() => handleClientClick(client)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.lastVisit}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={selectedClient?.name}
      >
        {selectedClient && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Información del Cliente</h3>
              <div className="mt-4 space-y-2">
                <p><span className="font-medium">Email:</span> {selectedClient.email}</p>
                <p><span className="font-medium">Teléfono:</span> {selectedClient.phone}</p>
                <p><span className="font-medium">Última visita:</span> {selectedClient.lastVisit}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Historial de Citas</h3>
              <div className="mt-4">
                <p className="text-gray-500">No hay citas registradas</p>
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
