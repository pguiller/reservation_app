import jwt_decode from 'jwt-decode';
import { DecodedToken } from 'src/utils/types/DecodedToken';
import 'dayjs/locale/fr';

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
