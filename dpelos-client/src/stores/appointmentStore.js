// Para gestionar las citas
import { create } from 'zustand';

const useAppointmentStore = create((set) => ({
  appointments: [],
}));

export default useAppointmentStore;
