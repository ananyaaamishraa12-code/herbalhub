import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "919999999999"; // replace with real number
  const message = encodeURIComponent("Hi HerbalHub! I'd like some help with an order.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HerbalHub on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp Us</span>
    </a>
  );
}
