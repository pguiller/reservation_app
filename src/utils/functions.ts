import jwt_decode from 'jwt-decode';
import { DecodedToken } from 'src/utils/types/DecodedToken';
import 'dayjs/locale/fr';
import { User } from './types/User';
import { UserData } from './types/UserData';

export const decodeToken = (token: string): DecodedToken => {
  const decoded = jwt_decode(token) as DecodedToken;

  return decoded;
};

export const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    const yOffset = -64;
    const elementPosition = ref.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + yOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export const createUSersMembersData = (inputData: User[]): UserData[] => {
  const transformedData: UserData[] = [];

  let uniqueId = 0;

  for (const user of inputData) {
    // Créer un objet pour l'utilisateur
    const userObj: UserData = {
      id: ++uniqueId,
      firstname: user.firstname,
      lastname: user.lastname,
      confirmation: user.confirmation,
      isMember: false,
      idTable: user.id,
    };

    transformedData.push(userObj);

    // Si l'utilisateur a des membres
    if (user.members && user.members.length > 0) {
      for (const member of user.members) {
        // Créer un objet pour chaque membre associé à l'utilisateur
        const memberObj: UserData = {
          id: ++uniqueId,
          firstname: member.firstname,
          lastname: member.lastname,
          confirmation: user.confirmation,
          isMember: true,
          idTable: member.Id,
        };

        transformedData.push(memberObj);
      }
    }
  }

  return transformedData;
};
