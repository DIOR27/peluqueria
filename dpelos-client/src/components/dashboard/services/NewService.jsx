import { Button } from "../../ui/Button";
import { Formik, Form, Field } from "formik";
import FormInput from "../../ui/FormInput";
import FormSpecialistsCheckbox from "./FormSpecialistsCheckbox";
import FormStatusToggle from "../../ui/FormStatusToggle";
import * as Yup from "yup";

export default function NewService({ specialists, handleClose }) {
  const initialValues = {
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "",
    isActive: true,
    specialists: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    duration: Yup.number()
      .required("La duración es requerida")
      .positive("La duración debe ser positiva"),
    price: Yup.number()
      .required("El precio es requerido")
      .positive("El precio debe ser positivo"),
    category: Yup.string().required("La categoría es requerida"),
    isActive: Yup.boolean().required("El estado es requerido"),
    specialists: Yup.array()
      .of(Yup.string())
      .min(1, "Debes seleccionar al menos un especialista")
      .required("Los especialistas son requeridos"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitting form with values:", values);
    // Aquí irá la lógica para crear el servicio
    setSubmitting(false);
    handleClose();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormInput
              label="Nombre"
              name="name"
              placeholder="Nombre del servicio"
            />
            <FormInput
              label="Descripción"
              name="description"
              placeholder="Descripción del servicio"
              as="textarea"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Duración (minutos)"
                name="duration"
                type="number"
                placeholder="Duración del servicio"
              />
              <FormInput
                label="Precio"
                name="price"
                type="number"
                placeholder="Precio del servicio"
              />
            </div>
            <FormInput
              label="Categoría"
              name="category"
              placeholder="Categoría del servicio"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especialistas
              </label>
              <Field
                name="specialists"
                component={FormSpecialistsCheckbox}
                specialists={specialists}
              />
              {touched.specialists && errors.specialists && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.specialists}
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
