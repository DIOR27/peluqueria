// Para gestionar los servicios que ofrece la peluqueria
import { create } from 'zustand';

const useServiceStore = create((set) => ({
  services: [],
}));

export default useServiceStore;
