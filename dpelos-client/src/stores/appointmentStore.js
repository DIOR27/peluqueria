// Para gestionar las citas
import { create } from 'zustand';

const mockAppointments = [
  {
    id: 1,
    clientName: "Juan Pérez",
    service: "Corte de cabello",
    specialist: "Carlos Rodríguez",
    date: "2024-03-20",
    time: "10:00",
    status: "confirmed",
    price: 15
  },
  {
    id: 2,
    clientName: "María García",
    service: "Afeitado tradicional",
    specialist: "Miguel Ángel",
    date: "2024-03-20",
    time: "11:30",
    status: "pending",
    price: 12
  },
  {
    id: 3,
    clientName: "Luis Martínez",
    service: "Perfilado de barba",
    specialist: "Daniel Torres",
    date: "2024-03-20",
    time: "14:00",
    status: "completed",
    price: 10
  },
  {
    id: 4,
    clientName: "Ana López",
    service: "Coloración",
    specialist: "Roberto Sánchez",
    date: "2024-03-21",
    time: "09:00",
    status: "confirmed",
    price: 25
  },
  {
    id: 5,
    clientName: "Carlos Ruiz",
    service: "Corte de cabello",
    specialist: "Carlos Rodríguez",
    date: "2024-03-21",
    time: "11:00",
    status: "pending",
    price: 15
  },
  {
    id: 6,
    clientName: "Ana López",
    service: "Coloración",
    specialist: "Roberto Sánchez",
    date: "2024-03-21",
    time: "09:00",
    status: "confirmed",
    price: 25
  },
  {
    id: 7,
    clientName: "Ana López",
    service: "Coloración",
    specialist: "Roberto Sánchez",
    date: "2024-03-21",
    time: "09:00",
    status: "confirmed",
    price: 25
  },
  {
    id: 8,
    clientName: "Ana López",
    service: "Coloración",
    specialist: "Roberto Sánchez",
    date: "2024-03-21",
    time: "09:00",
    status: "confirmed",
    price: 25
  },
  {
    id: 9,
    clientName: "Ana López",
    service: "Coloración",
    specialist: "Roberto Sánchez",
    date: "2024-03-21",
    time: "09:00",
    status: "confirmed",
    price: 25
  },
  {
    id: 10,
    clientName: "Ana López",
    service: "Coloración",
    specialist: "Roberto Sánchez",
    date: "2024-03-21",
    time: "09:00",
    status: "confirmed",
    price: 25
  },
  {
    id: 11,
    clientName: "Ana López",
    service: "Coloración",
    specialist: "Roberto Sánchez",
    date: "2024-03-21",
    time: "09:00",
    status: "confirmed",
    price: 25
  }
];

const useAppointmentStore = create((set) => ({
  appointments: mockAppointments,
  filters: {
    status: '',
    specialist: ''
  },
  setFilters: (filters) => set({ filters }),
  getFilteredAppointments: (state) => {
    return state.appointments.filter(appointment => {
      if (state.filters.status && appointment.status !== state.filters.status) return false;
      if (state.filters.specialist && appointment.specialist !== state.filters.specialist) return false;
      return true;
    });
  }
}));

export default useAppointmentStore;
