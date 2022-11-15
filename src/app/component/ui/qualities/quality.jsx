import React from "react";
// import PropTypes from "prop-types";

const Quality = ({ ...qual }) => {
    return (
        <span className={`badge bg-${qual.color} m-1`} key={qual._id}>
            {qual.name}
        </span>
    );
};

// Quality.propTypes = {
//     color: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     _id: PropTypes.string.isRequired

// };

export default Quality;
