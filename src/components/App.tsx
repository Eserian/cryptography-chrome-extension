import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setInitialized, setLoggedIn, setEncryptedSecret, setPasswordHash, resetApp } from '../store/popupSlice';
import SignIn from './screens/SignIn';
import Initialization from './screens/Initialization';
import Secret from './screens/SecretDisplay';
import CryptoService from '../utils/cryptoService';

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.popup.isInitialized);
  const isLoggedIn = useSelector((state: RootState) => state.popup.isLoggedIn);
  const encryptedSecret = useSelector((state: RootState) => state.popup.encryptedSecret);
  const passwordHash = useSelector((state: RootState) => state.popup.passwordHash);

  if (!isInitialized) {
    return (
      <Initialization
        onInitialize={(newSecret, passwordHash) => {
          dispatch(setEncryptedSecret(newSecret));
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
        onReset={() => {
          dispatch(resetApp());
        }}
      />
    );
  }

  return (
    <Secret
      encryptedSecret={encryptedSecret}
      passwordHash={passwordHash}
      onLogout={() => {
        dispatch(setLoggedIn(false));
      }}
      onRegenerate={async () => {
        if (passwordHash) {
          const newSecret = CryptoService.generateSecret();
          const newEncryptedSecret = await CryptoService.encryptSecret(newSecret, passwordHash);
          dispatch(setEncryptedSecret(newEncryptedSecret));
        }
      }}
    />
  );
}

export default Popup;
