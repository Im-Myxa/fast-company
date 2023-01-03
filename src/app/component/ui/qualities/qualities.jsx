import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const Qualities = ({ qualities }) => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getQualitiesLoadingStatus());

    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return "Loading ...";
    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
