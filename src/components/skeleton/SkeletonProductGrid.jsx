import SkeletonProductCard from "./SkeletonProductCard";

function SkeletonProductGrid({ count = 8 }) {
  return (
    <div className="products-wrapper" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

export default SkeletonProductGrid;
