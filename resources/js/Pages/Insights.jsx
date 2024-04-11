import React, { useEffect, useState } from "react";
import axios from "axios";
import DailySpendingEachDayOfWeek from "@/Components/Charts/Insights/DailySpendingEachDayOfWeek";
import DoughnutChartOfCategories from "@/Components/Charts/Insights/DoughnutChartOfCategories";
import LineChartOfAllBalance from "@/Components/Charts/Insights/LineChartOfAllBalance";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Insights = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/balance");
                setDatas(response.data);
            } catch (error) {
                console.error("Data gelmedi", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-col columns-2">
                <Row xs={1} md={2} className="g-4 w-full">
                    <Col>
                        <Card
                            style={{ width: "24rem" }}
                            bg="dark"
                            text="light"
                            border="primary"
                        >
                            <LineChartOfAllBalance datas={datas} />
                            <Card.Body>
                                <Card.Title>Chart Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            style={{ width: "24rem" }}
                            bg="dark"
                            text="light"
                            border="primary"
                        >
                            <DoughnutChartOfCategories datas={datas} />
                            <Card.Body>
                                <Card.Title>Chart Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            style={{ width: "24rem" }}
                            bg="dark"
                            text="light"
                            border="primary"
                        >
                            <DailySpendingEachDayOfWeek datas={datas} />
                            <Card.Body>
                                <Card.Title>Chart Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Add other cards here */}
                </Row>
            </div>
        </>
    );
};

export default Insights;
