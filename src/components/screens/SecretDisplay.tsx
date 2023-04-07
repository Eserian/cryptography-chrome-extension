import React, { useEffect, useState } from 'react';
import CryptoService from '../../utils/cryptoService';

interface SecretProps {
  encryptedSecret: string | null;
  passwordHash: string | null;
  onLogout: () => void;
  onRegenerate: () => void;
}

const Secret: React.FC<SecretProps> = ({ encryptedSecret, passwordHash, onLogout, onRegenerate }) => {
  const [decryptedSecret, setDecryptedSecret] = useState<string | null>(null);

  useEffect(() => {
    const decryptSecret = async () => {
      if (encryptedSecret && passwordHash) {
        const newDecreptedSecret = await CryptoService.decryptSecret(encryptedSecret, passwordHash);
        setDecryptedSecret(newDecreptedSecret);
      }
    }
    decryptSecret();
  }, [encryptedSecret]);

  return (
    <div>
      <h1>Secret</h1>
      <p>Your secret: {decryptedSecret ? decryptedSecret : 'Decrypting...'}</p>
      <button onClick={onLogout}>Logout</button>
      <button onClick={onRegenerate}>Regenerate Secret</button>
    </div>
  );
};

export default Secret;
