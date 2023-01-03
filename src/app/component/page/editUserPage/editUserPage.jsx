import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/table/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";

const EditUserPage = ({ userId }) => {
    const { currentUser, updateUserData } = useAuth();
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    function getQualitiesById(elements) {
        const qualitiesArray = [];
        if (elements) {
            for (const elem of elements) {
                for (const quality of qualities) {
                    if (quality._id === elem) {
                        qualitiesArray.push(quality);
                        break;
                    }
                }
            }
        }
        return qualitiesArray;
    }

    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));

    const qualitiesList = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id
    }));
    function transformData(data) {
        const result = getQualitiesById(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
    }

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректоно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            isName: {
                message: "Имя введено некорректоно"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        const updatedUser = {
            ...data,
            qualities: qualities.map((q) => q.value)
        };
        await updateUserData(updatedUser);
        history.push(`/users/${userId}`);
    };

    if (!isLoading) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    options={professionsList}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        {
                                            name: "Female",
                                            value: "female"
                                        },
                                        {
                                            name: "Other",
                                            value: "other"
                                        }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выбери свой пол"
                                />
                                <MultiSelectField
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    label="Выбери свои качества"
                                    name="qualities"
                                    defaultValue={data.qualities}
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return "Loading...";
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
