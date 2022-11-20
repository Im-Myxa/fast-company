import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import API from "../../../api";
import { validator } from "../../../utils/validator";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message:
                    "Выберите от чьего имени вы хотите оставить комментарий"
            }
        },
        content: {
            isRequired: { message: "Сообщение не может быть пустым" }
        }
    };

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    // useEffect(() => {
    //     validate();
    // }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // const isValid = Object.keys(errors).length === 0;

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    options={arrayOfUsers}
                    error={errors.userId}
                    name="userId"
                />
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
