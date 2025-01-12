import React from 'react';
import '../pages/hero.css'
import { Link } from 'react-router-dom';
function Hero() {
  return (
    <div className="hero py-5  text-white border rounded p-3" id='background-css'>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-3">Delicious Food, Delivered to Your Doorstep</h1>
            <p className="lead mb-4">Experience a world of flavors with Share a Bite. Order now and satisfy your cravings!</p>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-light btn-lg ">
                <Link to={"/explore"} className="text-decoration-none text-dark">
                Order Now
                </Link>
              </button>
           
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <img src="https://img.freepik.com/premium-photo/3d-food-delivery-boy-isolated-white-background_759447-1373.jpg" alt="Delicious food" className="img-fluid rounded-3 shadow-lg border rounded p-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
