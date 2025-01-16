import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <aside>
        <img src="/Logo.png" alt="Logo" className="h-6 lg:f-12 pr-a max-auto" />
        <p>
          Our Mission: To Merge
          <br />
          Fashion with Functionality in the World of Software Engineering!
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">USEFUL LINKS</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Events</a>
        <a className="link link-hover">Blogs</a>
        <a className="link link-hover">FAQ</a>
      </nav>
      <nav>
        <h6 className="footer-title">MAIN MENU</h6>
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Offers</a>
        <a className="link link-hover">Products</a>
        <a className="link link-hover">Reservation</a>
      </nav>
      <nav>
        <h6 className="footer-title">CONTACT US</h6>
        <a className="link link-hover">example@email.com</a>
        <a className="link link-hover">+66 958 248 966</a>
        <a className="link link-hover">Social media</a>
      </nav>
    </footer>
  );
};

export default Footer;
