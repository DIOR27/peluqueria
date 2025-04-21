import { useState } from "react";
import useAppointmentStore from "../../stores/appointmentStore";
import { Button } from "../../components/ui/Button";
import { AppointmentForm } from "../../components/dashboard/AppointmentForm";
import AppointmentsFilters from "../../components/dashboard/AppointmentsFilters";
import AppointmentsTable from "../../components/dashboard/AppointmentsTable";

export default function Appointments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const itemsPerPage = 10;
  const { getFilteredAppointments } = useAppointmentStore();
  const filteredAppointments = getFilteredAppointments(useAppointmentStore.getState());

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Citas</h1>
        <Button
          className="bg-gold-500 hover:bg-gold-600"
          onClick={() => {
            setSelectedAppointment(null);
            setIsFormOpen(true);
          }}
        >
          Nueva Cita
        </Button>
      </div>

      <AppointmentsFilters setCurrentPage={setCurrentPage} />

      <AppointmentsTable
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        filteredAppointments={filteredAppointments}
        setCurrentPage={setCurrentPage}
        handleEdit={handleEdit}
      />

      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        appointment={selectedAppointment}
      />
    </div>
  );
}
