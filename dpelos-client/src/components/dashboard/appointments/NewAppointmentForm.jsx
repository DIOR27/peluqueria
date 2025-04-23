import { useState } from "react";
import { Button } from "../../ui/Button";
import { Sheet } from "../../ui/Sheet";
import Select from "../../ui/Select";

export default function AppointmentForm({
  isOpen,
  onClose,
  appointment = null,
}) {
  const [formData, setFormData] = useState({
    clientName: "",
    service: "",
    specialist: "",
    date: "",
    time: "",
    status: "",
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejaremos la lógica para guardar/actualizar la cita
    console.log(formData);
    onClose();
  };

  const handleChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            onChange={(e) => handleChange(e?.target?.value ?? "", "clientName")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <Select
            options={[
              { value: "Corte de cabello", label: "Corte de cabello" },
              { value: "Afeitado tradicional", label: "Afeitado tradicional" },
              { value: "Perfilado de barba", label: "Perfilado de barba" },
              { value: "Coloración", label: "Coloración" },
            ]}
            onChange={(e) => handleChange(e?.value ?? "", "service")}
            isClearable
            placeholder="Seleccionar servicio"
            label="Servicio"
          />
        </div>

        <div>
          <Select
            options={[
              { value: "Carlos Rodríguez", label: "Carlos Rodríguez" },
              { value: "Miguel Ángel", label: "Miguel Ángel" },
              { value: "Daniel Torres", label: "Daniel Torres" },
              { value: "Roberto Sánchez", label: "Roberto Sánchez" },
            ]}
            onChange={(e) => handleChange(e?.value ?? "", "specialist")}
            isClearable
            placeholder="Seleccionar especialista"
            label="Especialista"
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
                onChange={(e) => handleChange(e?.target?.value ?? "", "date")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora
            </label>
            <div className="relative">
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={(e) => handleChange(e?.target?.value ?? "", "time")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <Select
            options={[
              { value: "pending", label: "Pendiente" },
              { value: "confirmed", label: "Confirmada" },
              { value: "completed", label: "Completada" },
              { value: "cancelled", label: "Cancelada" },
            ]}
            onChange={(e) => handleChange(e?.value ?? "", "status")}
            isClearable
            placeholder="Seleccionar estado"
            label="Estado"
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
            onChange={(e) => handleChange(e?.target?.value ?? "", "price")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{appointment ? "Actualizar" : "Crear"}</Button>
        </div>
      </form>
    </Sheet>
  );
}
