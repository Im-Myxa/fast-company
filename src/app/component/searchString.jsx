import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ value, handleSearch }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className="w-100"
                value={value}
                onChange={handleSearch}
            />
        </div>
    );
};

SearchString.propTypes = {
    value: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired
};

export default SearchString;
