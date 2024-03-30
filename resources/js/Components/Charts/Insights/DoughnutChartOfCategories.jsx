// DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChartOfCategories = ({ datas }) => {
    // Filter out transactions with the category "Misc"
    const filteredData = datas
        .filter((data) => data.tag.category.category_name !== "Misc")
        .filter((data) => data.type.type_name === "Expense");

    // Aggregate spending data by category
    const aggregatedData = filteredData.reduce((accumulator, current) => {
        accumulator[current.tag.category.category_name] =
            (accumulator[current.tag.category.category_name] || 0) +
            current.amount;
        return accumulator;
    }, {});

    // Doughnut chart data
    const chartData = {
        labels: Object.keys(aggregatedData),
        datasets: [
            {
                data: Object.values(aggregatedData),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Doughnut chart options
    const chartOptions = {
        // Add any chart options here
    };

    return <Doughnut data={chartData} options={chartOptions} />;
};

export default DoughnutChartOfCategories;
