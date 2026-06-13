import { useState, useRef, useEffect } from "react";
import { FiSliders, FiChevronDown } from "react-icons/fi";
import { useProduct } from "../../helpers";
import { Checkbox, SortRadioBtns, Button } from "..";
import "./SortFilterWrapper.css";

function SortFilterWrapper() {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const { filterPrice, toggleFastDelivery, toggleFreeShipping, setFilterPrice } =
    useProduct();

  const handlePriceChange = (e) => {
    setFilterPrice(e.target.value);
  };

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

  return (
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
                <Checkbox name="Free Shipping" onToggle={toggleFreeShipping} />
                <Checkbox name="Fast Delivery" onToggle={toggleFastDelivery} />
              </div>

              <div className="filter-dropdown__section">
                <h4 className="filter-dropdown__heading">
                  Max Price: <span className="filter-dropdown__price">Rs. {Number(filterPrice).toLocaleString()}</span>
                </h4>
                <input
                  type="range"
                  min={0}
                  max={150000}
                  step={1000}
                  value={filterPrice}
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
              <SortRadioBtns />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SortFilterWrapper;
