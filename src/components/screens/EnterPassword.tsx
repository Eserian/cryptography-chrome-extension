import React, { useState } from 'react';

interface EnterPasswordProps {
  onPasswordSet: (password: string) => void;
}

const EnterPassword: React.FC<EnterPasswordProps> = ({ onPasswordSet }) => {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    onPasswordSet(password);
  };

  return (
    <div>
      <h1>Enter Password</h1>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EnterPassword;
