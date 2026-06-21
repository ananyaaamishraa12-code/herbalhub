import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Send, Sparkles, ShieldAlert } from "lucide-react";
import { sendChatMessage } from "../api/services";

const SUGGESTIONS = [
  "What helps with a common cold?",
  "How can I support my immunity?",
  "Where is HerbalHub located?",
  "How do I track my order?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your HerbalHub Wellness Assistant 🌿 I can share general health information, help you find products, or assist with orders. I don't diagnose conditions or prescribe medicines — for that, please consult a doctor or our pharmacist. How can I help today?",
      products: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((m) => [...m, { role: "user", text: msg, products: [] }]);
    setInput("");
    setLoading(true);
    try {
      const res = await sendChatMessage(msg);
      setMessages((m) => [...m, { role: "assistant", text: res.data.reply, products: res.data.products || [] }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Sorry, I had trouble responding. Please try again or reach us on WhatsApp.", products: [] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-pad py-10 max-w-3xl">
      <div className="text-center mb-6">
        <span className="eyebrow flex items-center justify-center gap-1"><Sparkles size={14} /> AI Health Assistant</span>
        <h1 className="font-display text-3xl font-bold text-forest-900 mt-2">Chat with HerbalHub</h1>
      </div>

      <div className="card flex items-start gap-3 p-4 mb-5 bg-amber-50 border-amber-200">
        <ShieldAlert size={20} className="text-amber-600 mt-0.5" />
        <p className="text-xs text-amber-800">
          This assistant provides general wellness information only. It does
          not diagnose conditions or prescribe medicines. For personal
          medical advice, please consult a doctor or pharmacist.
        </p>
      </div>

      <div className="card p-5 h-[480px] overflow-y-auto flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] ${m.role === "user" ? "self-end" : "self-start"}`}>
            <div className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
              m.role === "user" ? "bg-forest-700 text-cream-50" : "bg-forest-50 text-forest-900"
            }`}>
              {m.text}
            </div>
            {m.products?.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {m.products.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="card p-2 flex items-center gap-2 hover:shadow-gold">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-semibold text-forest-900 line-clamp-1">{p.name}</p>
                      <p className="text-xs text-forest-500">₹{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && <div className="self-start text-sm text-forest-400">Typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 flex-wrap mt-3">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => send(s)} className="text-xs rounded-full border border-forest-200 px-3 py-1.5 text-forest-700 hover:border-forest-500">
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="mt-4 flex items-center gap-2 rounded-full border border-forest-200 bg-white p-2 shadow-premium"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 bg-transparent outline-none px-3 text-sm"
        />
        <button type="submit" className="btn-primary px-4 py-2"><Send size={16} /></button>
      </form>
    </div>
  );
}
