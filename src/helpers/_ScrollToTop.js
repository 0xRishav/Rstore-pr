import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}

export default _ScrollToTop;
