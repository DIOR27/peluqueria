import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import AppointmentDetail from "./AppointmentDetail";
import EditAppointment from "./EditAppointment";
import { Button } from "../../ui/Button";
import { Sheet } from "../../ui/Sheet";

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  confirmed: "Confirmada",
  pending: "Pendiente",
  completed: "Completada",
  cancelled: "Cancelada",
};

const tableHeaders = [
  "Cliente",
  "Servicio",
  "Especialista",
  "Fecha y Hora",
  "Estado",
  "Precio",
  "Acciones",
];

export default function AppointmentsTable({
  currentPage,
  itemsPerPage,
  filteredAppointments,
  setCurrentPage,
}) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsSheetOpen(true);
    setIsEditing(false);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsSheetOpen(true);
    setIsEditing(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
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
                  <div className="text-sm text-gray-900">
                    {appointment.service}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {appointment.specialist}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()}{" "}
                    {appointment.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[appointment.status]
                      }`}
                  >
                    {statusLabels[appointment.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${appointment.price}
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Menu>
                    <MenuButton className="p-1 hover:bg-gray-100 rounded-full focus:outline-none">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </MenuButton>
                    <MenuItems
                      anchor="left start"
                      className="bg-white shadow-lg rounded-md flex flex-col border border-gray-200 text-sm text-gray-700 focus:outline-none"
                    >
                      <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                        <button
                          className="text-left font-medium"
                          onClick={() => handleRowClick(appointment)}
                        >
                          Ver detalles
                        </button>
                      </MenuItem>
                      <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                        <button
                          className="text-left font-medium"
                          onClick={() => handleEdit(appointment)}
                        >
                          Editar
                        </button>
                      </MenuItem>
                      <MenuSeparator className="h-px bg-gray-200" />
                      <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                        <button className="text-left font-medium text-red-500">
                          Cancelar
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Sheet
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setSelectedAppointment(null);
          setIsEditing(false);
        }}
        title={`Cita de ${selectedAppointment?.clientName}`}
      >
        {selectedAppointment && !isEditing ? (
          <AppointmentDetail
            appointment={selectedAppointment}
            setIsSheetOpen={setIsSheetOpen}
            handleEdit={handleEdit}
            onEditClick={() => {
              setIsEditing(true);
            }}
            onClose={() => {
              setIsSheetOpen(false);
              setSelectedAppointment(null);
            }}
          />
        ) : null}

        {selectedAppointment && isEditing ? (
          <EditAppointment
            isOpen={isEditing}
            onClose={() => {
              setIsEditing(false);
              setSelectedAppointment(null);
              setIsSheetOpen(false);
            }}
            appointment={selectedAppointment}
          />
        ) : null}
      </Sheet>
    </>
  );
}
