import { Link } from "react-router-dom";
import "./EmptyState.css";

function EmptyState({ message, linkTo, linkText, icon }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <p className="empty-state__message">{message}</p>
      {linkTo && (
        <Link className="btn btn--primary" to={linkTo}>
          {linkText || "Browse Products"}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
