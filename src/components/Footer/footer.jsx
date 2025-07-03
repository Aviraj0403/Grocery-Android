import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed! 🎉 ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-white dark:bg-gray-900 text-green-700 dark:text-green-300 pt-10 pb-6 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Shanu-Mart</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for fresh groceries, delivered fast and safe at your doorstep.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={18} className="hover:text-blue-600 transition-all" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={18} className="hover:text-pink-400 transition-all" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={18} className="hover:text-blue-400 transition-all" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/aboutus" className="hover:underline" onClick={() => navigate("aboutus")}>About Us</Link></li>
            <li><Link to="/aboutdeveloper" className="hover:underline" onClick={() => navigate("aboutdeveloper")}>About Developer</Link></li>
            <li><Link to="/contactus" className="hover:underline" onClick={() => navigate("contactus")}>Contact</Link></li>
            <li><Link to="/termandconditons" className="hover:underline" onClick={() => navigate("termandconditons")}>Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:underline" onClick={() => navigate("privacy")}>Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              <span>845106, Bhagat Singh Chowk, Ramnagar, Bihar</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              <a href="tel:+91-8757561623" className="hover:underline">+91-8757561623</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:support@shanumart.com" className="hover:underline">support@shanumart.com</a>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded border border-green-400 text-black dark:text-white w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-gray-800"
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

      {/* Footer bottom with Webla link and animation */}
      <div className="text-center text-sm mt-10 border-t border-green-200 dark:border-green-700 pt-4">
        &copy; {new Date().getFullYear()} Shanu-Mart. All rights reserved.
        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 animate-pulse">
          Co-powered by{" "}
          <a
            href="https://portfolio-react-xi-mauve.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-700 dark:text-green-400 hover:underline"
          >
            Webala
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
