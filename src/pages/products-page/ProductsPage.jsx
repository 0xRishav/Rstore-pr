import { useSearchParams } from "react-router-dom";
import { SkeletonProductGrid, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./ProductsPage.css";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { isLoading, filteredData } = useProduct();

  const products = category
    ? filteredData.filter((p) => p.category === category)
    : filteredData;

  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">{category || "All Products"}</h1>
        <span className="products-page__count">{products.length} products</span>
      </div>

      <SortFilterWrapper />

      {isLoading ? (
        <SkeletonProductGrid />
      ) : (
        <div className="products-wrapper">
          {products.map((p) => (
            <Product key={p._id} {...p} id={p._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
