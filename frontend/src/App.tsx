import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        email,
        password,
      });

      console.log(response.data);

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
        console.log('user added', response.data);
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
        console.log('user logged', response.data);
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Signup System</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default App
