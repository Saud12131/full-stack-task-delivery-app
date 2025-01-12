import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { BACKEND_URL } from '../config';

export default function MenuInfo() {
    const [loading, setLoading] = useState(false);
    const [Menu, setMenu] = useState({});
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const token = localStorage.getItem('token');
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}menu/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const menuData = response.data;
                setMenu(menuData);

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setIsOwner(decodedToken.id === menuData.userId);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch menu items. Please try again later.');
                setLoading(false);
            }
        };

        fetchMenu();
    }, [token, id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item._id === Menu._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ menuItemId: Menu._id, name: Menu.name, price: Menu.price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setAddedToCart(true);

        // Optional toast notification
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    };

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
        <div>
            <div className="container my-4">
                <button
                    onClick={() => navigate('/cart')}
                    className="btn btn-primary mb-4"
                >
                    My Cart
                </button>

                <div id="toast" style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: '#28a745',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    display: 'none',
                }}>
                    Item added to cart!
                </div>

                <div className="d-flex justify-content-center align-items-center vh-90">
                    <div
                        className="card shadow-lg"
                        style={{
                            width: '22rem',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            fontFamily: "'Roboto', sans-serif",
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <img
                            src={Menu.ImageUrl}
                            className="card-img-top"
                            alt={Menu.name}
                            style={{
                                height: '250px',
                                objectFit: 'cover',
                                borderBottom: '2px solid #ddd',
                            }}
                        />
                        <div className="card-body text-center p-4">
                            <h4 className="card-title fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                                {Menu.name}
                            </h4>
                            <p className="card-text text-muted small mb-2">
                                <strong>Available: </strong>{Menu.available ? 'Yes' : 'No'}
                            </p>
                            <p className="card-text text-muted small mb-2">
                                <strong>Category: </strong>{Menu.category}
                            </p>
                            <p className="card-text text-success fw-semibold mb-3">
                                <strong>Price: </strong>${Menu.price}
                            </p>
                            <button
                                onClick={addToCart}
                                className="btn btn-primary btn-lg px-4 py-2"
                                disabled={!Menu.available}
                            >
                                {addedToCart ? 'Added' : (Menu.available ? 'ADD TO CART' : 'Out of Stock')}
                            </button>

                            {isOwner && (
                                <button
                                    className="btn btn-warning btn-md m-3"
                                    onClick={() => navigate(`/updateitem/${Menu._id}`)}
                                >
                                    Update
                                </button>
                            )}
                            {isOwner && (
                                <button
                                    className="btn btn-danger btn-md m-3"
                                    onClick={() => handleDelete(id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
