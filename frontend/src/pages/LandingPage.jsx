import React from 'react'
import { Link } from 'react-router-dom'
import Features from '../components/Features'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function LandingPage() {
    return (
        <div className="container">
            <div className="App">
                <Navbar />
                <Hero />
                <Features />
                <Footer />
            </div>
        </div>
    )
}
