import { Button } from "../../ui/Button";

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

export default function AppointmentDetail({
  appointment,
  onClose,
  onEditClick,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Información de la Cita</h3>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Cliente</h4>
            <p className="mt-1">{appointment.clientName}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Servicio</h4>
            <p className="mt-1">{appointment.service}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Especialista</h4>
            <p className="mt-1">{appointment.specialist}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Fecha y Hora</h4>
            <p className="mt-1">
              {new Date(appointment.date).toLocaleDateString()}{" "}
              {appointment.time}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Estado</h4>
            <span
              className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[appointment.status]
                }`}
            >
              {statusLabels[appointment.status]}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Precio</h4>
            <p className="mt-1">${appointment.price}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button onClick={onEditClick}>Editar</Button>
      </div>
    </div>
  );
}
