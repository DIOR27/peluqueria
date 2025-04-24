import { useState } from "react";
import { Button } from "../../ui/Button";
import { Toggle } from "../../ui/Toggle";
import { Checkbox, Field, Label } from '@headlessui/react';

export default function NewService({ specialists, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "",
    isActive: true,
    specialists: [] // Array vacío para nuevos servicios
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Servicio
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          rows="3"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Especialistas
        </label>
        <div className="grid grid-cols-2 gap-2">
          {specialists.map(specialist => (
            <Field key={specialist.id} className="flex items-center gap-2">
              <Checkbox
                checked={formData.specialists?.includes(specialist.id)}
                onChange={(e) => console.log(e)}
                className="group block size-4 rounded border bg-white data-[checked]:bg-black"
              >
                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Checkbox>
              <Label className="text-sm text-gray-700">{specialist.name}</Label>
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
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
}
