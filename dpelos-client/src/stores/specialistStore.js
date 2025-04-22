// Para gestionar los estilistas/especialistas de la peluueria
import { create } from 'zustand';

const mockSpecialists = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    position: "Master Barber",
    email: "carlos@dpelos.com",
    phone: "123456789",
    // schedule: "Lunes a Viernes: 9:00 - 18:00",
    bio: "Con más de 15 años de experiencia en el mundo de la barbería, especializado en cortes clásicos y modernos.",
    isActive: true,
    services: [1, 2, 3] // IDs de los servicios que ofrece
  },
  {
    id: 2,
    name: "Miguel Ángel",
    position: "Senior Barber",
    email: "miguel@dpelos.com",
    phone: "987654321",
    // schedule: "Lunes a Sábado: 10:00 - 19:00",
    bio: "Experto en afeitado tradicional y perfilado de barba, con un enfoque en la atención personalizada.",
    isActive: true,
    services: [1, 2, 3, 4]
  },
  {
    id: 3,
    name: "Daniel Torres",
    position: "Colorist & Stylist",
    email: "daniel@dpelos.com",
    phone: "456789123",
    // schedule: "Martes a Sábado: 11:00 - 20:00",
    bio: "Especialista en coloración y tratamientos capilares, siempre a la vanguardia de las últimas tendencias.",
    isActive: true,
    services: [4, 5]
  },
  {
    id: 4,
    name: "Roberto Sánchez",
    position: "Barber & Stylist",
    email: "roberto@dpelos.com",
    phone: "789123456",
    // schedule: "Miércoles a Domingo: 12:00 - 21:00",
    bio: "Joven talento con gran habilidad para cortes modernos y estilos innovadores.",
    isActive: false,
    services: [1, 3]
  }
];

const useSpecialistStore = create((set) => ({
  specialists: mockSpecialists,
}));

export default useSpecialistStore;
