import { useState } from "react";
import { Button } from "../../ui/Button";
import Select from "../../ui/Select";
import Input from "../../ui/Input";

export default function EditAppointment({ onClose, appointment = null }) {
  const [formData, setFormData] = useState({
    clientName: appointment?.clientName || "",
    service: appointment?.service || "",
    specialist: appointment?.specialist || "",
    date: appointment?.date || new Date().toISOString().split("T")[0],
    time: appointment?.time || "",
    status: appointment?.status || "pending",
    price: appointment?.price || "",
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

  const specialistsOptions = [
    { value: "Carlos Rodríguez", label: "Carlos Rodríguez" },
    { value: "Miguel Ángel", label: "Miguel Ángel" },
    { value: "Daniel Torres", label: "Daniel Torres" },
    { value: "Roberto Sánchez", label: "Roberto Sánchez" },
  ];
  const servicesOptions = [
    { value: "Corte de cabello", label: "Corte de cabello" },
    { value: "Afeitado tradicional", label: "Afeitado tradicional" },
    { value: "Perfilado de barba", label: "Perfilado de barba" },
    { value: "Coloración", label: "Coloración" },
  ];
  const statusOptions = [
    { value: "pending", label: "Pendiente" },
    { value: "confirmed", label: "Confirmada" },
    { value: "completed", label: "Completada" },
    { value: "cancelled", label: "Cancelada" },
  ];

  return (
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
          value={servicesOptions.find(
            (service) => service.value === formData.service
          )}
          options={servicesOptions}
          onChange={(e) => handleChange(e?.value ?? "", "service")}
          isClearable
          placeholder="Seleccionar servicio"
          label="Servicio"
        />
      </div>

      <div>
        <Select
          value={specialistsOptions.find(
            (specialist) => specialist.value === formData.specialist
          )}
          options={specialistsOptions}
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
            type="date"
          />
        </div>

        <div>
          <Input
            label="Hora"
            value={formData.time}
            onChange={(e) => handleChange(e?.target?.value ?? "", "time")}
            name="time"
            type="time"
            required
          />
        </div>
      </div>

      <div>
        <Select
          value={statusOptions.find(
            (status) => status.value === formData.status
          )}
          options={statusOptions}
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
          type="number"
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Actualizar</Button>
      </div>
    </form>
  );
}
