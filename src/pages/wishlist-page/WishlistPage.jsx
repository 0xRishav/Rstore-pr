import { FiHeart } from "react-icons/fi";
import { SkeletonProductGrid, Product, EmptyState } from "../../components";
import { useWishlist } from "../../contexts/WishlistContext";
import "./WishlistPage.css";

function WishlistPage() {
  const { isLoading, wishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__header">
        <h1 className="wishlist-page__title">My Wishlist</h1>
        <span className="wishlist-page__count">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""}</span>
      </div>

      {isLoading ? (
        <SkeletonProductGrid />
      ) : wishlist.length === 0 ? (
        <EmptyState
          message="Your wishlist is empty"
          linkTo="/products"
          linkText="Browse Products"
          icon={<FiHeart size={40} />}
        />
      ) : (
        <div className="products-wrapper">
          {wishlist.map((product) => (
            <Product key={product._id} {...product} id={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
