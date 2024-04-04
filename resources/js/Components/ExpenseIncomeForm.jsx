import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputForm from "../Components/InputForm.jsx";
import SelectForm from "../Components/SelectForm.jsx";
import Button from "react-bootstrap/Button";

const ExpenseIncomeForm = ({
    categories,
    allTags,
    filteredTags,
    setFilteredTags,
    types,
    methods,
    formData,
    setFormData,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "category") {
            const filteredTags = allTags.filter(
                (tag) => tag.category_id === parseInt(value, 10)
            );
            setFilteredTags(filteredTags);
        }
    };

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();

        try {
            console.log("Submitting data:", formData);
            const response = await axios.post(
                "/api/submit-income-expense",
                formData
            );

            setFormData({
                type_id: "",
                amount: "",
                time: "",
                description: "",
                category: "",
                tag_id: "",
                method_id: "",
            });
            setIsSubmitting(false);

            console.log("Data submitted successfully:", response.data);
        } catch (error) {
            console.error("Data submit unsuccessful", error);
            setIsSubmitting(false);
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
                    disabled={isSubmitting}
                    variant="primary"
                    className={`mt-3 text-slate-950`}
                    type="submit"
                    style={{ cursor: isSubmitting ? "progress" : "", pointerEvents: "auto" }}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ExpenseIncomeForm;
