import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { submitContact } from "../api/services";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await submitContact(form);
      setStatus({ ok: true, text: res.data.message });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ ok: false, text: err.response?.data?.error || "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="container-pad py-12 grid lg:grid-cols-2 gap-12">
      <div>
        <span className="eyebrow">Get In Touch</span>
        <h1 className="font-display text-3xl font-bold text-forest-900 mt-2">Contact Us</h1>
        <p className="text-forest-600 mt-2">We're happy to help with orders, products, or anything else.</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3"><MapPin className="text-forest-700" size={20} /> <span>Sonia Vihar, Delhi, India</span></div>
          <div className="flex items-center gap-3"><Phone className="text-forest-700" size={20} /> <span>+91 99999 99999</span></div>
          <div className="flex items-center gap-3"><Mail className="text-forest-700" size={20} /> <span>support@herbalhub.in</span></div>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#25D366] font-semibold">
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>
        </div>

        <div className="mt-8 rounded-2xl overflow-hidden border border-forest-100 h-64 bg-forest-50 flex items-center justify-center text-forest-400 text-sm">
          {/* Replace with real embed: <iframe src="https://www.google.com/maps/embed?..." /> */}
          Google Maps Embed Placeholder — Sonia Vihar, Delhi
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4 h-fit">
        <h2 className="font-display text-xl font-bold text-forest-900">Send Us a Message</h2>
        <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
        <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
        <input placeholder="Phone Number (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
        <textarea required placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
        <button type="submit" className="btn-primary w-full">Send Message</button>
        {status && (
          <p className={`text-sm ${status.ok ? "text-forest-700" : "text-red-600"}`}>{status.text}</p>
        )}
      </form>
    </div>
  );
}
