import React from 'react';
import '../index.css';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-dark fixed-bottom">
      <div className="">
        <section className="footer">
          <a>
            <strong>
              Oura Movies
            </strong>
          </a>
          <a>
            All Rights Reserved © {new Date().getFullYear()}
          </a>
          <a>
            Privacy
          </a>
          <a>
            Terms of Use
          </a>
          <a>
            Contact Us
          </a>
          <a>
            Help Center
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;