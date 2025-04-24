import { useState } from "react";
import { Button } from "../../ui/Button";
import { Sheet } from "../../ui/Sheet";
import Select from "../../ui/Select";
import Input from "../../ui/Input";

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
          <Input
            label="Nombre del Cliente"
            value={formData.clientName}
            onChange={(e) => handleChange(e?.target?.value ?? "", "clientName")}
            name="clientName"
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
            <Input
              label="Fecha"
              value={formData.date}
              onChange={(e) => handleChange(e?.target?.value ?? "", "date")}
              name="date"
              required
              type="date"
            />
          </div>

          <div>
            <Input
              label="Hora"
              value={formData.time}
              onChange={(e) => handleChange(e?.target?.value ?? "", "time")}
              name="time"
              required
              type="time"
            />
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
          <Input
            label="Precio"
            value={formData.price}
            onChange={(e) => handleChange(e?.target?.value ?? "", "price")}
            name="price"
            required
            type="number"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </Sheet>
  );
}
