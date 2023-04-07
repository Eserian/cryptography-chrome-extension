import React, { useState } from 'react';
import CryptoService from '../utils/cryptoService';
import EnterPassword from './EnterPassword';

interface InitializationProps {
  onInitialize: (secret: string, passwordHash: string) => void;
}

const Initialization: React.FC<InitializationProps> = ({ onInitialize }) => {
  const [secret] = useState<string>(CryptoService.generateSecret());
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleOk = () => {
    setShowPasswordForm(true);
  }

  const handleSetPassword = async (password: string) => {
    const passwordHash = await CryptoService.hashPassword(password);
    const passwordHashString = CryptoService.arrayBufferToBase64(passwordHash);
    const encryptedSecret = await CryptoService.encryptSecret(secret, passwordHashString);

    onInitialize(encryptedSecret, passwordHashString);
  }

  const renderInitScreen = () => (
    <div>
      <h1>Initialization</h1>
      <p>Your new secret: {secret}</p>
      <button onClick={handleOk}>Ok</button>
    </div>
  );

  const renderForm = () => <EnterPassword onPasswordSet={handleSetPassword} />

  return showPasswordForm ? renderForm() : renderInitScreen();
};

export default Initialization;
