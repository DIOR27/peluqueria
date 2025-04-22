import { Button } from "../ui/Button";
import { Toggle } from "../ui/Toggle";

export default function EditService({ handleSubmit, selectedService, setSelectedService, specialists, handleSpecialistToggle, setIsSheetOpen }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Servicio
        </label>
        <input
          type="text"
          value={selectedService.name}
          onChange={(e) => setSelectedService({...selectedService, name: e.target.value})}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          value={selectedService.description}
          onChange={(e) => setSelectedService({...selectedService, description: e.target.value})}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
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
            value={selectedService.duration}
            onChange={(e) => setSelectedService({...selectedService, duration: e.target.value})}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="text"
            value={selectedService.price}
            onChange={(e) => setSelectedService({...selectedService, price: e.target.value})}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
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
            <label key={specialist.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedService.specialists?.includes(specialist.id)}
                onChange={() => handleSpecialistToggle(specialist.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{specialist.name}</span>
            </label>
          ))}
        </div>
      </div>
      <Toggle
        checked={selectedService.isActive}
        onChange={(value) => setSelectedService({...selectedService, isActive: value})}
        label="Estado"
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsSheetOpen(false)}
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
