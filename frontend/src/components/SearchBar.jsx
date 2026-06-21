import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ large = false }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center bg-white rounded-full border border-forest-200 shadow-premium overflow-hidden ${
        large ? "h-14 px-2" : "h-11 px-1"
      }`}
    >
      <Search className="ml-3 text-forest-500" size={large ? 22 : 18} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by product, brand or category..."
        className={`flex-1 bg-transparent outline-none px-3 text-forest-900 placeholder:text-forest-400 ${
          large ? "text-base" : "text-sm"
        }`}
      />
      <button
        type="submit"
        className={`btn-primary ${large ? "px-6 py-3" : "px-4 py-2 text-sm"}`}
      >
        Search
      </button>
    </form>
  );
}
