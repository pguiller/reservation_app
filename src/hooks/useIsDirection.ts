import { useAppSelector } from 'src/hooks';

const useIsDirection = () => {
  const user = useAppSelector((state) => state.auth.login.user);

  return user?.role.includes('DR');
};

export default useIsDirection;
