import { Button } from "../../components/ui/Button";
import { Bell, Calendar, Users, Save } from "lucide-react";
import { Formik, Form, Field } from "formik";
import FormInput from "../../components/ui/FormInput";
import FormToggle from "../../components/dashboard/settings/FormToggle";
import * as Yup from "yup";
import WorkingHoursField from "../../components/dashboard/settings/WorkingHoursField";

const initialValues = {
  notifications: {
    email: true,
    sms: false,
  },
  business: {
    name: "DPelos Barbería",
    address: "Calle Principal 123",
    phone: "123456789",
    email: "contacto@dpelos.com",
  },
  workingHours: {
    lunes: { open: "09:00", close: "18:00", isActive: true },
    martes: { open: "09:00", close: "18:00", isActive: true },
    miercoles: { open: "09:00", close: "18:00", isActive: true },
    jueves: { open: "09:00", close: "18:00", isActive: true },
    viernes: { open: "09:00", close: "18:00", isActive: true },
    sabado: { open: "10:00", close: "14:00", isActive: true },
    domingo: { open: "00:00", close: "00:00", isActive: false },
  },
  appointments: {
    interval: 30,
    maxPerDay: 20,
    allowOnlineBooking: true,
    requireConfirmation: true,
  },
};

const validationSchema = Yup.object({
  notifications: Yup.object({
    email: Yup.boolean().required(),
    sms: Yup.boolean().required(),
  }),
  business: Yup.object({
    name: Yup.string().required("El nombre del negocio es requerido"),
    address: Yup.string().required("La dirección es requerida"),
    phone: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^\d+$/, "Formato de teléfono inválido"),
    email: Yup.string()
      .email("Formato de email inválido")
      .required("El email es requerido"),
  }),
  workingHours: Yup.object().shape(
    Object.keys(initialValues.workingHours).reduce((acc, day) => {
      acc[day] = Yup.object({
        open: Yup.string().required("La hora de apertura es requerida"),
        close: Yup.string().required("La hora de cierre es requerida"),
        isActive: Yup.boolean().required(),
      });
      return acc;
    }, {})
  ),
  appointments: Yup.object({
    interval: Yup.number()
      .required("El intervalo es requerido")
      .min(15, "El intervalo mínimo es 15 minutos")
      .max(120, "El intervalo máximo es 120 minutos"),
    maxPerDay: Yup.number()
      .required("El máximo de citas es requerido")
      .min(1, "Debe haber al menos 1 cita por día")
      .max(100, "El máximo de citas por día es 100"),
    allowOnlineBooking: Yup.boolean().required(),
    requireConfirmation: Yup.boolean().required(),
  }),
});

export default function Settings() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Guardando configuración:", values);
    // Aquí irá la lógica para guardar los cambios en la API
    setSubmitting(false);
  };

  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Configuración</h1>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>

            <div className="space-y-6">
              {/* Sección de Notificaciones */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-5 h-5 text-gold-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Notificaciones
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Notificaciones por Email
                      </h3>
                      <p className="text-sm text-gray-500">
                        Recibir notificaciones en tu correo electrónico
                      </p>
                    </div>
                    <Field name="notifications.email" component={FormToggle} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Notificaciones por SMS
                      </h3>
                      <p className="text-sm text-gray-500">
                        Recibir notificaciones por mensaje de texto
                      </p>
                    </div>
                    <Field name="notifications.sms" component={FormToggle} />
                  </div>
                </div>
              </div>

              {/* Sección de Información del Negocio */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-gold-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Información del Negocio
                  </h2>
                </div>
                <div className="space-y-4">
                  <FormInput
                    label="Nombre del Negocio"
                    name="business.name"
                    placeholder="Nombre del Negocio"
                  />
                  <FormInput
                    label="Dirección"
                    name="business.address"
                    placeholder="Dirección"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Teléfono"
                      name="business.phone"
                      placeholder="Teléfono"
                    />
                    <FormInput
                      label="Email"
                      name="business.email"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>

              {/* Sección de Horario de Trabajo */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Horario de Trabajo
                  </h2>
                </div>
                <div className="space-y-4">
                  {Object.keys(values.workingHours).map((day) => (
                    <WorkingHoursField
                      key={day}
                      day={day}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  ))}
                </div>
              </div>

              {/* Sección de Configuración de Citas */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Configuración de Citas
                  </h2>
                </div>
                <div className="space-y-4">
                  <FormInput
                    label="Intervalo entre Citas (minutos)"
                    name="appointments.interval"
                    type="number"
                    min="15"
                    step="15"
                  />
                  <FormInput
                    label="Máximo de Citas por Día"
                    name="appointments.maxPerDay"
                    type="number"
                    min="1"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Reservas en Línea
                      </h3>
                      <p className="text-sm text-gray-500">
                        Permitir que los clientes reserven en línea
                      </p>
                    </div>
                    <Field
                      name="appointments.allowOnlineBooking"
                      component={FormToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Confirmación Requerida
                      </h3>
                      <p className="text-sm text-gray-500">
                        Las citas requieren confirmación
                      </p>
                    </div>
                    <Field
                      name="appointments.requireConfirmation"
                      component={FormToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
