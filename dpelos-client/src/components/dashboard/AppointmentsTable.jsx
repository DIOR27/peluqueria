import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";
import { useState } from "react";

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusLabels = {
  confirmed: "Confirmada",
  pending: "Pendiente",
  completed: "Completada",
  cancelled: "Cancelada"
};

const tableHeaders = [
  "Cliente",
  "Servicio",
  "Especialista",
  "Fecha y Hora",
  "Estado",
  "Precio",
  "Acciones"
];

export default function AppointmentsTable({ currentPage, itemsPerPage, filteredAppointments, setCurrentPage, handleEdit }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAppointments.map((appointment) => (
              <tr 
                key={appointment.id}
                onClick={() => handleRowClick(appointment)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.clientName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.service}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.specialist}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()} {appointment.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[appointment.status]
                    }`}
                  >
                    {statusLabels[appointment.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${appointment.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    className="text-gold-600 hover:text-gold-900"
                    onClick={() => handleEdit(appointment)}
                  >
                    Editar
                  </Button>
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
        title={`Cita de ${selectedAppointment?.clientName}`}
      >
        {selectedAppointment && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Información de la Cita</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Cliente</h4>
                  <p className="mt-1">{selectedAppointment.clientName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Servicio</h4>
                  <p className="mt-1">{selectedAppointment.service}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Especialista</h4>
                  <p className="mt-1">{selectedAppointment.specialist}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha y Hora</h4>
                  <p className="mt-1">
                    {new Date(selectedAppointment.date).toLocaleDateString()} {selectedAppointment.time}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                  <span
                    className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[selectedAppointment.status]
                    }`}
                  >
                    {statusLabels[selectedAppointment.status]}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Precio</h4>
                  <p className="mt-1">${selectedAppointment.price}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
              >
                Cerrar
              </Button>
              <Button
                onClick={() => {
                  handleEdit(selectedAppointment);
                  setIsSheetOpen(false);
                }}
              >
                Editar
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </>
  );
}