import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter logic here
    alert("Subscribed! 🎉");
  };

  return (
    <footer className="bg-white text-green-700 pt-10 pb-6 mt-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Shanu-Mart</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for fresh groceries, delivered fast and safe at your doorstep.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={18} className="hover:text-green-500 transition-all" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={18} className="hover:text-green-500 transition-all" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={18} className="hover:text-green-500 transition-all" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              <span>123 Green Street, FreshTown, NY 10001</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:support@grocerymart.com" className="hover:underline">support@grocerymart.com</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Subscribe</h3>
          <p className="text-sm mb-3">
            Get exclusive deals and the latest updates right in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded border border-green-400 text-black w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-green-200 pt-4">
        &copy; {new Date().getFullYear()} Shanu-Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
