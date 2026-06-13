import { forwardRef } from "react";
import { clsx } from "clsx";
import "./Button.css";

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    active = false,
    icon,
    className,
    children,
    type = "button",
    ...props
  },
  ref
) {
  const isIconOnly = icon && !children;

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        "btn",
        `btn--${variant}`,
        size !== "md" && `btn--${size}`,
        fullWidth && "btn--full",
        isIconOnly && "btn--icon",
        active && "btn--active",
        loading && "btn--loading",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="btn__spinner" />
      ) : icon ? (
        <span className="btn__icon">{icon}</span>
      ) : null}
      {children && <span className="btn__text">{children}</span>}
    </button>
  );
});

export default Button;
