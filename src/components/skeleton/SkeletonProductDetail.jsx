import Skeleton from "./Skeleton";

function BreadcrumbSkeleton() {
  return (
    <div className="product-page__breadcrumb" aria-hidden="true">
      <Skeleton width="40px" height="14px" borderRadius="4px" />
      <span style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>/</span>
      <Skeleton width="60px" height="14px" borderRadius="4px" />
      <span style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>/</span>
      <Skeleton width="120px" height="14px" borderRadius="4px" />
    </div>
  );
}

function SkeletonProductDetail() {
  return (
    <div className="product-page" aria-hidden="true">
      <BreadcrumbSkeleton />

      <div className="product-page__layout">
        <div className="product-page__gallery">
          <Skeleton
            width="100%"
            height="auto"
            style={{ aspectRatio: "1", borderRadius: "var(--radius-2xl)" }}
          />
          <div className="product-page__thumbnails" style={{ marginTop: "var(--space-4)" }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} width="72px" height="72px" borderRadius="12px" />
            ))}
          </div>
        </div>

        <div className="product-page__info" style={{ gap: "var(--space-4)" }}>
          <Skeleton width="90%" height="30px" borderRadius="6px" />
          <Skeleton width="120px" height="20px" borderRadius="4px" />
          <Skeleton width="160px" height="36px" borderRadius="6px" />
          <div className="product-page__badges">
            <Skeleton width="100px" height="24px" borderRadius="6px" />
            <Skeleton width="100px" height="24px" borderRadius="6px" />
          </div>
          <Skeleton width="100%" height="48px" borderRadius="12px" />
          <Skeleton width="100%" height="1px" borderRadius="0" />
          <Skeleton width="100%" height="20px" borderRadius="4px" />
          <Skeleton width="100%" height="14px" borderRadius="4px" />
          <Skeleton width="100%" height="14px" borderRadius="4px" />
          <Skeleton width="60%" height="14px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonProductDetail;
