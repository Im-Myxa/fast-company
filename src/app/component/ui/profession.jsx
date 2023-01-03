import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessionsLoadingStatus,
    getProfessionsByIds,
    loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const profession = useSelector(getProfessionsByIds(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    if (isLoading) return "Loading ...";
    return <p>{profession.name}</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
