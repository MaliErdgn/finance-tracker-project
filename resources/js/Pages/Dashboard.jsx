import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Toast,
    ToastContainer,
    Dropdown,
} from "react-bootstrap";
import Chart from "chart.js/auto";
import EditExpenseIncome from "@/Components/EditExpenseIncome";
import _ from "lodash";

const Balance = () => {
    const [data, setData] = useState([]);
    const [totalIncome, setTotalIncome] = useState();
    const [totalExpense, setTotalExpense] = useState();
    const [totalBalance, setTotalBalance] = useState();
    const [selectedBalanceId, setSelectedBalanceId] = useState();
    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [methods, setMethods] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedData, setSelectedData] = useState();
    const [sortBy, setSortBy] = useState("time");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortLabel, setSortLabel] = useState();
    const [sortConfig, setSortConfig] = useState({
        key: "time",
        direction: "asc",
    });

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
                    calculateTotals(timeSortedData);
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

    const calculateTotals = (data) => {
        let income = 0;
        let expense = 0;

        data.forEach((item) => {
            if (item.type.type_name === "Income") {
                income += parseFloat(item.amount);
            } else {
                expense += parseFloat(item.amount);
            }
        });

        setTotalIncome(income);
        setTotalExpense(expense);
        setTotalBalance(income - expense);
    };

    const handleEdit = (id) => {
        setIsUpdating(true);
        setSelectedBalanceId(id);
        setSelectedData(data.filter((item) => item.id === id));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this data?"
        );

        if (!confirmDelete) {
            return;
        }
        try {
            // Make an API call to delete the record with the given id
            await axios.delete(`/api/delete-data/${id}`);

            // Update the local state to remove the deleted item
            setData((prevData) => prevData.filter((item) => item.id !== id));

            // If you want to recalculate totals after deletion, you can call calculateTotals function
            calculateTotals(data);

            console.log(`Data with ID ${id} deleted successfully`);
        } catch (error) {
            console.error(`Error deleting data with ID ${id}:`, error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    //#region Sorting
    const sortData = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        const sortedData = _.orderBy(
            data,
            [sortConfig.key],
            [sortConfig.direction]
        );
        setData(sortedData);
    }, [sortConfig]);
    useEffect(() => {
        const labelMapping = {
            time: "Time",
            amount: "Amount",
            "tag.tag_name": "Tag",
            "tag.category.category_name": "Category",
            "type.type_name": "Type",
        };

        // Get the corresponding label for the current sort key
        setSortLabel(labelMapping[sortBy]);

        // This effect will run whenever sortOrder or sortBy changes
        const sortedData = [...data];

        sortedData.sort((a, b) => {
            const aValue = getNestedPropertyValue(a, sortBy);
            const bValue = getNestedPropertyValue(b, sortBy);

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortOrder === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else if (
                typeof aValue === "number" &&
                typeof bValue === "number"
            ) {
                return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
            } else {
                // Handle other data types or properties as needed
                return 0; // No change in order
            }
        });

        // Update the state with the sorted data
        setData(sortedData);
    }, [sortOrder, sortBy]);

    function getNestedPropertyValue(obj, path) {
        try {
            const keys = path.split(".");
            let nestedValue = { ...obj };

            for (const key of keys) {
                if (
                    nestedValue &&
                    typeof nestedValue === "object" &&
                    key in nestedValue
                ) {
                    nestedValue = nestedValue[key];
                } else {
                    nestedValue = undefined;
                    break;
                }
            }

            return nestedValue;
        } catch (error) {
            console.error("Error:", error);
            return undefined;
        }
    }

    //#endregion

    return (
        <div>
            <Table bordered hover variant="primary">
                <thead className="bg-primary text-light">
                    <tr>
                        <th
                            scope="col"
                            onClick={() => sortData("type.type_name")}
                            style={{
                                cursor: "pointer",
                                backgroundColor:
                                    sortConfig.key === "type.type_name"
                                        ? "#f8f9fa"
                                        : "",
                            }}
                        >
                            Type{" "}
                            {sortConfig.key === "type.type_name" &&
                                `(${sortConfig.direction})`}
                        </th>
                        <th
                            scope="col"
                            onClick={() => sortData("amount")}
                            style={{
                                cursor: "pointer",
                                backgroundColor:
                                    sortConfig.key === "amount"
                                        ? "#f8f9fa"
                                        : "",
                            }}
                        >
                            Amount{" "}
                            {sortConfig.key === "amount" &&
                                `(${sortConfig.direction})`}
                        </th>
                        <th
                            scope="col"
                            onClick={() => sortData("time")}
                            style={{
                                cursor: "pointer",
                                backgroundColor:
                                    sortConfig.key === "time" ? "#f8f9fa" : "",
                            }}
                        >
                            Time{" "}
                            {sortConfig.key === "time" &&
                                `(${sortConfig.direction})`}
                        </th>
                        <th
                            scope="col"
                            onClick={() => sortData("tag.tag_name")}
                            style={{
                                cursor: "pointer",
                                backgroundColor:
                                    sortConfig.key === "tag.tag_name"
                                        ? "#f8f9fa"
                                        : "",
                            }}
                        >
                            Tag Name{" "}
                            {sortConfig.key === "tag.tag_name" &&
                                `(${sortConfig.direction})`}
                        </th>
                        <th
                            scope="col"
                            onClick={() =>
                                sortData("tag.category.category_name")
                            }
                            style={{
                                cursor: "pointer",
                                backgroundColor:
                                    sortConfig.key ===
                                    "tag.category.category_name"
                                        ? "#f8f9fa"
                                        : "",
                            }}
                        >
                            Category Name{" "}
                            {sortConfig.key === "tag.category.category_name" &&
                                `(${sortConfig.direction})`}
                        </th>
                        <th
                            scope="col"
                            onClick={() => sortData("method.method_name")}
                            style={{
                                cursor: "pointer",
                                backgroundColor:
                                    sortConfig.key === "method.method_name"
                                        ? "#f8f9fa"
                                        : "",
                            }}
                        >
                            Method{" "}
                            {sortConfig.key === "method.method_name" &&
                                `(${sortConfig.direction})`}
                        </th>
                        <th
                            scope="col"
                            onClick={() => sortData("description")}
                            style={{
                                cursor: "pointer",
                                backgroundColor:
                                    sortConfig.key === "description"
                                        ? "#f8f9fa"
                                        : "",
                            }}
                        >
                            Description{" "}
                            {sortConfig.key === "description" &&
                                `(${sortConfig.direction})`}
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className={`table-row ${
                                item.type.type_name === "Income"
                                    ? "table-success"
                                    : "table-danger"
                            }`}
                        >
                            <td>{item.type.type_name}</td>
                            <td>{item.amount}</td>
                            <td>{formatDate(item.time)}</td>
                            <td>{item.tag.tag_name}</td>
                            <td>{item.tag.category.category_name}</td>
                            <td>{item.method.method_name}</td>
                            <td>{item.description}</td>
                            <td>
                                <Button
                                    type="button"
                                    variant="info"
                                    className="mr-3 bg-info"
                                    onClick={() => handleEdit(item.id)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    type="button"
                                    variant="danger"
                                    className="bg-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer position="middle-center">
                <Toast
                    bg="primary"
                    show={isUpdating}
                    onClose={() => setIsUpdating(false)}
                >
                    <Toast.Header closeLabel="Cancel" closeButton={false}>
                        <strong>
                            Edit Data{" "}
                            {data.filter((item) => item === selectedBalanceId)}
                        </strong>
                        <Button
                            type="button"
                            variant="primary"
                            className="ml-auto text-slate-950"
                            onClick={() => setIsUpdating(false)}
                        >
                            Close
                        </Button>
                    </Toast.Header>
                    <Toast.Body className="d-flex justify-content-center align-items-center">
                        <EditExpenseIncome
                            id={selectedBalanceId}
                            data={selectedData}
                            types={types}
                            categories={categories}
                            methods={methods}
                            allTags={allTags}
                        />
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="totals mt-3">
                <h2>
                    Total Income:{" "}
                    {totalIncome !== undefined
                        ? totalIncome.toFixed(2)
                        : "Loading..."}
                </h2>
                <h2>
                    Total Expense:{" "}
                    {totalExpense !== undefined
                        ? totalExpense.toFixed(2)
                        : "Loading..."}
                </h2>
                <h2>
                    Total Balance:{" "}
                    {totalBalance !== undefined
                        ? totalBalance.toFixed(2)
                        : "Loading..."}
                </h2>
            </div>
        </div>
    );
};

export default Balance;
