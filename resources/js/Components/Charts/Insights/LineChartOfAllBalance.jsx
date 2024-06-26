import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const LineChartOfAllBalance = ({ datas }) => {
    const lineChartOfAllBalanceRef = useRef(null);
    const [chartImage, setChartImage] = useState(null);

    useEffect(() => {
        if (!datas || datas.length === 0) return;

        const aggregatedData = datas.reduce((accumulator, current) => {
            const date = new Date(current.time);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            const amount = current.type.type_name === "Expense" ? -current.amount : current.amount;
            accumulator[formattedDate] = (accumulator[formattedDate] || 0) + amount;
            return accumulator;
        }, {});

        const labels = Object.keys(aggregatedData);
        let cumulativeBalance = 0;
        const cumulativeBalances = labels.map((date) => {
            cumulativeBalance += aggregatedData[date];
            return cumulativeBalance;
        });

        const ctx = lineChartOfAllBalanceRef.current.getContext("2d");

        const lineChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Cumulative Balance",
                        data: cumulativeBalances,
                        borderColor: "rgba(75, 192, 192, 1)",
                        tension: 0.1,
                    },
                ],
            },
            options: {
                animation: {
                    onComplete: () => {
                        // Ensure the chartImage state is updated in a functional update to capture current chart state
                        setChartImage(lineChart.toBase64Image()); // Correctly call toBase64Image on the chart instance
                    },
                },
            },
        });

        return () => {
            lineChart.destroy();
        };
    }, [datas]);

    return (
        <>
            <canvas ref={lineChartOfAllBalanceRef} />
            {chartImage && (
                <img
                    src={chartImage}
                    alt="Chart preview"
                    style={{ width: "100%", height: "auto" }}
                />
            )}
        </>
    );
};

export default LineChartOfAllBalance;
