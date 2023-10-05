import { useAppSelector } from 'src/hooks';

const useIsManager = () => {
  const user = useAppSelector((state) => state.auth.login.user);

  return user?.role.includes('MG');
};

export default useIsManager;
