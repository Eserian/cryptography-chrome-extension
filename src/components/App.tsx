import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setInitialized, setLoggedIn, setSecret, setPasswordHash, resetApp } from '../store/popupSlice';
import { getStateFromBackground, dispatchActionToBackground } from '../utils/backgroundHelper';
import SignIn from './SignIn';
import Initialization from './Initialization';
import Secret from './SecretDisplay';
import CryptoService from '../utils/cryptoService';

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.popup.isInitialized);
  const isLoggedIn = useSelector((state: RootState) => state.popup.isLoggedIn);
  const secret = useSelector((state: RootState) => state.popup.secret);
  const passwordHash = useSelector((state: RootState) => state.popup.passwordHash);

  useEffect(() => {
    const loadStoredStates = async () => {
      const backgroundState = await getStateFromBackground();

      if (backgroundState.popup.isInitialized) {
        dispatch(setInitialized(true));
      }

      if (backgroundState.popup.isLoggedIn) {
        dispatch(setLoggedIn(true));
      }

      if (backgroundState.popup.secret) {
        dispatch(setSecret(backgroundState.popup.secret));
      }

      if (backgroundState.popup.passwordHash) {
        dispatch(setPasswordHash(backgroundState.popup.passwordHash));
      }
    };

    loadStoredStates();
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <Initialization
        onInitialize={(newSecret, passwordHash) => {
          dispatchActionToBackground(setSecret(newSecret));
          dispatchActionToBackground(setPasswordHash(passwordHash));
          dispatchActionToBackground(setInitialized(true));
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
            dispatchActionToBackground(setLoggedIn(true));
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
        dispatchActionToBackground(setLoggedIn(false));
        dispatch(setLoggedIn(false));
      }}
      onRegenerate={async () => {
        if (passwordHash) {
          const newSecret = CryptoService.generateSecret();
          const newEncryptedSecret = await CryptoService.encryptSecret(newSecret, passwordHash);
          dispatchActionToBackground(setSecret(newEncryptedSecret));
          dispatch(setSecret(newEncryptedSecret));
        }
      }}
      onReset={() => {
        dispatchActionToBackground(resetApp());
        dispatch(resetApp());
      }}
    />
  );
}

export default Popup;
