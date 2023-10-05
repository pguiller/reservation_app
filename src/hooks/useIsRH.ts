import { useAppSelector } from 'src/hooks';

const useIsRH = () => {
  const user = useAppSelector((state) => state.auth.login.user);

  return user?.role.includes('HR');
};

export default useIsRH;
