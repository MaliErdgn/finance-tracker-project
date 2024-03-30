import React from "react";
import { Bar } from "react-chartjs-2";

const DailySpendingEachDayOfWeek = ({ datas }) => {
    const filteredData = datas
        .filter((data) => data.tag.category.category_name !== "Misc")
        .filter((data) => data.type.type_name === "Expense");

    // Check if filteredData is not empty and contains elements
    if (filteredData.length > 0) {
        // Find the earliest date among all entries in filteredData
        let earliestDate = new Date(filteredData[0].time);
        filteredData.forEach((data) => {
            const currentDate = new Date(data.time);
            if (currentDate < earliestDate) {
                earliestDate = currentDate;
            }
        });

        // Set the time of the earliestDate object to midnight
        earliestDate.setHours(0, 0, 0, 0);

        // Use earliestDate as the start date
        const startDate = earliestDate.getTime();

        // Initialize an array to store total spending and occurrence count for each day of the week
        const dayCounts = Array(7)
            .fill()
            .map(() => ({ total: 0, count: 0 }));

        // Aggregate spending data by day of the week
        filteredData.forEach((data) => {
            const date = new Date(data.time);
            const dayOfWeek = (date.getDay() + 6) % 7; // Adjusting to start from Monday
            dayCounts[dayOfWeek].total += data.amount;
            dayCounts[dayOfWeek].count++;
        });

        // Calculate average spending for each day of the week
        const averageSpending = dayCounts.map((day) => {
            if (day.count === 0) return 0; // If no expenses for the day, return 0
            const totalOccurrencesSinceStart = Math.ceil(
                (Date.now() - startDate) / (1000 * 60 * 60 * 24 * 7)
            );
            return day.total / totalOccurrencesSinceStart;
        });

        // Days of the week starting from Monday
        const daysOfWeek = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];

        // Chart data
        const chartData = {
            labels: daysOfWeek,
            datasets: [
                {
                    label: "Average Spending",
                    data: averageSpending,
                    backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color for bars
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        };

        // Chart options
        const chartOptions = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Average Spending",
                        },
                    },
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Day of the Week",
                        },
                    },
                ],
            },
        };

        return <Bar data={chartData} options={chartOptions} />;
    } else {
        console.log(
            "filteredData is empty or does not contain valid elements."
        );
        // Return null or a placeholder component if there is no data to display
        return null;
    }
};

export default DailySpendingEachDayOfWeek;
