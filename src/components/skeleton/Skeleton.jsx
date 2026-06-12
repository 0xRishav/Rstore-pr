import "./Skeleton.css";

function Skeleton({ width, height, borderRadius, className, style }) {
  return (
    <div
      className={`skeleton ${className || ""}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius: borderRadius || undefined,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
