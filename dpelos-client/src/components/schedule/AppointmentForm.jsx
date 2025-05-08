import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import "./AppointmentForm.css";
import dpelosn from "../../assets/dpelosn.svg";

const servicesOptions = [
  { value: "corte", label: "Corte" },
  { value: "barba", label: "Barba" },
];

const specialistsOptions = [
  { value: "juan", label: "Juan" },
  { value: "mario", label: "Mario" },
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

  const handleSubmit = (values) => {
    console.log("Formulario enviado:", values);
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
                  {["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "19:30", "21:00", "22:30"].map(
                    (hour) => (
                      <button
                        key={hour}
                        type="button"
                        className={`hour-button ${
                          selectedHour === hour ? "selected" : ""
                        }`}
                        onClick={() => handleHourClick(hour, setFieldValue)}
                      >
                        {hour}
                      </button>
                    )
                  )}
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