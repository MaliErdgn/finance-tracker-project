import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table, Button, Toast, ToastContainer } from "react-bootstrap";
import EditExpenseIncome from "@/Components/EditExpenseIncome";
import _ from "lodash";
import ReactTable from "@/Components/ReactTable/ReactTable";

const Balance = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [methods, setMethods] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleCategoryChange = (selectedCategoryId) => {
        setSelectedCategoryId(selectedCategoryId);
    };

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const [
                    categoriesResponse,
                    tagsResponse,
                    typesResponse,
                    methodsResponse,
                    dataResponse,
                ] = await Promise.all([
                    axios.get("/api/categories"),
                    axios.get("/api/tags"),
                    axios.get("/api/types"),
                    axios.get("/api/methods"),
                    axios.get("/api/balance"),
                ]);

                setCategories(categoriesResponse.data);
                setAllTags(tagsResponse.data);
                setTypes(typesResponse.data);
                setMethods(methodsResponse.data);
                setData(dataResponse.data);
                if (mounted) {
                    const timeSortedData = dataResponse.data.sort(
                        (a, b) => new Date(a.time) - new Date(b.time)
                    );
                    setData(timeSortedData);
                }
            } catch (error) {
                console.error("Data gelmedi", error);
            }
        };

        fetchData();

        return () => {
            mounted = false; // Prevent state update after unmount
        };
    }, []);
    return (
        <div>
            {data ? (
                <ReactTable
                    data={data}
                    categories={categories}
                    allTags={allTags}
                    types={types}
                    methods={methods}
                    handleCategoryChange={handleCategoryChange}
                    selectedCategoryId={selectedCategoryId}
                ></ReactTable>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Balance;
