import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";

const Qualities = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Quality {...qual} key={qual._id} />
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
