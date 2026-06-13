import { forwardRef } from "react";
import { clsx } from "clsx";
import "./Input.css";

const Input = forwardRef(function Input(
  { error, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx("input", error && "input--error", className)}
      aria-invalid={error ? "true" : undefined}
      {...props}
    />
  );
});

export default Input;
