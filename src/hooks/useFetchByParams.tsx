import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UseFetchByParamsProps } from './types';

const useFetchByParams = ({ status, param, action }: UseFetchByParamsProps) => {
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    if (status === 'idle' && param) {
      dispatch(action(param));
    }
  }, [status, param, dispatch, action]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (param) {
      dispatch(action(param));
    }
  }, [action, dispatch, param]);
};

export default useFetchByParams;
