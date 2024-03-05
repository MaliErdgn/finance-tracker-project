import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table } from 'react-bootstrap';
import Chart from 'chart.js/auto';

const Balance = () => {
    const [data, setData] = useState([]);
    const [totalIncome, setTotalIncome] = useState();
    const [totalExpense, setTotalExpense] = useState();
    const [totalBalance, setTotalBalance] = useState();


    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get("/api/balance");
                if (mounted) {
                    const timeSortedData = response.data.sort((a, b) => new Date(a.time) - new Date(b.time))
                    setData(timeSortedData);
                    calculateTotals(timeSortedData);
                    createChart(timeSortedData);
                }
            } catch (error) {
                console.error("Data gelmedi", error);
            }
        };

        fetchData();

        return () => {
            mounted = false; // Prevent state update after unmount

            // Destroy the pie chart instance when the component unmounts
            if (pieChartInstance.current) {
                pieChartInstance.current.destroy();
            }
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


    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className={`table-row ${item.type.type_name === "Income" ? "table-success" : "table-danger"}`}>
                            <td>{item.type.type_name}</td>
                            <td>{item.amount}</td>
                            <td>{formatDate(item.time)}</td>
                            <td>{item.tag.tag_name}</td>
                            <td>{item.tag.category.category_name}</td>
                            <td>{item.method.method_name}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="totals mt-3">
                <h2>Total Income: {totalIncome !== undefined ? totalIncome.toFixed(2) : 'Loading...'}</h2>
                <h2>Total Expense: {totalExpense !== undefined ? totalExpense.toFixed(2) : 'Loading...'}</h2>
                <h2>Total Balance: {totalBalance !== undefined ? totalBalance.toFixed(2) : 'Loading...'}</h2>
            </div>



        </div>
);
};

export default Balance;
