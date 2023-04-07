import React, { useState } from 'react';

interface SignInProps {
  onLogin: (password: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await onLogin(password);
    } catch (e: any) {
      setError(e.message)
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default SignIn;
