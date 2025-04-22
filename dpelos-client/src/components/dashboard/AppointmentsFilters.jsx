import Select from "react-select";
import useAppointmentStore from "../../stores/appointmentStore";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#000000' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #000000' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#000000' : '#9ca3af',
    },
  }),
};

export default function AppointmentsFilters({setCurrentPage}) {
  const { filters, setFilters } = useAppointmentStore();

  const handleFilterChange = (value, name) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="flex gap-4">
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <Select
              options={[
                { value: "confirmed", label: "Confirmada" },
                { value: "pending", label: "Pendiente" },
                { value: "completed", label: "Completada" },
                { value: "cancelled", label: "Cancelada" },
              ]}
              onChange={(e) => handleFilterChange(e?.value ?? "", 'status')}
              isClearable
              styles={customStyles}
            />
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especialista
            </label>
            <Select
              options={[
                { value: "Carlos Rodríguez", label: "Carlos Rodríguez" },
                { value: "Miguel Ángel", label: "Miguel Ángel" },
                { value: "Daniel Torres", label: "Daniel Torres" },
                { value: "Roberto Sánchez", label: "Roberto Sánchez" },
              ]}
              onChange={(e) => handleFilterChange(e?.value ?? "", 'specialist')}
              isClearable
              styles={customStyles}
            />
          </div>
        </div>
      </div>
  );
}
