import { useEffect, useState } from 'react';
import { API_URL } from '../constants';

function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${API_URL}/users`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Error al cargar datos');
          return;
        }

        setMessage(data.message || 'Bienvenido');
        console.log('Usuarios:', data);
        setUsers(data || []);
      } catch {
        setError('Error de servidor');
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
