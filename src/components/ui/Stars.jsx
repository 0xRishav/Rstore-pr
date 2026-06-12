import "./Stars.css";

function Stars({ rating, size = 16, color }) {
  return (
    <span className="Stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="Stars__star"
          style={{ color: star <= Math.round(rating) ? (color || "var(--accent)") : "#ddd", fontSize: size }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default Stars;
