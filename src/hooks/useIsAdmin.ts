import { useAppSelector } from 'src/hooks';
import { decodeToken } from 'src/utils/functions';

const useIsAdmin = () => {
  const token = useAppSelector((state) => state.auth.login.token);

  return token !== null ? decodeToken(token).isAdmin : false;
};

export default useIsAdmin;
