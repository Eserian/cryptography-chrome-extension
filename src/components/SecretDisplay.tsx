import React, { useEffect, useState } from 'react';
import CryptoService from '../utils/cryptoService';

interface SecretProps {
  secret: string | null;
  passwordHash: string | null;
  onLogout: () => void;
  onRegenerate: () => void;
  onReset: () => void;
}

const Secret: React.FC<SecretProps> = ({ secret, passwordHash, onLogout, onRegenerate, onReset }) => {
  const [decryptedSecret, setDecryptedSecret] = useState<string | null>(null);

  useEffect(() => {
    const decryptSecret = async () => {
      if (secret && passwordHash) {
        const newDecreptedSecret = await CryptoService.decryptSecret(secret, passwordHash);
        setDecryptedSecret(newDecreptedSecret);
      }
    }
    decryptSecret();
  }, [secret]);

  return (
    <div>
      <h1>Secret</h1>
      <p>Your secret: {decryptedSecret ? decryptedSecret : 'Decrypting...'}</p>
      <button onClick={onLogout}>Logout</button>
      <button onClick={onRegenerate}>Regenerate Secret</button>
      <button onClick={onReset}>Reset App</button>
    </div>
  );
};

export default Secret;
