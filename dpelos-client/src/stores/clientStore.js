// Para gestionar los clientes
import { create } from 'zustand';

const useClientStore = create((set) => ({
  clients: [],
}));

export default useClientStore;
