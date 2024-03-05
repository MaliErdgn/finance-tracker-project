import React, { useEffect, useState } from "react";
import axios from "axios";
import "../bootstrap.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputForm from "../Components/InputForm.jsx";
import SelectForm from "../Components/SelectForm.jsx";
import EditExpInc from "@/Components/EditExpInc.jsx";

const DataSubmit = () => {
    const [formData, setFormData] = useState({
        type_id: "",
        amount: "",
        time: "",
        description: "",
        category: "",
        tag_id: "",
        method_id: "",
    });

    const [data, setData] = useState([])
    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBalanceId, setSelectedBalanceId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, tagsResponse, typesResponse, methodsResponse, dataResponse] = await Promise.all([
                    axios.get("/api/categories"),
                    axios.get("/api/tags"),
                    axios.get("/api/types"),
                    axios.get("/api/methods"),
                    axios.get("/api/balance")
                ]);

                setCategories(categoriesResponse.data);
                setAllTags(tagsResponse.data);
                setTypes(typesResponse.data);
                setMethods(methodsResponse.data)
                setData(dataResponse.data)

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "category") {
            setSelectedCategory(value);
            const filteredTags = allTags.filter(tag => tag.category_id === parseInt(value, 10));
            setFilteredTags(filteredTags);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting data:", formData);
            const response = await axios.post("/api/submit-income-expense", formData);

            setFormData({
                type_id: "",
                amount: "",
                time: "",
                description: "",
                category: "",
                tag_id: "",
                method_id: "",
            });

            console.log("Data submitted successfully:", response.data);
        } catch (error) {
            console.error("Data submit unsuccessful", error);
        }
    };

    const handleEditData = (id) => {
        console.log("Editing balance with ID:", id);
        setSelectedBalanceId(id);
        // Additional logic if needed
    };


    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} method="POST" className="w-50 mx-auto mt-3">
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

                <Button variant="primary" className="text-slate-950" type="submit">
                    Submit
                </Button>
            </Form>

        {/* Display the list of balances for editing */}
        <ul>
            {data.map(data => (
                <li key={data.id}>
                    {data.amount} - {data.time}{' '}
                    <Button variant="link" onClick={() => handleEditData(data.id)}>
                        Edit
                    </Button>
                </li>
            ))}
        </ul>

        {selectedBalanceId && (
        <EditExpInc
            formData={data.find(item => item.id === selectedBalanceId)}
            categories={categories}
            filteredTags={allTags}
            methods={methods}
            onCancel={() => setSelectedBalanceId(null)}
        />
        )}



        </div>
    )
}

export default DataSubmit;
