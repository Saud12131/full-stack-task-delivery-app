import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useMenu } from '../hooks/ItemsHook';
import Spinner from '../components/Spinner';
import { BACKEND_URL } from '../config';
const UpdateMenu = () => {
    const [formData, setFormData] = useState({
        name: "",
        ImageUrl: "",
        price: "",
        category: "",
        available: true,
    });
    let navigate = useNavigate();
    let id = useParams().id;
    let { menu } = useMenu({ id });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (menu) {
            setFormData({
                name: menu.name || "",
                price: menu.price || "",
                ImageUrl: menu.ImageUrl || "",
                available: menu.available !== undefined ? menu.available : true,
                category: menu.category || "",
            });
        }

    }, [menu]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : name === "price" ? Number(value) : value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.name || !formData.price || !formData.category) {
            alert("Please fill out all required fields.");
            return;
        }
        try {
            let response = await axios.put(`${BACKEND_URL}/Menu/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (response.status === 201) {
                alert("Item updated successfully!");
            }
            navigate("/explore");
            setLoading(false)
        } catch (err) {
            console.log(err);
            alert("An error occurred. Please try again.");
            setLoading(false);
        }
    };
    if (!menu) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Update Item</h1>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded">
                {/* Name Field */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image URL Field */}
                <div className="mb-3">
                    <label htmlFor="ImageUrl" className="form-label">
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        id="ImageUrl"
                        name="ImageUrl"
                        className="form-control"
                        value={formData.ImageUrl}
                        onChange={handleChange}
                    />
                </div>


                {/* Price Field */}
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                {/* Category Field */}
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category <span className="text-danger">*</span>
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Appetizers">Appetizers</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Desserts">Desserts</option>
                    </select>
                </div>

                {/* Availability Field */}
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        id="available"
                        name="available"
                        className="form-check-input"
                        checked={formData.available}
                        onChange={handleChange}
                    />
                    <label htmlFor="available" className="form-check-label">
                        Available
                    </label>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        {loading ? <Spinner /> : "Update"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default UpdateMenu;
