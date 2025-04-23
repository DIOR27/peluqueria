import useAppointmentStore from "../../../stores/appointmentStore";
import Select from "../../ui/Select";

export default function AppointmentsFilters({ setCurrentPage }) {
  const { filters, setFilters } = useAppointmentStore();

  const handleFilterChange = (value, name) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  const statusOptions = [
    { value: "confirmed", label: "Confirmada" },
    { value: "pending", label: "Pendiente" },
    { value: "completed", label: "Completada" },
    { value: "cancelled", label: "Cancelada" },
  ];
  const specialistOptions = [
    { value: "Carlos Rodríguez", label: "Carlos Rodríguez" },
    { value: "Miguel Ángel", label: "Miguel Ángel" },
    { value: "Daniel Torres", label: "Daniel Torres" },
    { value: "Roberto Sánchez", label: "Roberto Sánchez" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex gap-4">
        <div className="w-1/4">
          <Select
            label="Estado"
            options={statusOptions}
            onChange={(e) => handleFilterChange(e?.value ?? "", 'status')}
            isClearable
          />
        </div>
        <div className="w-1/4">
          <Select
            label="Especialista"
            options={specialistOptions}
            onChange={(e) => handleFilterChange(e?.value ?? "", 'specialist')}
            isClearable
          />
        </div>
      </div>
    </div>
  );
}
