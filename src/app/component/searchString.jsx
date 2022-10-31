import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ handleSearch }) => {
    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                className="w-100"
                onChange={handleSearch}
            />
        </form>
    );
};

SearchString.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchString;
