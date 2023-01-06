import React from "react";
import { PaginationProps } from "../types";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
}: PaginationProps) => {
  const pageN = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageN.push(i);
  }

  return (
    <nav className="paginationNav">
      <ul>
        {pageN?.map((num: number) => (
          <li key={num} className="paginationNav__item">
            <button
              onClick={() => paginate(num)}
              className="paginationNav__link"
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;