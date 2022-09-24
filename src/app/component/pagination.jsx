import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    // const pages = [];
    // for (let i = 1; i <= pageCount; i++) {       //-----РЕАЛИЗАЦИЯ БЕЗ БИБЛИОТЕКИ "lodash"------
    //     pages.push(i);
    // };
    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={`page-item ${currentPage === page ? "active" : ""}`}
                        key={`page_${page}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
