import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChartOfAllBalance = ({ datas }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!datas || datas.length === 0) return;

        // Aggregate spending data by date
        const aggregatedData = datas.reduce((accumulator, current) => {
            const date = new Date(current.time);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            const amount = current.type.type_name === 'Expense' ? -current.amount : current.amount; // Convert expense to negative value
            accumulator[formattedDate] = (accumulator[formattedDate] || 0) + amount;
            return accumulator;
        }, {});

        // Calculate cumulative balance
        const labels = Object.keys(aggregatedData);
        let cumulativeBalance = 0;
        const cumulativeBalances = labels.map(date => {
            cumulativeBalance += aggregatedData[date];
            return cumulativeBalance;
        });

        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cumulative Balance',
                    data: cumulativeBalances,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                }]
            },
            options: {
                // Add any chart options here
            }
        });
    }, [datas]);

    return <canvas ref={chartRef} />;
};

export default LineChartOfAllBalance;
