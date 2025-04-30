import { Button } from "../../components/ui/Button";
import { User, Lock } from "lucide-react";
import { Formik, Form } from "formik";
import FormInput from "../../components/ui/FormInput";
import FormPasswordInput from "../../components/ui/FormPasswordInput";
import * as Yup from "yup";

const initialValues = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  passwordChange: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
};

const validationSchema = Yup.object({
  personalInfo: Yup.object({
    firstName: Yup.string().required("El nombre es requerido"),
    lastName: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Formato de email inválido")
      .required("El email es requerido"),
    phone: Yup.string()
      .matches(/^\d+$/, "Formato de teléfono inválido")
      .required("El teléfono es requerido"),
  }),
  passwordChange: Yup.object({
    currentPassword: Yup.string().required("La contraseña actual es requerida"),
    newPassword: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La nueva contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida"),
  }),
});

export default function Profile() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Guardando cambios:", values);
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
        {({ isSubmitting }) => (
          <Form>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Mi Perfil</h1>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>

            <div className="space-y-6">
              {/* Sección de Información Personal */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-gold-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Información Personal
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Nombre"
                    name="personalInfo.firstName"
                    placeholder="Tu nombre"
                  />
                  <FormInput
                    label="Apellido"
                    name="personalInfo.lastName"
                    placeholder="Tu apellido"
                  />
                  <FormInput
                    label="Email"
                    name="personalInfo.email"
                    type="email"
                    placeholder="tu@email.com"
                  />
                  <FormInput
                    label="Teléfono"
                    name="personalInfo.phone"
                    placeholder="Tu teléfono"
                  />
                </div>
              </div>

              {/* Sección de Cambio de Contraseña */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-gold-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cambiar Contraseña
                  </h2>
                </div>
                <div className="space-y-4">
                  <FormPasswordInput
                    label="Contraseña Actual"
                    name="passwordChange.currentPassword"
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <FormPasswordInput
                    label="Nueva Contraseña"
                    name="passwordChange.newPassword"
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <FormPasswordInput
                    label="Confirmar Nueva Contraseña"
                    name="passwordChange.confirmPassword"
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
