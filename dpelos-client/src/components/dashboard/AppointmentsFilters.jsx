import useAppointmentStore from "../../stores/appointmentStore";

export default function AppointmentsFilters({setCurrentPage}) {
  const { filters, setFilters } = useAppointmentStore();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
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
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Todos</option>
              <option value="confirmed">Confirmada</option>
              <option value="pending">Pendiente</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especialista
            </label>
            <select
              name="specialist"
              value={filters.specialist}
              onChange={handleFilterChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Todos</option>
              <option value="Carlos Rodríguez">Carlos Rodríguez</option>
              <option value="Miguel Ángel">Miguel Ángel</option>
              <option value="Daniel Torres">Daniel Torres</option>
              <option value="Roberto Sánchez">Roberto Sánchez</option>
            </select>
          </div>
        </div>
      </div>
  );
}
