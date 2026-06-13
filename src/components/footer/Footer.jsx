import { Link } from "react-router-dom";
import { FiArrowRight, FiTwitter, FiGithub, FiInstagram } from "react-icons/fi";
import { SiVisa, SiMastercard } from "react-icons/si";
import { Button } from "../index";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Newsletter */}
        <div className="footer__newsletter">
          <div className="footer__newsletter-text">
            <h3 className="footer__newsletter-title">Stay in the loop</h3>
            <p className="footer__newsletter-subtitle">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
          </div>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="footer__newsletter-input"
            />
            <Button
              variant="primary"
              icon={<FiArrowRight size={18} />}
              type="submit"
              aria-label="Subscribe"
              className="footer__newsletter-btn"
            />
          </form>
        </div>

        <div className="footer__divider" />

        {/* Links */}
        <div className="footer__grid">
          <div className="footer__col">
            <h4 className="footer__col-title">RStore</h4>
            <p className="footer__col-desc">
              Your one-stop shop for premium electronics. Quality products at great prices.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Shop</h4>
            <Link to="/products" className="footer__link">All Products</Link>
            <Link to="/category/Mobiles" className="footer__link">Mobile</Link>
            <Link to="/category/Laptop" className="footer__link">Laptop</Link>
            <Link to="/category/TV" className="footer__link">TV</Link>
            <Link to="/category/Watch" className="footer__link">Watch</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Support</h4>
            <Link to="/" className="footer__link">FAQ</Link>
            <Link to="/" className="footer__link">Shipping</Link>
            <Link to="/" className="footer__link">Returns</Link>
            <Link to="/" className="footer__link">Contact</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <div className="footer__social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
                <FiTwitter size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
                <FiGithub size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} RStore. All rights reserved.
          </p>
          <div className="footer__payments">
            <SiVisa size={28} />
            <SiMastercard size={28} />
            <span className="footer__payment-text">UPI</span>
            <span className="footer__payment-text">Rupay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
