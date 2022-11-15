/* eslint-disable object-shorthand */
/* eslint-disable indent */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, onChange, name, options, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    // !Array.isArray(options) && typeof options === "object"
    //     ? Object.keys(options).map((optionName) => ({
    //           label: options[optionName].name,
    //           value: options[optionName]._id
    //       }))
    //     : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                className="basic-multi-select"
                classNamePrefix="select"
                options={optionsArray}
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    defaultValue: PropTypes.array
};

export default MultiSelectField;
