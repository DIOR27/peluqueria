import { Button } from "../../ui/Button";
import { Sheet } from "../../ui/Sheet";
import { Formik, Form } from "formik";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import * as Yup from "yup";

export default function AppointmentForm({
  isOpen,
  onClose,
  appointment = null,
}) {
  const initialValues = {
    clientName: "",
    service: "",
    specialist: "",
    date: "",
    time: "",
  };
  const validationSchema = Yup.object({
    clientName: Yup.string().required("El nombre del cliente es requerido"),
    service: Yup.string().required("El servicio es requerido"),
    specialist: Yup.string().required("El especialista es requerido"),
    date: Yup.string().required("La fecha es requerida"),
    time: Yup.string().required("La hora es requerida"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
    onClose();
  };

  const servicesOptions = [
    { value: "Corte de cabello", label: "Corte de cabello" },
    { value: "Afeitado tradicional", label: "Afeitado tradicional" },
    { value: "Perfilado de barba", label: "Perfilado de barba" },
    { value: "Coloración", label: "Coloración" },
  ];

  const specialistsOptions = [
    { value: "Carlos Rodríguez", label: "Carlos Rodríguez" },
    { value: "Miguel Ángel", label: "Miguel Ángel" },
    { value: "Daniel Torres", label: "Daniel Torres" },
    { value: "Roberto Sánchez", label: "Roberto Sánchez" },
  ];

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={appointment ? "Editar Cita" : "Nueva Cita"}
    >
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
              isClearable
            />

            <FormSelect
              label="Especialista"
              name="specialist"
              options={specialistsOptions}
              placeholder="Selecciona un especialista"
              isClearable
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormInput label="Fecha" name="date" type="date" />
            <FormInput label="Hora" name="time" type="time" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
          </div>
        </Form>
      </Formik>
    </Sheet>
  );
}
