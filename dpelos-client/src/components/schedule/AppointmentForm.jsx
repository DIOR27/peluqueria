import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import "./AppointmentForm.css";
import dpelosn from "../../assets/dpelosn.svg";

const servicesOptions = [
  { value: "1", label: "Corte de cabello" },
  { value: "2", label: "Afeitado tradicional" },
  { value: "3", label: "Perfilado de barba" },
  { value: "4", label: "Coloración" },
];

const specialistsOptions = [
  { value: "1", label: "Carlos Rodríguez" },
  { value: "2", label: "Miguel Ángel" },
  { value: "3", label: "Daniel Torres" },
  { value: "4", label: "Roberto Sánchez" },
];

const initialValues = {
  servicio: "",
  especialista: "",
  fecha: "",
  hora: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
};

const validationSchema = Yup.object({
  servicio: Yup.string().required("El servicio es requerido"),
  especialista: Yup.string().required("El especialista es requerido"),
  fecha: Yup.string().required("La fecha es requerida"),
  hora: Yup.string().required("La hora es requerida"),
  nombre: Yup.string().required("El nombre es requerido"),
  apellido: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
  telefono: Yup.string()
    .matches(/^\d+$/, "Formato de teléfono inválido")
    .required("El teléfono es requerido"),
});

const AppointmentForm = () => {
  const [selectedHour, setSelectedHour] = useState(null);

  const handleHourClick = (hour, setFieldValue) => {
    setSelectedHour(hour);
    setFieldValue("hora", hour);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      
      const fechaObj = new Date(values.fecha);
      const fechaFormateada = fechaObj.toISOString().split('T')[0];

      
      const horaFormateada = values.hora.length === 5 ? values.hora + ':00' : values.hora;

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/reservas/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            especialista_id: values.especialista,
            servicio_id: values.servicio,
            fecha: fechaFormateada,
            hora: horaFormateada,
            clientEmail: values.email,
            nombre: values.nombre,
            apellido: values.apellido,
            telefono: values.telefono,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Reserva creada exitosamente");
        resetForm();
        setSelectedHour(null);
      } else {
        alert("Error: " + (data.error || "No se pudo crear la reserva"));
      }
    } catch (error) {
      alert("Error de red: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="appointment-form">
            <img src={dpelosn} alt="Logo D'Pelos" className="logo" />
            <p className="subtitulo">Reserva tu cita en nuestra peluqueria ahora!</p>
            <div className="form-row">
              <div className="form-col">
                <FormInput
                  label="Nombre"
                  name="nombre"
                  placeholder="Digite su nombre"
                />
                <FormInput
                  label="Apellido"
                  name="apellido"
                  placeholder="Digite su apellido"
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Digite su correo electrónico"
                />
                <FormInput
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  placeholder="Digite su teléfono"
                />
              </div>
              <div className="form-col">
                <FormSelect
                  label="Servicio"
                  name="servicio"
                  options={servicesOptions}
                  placeholder="Elija un servicio"
                />
                <FormSelect
                  label="Especialista"
                  name="especialista"
                  options={specialistsOptions}
                  placeholder="Elija un especialista"
                />
                <FormInput
                  label="Fecha"
                  name="fecha"
                  type="date"
                  placeholder="Seleccione una fecha"
                />
                <div className="horas">
                  {[
                    "08:00",
                    "09:30",
                    "11:00",
                    "12:30",
                    "14:00",
                    "15:30",
                    "17:00",
                    "19:30",
                    "21:00",
                    "22:30",
                  ].map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      className={`hour-button ${selectedHour === hour ? "selected" : ""}`}
                      onClick={() => handleHourClick(hour, setFieldValue)}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className="agendar">
                Agendar cita
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AppointmentForm;

