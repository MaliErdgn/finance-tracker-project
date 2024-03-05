import React, { useRef, useEffect } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

const Insights = () => {
    const lineChartRef = useRef();
    const doughnutChartRef = useRef();
    const doughnutChartInstance = useRef(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get("/api/balance");
                if (mounted) {
                    const timeSortedData = response.data.sort((a, b) => new Date(a.time) - new Date(b.time))
                    createCharts(timeSortedData);
                }
            } catch (error) {
                console.error("Data gelmedi", error);
            }
        };

        fetchData();

        return () => {
            mounted = false;
            if (doughnutChartInstance.current) {
                doughnutChartInstance.current.destroy();
            }
        };
    }, []);

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const createCharts = (data) => {
        createLineChart(data);
        createDoughnutChart(data);
    };

    const createLineChart = (data) => {
        const groupedData = groupDataByDay(data);
        const dailyBalances = calculateDailyBalances(groupedData);
        const labels = Object.keys(dailyBalances);

        const ctx = lineChartRef.current?.getContext("2d");
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
                    fill: true,
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

    const calculateDailyBalances = (groupedData) => {
        const dailyBalances = {};
        let totalBalance = 0;

        Object.keys(groupedData).forEach((day) => {
            const dayData = groupedData[day];
            dayData.forEach((item) => {
                totalBalance += (item.type.type_name === "Income") ? parseFloat(item.amount) : -parseFloat(item.amount);
            });
            dailyBalances[day] = totalBalance;
        });

        return dailyBalances;
    };

    const createDoughnutChart = (data) => {
        const expenseData = data.filter(item => item.type.type_name === "Expense");
        const categories = Array.from(new Set(expenseData.map(item => item.tag.category.category_name)));
        const amounts = categories.map(category =>
            expenseData.filter(item => item.tag.category.category_name === category)
                .reduce((total, item) => total + parseFloat(item.amount), 0)
        );

        const doughnutCtx = doughnutChartRef.current?.getContext("2d");

        if (doughnutChartInstance.current) {
            doughnutChartInstance.current.destroy();
        }

        doughnutChartInstance.current = new Chart(doughnutCtx, {
            type: "doughnut",
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
                    borderWidth: 1,
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

    return (
        <div className="w-100">
            <div className="mx-auto chart-container mb-5 mt-3" style={{ width: "1000px", height: "250px" }}>
                <h2 className="text-center mb-3">Daily Balance Chart</h2>
                <canvas ref={lineChartRef} id="lineChartCanvas" width="400" height="100" aria-label="Balance Chart" role="img"></canvas>
            </div>
            <div className="mx-auto chart-container" style={{ width: '400px', height: '400px', marginTop: '20px' }}>
                <h2 className="text-center mb-3">Expense Doughnut Chart</h2>
                <canvas ref={doughnutChartRef} id="doughnutCanvas" aria-label="Expense Doughnut Chart" role="img"></canvas>
            </div>
        </div>
    );
};

export default Insights;
