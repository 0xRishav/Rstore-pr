import { useProduct } from "../../helpers";
import { Button, Input } from "../index";
import "./SortRadioBtns.css";

function SortRadioBtns() {
  const { sortBy, setSortBy } = useProduct();

  return (
    <div className="sort-radio-group">
      <label className="sort-radio">
        <Input
          type="radio"
          name="sort"
          onChange={() => setSortBy("LOW_TO_HIGH")}
          checked={sortBy === "LOW_TO_HIGH"}
          className="sort-radio__input"
        />
        <span className="sort-radio__circle" />
        <span className="sort-radio__label">Price: Low to High</span>
      </label>

      <label className="sort-radio">
        <Input
          type="radio"
          name="sort"
          onChange={() => setSortBy("HIGH_TO_LOW")}
          checked={sortBy === "HIGH_TO_LOW"}
          className="sort-radio__input"
        />
        <span className="sort-radio__circle" />
        <span className="sort-radio__label">Price: High to Low</span>
      </label>

      {sortBy && (
        <Button variant="ghost" size="sm" onClick={() => setSortBy(null)}>
          Clear sort
        </Button>
      )}
    </div>
  );
}

export default SortRadioBtns;
