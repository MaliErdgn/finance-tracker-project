import React from "react";
import { Scatter } from "react-chartjs-2";

const Heatmap = ({ datas }) => {
    // Aggregate spending data by week
    const aggregatedData = datas.reduce((accumulator, current) => {
        const date = new Date(current.time);
        const week = getWeekNumber(date);
        accumulator[week] = (accumulator[week] || 0) + current.amount;
        return accumulator;
    }, {});

    // Convert aggregated data to format suitable for heatmap
    const heatmapData = Object.entries(aggregatedData).map(([week, amount]) => ({
        x: parseInt(week),
        y: amount, // Y-axis represents spending amount
        r: 10, // Set radius for each point
    }));

    // Colors
    const colorScale = [
        "#ffffcc",
        "#c2e699",
        "#78c679",
        "#31a354",
        "#006837",
    ];

    const chartData = {
        datasets: [
            {
                data: heatmapData,
                backgroundColor: colorScale, // Set background color for each point
            },
        ],
    };

    const chartOptions = {
        legend: { display: false },
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Week",
                    },
                    ticks: {
                        beginAtZero: true, // Start the X-axis from zero
                    },
                },
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Spending",
                    },
                },
            ],
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem) =>
                    `Spending: $${tooltipItem.yLabel}`, // Display spending amount on tooltip
            },
        },
    };

    return <Scatter data={chartData} options={chartOptions} />;
};

// Function to get the week number from a date
function getWeekNumber(date) {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
}

export default Heatmap;
