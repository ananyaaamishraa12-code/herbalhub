import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} className={i < review.rating ? "fill-gold-500 text-gold-500" : "text-forest-200"} />
        ))}
      </div>
      <p className="text-sm text-forest-700 leading-relaxed">"{review.text}"</p>
      <p className="mt-4 font-semibold text-forest-900 text-sm">{review.name}</p>
      <p className="text-xs text-forest-400">{review.location}</p>
    </div>
  );
}
