import { Link } from "react-router-dom";
import { Leaf, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-cream-100 mt-20">
      <div className="container-pad py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-forest-950">
              <Leaf size={18} />
            </span>
            <span className="font-display text-xl font-bold">HerbalHub</span>
          </div>
          <p className="text-sm text-cream-200/80 leading-relaxed">
            A premium Ayurvedic & medical store in Sonia Vihar, Delhi —
            bringing trusted wellness products to your doorstep.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-forest-800 hover:bg-gold-500 hover:text-forest-950 transition-colors"><Facebook size={16} /></a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-forest-800 hover:bg-gold-500 hover:text-forest-950 transition-colors"><Instagram size={16} /></a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-forest-800 hover:bg-gold-500 hover:text-forest-950 transition-colors"><Twitter size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-cream-200/80">
            <li><Link to="/shop" className="hover:text-gold-400">Shop</Link></li>
            <li><Link to="/categories" className="hover:text-gold-400">Categories</Link></li>
            <li><Link to="/ai-assistant" className="hover:text-gold-400">AI Assistant</Link></li>
            <li><Link to="/about" className="hover:text-gold-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-cream-200/80">
            <li><Link to="/faq" className="hover:text-gold-400">FAQ</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-gold-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold-400">Terms & Conditions</Link></li>
            <li><Link to="/orders" className="hover:text-gold-400">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-cream-200/80">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" /> Sonia Vihar, Delhi, India</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-gold-400" /> +91 99999 99999</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-gold-400" /> support@herbalhub.in</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800 py-5 text-center text-xs text-cream-200/60">
        © {new Date().getFullYear()} HerbalHub. All rights reserved. Home delivery available across Sonia Vihar & nearby areas.
      </div>
    </footer>
  );
}
