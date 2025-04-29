import { Button } from "../../ui/Button";
import { Form, Formik } from "formik";
import FormInput from "../../ui/FormInput";
import * as Yup from "yup";
import FormSelect from "../../ui/FormSelect";

export default function EditAppointment({ onClose, appointment = null }) {
  const initialValues = {
    clientName: appointment?.clientName || "",
    service: appointment?.service || "",
    specialist: appointment?.specialist || "",
    status: appointment?.status || "",
    date: appointment?.date || new Date().toISOString().split("T")[0],
    time: appointment?.time || "",
  };

  const validationSchema = Yup.object({
    clientName: Yup.string().required("El nombre del cliente es requerido"),
    service: Yup.string().required("El servicio es requerido"),
    specialist: Yup.string().required("El especialista es requerido"),
    date: Yup.string().required("La fecha es requerida"),
    time: Yup.string().required("La hora es requerida"),
    status: Yup.string().required("El estado es requerido"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
    onClose();
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormInput
          label="Nombre del Cliente"
          name="clientName"
          placeholder="Ingresa el nombre del cliente"
        />
        <div className="flex flex-col gap-4 mb-4">
          <FormSelect
            label="Servicio"
            name="service"
            options={servicesOptions}
            placeholder="Selecciona un servicio"
            value={servicesOptions.find(
              (service) => service.value === appointment?.service
            )}
            isClearable
          />

          <FormSelect
            label="Especialista"
            name="specialist"
            options={specialistsOptions}
            placeholder="Selecciona un especialista"
            value={specialistsOptions.find(
              (specialist) => specialist.value === appointment?.specialist
            )}
            isClearable
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Fecha" name="date" type="date" />
          <FormInput label="Hora" name="time" type="time" />
        </div>

        <FormSelect
          label="Estado"
          name="status"
          options={statusOptions}
          placeholder="Selecciona un estado"
          value={statusOptions.find(
            (status) => status.value === appointment?.status
          )}
          isClearable
        />

        <div className="flex justify-end gap-2 mt-8">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Actualizar</Button>
        </div>
      </Form>
    </Formik>
  );
}
