import { Button } from "../../ui/Button";
import { Form, Formik } from "formik";
import FormInput from "../../ui/FormInput";
import * as Yup from "yup";
import FormSelect from "../../ui/FormSelect";
import { useEffect } from "react";
import useServiceStore from "../../../stores/serviceStore";
import useSpecialistStore from "../../../stores/specialistStore";
import useAppointmentStore from "../../../stores/appointmentStore";
import FormChangeMonitor from "./FormChangeMonitor";

const validationSchema = Yup.object({
  service: Yup.string().required("El servicio es requerido"),
  specialist: Yup.string().required("El especialista es requerido"),
  date: Yup.string().required("La fecha es requerida"),
  time: Yup.string().required("La hora es requerida"),
  status: Yup.string().required("El estado es requerido"),
});

export default function EditAppointment({ onClose, appointment = null }) {
  const {
    getAppointmentDetails,
    appointmentDetails,
    availableTimeSlots,
    getAvailableTimes,
    updateAppointment,
  } = useAppointmentStore();
  const { services } = useServiceStore();
  const { specialists } = useSpecialistStore();

  const initialValues = {
    service: appointmentDetails?.servicio_id || "",
    specialist: appointmentDetails?.especialista_id || "",
    status: appointmentDetails?.estado || "",
    date: appointmentDetails?.fecha || "",
    time: appointmentDetails?.hora || "",
  };

  useEffect(() => {
    const getDetails = async () => {
      if (appointment.id) {
        const { id, fecha, servicio_id, especialista_id } = appointment;
        await getAppointmentDetails(id);
        await getAvailableTimes({ fecha, especialista_id, servicio_id });
      }
    };

    getDetails();
  }, [appointment]);

  const onSubmit = async (values, { setSubmitting }) => {
    const dataToSubmit = {
      id: appointment.id,
      codigo_reserva: appointment.codigo_reserva,
      ...values,
    };

    const result = await updateAppointment(dataToSubmit);

    if (result) {
      onClose();
    }
    setSubmitting(false);
  };

  const fetchAvailableSlots = async (values) => {
    const {
      date: fecha,
      specialist: especialista_id,
      service: servicio_id,
    } = values;

    await getAvailableTimes({ fecha, especialista_id, servicio_id });
  };

  const servicesOptions = services
    ?.filter((service) => service.activo)
    .map((service) => ({
      value: service.id,
      label: `${service.nombre} (${service.duracion_estimada} mins)`,
    }));
  const specialistsOptions = specialists
    ?.filter((spec) => spec.activo)
    .map((spec) => ({
      value: spec.id,
      label: `${spec.nombre} ${spec.apellido}`,
    }));
  const timeSlotsOptions = [
    ...(availableTimeSlots || []).map((timeSlot) => ({
      value: timeSlot,
      label: timeSlot,
    })),
    // Add current appointment time if it exists and isn't in available slots
    ...(appointmentDetails?.hora &&
    !availableTimeSlots?.includes(appointmentDetails.hora)
      ? [
          {
            value: appointmentDetails.hora,
            label: appointmentDetails.hora,
          },
        ]
      : []),
  ];
  const statusOptions = [
    { value: "pendiente", label: "Pendiente" },
    { value: "confirmada", label: "Confirmada" },
    { value: "completada", label: "Completada" },
    { value: "cancelada", label: "Cancelada" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>
        <FormChangeMonitor
          fieldsToWatch={["service", "specialist", "date"]}
          onConditionMet={fetchAvailableSlots}
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
          {/* <FormInput label="Hora" name="time" type="time" /> */}
          <FormSelect
            label="Hora"
            name="time"
            options={timeSlotsOptions}
            placeholder="Hora"
            isClearable
            hideSelectedOptions
          />
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
