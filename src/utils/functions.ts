import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from 'src/utils/types/DecodedToken';
import 'dayjs/locale/fr';

export const decodeToken = (token: string): DecodedToken => {
  const decoded = jwt_decode(token) as DecodedToken;

  return decoded;
};

export const formatDate = (date: dayjs.ConfigType): string => {
  const currentDate = dayjs(date); // Convertit la date dayjs

  const year = currentDate.year(); // Obtient l'année au format AAAA
  const month = String(currentDate.month() + 1).padStart(2, '0'); // Obtient le mois (0-11) et ajoute un zéro initial si nécessaire
  const day = String(currentDate.date()).padStart(2, '0'); // Obtient le jour du mois (1-31) et ajoute un zéro initial si nécessaire

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export function formatDateISO(dateString: string) {
  const dateObj = new Date(dateString);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0, donc on ajoute 1.
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

export const addOneMonthToDate = (date: number): string => {
  const currentDate = new Date(date); // Convertit le nombre en objet Date

  const year = currentDate.getFullYear(); // Obtient l'année
  const month = currentDate.getMonth(); // Obtient le mois (0-11)
  const day = currentDate.getDate(); // Obtient le jour du mois (1-31)

  const newDate = new Date(year, month + 1, day); // Ajoute un mois à la date actuelle

  const newYear = newDate.getFullYear(); // Obtient l'année de la nouvelle date
  const newMonth = String(newDate.getMonth() + 1).padStart(2, '0'); // Obtient le mois (0-11) de la nouvelle date et ajoute un zéro initial si nécessaire
  const newDay = String(newDate.getDate()).padStart(2, '0'); // Obtient le jour du mois (1-31) de la nouvelle date et ajoute un zéro initial si nécessaire

  const formattedDate = `${newYear}-${newMonth}-${newDay}`;

  return formattedDate;
};

function createDateFromFormat(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);

  return new Date(year, month - 1, day);
}

export function dateComparator(a: string, b: string) {
  // Convertir les dates au format "jj/mm/aaaa" en objets Date
  const dateA = createDateFromFormat(a);
  const dateB = createDateFromFormat(b);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }

  return 0;
}

export function convertDateToDayjs(dateStr: string): string {
  // Analyse de la date en utilisant le format "yyyy-mm-dd"
  const parsedDate = dayjs(dateStr, { locale: 'fr' });

  // Formatage de la date en "jj/mm/aaaa"
  const formattedDate = parsedDate.format('DD/MM/YYYY');

  return formattedDate;
}
