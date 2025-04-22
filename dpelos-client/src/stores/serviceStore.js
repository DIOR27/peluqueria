// Para gestionar los servicios que ofrece la peluqueria
import { create } from 'zustand';
const mockServices = [
  {
    id: 1,
    name: "Corte de Cabello",
    description: "Cortes modernos y clásicos adaptados a tu estilo y tipo de cabello.",
    duration: "30 min",
    price: "$15",
    category: "Cortes",
    isActive: false,
    specialists: [1, 2, 4] // IDs de los especialistas que pueden ofrecer este servicio
  },
  {
    id: 2,
    name: "Afeitado Tradicional",
    description: "Afeitado clásico con navaja y toallas calientes para una experiencia premium.",
    duration: "45 min",
    price: "$12",
    category: "Afeitado",
    isActive: true,
    specialists: [1, 2]
  },
  {
    id: 3,
    name: "Perfilado de Barba",
    description: "Dale forma y estilo a tu barba con nuestro servicio de perfilado profesional.",
    duration: "20 min",
    price: "$10",
    category: "Barba",
    isActive: false,
    specialists: [1, 2, 4]
  },
  {
    id: 4,
    name: "Coloración",
    description: "Servicios de coloración y tratamientos para un look renovado.",
    duration: "60 min",
    price: "$25",
    category: "Color",
    isActive: true,
    specialists: [2, 3]
  },
  {
    id: 5,
    name: "Tratamiento Capilar",
    description: "Tratamientos especializados para el cuidado y salud de tu cabello.",
    duration: "45 min",
    price: "$20",
    category: "Tratamientos",
    isActive: true,
    specialists: [3]
  }
];

const useServiceStore = create((set) => ({
  services: mockServices,
}));

export default useServiceStore;
