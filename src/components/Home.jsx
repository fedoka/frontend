import { useEffect, useState } from 'react';
import { httpClient } from '../services/HttpClient';

function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await httpClient.get('/users');
        if (Array.isArray(data)) setUsers(data || []);
        setMessage('Bienvenido');
      } catch (err) {
        setError(err.message || 'Error de servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>{message}</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </>
  );
}

export default Home;
