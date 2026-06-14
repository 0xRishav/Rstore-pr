import "./Checkbox.css";

function Checkbox({ name, onToggle, checked }) {
  return (
    <label className="checkbox-wrapper">
      <input
        type="checkbox"
        className="checkbox-input"
        onChange={onToggle}
        checked={checked}
      />
      <span className="checkbox-checkmark">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            d="M1.73 12.91l6.37 6.37L22.79 4.59"
          />
        </svg>
      </span>
      <span className="checkbox-label">{name}</span>
    </label>
  );
}

export default Checkbox;
