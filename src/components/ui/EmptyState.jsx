import { Link } from "react-router-dom";
import "./EmptyState.css";

function EmptyState({ message, linkTo, linkText, icon }) {
  return (
    <div className="EmptyState">
      {icon && <span className="EmptyState__icon" aria-hidden="true">{icon}</span>}
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
