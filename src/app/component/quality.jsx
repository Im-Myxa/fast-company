import React from "react";
// import PropTypes from "prop-types";

const Quality = ({ ...item }) => {
    return (
        <span className={`badge bg-${item.color} m-1`} key={item._id}>
            {item.name}
        </span>
    );
};

// Quality.propTypes = {
//     color: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     _id: PropTypes.string.isRequired

// };

export default Quality;
