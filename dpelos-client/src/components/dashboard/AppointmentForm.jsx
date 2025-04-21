import { useState } from "react";
import { Button } from "../ui/Button";
import { Sheet } from "../ui/Sheet";
import { Calendar, Clock } from "lucide-react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
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
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servicio
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Seleccionar servicio</option>
            <option value="Corte de cabello">Corte de cabello</option>
            <option value="Afeitado tradicional">Afeitado tradicional</option>
            <option value="Perfilado de barba">Perfilado de barba</option>
            <option value="Coloración">Coloración</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Especialista
          </label>
          <select
            name="specialist"
            value={formData.specialist}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Seleccionar especialista</option>
            <option value="Carlos Rodríguez">Carlos Rodríguez</option>
            <option value="Miguel Ángel">Miguel Ángel</option>
            <option value="Daniel Torres">Daniel Torres</option>
            <option value="Roberto Sánchez">Roberto Sánchez</option>
          </select>
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
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
            />
            <Calendar className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
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
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
              <Clock className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmada</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
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
