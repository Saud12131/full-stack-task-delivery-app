import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({ Menu }) {
    let navigate = useNavigate();
    return (
        <div className="container">
            <div
                className="card shadow-sm"
                style={{ width: '13rem', borderRadius: '10px', overflow: 'hidden' }}
            >
                <img
                    src={Menu.ImageUrl}
                    className="card-img-top"
                    alt={Menu.name}
                    style={{ height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body text-center p-2">
                    <h6 className="card-title fw-bold mb-1">{Menu.name}</h6>
                    <p className="card-text text-success fw-semibold mb-2">
                        Price: ${Menu.price}
                    </p>
                    <a onClick={() =>navigate(`/Menu/${Menu._id}`)} className="btn btn-primary btn-sm">Order Now</a>
                </div>
            </div>
        </div>
    );
}
