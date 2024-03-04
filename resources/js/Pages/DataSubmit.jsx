import React, { useEffect, useState } from "react";
import axios from "axios";
import "../bootstrap.js";
import InputForm from "../Components/InputForm.jsx"
import SelectForm from "../Components/SelectForm.jsx"

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

    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch categories, tags, types concurrently
        const fetchData = async () => {
            try {
                const [categoriesResponse, tagsResponse, typesResponse, methodsResponse] = await Promise.all([
                    axios.get("/api/categories"),
                    axios.get("/api/tags"),
                    axios.get("/api/types"),
                    axios.get("/api/methods")
                ]);

                setCategories(categoriesResponse.data);
                setAllTags(tagsResponse.data);
                setTypes(typesResponse.data);
                setMethods(methodsResponse.data)

                setLoading(false); // Set loading to false once all data is fetched
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
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

    const fetchTags = (category_id) => {
        //fetch the tags on selected category
        axios.get(`/api/tags?category_id=${category_id}`)
        .then(response => {
            setTags(response.data);
        })
        .catch(error => {
            console.error("Error fetching tags:", error)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting data:", formData); // Log to check the data being sent
            const response = await axios.post("/api/submit-income-expense", formData);

            setFormData({   //Reset the form
                type_id: "",
                amount: "",
                time: "",
                description: "",
                category: "",
                tag_id: "",
                method_id: "",
            })
            console.log("Data submitted successfully:", response.data); // Log success message
        } catch (error) {
            console.error("Data submit unsuccesfull", error);
        }
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
            <h1>Expense Form</h1>
            <form onSubmit={handleSubmit}>
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
                required= {true}
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

                <button type="submit" className="btn btn-success text-slate-950">Submit</button>

            </form>
        </div>
    )

}

export default DataSubmit;
