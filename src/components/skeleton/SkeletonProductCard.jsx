import Skeleton from "./Skeleton";

function SkeletonProductCard() {
  return (
    <div className="product-card" aria-hidden="true">
      <div className="product-card__image-wrapper">
        <Skeleton width="100%" height="auto" style={{ aspectRatio: "1" }} />
      </div>
      <div className="product-card__body" style={{ gap: "var(--space-2)", padding: "var(--space-4)" }}>
        <Skeleton width="85%" height="14px" borderRadius="4px" />
        <Skeleton width="50%" height="12px" borderRadius="4px" />
        <Skeleton width="60%" height="28px" borderRadius="6px" />
      </div>
    </div>
  );
}

export default SkeletonProductCard;
