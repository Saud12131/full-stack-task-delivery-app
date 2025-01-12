import React from 'react';
import '../pages/hero.css'
function Footer() {
  return (
    <footer className="bg-light py-4 footer" id='footer'>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2023 Share a Bite. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-decoration-none me-3">Terms of Service</a>
            <a href="#" className="text-decoration-none">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

