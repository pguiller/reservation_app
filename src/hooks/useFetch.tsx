import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UseFetchProps } from './types';

const useFetch = <T,>({ status, data, action }: UseFetchProps<T>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle' && data.length === 0) {
      dispatch(action());
    }
  }, [status, data.length, dispatch, action]);

  useEffect(
    () => () => {
      dispatch(action());
    },
    [action, dispatch]
  );
};

export default useFetch;
