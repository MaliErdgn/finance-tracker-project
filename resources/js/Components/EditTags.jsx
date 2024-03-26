import React from "react";
import Form from "react-bootstrap/Form"
import { useState } from "react";
import SelectForm from "./SelectForm";
import InputForm from "./InputForm";
import Button from "react-bootstrap/Button"
import { useEffect } from "react";
import axios from "axios"

const EditTags = ({id, data, categories}) => {
    const [formData, setFormData] = useState({
        tag_name: "",
        category_id: "",
    });

    useEffect(() => {
        if (data && data.length > 0) {
            const initialData = data[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                tag_name: initialData.tag_name,
                category_id: initialData.category_id
            }))
        }
    },[data])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting: ", formData);
            const response = await axios.put(`/api/update-tag/${id}`, formData);
            console.log("update Successfull: ", response.data)
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputForm
                label="New Tag Name"
                type="text"
                name="tag_name"
                value={formData.tag_name}
                onChange={handleInputChange}
                required={true}
                />
                <SelectForm
                label="New Category"
                type="select"
                name="category_id"
                onChange={handleInputChange}
                options={categories}
                optionKey="id"
                value={formData.category_id}
                optionValue="category_name"
                required={true}
                />
                <button type="submit">Update Tag</button>
            </form>
        </div>
    )
};

export default EditTags;
