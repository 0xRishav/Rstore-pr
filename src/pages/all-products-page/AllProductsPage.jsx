import { SkeletonProductGrid, Product, SortFilterWrapper } from "../../components";
import { useProduct } from "../../helpers";
import "./AllProductsPage.css";

function AllProductsPage() {
  const { isLoading, filteredData } = useProduct();

  return (
    <div className="all-products-page">
      <div className="all-products-page__header">
        <h1 className="all-products-page__title">All Products</h1>
        <span className="all-products-page__count">{filteredData.length} products</span>
      </div>

      <SortFilterWrapper />

      {isLoading ? (
        <SkeletonProductGrid />
      ) : (
        <div className="products-wrapper">
          {filteredData.map((product) => (
            <Product key={product._id} {...product} id={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllProductsPage;
