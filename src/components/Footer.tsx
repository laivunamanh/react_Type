import React from "react";

const Footer = () => {
	return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-geo-alt"></i> 123 Main Street, Anytown, USA
              </li>
              <li>
                <i className="bi bi-envelope"></i> email@example.com
              </li>
              <li>
                <i className="bi bi-telephone"></i> +1 234 567 890
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Follow Us</h5>
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <a href="#" className="text-white fs-3">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-white fs-3">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-white fs-3">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white fs-3">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
