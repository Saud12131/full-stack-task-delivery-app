import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}Order/yourorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders); // Assuming response.data.orders is the correct structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
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
    <div>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center text-muted">You have no orders yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.menuItemId.name} x {item.quantity} (${item.menuItemId.price})
                        </div>
                      ))}
                    </td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
