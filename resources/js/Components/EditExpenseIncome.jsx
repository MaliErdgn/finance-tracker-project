import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputForm from "./InputForm.jsx";
import SelectForm from "./SelectForm.jsx";
import Button from "react-bootstrap/Button";

const EditExpenseIncome = ({
    id,
    data,
    types,
    categories,
    methods,
    allTags,
}) => {
    const [formData, setFormData] = useState({
        type_id: "",
        amount: "",
        time: "",
        description: "",
        category: "",
        tag_id: "",
        method_id: "",
    });

    const [filteredTags, setFilteredTags] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const initialData = data[0];

            setFormData((prevFormData) => ({
                ...prevFormData,
                type_id: initialData.type.id,
                amount: initialData.amount,
                time: initialData.time,
                description: initialData.description,
                category: initialData.tag.category_id,
                tag_id: initialData.tag.id,
                method_id: initialData.method.id,
            }));

            const initialCategoryId = initialData.tag.category_id;

            const filteredTags = allTags.filter(tag => tag.category_id === initialCategoryId);
            setFilteredTags(filteredTags);
        }
    }, [data, allTags]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/api/update-data/${id}`, formData);

            console.log("Data updated successfully:", response.data);

            window.location.reload()
        } catch (error) {
            console.error("Data update unsuccessful", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === "category") {
            const selectedCategoryId = parseInt(value, 10);
            setFormData((prevFormData) => ({
                ...prevFormData,
                category: selectedCategoryId,
            }));

            const filteredTags = allTags.filter(
                (tag) => tag.category_id === selectedCategoryId
            );
            setFilteredTags(filteredTags);
        }
    };

    return (
        <div>
            <Form
                onSubmit={handleSubmit}
                method="POST"
                className="w-50 mx-auto mt-3"
            >
                <SelectForm
                    label="Type"
                    type="select"
                    name="type_id"
                    value={formData.type_id}
                    onChange={handleInputChange}
                    options={types}
                    optionKey="id"
                    optionValue="type_name"
                    required={true}
                />

                <InputForm
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    classNames=""
                    required={true}
                />

                <InputForm
                    label="Time"
                    type="date"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    classNames=""
                    required={true}
                />

                <SelectForm
                    label="Category"
                    type="select"
                    name="category"
                    onChange={handleInputChange}
                    value={formData.category}
                    options={categories}
                    optionKey="id"
                    optionValue="category_name"
                    required={true}
                />

                <SelectForm
                    label="Tag"
                    type="select"
                    name="tag_id"
                    value={formData.tag_id}
                    onChange={handleInputChange}
                    options={filteredTags}
                    optionKey="id"
                    optionValue="tag_name"
                    required={true}
                />

                <SelectForm
                    label="Method"
                    type="select"
                    name="method_id"
                    classNames=""
                    value={formData.method_id}
                    onChange={handleInputChange}
                    options={methods}
                    optionKey="id"
                    optionValue="method_name"
                    required={true}
                />

                <InputForm
                    label="Description"
                    type="input"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    classNames=""
                    required={false}
                />

                <Button
                    variant="primary"
                    className="text-slate-950"
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default EditExpenseIncome;
