import React from "react";
import Form from "react-bootstrap/Form"
import { useState } from "react";
import SelectForm from "./SelectForm";
import InputForm from "./InputForm";
import Button from "react-bootstrap/Button"
import { useEffect } from "react";

const EditTags = (id, data, categories) => {
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
    })

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
            const response = await Axios.put(`/api/update-tag/${id}`, formData);
            console.log("update Successfull: ", response.data)
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Form onSubmit={handleSubmit}>

            </Form>
        </div>
    )
};

export default EditTags;
