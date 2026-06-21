import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "Which areas do you deliver to?", a: "We currently deliver across Sonia Vihar and nearby areas of Delhi, with same-day delivery on orders placed before 6 PM." },
  { q: "What payment methods are accepted?", a: "We accept UPI, debit/credit cards, net banking, and cash on delivery." },
  { q: "Can the AI Assistant prescribe medicine?", a: "No. Our AI Assistant only shares general wellness information and helps with product search or order questions. For diagnosis or prescriptions, please consult a doctor or our pharmacist." },
  { q: "How do I track my order?", a: "Visit the 'My Orders' page after logging in to see live order status and delivery tracking." },
  { q: "Do you sell prescription medicines?", a: "Select prescription-required items may need a valid prescription, which our team will verify before dispatch." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="container-pad py-14 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-forest-900 mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <div key={i} className="card overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left font-semibold text-forest-900">
              {item.q}
              <ChevronDown className={`transition-transform ${open === i ? "rotate-180" : ""}`} size={18} />
            </button>
            {open === i && <p className="px-5 pb-5 text-sm text-forest-600">{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
