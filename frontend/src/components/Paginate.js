import React from "react";
import { Link } from "react-router-dom";

import "./Paginate.scss";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="pagination">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/products/search/${keyword}/page/${x + 1}`
                  : `/products/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            {x + 1}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
