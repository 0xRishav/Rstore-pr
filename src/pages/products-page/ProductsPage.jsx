import { useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SkeletonProductGrid, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./ProductsPage.css";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  const { isLoading, filteredData, products } = useProduct();

  const validCategories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products],
  );

  useEffect(() => {
    if (category && !validCategories.includes(category)) {
      navigate("/products", { replace: true });
    }
  }, [category, validCategories, navigate]);

  if (category && !validCategories.includes(category)) return null;

  const items = category && validCategories.includes(category)
    ? filteredData.filter((p) => p.category === category)
    : filteredData;

  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">{category || "All Products"}</h1>
        <span className="products-page__count">{items.length} products</span>
      </div>

      <SortFilterWrapper />

      {isLoading ? (
        <SkeletonProductGrid />
      ) : (
        <div className="products-wrapper">
          {items.map((p) => (
            <Product key={p._id} {...p} id={p._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
