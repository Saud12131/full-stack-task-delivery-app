import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
export function useMenu({ id }) {
  const [menu, setMenu] = useState({});
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}Menu/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMenu(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenu();
  }, [token]);

  return {
    menu
  }
}
export function useHandleDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(`${BACKEND_URL}Menu/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        navigate('/explore');
      }
      console.log(`Item with id ${id} deleted successfully.`);
    } catch (err) {
      setError("Failed to delete the item.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}


