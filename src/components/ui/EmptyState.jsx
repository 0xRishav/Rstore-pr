import { Link } from "react-router-dom";
import "./EmptyState.css";

function EmptyState({ message, linkTo, linkText }) {
  return (
    <div className="EmptyState">
      <p className="EmptyState__message">{message}</p>
      {linkTo && (
        <Link className="blue-btn--secondary" to={linkTo}>
          {linkText || "Browse Products"}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
