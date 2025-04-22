import React, { useState } from "react";
import "./AppointmentForm.css";
import dpelosn from "../../assets/dpelosn.svg"; 

const AppointmentForm = () => {
  const [selectedHour, setSelectedHour] = useState(null);

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  return (
    <section className="form-container">
      <form className="appointment-form">
      <img src={dpelosn} alt="Logo D'Pelos" className="logo"/>

        <label className="label-text">
          Servicio
          <select name="servicio" required>
            <option value="">Elija un servicio</option>
            <option value="corte">Corte</option>
            <option value="barba">Barba</option>
          </select>
        </label>

        <label className="label-text">
          Especialista
          <select name="especialista" required>
            <option value="">Elija un especialista</option>
            <option value="juan">Juan</option>
            <option value="mario">Mario</option>
          </select>
        </label>

        <label className="label-text">
          Fecha
          <input type="date" name="fecha" required />
        </label>

        <div className="horas">
          {["09:30", "11:00", "12:30", "14:00", "15:30", "17:00"].map((hour) => (
            <button
              key={hour}
              type="button"
              className={`hour-button ${selectedHour === hour ? "selected" : ""}`}
              onClick={() => handleHourClick(hour)}
            >
              {hour}
            </button>
          ))}
        </div>

        <label className="label-text">
          Nombre
          <input type="text" name="nombre" placeholder="Digite su nombre" required />
        </label>
        <label className="label-text">
          Apellido
          <input type="text" name="apellido" placeholder="Digite su apellido" required />
        </label>
        <label className="label-text">
          Email
          <input type="email" name="email" placeholder="Digite su correo electrónico" required />
        </label>
        <label className="label-text">
          Teléfono
          <input type="tel" name="telefono" placeholder="Digite su teléfono" required />
        </label>

        <button type="submit" className="agendar">
          Agendar cita
        </button>
      </form>
    </section>
  );
};

export default AppointmentForm;