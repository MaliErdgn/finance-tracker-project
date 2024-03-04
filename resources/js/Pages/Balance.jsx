import React, { useEffect, useState } from "react";
import axios from "axios";
import "../bootstrap.js";

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
            setData(response.data);
            calculateTotals(response.data)
        }
        } catch (error) {
            console.error("Data gelmedi", error);
        }
    };

    fetchData();

    return () => {
      mounted = false; // Prevent state update after unmount
    };
}, [data]);

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
        const options ={ day:"2-digit", month:"2-digit", year:"numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div>
            <table className="table">
                <thead>
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
                        <tr key={item.id} className={item.type.type_name === "Income" ? "table-success" : "table-danger"}>
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
            </table>
            <div>
                <h2>Total Income: {totalIncome !== undefined ? totalIncome.toFixed(2) : 'Loading...'}</h2>
                <h2>Total Expense: {totalExpense !== undefined ? totalExpense.toFixed(2) : 'Loading...'}</h2>
                <h2>Total Balance: {totalBalance !== undefined ? totalBalance.toFixed(2) : 'Loading...'}</h2>
            </div>
        </div>
);
};

export default Balance;
