import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setInitialized, setLoggedIn, setSecret, setPasswordHash, resetApp } from '../store/popupSlice';
import SignIn from './screens/SignIn';
import Initialization from './screens/Initialization';
import Secret from './screens/SecretDisplay';
import CryptoService from '../utils/cryptoService';

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.popup.isInitialized);
  const isLoggedIn = useSelector((state: RootState) => state.popup.isLoggedIn);
  const secret = useSelector((state: RootState) => state.popup.secret);
  const passwordHash = useSelector((state: RootState) => state.popup.passwordHash);

  useEffect(() => {
    dispatch({ type: 'INIT_SYNC_STORE' });
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <Initialization
        onInitialize={(newSecret, passwordHash) => {
          dispatch(setSecret(newSecret));
          dispatch(setPasswordHash(passwordHash));
          dispatch(setInitialized(true));
        }}
      />
    );
  }

  if (!isLoggedIn) {
    return (
      <SignIn
        onLogin={async (password) => {
          const hash = await CryptoService.hashPassword(password);
          const base64Hash = CryptoService.arrayBufferToBase64(hash);

          if (passwordHash && passwordHash === base64Hash) {
            dispatch(setLoggedIn(true));
          } else {
            throw new Error('Invalid password')
          }
        }}
      />
    );
  }

  return (
    <Secret
      secret={secret}
      passwordHash={passwordHash}
      onLogout={() => {
        dispatch(setLoggedIn(false));
      }}
      onRegenerate={async () => {
        if (passwordHash) {
          const newSecret = CryptoService.generateSecret();
          const newEncryptedSecret = await CryptoService.encryptSecret(newSecret, passwordHash);
          dispatch(setSecret(newEncryptedSecret));
        }
      }}
      onReset={() => {
        dispatch(resetApp());
      }}
    />
  );
}

export default Popup;
