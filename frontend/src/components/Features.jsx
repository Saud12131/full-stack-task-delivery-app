import React from 'react';

function Features() {
  return (
    <div className="features py-5">
      <div className="container">
        <h2 className="text-center mb-5">Why Choose Share a Bite?</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Wide Selection</h3>
                <p className="card-text">Choose from hundreds of local restaurants and cuisines.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Fast Delivery</h3>
                <p className="card-text">Get your food delivered hot and fresh in no time.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Easy Ordering</h3>
                <p className="card-text">Order with just a few taps on your smartphone or computer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;

