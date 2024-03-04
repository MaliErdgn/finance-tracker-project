import React, { useEffect, useState } from "react";
import axios from "axios";
import "../bootstrap.js";

const Balance = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/balance");
        if (mounted) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Data gelmedi", error);
      }
    };

    fetchData();

    return () => {
      mounted = false; // Prevent state update after unmount
    };
  }, []);

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
                            <td>{item.time}</td>
                            <td>{item.tag.tag_name}</td>
                            <td>{item.tag.category.category_name}</td>
                            <td>{item.method.method_name}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default Balance;
