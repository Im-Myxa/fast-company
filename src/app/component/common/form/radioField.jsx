import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, value, onChange, name, options }) => {
    const handleChange = ({ target }) => {
        console.log(target);
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <div>
                <label className="form-label">{label}</label>
            </div>

            {options.map((option) => (
                <div
                    key={option.name + "_" + option.value}
                    className="form-check form-check-inline"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        id={option.name + "_" + option.value}
                        checked={option.value === value}
                        value={option.value}
                        onChange={handleChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={option.name + "_" + option.value}
                    >
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.array
};

export default RadioField;
