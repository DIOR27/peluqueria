import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const esFechaHoraPasada = (fecha, hora) => {
  const fechaHoraString = `${fecha}T${hora}`;
  const fechaHora = new Date(fechaHoraString);
  const ahora = new Date();
  return fechaHora < ahora;
};