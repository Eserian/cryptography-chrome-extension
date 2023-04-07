import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Bootstrap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'INIT_SYNC_STORE' });
  }, []);

  return null;
}

export default Bootstrap;