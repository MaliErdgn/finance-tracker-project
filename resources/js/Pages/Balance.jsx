import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table } from 'react-bootstrap';
import Chart from 'chart.js/auto';

const Balance = () => {
    const [data, setData] = useState([]);
    const [totalIncome, setTotalIncome] = useState();
    const [totalExpense, setTotalExpense] = useState();
    const [totalBalance, setTotalBalance] = useState();
    const lineChartRef = useRef();
    const pieChartRef = useRef();
    const pieChartInstance = useRef(null);

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

    const createChart = (data) => {
        createLineChart(data);
        createPieChart(data);
    };

    const createLineChart = (data) => {
        // Group data by day
        const groupedData = groupDataByDay(data);

        // Calculate daily balances
        const dailyBalances = calculateDailyBalances(groupedData);

        const labels = Object.keys(dailyBalances);

        const ctx = lineChartRef.current.getContext("2d");
        if (lineChartRef.current.chart) {
            lineChartRef.current.chart.destroy();
        }

        lineChartRef.current.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Balance',
                    data: labels.map((day) => dailyBalances[day]),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    // Helper function to group data by day
    const groupDataByDay = (data) => {
        const groupedData = {};
        data.forEach((item) => {
            const day = formatDate(item.time);
            if (!groupedData[day]) {
                groupedData[day] = [];
            }
            groupedData[day].push(item);
        });
        return groupedData;
    };

    // Helper function to calculate daily balances
    const calculateDailyBalances = (groupedData) => {
        const dailyBalances = {};
        let totalBalance = 0;

        Object.keys(groupedData).forEach((day) => {
            const dayData = groupedData[day];
            dayData.forEach((item) => {
                if (item.type.type_name === "Income") {
                    totalBalance += parseFloat(item.amount);
                } else {
                    totalBalance -= parseFloat(item.amount);
                }
            });
            dailyBalances[day] = totalBalance;
        });

        return dailyBalances;
    };

    const createPieChart = (data) => {
        const expenseData = data.filter(item => item.type.type_name === "Expense");
        const categories = Array.from(new Set(expenseData.map(item => item.tag.category.category_name)));
        const amounts = categories.map(category =>
            expenseData.filter(item => item.tag.category.category_name === category)
                .reduce((total, item) => total + parseFloat(item.amount), 0)
        );

        const pieCtx = pieChartRef.current.getContext("2d");

        // If pieChartInstance already exists, destroy it before creating a new one
        if (pieChartInstance.current) {
            pieChartInstance.current.destroy();
        }

        // Create the pie chart
        pieChartInstance.current = new Chart(pieCtx, {
            type: "pie",
            data: {
                labels: categories,
                datasets: [{
                    data: amounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(370, 162, 85, 0.8)',
                        'rgba(120, 8, 235, 0.8)',
                    ],
                    borderColor: "rgba(255, 255, 255, 1)",
                    borderWidth: 1
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom',
                },
            }
        });
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
            <div className="chart-container" style={{ width: "1000px", height: "250px" }}>
                <canvas ref={lineChartRef} id="lineChartCanvas" width="400" height="100" aria-label="Balance Chart" role="img"></canvas>
            </div>
            <div className="chart-container" style={{ width: '400px', height: '400px' }}>
                <canvas ref={pieChartRef} id="pieCanvas" aria-label="Expense Pie Chart" role="img"></canvas>
            </div>


        </div>
);
};

export default Balance;
