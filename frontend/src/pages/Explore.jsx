import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import Navbar from '../components/Navbar.jsx';
import { BACKEND_URL } from '../config.js';

export default function Explore() {
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}menu`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMenu(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch menu items. Please try again later.');
                setLoading(false);
            }
        };

        fetchMenu();
    }, [token]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center my-5">
                <h4 className="text-danger">{error}</h4>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <Navbar />
            <h2 className="text-center mb-4">Explore Our Menu</h2>
            <div className="row justify-content-center">
                {menu.map((item) => (
               <div
               className="col-12 col-sm-6 col-md-4 col-lg-3 my-3 d-flex justify-content-center ps-sm-3"
               key={item._id}
           >
               <Card Menu={item} />
           </div>
                ))}
            </div>
        </div>
    );
}
