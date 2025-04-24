import React, { useState } from "react";
import dpelosn from "../../assets/dpelosn.svg"; 

const AppointmentForm = () => {
  const [selectedHour, setSelectedHour] = useState(null);

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  return (
<section className="h-screen flex flex-col justify-center items-center bg-white overflow-hidden">
<form className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full flex flex-col gap-4 overflow-y-auto mb-5">
    <img src={dpelosn} alt="Logo D'Pelos" className="self-center w-36 h-24" />

    <label className="font-semibold text-gray-800 flex flex-col text-sm gap-1">
      Servicio
      <select
        name="servicio"
        required
        className="p-2.5 border-none text-base shadow-md bg-white rounded-md text-gray-400"
      >
        <option value="">Elija un servicio</option>
        <option value="corte">Corte</option>
        <option value="barba">Barba</option>
      </select>
    </label>

    <label className="font-semibold text-gray-800 flex flex-col text-sm gap-1">
      Especialista
      <select
        name="especialista"
        required
        className="p-2.5 border-none text-base shadow-md bg-white rounded-md text-gray-400"
      >
        <option value="">Elija un especialista</option>
        <option value="juan">Juan</option>
        <option value="mario">Mario</option>
      </select>
    </label>

    <label className="font-semibold text-gray-800 flex flex-col text-sm gap-1">
      Fecha
      <input
        type="date"
        name="fecha"
        required
        className="p-2.5 border-none text-base shadow-md bg-white rounded-md"
      />
    </label>

    <div className="flex flex-wrap gap-2 justify-center mt-5">
      {["08:00","09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"].map((hour) => (
        <button
          key={hour}
          type="button"
          className={`text-sm px-4 py-0.5 rounded-md font-bold cursor-pointer transition ${
            selectedHour === hour
              ?  "bg-green-200 text-green-800"
              : "bg-blue-200 text-blue-900 hover:bg-blue-300"
          }`}
          onClick={() => handleHourClick(hour)}
        >
          {hour}
        </button>
      ))}
    </div>

    <label className="font-semibold text-gray-800 flex flex-col text-sm gap-1">
      Nombre
      <input
        type="text"
        name="nombre"
        placeholder="Digite su nombre"
        required
        className="p-2.5 border-none text-base shadow-md bg-white rounded-md"
      />
    </label>
    <label className="font-semibold text-gray-800 flex flex-col text-sm gap-1">
      Apellido
      <input
        type="text"
        name="apellido"
        placeholder="Digite su apellido"
        required
        className="p-2.5 border-none text-base shadow-md bg-white rounded-md"
      />
    </label>
    <label className="font-semibold text-gray-800 flex flex-col text-sm gap-1">
      Email
      <input
        type="email"
        name="email"
        placeholder="Digite su correo electrónico"
        required
        className="p-2.5 border-none text-base shadow-md bg-white rounded-md"
      />
    </label>
    <label className="font-semibold text-gray-800 flex flex-col text-sm gap-1">
      Teléfono
      <input
        type="tel"
        name="telefono"
        placeholder="Digite su teléfono"
        required
        className="p-2.5 border-none text-base shadow-md bg-white rounded-md"
      />
    </label>

    <button
      type="submit"
      className="self-center bg-yellow-500 border-none rounded-xl px-4 py-3 text-lg font-bold cursor-pointer mt-4 transition hover:bg-yellow-600 w-11/12"
    >
      Agendar cita
    </button>
  </form>
</section>
  );
};

export default AppointmentForm;