import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ qualities }) => {
    const { isLoading } = useQualities();

    if (isLoading) return "Loading ...";
    return (
        <>
            {qualities.map((qual) => (
                <Quality id={qual} key={qual} />
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
