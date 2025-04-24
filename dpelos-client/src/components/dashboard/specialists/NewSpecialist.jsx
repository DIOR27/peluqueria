import { useState } from "react";
import { Button } from "../../ui/Button";
import { Toggle } from "../../ui/Toggle";
import { Checkbox, Field, Label } from "@headlessui/react";
import Input from "../../ui/Input";

export default function NewSpecialist({ services, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    schedule: "",
    bio: "",
    isActive: true,
    services: [], // Array vacío para nuevos especialistas
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para crear un nuevo especialista
    console.log("Actualizar especialista:", formData);

    handleClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            name="name"
            placeholder="Nombre del especialista"
            required
          />
        </div>
        <div>
          <Input
            label="Cargo"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            name="position"
            placeholder="Cargo del especialista"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Biografía
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            rows="3"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              name="email"
              placeholder="Email del especialista"
              required
            />
          </div>
          <div>
            <Input
              label="Teléfono"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              name="phone"
              placeholder="Teléfono del especialista"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servicios
          </label>
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <Field key={service.id} className="flex items-center gap-2">
                <Checkbox
                  checked={formData.services?.includes(service.id)}
                  onChange={() => console.log(service.id)}
                  className="group block size-4 rounded border bg-white data-[checked]:bg-black"
                >
                  <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
                <Label className="text-sm text-gray-700">{service.name}</Label>
              </Field>
            ))}
          </div>
        </div>
        <Toggle
          checked={formData.isActive}
          onChange={(value) => setFormData({ ...formData, isActive: value })}
          label="Estado"
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
}
