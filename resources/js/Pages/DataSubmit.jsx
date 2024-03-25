import React, { useEffect, useState } from "react";
import ExpenseIncomeForm from "@/Components/ExpenseIncomeForm.jsx";

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
    const [filteredTags, setFilteredTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [methods, setMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    categoriesResponse,
                    tagsResponse,
                    typesResponse,
                    methodsResponse,
                ] = await Promise.all([
                    axios.get("/api/categories"),
                    axios.get("/api/tags"),
                    axios.get("/api/types"),
                    axios.get("/api/methods"),
                ]);

                setCategories(categoriesResponse.data);
                setAllTags(tagsResponse.data);
                setTypes(typesResponse.data);
                setMethods(methodsResponse.data);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            {" "}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ExpenseIncomeForm
                    categories={categories}
                    allTags={allTags}
                    filteredTags={filteredTags}
                    setFilteredTags={setFilteredTags}
                    types={types}
                    methods={methods}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
        </div>
    );
};

export default DataSubmit;
