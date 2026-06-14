import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiSliders, FiChevronDown } from "react-icons/fi";
import { SkeletonProductGrid, Product, Checkbox, Button } from "../../components";
import { useProduct } from "../../helpers";
import "./ProductsPage.css";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, products } = useProduct();

  const category = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");
  const fastDelivery = searchParams.get("fastDelivery") === "true";
  const freeShipping = searchParams.get("freeShipping") === "true";
  const maxPrice = searchParams.get("maxPrice") || "150000";

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSort(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const filteredData = useMemo(() => {
    let data = products;
    if (sortBy === "price_asc") {
      data = [...data].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      data = [...data].sort((a, b) => b.price - a.price);
    }
    return data
      .filter((p) => (fastDelivery ? p.fastDelivery : true))
      .filter((p) => (freeShipping ? p.freeShipping : true))
      .filter((p) => (maxPrice ? p.price <= Number(maxPrice) : true));
  }, [products, sortBy, fastDelivery, freeShipping, maxPrice]);

  const items = category && validCategories.includes(category)
    ? filteredData.filter((p) => p.category === category)
    : filteredData;

  const toggleFastDelivery = () => {
    const next = new URLSearchParams(searchParams);
    fastDelivery ? next.delete("fastDelivery") : next.set("fastDelivery", "true");
    setSearchParams(next);
  };

  const toggleFreeShipping = () => {
    const next = new URLSearchParams(searchParams);
    freeShipping ? next.delete("freeShipping") : next.set("freeShipping", "true");
    setSearchParams(next);
  };

  const handleSort = (value) => {
    const next = new URLSearchParams(searchParams);
    value ? next.set("sortBy", value) : next.delete("sortBy");
    setSearchParams(next);
  };

  const handlePriceChange = (e) => {
    const next = new URLSearchParams(searchParams);
    const val = e.target.value;
    val === "150000" ? next.delete("maxPrice") : next.set("maxPrice", val);
    setSearchParams(next);
  };

  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">{category || "All Products"}</h1>
        <span className="products-page__count">{items.length} products</span>
      </div>

      <div className="sort-filter-bar">
        <div className="sort-filter-bar__left" ref={filterRef}>
          <Button
            variant="secondary"
            size="sm"
            icon={<FiSliders size={14} />}
            active={showFilter}
            onClick={() => {
              setShowFilter(!showFilter);
              setShowSort(false);
            }}
          >
            Filters
          </Button>
          {showFilter && (
            <div className="sort-filter-bar__dropdown">
              <div className="filter-dropdown">
                <div className="filter-dropdown__section">
                  <h4 className="filter-dropdown__heading">Tags</h4>
                  <Checkbox name="Free Shipping" checked={freeShipping} onToggle={toggleFreeShipping} />
                  <Checkbox name="Fast Delivery" checked={fastDelivery} onToggle={toggleFastDelivery} />
                </div>

                <div className="filter-dropdown__section">
                  <h4 className="filter-dropdown__heading">
                    Max Price: <span className="filter-dropdown__price">Rs. {Number(maxPrice).toLocaleString()}</span>
                  </h4>
                  <input
                    type="range"
                    min={0}
                    max={150000}
                    step={1000}
                    value={maxPrice}
                    onChange={handlePriceChange}
                    className="filter-dropdown__range"
                  />
                  <div className="filter-dropdown__range-labels">
                    <span>Rs. 0</span>
                    <span>Rs. 1,50,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sort-filter-bar__right" ref={sortRef}>
          <Button
            variant="secondary"
            size="sm"
            active={showSort}
            onClick={() => {
              setShowSort(!showSort);
              setShowFilter(false);
            }}
          >
            Sort by
            <FiChevronDown size={14} />
          </Button>
          {showSort && (
            <div className="sort-filter-bar__dropdown sort-filter-bar__dropdown--right">
              <div className="sort-dropdown">
                <div className="sort-radio-group">
                  <label className="sort-radio">
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => handleSort("price_asc")}
                      checked={sortBy === "price_asc"}
                      className="sort-radio__input"
                    />
                    <span className="sort-radio__circle" />
                    <span className="sort-radio__label">Price: Low to High</span>
                  </label>

                  <label className="sort-radio">
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => handleSort("price_desc")}
                      checked={sortBy === "price_desc"}
                      className="sort-radio__input"
                    />
                    <span className="sort-radio__circle" />
                    <span className="sort-radio__label">Price: High to Low</span>
                  </label>

                  {sortBy && (
                    <Button variant="ghost" size="sm" onClick={() => handleSort(null)}>
                      Clear sort
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
