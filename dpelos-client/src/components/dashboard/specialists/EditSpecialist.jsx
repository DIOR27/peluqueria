import { Button } from "../../ui/Button";
import { Formik, Form, Field } from "formik";
import FormInput from "../../ui/FormInput";
import FormServicesCheckbox from "./FormServicesCheckbox";
import FormStatusToggle from "../../ui/FormStatusToggle";
import * as Yup from "yup";

export default function EditSpecialist({
  selectedSpecialist,
  handleClose,
  services,
}) {
  const initialValues = {
    name: selectedSpecialist.name || "",
    position: selectedSpecialist.position || "",
    email: selectedSpecialist.email || "",
    phone: selectedSpecialist.phone || "",
    bio: selectedSpecialist.bio || "",
    isActive: selectedSpecialist.isActive ?? true,
    services: selectedSpecialist.services || [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    position: Yup.string().required("El cargo es requerido"),
    email: Yup.string()
      .email("Formato de email inválido")
      .required("El email es requerido"),
    phone: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^\d+$/, "Formato de teléfono inválido"),
    bio: Yup.string().required("La biografía es requerida"),
    isActive: Yup.boolean().required("El estado es requerido"),
    services: Yup.array()
      .of(Yup.string())
      .min(1, "Debes seleccionar al menos un servicio")
      .required("Los servicios son requeridos"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitting form with values:", values);
    // Aquí irá la lógica para actualizar el especialista
    setSubmitting(false);
    handleClose();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormInput
              label="Nombre"
              name="name"
              placeholder="Nombre del especialista"
            />
            <FormInput
              label="Cargo"
              name="position"
              placeholder="Cargo del especialista"
            />
            <FormInput
              label="Biografía"
              name="bio"
              placeholder="Biografía del especialista"
              as="textarea"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Email"
                name="email"
                placeholder="Email del especialista"
              />
              <FormInput
                label="Teléfono"
                name="phone"
                placeholder="Teléfono del especialista"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Servicios
              </label>
              <Field
                name="services"
                component={FormServicesCheckbox}
                services={services}
              />
              {touched.services && errors.services && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.services}
                </div>
              )}
            </div>
            <div className="mb-4">
              <Field name="isActive" component={FormStatusToggle} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
