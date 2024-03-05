import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

const EditExpInc = ({ formData, categories, allTags, methods, onCancel }) => {
    const [editedFormData, setEditedFormData] = useState({ ...formData });
    console.log("EditExpInc props:", { formData, categories, allTags, methods, onCancel });


    useEffect(() => {
        // Update the editedFormData when the formData changes
        setEditedFormData(prevFormData => ({ ...prevFormData, ...formData }));
    }, [formData]);

    const handleInputChange = (e) => {
        setEditedFormData({ ...editedFormData, [e.target.name]: e.target.value });
        if (name === "category") {
            setSelectedCategory(value);
            const filteredTags = allTags.filter(tag => tag.category_id === parseInt(value, 10));
            setFilteredTags(filteredTags);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the updated data to the backend
        axios.patch(`/api/update-balance/${editedFormData.id}`, editedFormData)
            .then(response => {
                console.log('Balance updated successfully', response.data);
                onCancel(); // Close the editing form after successful update
            })
            .catch(error => console.error('Failed to update balance', error));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
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
                onChange={handleInputChange}
                options={categories}
                optionKey="id"
                optionValue="category_name"
                required={true}
            />
            <SelectForm
                label="Tag"
                type="select"
                name="tag_id"
                value={editedFormData.tag_id}
                onChange={handleInputChange}
                options={allTags}
                optionKey="id"
                optionValue="tag_name"
                required={true}
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
                required={true}
            />

            <button type="submit">Update Balance</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditExpInc;
