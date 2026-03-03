import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';
import { httpClient } from '../services/HttpClient';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await httpClient.post('/auth/login', { email, password });
      if (data.logged) {
        navigate('/home');
        localStorage.setItem('logged', true);
      } else {
        setMessage(data.message || 'Error');
        localStorage.removeItem('logged');
      }
    } catch {
      setMessage('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
