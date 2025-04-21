import { useState } from "react";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";
import Select from "react-select";

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

export function AppointmentForm({ isOpen, onClose, appointment = null }) {
  const [formData, setFormData] = useState({
    clientName: appointment?.clientName || "",
    service: appointment?.service || "",
    specialist: appointment?.specialist || "",
    date: appointment?.date || new Date().toISOString().split('T')[0],
    time: appointment?.time || "",
    status: appointment?.status || "pending",
    price: appointment?.price || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejaremos la lógica para guardar/actualizar la cita
    console.log(formData);
    onClose();
  };

  const handleChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={appointment ? "Editar Cita" : "Nueva Cita"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Cliente
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={(e) => handleChange(e?.target?.value ?? "", 'clientName')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servicio
          </label>
          <Select
            options={[
              { value: "Corte de cabello", label: "Corte de cabello" },
              { value: "Afeitado tradicional", label: "Afeitado tradicional" },
              { value: "Perfilado de barba", label: "Perfilado de barba" },
              { value: "Coloración", label: "Coloración" },
            ]}
            onChange={(e) => handleChange(e?.value ?? "", 'service')}
            isClearable
            styles={customStyles}
            placeholder="Seleccionar servicio"
          />

        </div>

        <div>
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
            onChange={(e) => handleChange(e?.value ?? "", 'specialist')}
            isClearable
            styles={customStyles}
            placeholder="Seleccionar especialista"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => handleChange(e?.target?.value ?? "", 'date')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Hora
            </label>
            <div className="relative">
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={(e) => handleChange(e?.target?.value ?? "", 'time')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <Select
            options={[
              { value: "pending", label: "Pendiente" },
              { value: "confirmed", label: "Confirmada" },
              { value: "completed", label: "Completada" },
              { value: "cancelled", label: "Cancelada" },
            ]}
            onChange={(e) => handleChange(e?.value ?? "", 'status')}
            isClearable
            styles={customStyles}
            placeholder="Seleccionar estado"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => handleChange(e?.target?.value ?? "", 'price')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {appointment ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Sheet>
  );
}
