import React, { useEffect, useState } from 'react'; 
import Navbar from '../components/Navbar';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { Trash } from 'lucide-react';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, []);

    const placeOrder = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                `${BACKEND_URL}Order`,
                { items: cart, totalAmount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            setCart([]);
            setTotalAmount(0);
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
        }
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cart.filter(item => item.menuItemId !== itemId);
        setCart(updatedCart);

        localStorage.setItem('cart', JSON.stringify(updatedCart));

        const updatedTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(updatedTotal);

        alert('Item removed from the cart!');
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="mb-4">Your Cart</h2>
                {cart.length > 0 ? (
                    <>
                        <ul className="list-group">
                            {cart.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>
                                        {item.name} (x{item.quantity})
                                    </span>
                                    <span>${item.price * item.quantity}</span>
                                    <button 
                                        className="btn btn-danger mt-2" 
                                        onClick={() => removeFromCart(item.menuItemId)}>
                                        <Trash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <h4 className="mt-4">Total: ${totalAmount}</h4>
                        <button onClick={placeOrder} className="btn btn-success mt-3">
                            Place Order
                        </button>
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
}
