import { useProduct } from "../../helpers";
import "./SortRadioBtns.css";

function SortRadioBtns() {
  const { sortBy, setSortBy } = useProduct();

  return (
    <div className="sort-radio-group">
      <label className="sort-radio">
        <input
          type="radio"
          name="sort"
          className="sort-radio__input"
          onChange={() => setSortBy("LOW_TO_HIGH")}
          checked={sortBy === "LOW_TO_HIGH"}
        />
        <span className="sort-radio__circle" />
        <span className="sort-radio__label">Price: Low to High</span>
      </label>

      <label className="sort-radio">
        <input
          type="radio"
          name="sort"
          className="sort-radio__input"
          onChange={() => setSortBy("HIGH_TO_LOW")}
          checked={sortBy === "HIGH_TO_LOW"}
        />
        <span className="sort-radio__circle" />
        <span className="sort-radio__label">Price: High to Low</span>
      </label>

      {sortBy && (
        <button
          className="sort-radio__clear"
          onClick={() => setSortBy(null)}
        >
          Clear sort
        </button>
      )}
    </div>
  );
}

export default SortRadioBtns;
