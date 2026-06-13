import { forwardRef } from "react";
import { clsx } from "clsx";
import "./Badge.css";

const Badge = forwardRef(function Badge(
  { variant = "info", icon, className, children, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={clsx("badge", `badge--${variant}`, className)}
      {...props}
    >
      {icon && <span className="badge__icon">{icon}</span>}
      {children}
    </span>
  );
});

export default Badge;
