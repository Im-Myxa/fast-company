import React from "react";
import PropTypes from "prop-types";

import { renderPhrase } from "../../utils/handlePhrase";

const ShowStatus = ({ length }) => {
    return (
        <h2>
            <span
                className={`badge ${length > 0 ? "bg-primary" : "bg-danger"}`}
            >
                {length > 0
                    ? `${length} ${renderPhrase(length)} с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};

ShowStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default ShowStatus;
