import React, { useEffect, useState } from "react";
import axios from "axios";
import DailySpendingEachDayOfWeek from "@/Components/Charts/Insights/DailySpendingEachDayOfWeek";
import DoughnutChartOfCategories from "@/Components/Charts/Insights/DoughnutChartOfCategories";
import LineChart from "@/Components/Charts/Insights/LineChartOfAllBalance";

const Insights = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/balance");
                setDatas(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Data gelmedi", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col columns-2">
            <div className="flex text-center justify-center ">
                <div className="size-5/12">
                    <LineChart datas={datas} />
                </div>
                <div className="size-2/5 self-center">
                    <p>
                        Track your financial journey from day one. This chart
                        shows how your total balance changes over time,
                        reflecting your income and expenses. It gives you a
                        clear view of your financial progress, focusing on
                        essential transactions and excluding miscellaneous
                        expenses.
                    </p>
                </div>
            </div>
            <div className="flex text-center justify-center">
                <div className="mt-20 size-5/12">
                    <div className="size-4/5">
                        <DoughnutChartOfCategories datas={datas} />
                    </div>
                </div>
                <div className="size-2/5 self-center">
                    <p>
                        See where your money goes at a glance. This chart breaks
                        down your spending into categories, highlighting where
                        most of your money is spent. It helps you understand
                        your spending habits and make informed decisions about
                        managing your expenses.
                    </p>
                </div>
            </div>
            <div className="flex text-center justify-center">
                <div className="mt-20 size-5/12">
                    <DailySpendingEachDayOfWeek datas={datas} />
                </div>
                <div className="size-2/5 self-center justify-center">
                    <p>
                        Discover your spending patterns throughout the week.
                        Each bar represents your expenses on different days,
                        helping you identify trends and adjust your budget
                        accordingly. It gives you insights into which days are
                        more costly for you, empowering you to manage your
                        finances more effectively.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Insights;
