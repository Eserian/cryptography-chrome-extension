import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadFromChromeStorage } from './utils/stateStorageHelper';

const Bootstrap: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const loadedState = await loadFromChromeStorage();
  
      dispatch({ type: 'INIT_SYNC_STORE', payload: loadedState });
    })()
  }, []);

  return null;
};

export default Bootstrap;
