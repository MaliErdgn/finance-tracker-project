import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table, Button, Toast, ToastContainer } from "react-bootstrap";
import Chart from "chart.js/auto";
import EditExpenseIncome from "@/Components/EditExpenseIncome";
const Balance = () => {
    const [data, setData] = useState([]);
    const [totalIncome, setTotalIncome] = useState();
    const [totalExpense, setTotalExpense] = useState();
    const [totalBalance, setTotalBalance] = useState();
    const [selectedBalanceId, setSelectedBalanceId] = useState();
    const [editedData, setEditedData] = useState({ ...data });
    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const [types, setTypes] = useState([]);
    const [methods, setMethods] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedData, setSelectedData] = useState();

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

    // useEffect(() => {
    //     console.log(selectedData)
    // }, [selectedBalanceId, data]);

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
    return (
        <div>
            <Table bordered hover variant="primary">
                <thead className="bg-primary text-light">
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Time</th>
                        <th scope="col">Tag Name</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Method</th>
                        <th scope="col">Description</th>
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
