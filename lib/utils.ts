import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retourne 0-11, donc on ajoute 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function transformPriceToEuro(price) {
  return (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

export function stringAdresse(adresse){
  const {complementaire, cp, numero,  pays, rue, ville} = adresse;
  const adresseParts = [];

  if (numero) adresseParts.push(numero + ',');
  if (rue) adresseParts.push(rue + ',');
  if (complementaire) adresseParts.push(complementaire + ',');
  if (cp) adresseParts.push(cp + ',');
  if (ville) adresseParts.push(ville + ',');
  if (pays) adresseParts.push(pays);

  return adresseParts.join(' ');
}