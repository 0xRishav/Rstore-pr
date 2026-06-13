import { useState, useRef, useEffect } from "react";
import { FiSliders, FiChevronDown } from "react-icons/fi";
import { FilterDropDown, SortDropdown, Button } from "..";
import "./SortFilterWrapper.css";

function SortFilterWrapper() {
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
            <FilterDropDown />
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
            <SortDropdown />
          </div>
        )}
      </div>
    </div>
  );
}

export default SortFilterWrapper;
