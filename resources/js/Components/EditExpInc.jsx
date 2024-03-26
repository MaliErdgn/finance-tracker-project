import React, { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";

const EditExpInc = ({
    formData,
    types,
    categories,
    allTags,
    methods,
    onCancel,
}) => {
    const [editedFormData, setEditedFormData] = useState({ ...formData });

    const [showToast, setShowToast] = useState(false);
    const [filteredTags, setFilteredTags] = useState([]);

    useEffect(() => {
        if (editedFormData.tag.category) {
            const initialFilteredTags = allTags.filter(
                (tag) =>
                    tag.category_id === parseInt(editedFormData.tag.category.id)
            );
            setFilteredTags(initialFilteredTags);
        }
    }, [editedFormData.category_id, allTags]);

    console.log(editedFormData)
    useEffect(() => {
        // Update the editedFormData when the formData changes
        setEditedFormData((prevFormData) => ({ ...prevFormData, ...formData }));
        setEditedFormData((prevFormData) => ({...prevFormData, category: prevFormData.tag.category_id}))
    }, [formData]);
    console.log(editedFormData)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        // If the category changes, reset tag_id and filter tags accordingly
        if (name === "category") {
            const filteredTags = allTags.filter(
                (tag) => tag.category_id === parseInt(value)
            );
            setEditedFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
            setFilteredTags(filteredTags);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updating Data", editedFormData);
        // Send the updated data to the backend
        axios
            .put(`/api/update-data/${editedFormData.id}`, editedFormData)
            .then((response) => {
                console.log("Balance updated successfully", response.data);
                onCancel(); // Close the editing form after successful update
                setShowToast(false); // Hide the toast after update
                window.location.reload();
            })
            .catch((error) => console.error("Failed to update balance", error));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-3">
                <SelectForm
                    label="Type"
                    type="select"
                    name="type_id"
                    value={editedFormData.type_id}
                    onChange={handleInputChange}
                    options={types}
                    optionKey="id"
                    optionValue="type_name"
                    required={false}
                />
                <InputForm
                    type="number"
                    label="Amount"
                    name="amount"
                    value={editedFormData.amount}
                    onChange={handleInputChange}
                    required={false}
                />
                <InputForm
                    type="date"
                    label="Date"
                    name="time"
                    value={editedFormData.time}
                    onChange={handleInputChange}
                    required={false}
                />
                <InputForm
                    type="text"
                    label="Description"
                    name="description"
                    value={editedFormData.description}
                    onChange={handleInputChange}
                    required={false}
                />
                <SelectForm
                    label="Category"
                    type="select"
                    name="category"
                    value={editedFormData.category}
                    onChange={handleInputChange}
                    options={categories}
                    optionKey="id"
                    optionValue="category_name"
                    required={false}
                />
                <SelectForm
                    label="Tag"
                    type="select"
                    name="tag_id"
                    value={editedFormData.tag_id}
                    onChange={handleInputChange}
                    options={filteredTags || []}
                    optionKey="id"
                    optionValue="tag_name"
                    required={false}
                />
                <SelectForm
                    label="Method"
                    type="select"
                    name="method_id"
                    value={editedFormData.method_id}
                    onChange={handleInputChange}
                    options={methods}
                    optionKey="id"
                    optionValue="method_name"
                    required={false}
                />

                <button type="submit">Update Balance</button>
                <button type="button" onClick={() => setShowToast(false)}>
                    Cancel
                </button>
            </form>
        </>
    );
};

export default EditExpInc;
