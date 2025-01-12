import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BACKEND_URL } from "../config";
import Spinner from "../components/Spinner";
import Card from "../components/Card";

const SearchResults = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("name"); // Extract the 'name' query parameter

    const [results, setResults] = useState([]); // Initialize state as an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchQuery) return; // Exit if searchQuery is null or undefined

            setLoading(true);
            setError("");
            try {
                const response = await axios.get(`${BACKEND_URL}menu/searchitem?name=${searchQuery}`);
                const data = response.data;
                setResults(data.items || []);
            } catch (err) {
                console.error(err); // Log for debugging
                setError(err.response?.data?.message || "Failed to fetch search results");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 font-bold">{error}</p>
            </div>
        );

    if (!searchQuery)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">No search query provided.</p>
            </div>
        );

    if (results.length === 0)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">No items found for "{searchQuery}".</p>
            </div>
        );

    return (
        <div className="flex flex-col items-center min-h-screen px-4 bg-gray-100">
            <Navbar />
            <div className="flex  items-center ms-4 w-full max-w-screen-lg">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Search Results for "{searchQuery}"
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full ">
                    {results.map((item) => (
                        <Card key={item.id} Menu={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
