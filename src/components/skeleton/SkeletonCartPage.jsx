import Skeleton from "./Skeleton";

function CartItemSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-4)",
        padding: "var(--space-4)",
        background: "var(--surface-primary)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
      }}
      aria-hidden="true"
    >
      <Skeleton width="100px" height="100px" borderRadius="12px" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)", justifyContent: "center" }}>
        <Skeleton width="70%" height="16px" borderRadius="4px" />
        <Skeleton width="40%" height="14px" borderRadius="4px" />
        <Skeleton width="120px" height="32px" borderRadius="8px" />
      </div>
      <Skeleton width="80px" height="20px" borderRadius="4px" />
    </div>
  );
}

function SkeletonCartPage() {
  return (
    <div className="cart-page" aria-hidden="true">
      <div className="cart-page__header">
        <Skeleton width="220px" height="28px" borderRadius="6px" />
        <Skeleton width="80px" height="16px" borderRadius="4px" />
      </div>
      <div className="cart-page__layout">
        <div className="cart-page__items">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
        <div className="cart-page__summary">
          <div
            className="cart-page__summary-card"
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
          >
            <Skeleton width="140px" height="20px" borderRadius="4px" />
            <Skeleton width="100%" height="14px" borderRadius="4px" />
            <Skeleton width="100%" height="14px" borderRadius="4px" />
            <Skeleton width="100%" height="1px" borderRadius="0" />
            <Skeleton width="100%" height="18px" borderRadius="4px" />
            <Skeleton width="100%" height="48px" borderRadius="12px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCartPage;
