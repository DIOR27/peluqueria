// Para gestionar los estilistas/especialistas de la peluueria
import { create } from 'zustand';

const useSpecialistStore = create((set) => ({
  specialists: [],
}));

export default useSpecialistStore;
