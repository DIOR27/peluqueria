import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";
import Select from "react-select";
import dpelosn from "../../assets/dpelosn.svg";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#000000" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#000000" : "#9ca3af",
    },
  }),
};

const AppointmentForm = () => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha: "",
  });

  const services = [
    { value: "corte", label: "Corte de cabello" },
    { value: "afeitado", label: "Afeitado tradicional" },
    { value: "perfilado", label: "Perfilado de barba" },
    { value: "coloración", label: "Coloración" },
  ];

  const specialists = [
    { value: "carlos", label: "Carlos Rodríguez" },
    { value: "miguel", label: "Miguel Ángel" },
    { value: "daniel", label: "Daniel Torres" },
    { value: "roberto", label: "Roberto Sánchez" },
  ];

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center bg-white overflow-hidden">
      <form className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full flex flex-col gap-4 overflow-y-auto mb-5">
        {/* Logo */}
        <div className="self-center  mt-[15px]">
          <Image 
            src={dpelosn} 
            alt="Logo D'Pelos" 
            className="w-auto h-auto" 
          />
        </div>

        {/* Servicio */}
        <div  className="mt-[20px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servicio
          </label>
          <Select
            options={services}
            onChange={(e) => setFormData((prev) => ({ ...prev, servicio: e?.value ?? "" }))}
            isClearable
            styles={customStyles}
            placeholder="Elija un servicio"
          />
        </div>

        {/* Especialista */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Especialista
          </label>
          <Select
            options={specialists}
            onChange={(e) => setFormData((prev) => ({ ...prev, especialista: e?.value ?? "" }))}
            isClearable
            styles={customStyles}
            placeholder="Elija un especialista"
          />
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            placeholder="dd/mm/aaaa"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-400 focus:text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Selección de hora */}
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          {["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"].map((hour) => (
            <Button
              key={hour}
              variant={selectedHour === hour ? "default" : "outline"}
              size="sm"
              onClick={() => handleHourClick(hour)}
              className={selectedHour === hour ? "bg-yellow-500 text-black border-yellow-500" : ""}
            >
              {hour}
            </Button>
          ))}
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Digite su nombre"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            placeholder="Digite su apellido"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite su correo electrónico"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Digite su teléfono"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Botón de agendar */}
        <Button
          type="submit"
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 w-full mt-[20px]"
        >
          Agendar cita
        </Button>
      </form>
    </section>
  );
};

export default AppointmentForm;