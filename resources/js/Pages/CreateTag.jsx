import React, { useState } from "react";
import { Form, Button, Table, ToastContainer, Toast } from "react-bootstrap";
import InputForm from "@/Components/InputForm";
import SelectForm from "@/Components/SelectForm";
import { Axios } from "axios";
import { useEffect } from "react";
import EditTags from "@/Components/EditTags";
import { useRef } from "react";

const CreateTag = () => {
    const [formData, setFormData] = useState({
        tag_name: "",
        category_id: "",
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedTagId, setSelectedTagId] = useState();
    const [selectedData, setSelectedData] = useState();
    const toastRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, tagsResponse] = await Promise.all([
                    axios.get("/api/categories"),
                    axios.get("/api/tags"),
                ]);
                setCategories(categoriesResponse.data);
                setTags(tagsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting: ", formData);
            const response = await axios.post("/api/create-tag", formData);
            setFormData({
                tag_name: "",
                category_id: "",
            });
            console.log("Data Submitted successfully: ", response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id) => {
        setIsUpdating(true);
        setSelectedTagId(id);
        setSelectedData(tags.filter((item) => item.id === id));
        const innerContent = toastRef.current.querySelector("#toast-container");
        if (innerContent) {
            console.log("Scrolling to inner content:", innerContent);
            innerContent.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        } else {
            console.log("Inner content not found or not ready:", innerContent);
        }
    };



    const handleDelete = async (id) => {
        console.log("Delete Tag id: ", id);
    };

    return (
        <>
            <div className="relative">
                {isUpdating && (
                    <div className="fixed inset-0 bg-gray-700 opacity-50 z-50" onClick={() => setIsUpdating(false)}></div>
                )}
                <Form onSubmit={handleSubmit} method="POST">
                    <InputForm
                        label="Tag Name"
                        type="text"
                        name="tag_name"
                        value={formData.tag_name}
                        onChange={handleInputChange}
                        required={true}
                    />
                    <SelectForm
                        label="Category"
                        type="select"
                        name="category_id"
                        onChange={handleInputChange}
                        options={categories}
                        optionKey="id"
                        optionValue="category_name"
                        required={true}
                    />
                    <Button
                        variant="primary"
                        className="mt-3 text-slate-950"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
                {categories.map((category) => (
                    <Table
                        bordered
                        hover
                        variant="primary"
                        className="mt-5"
                        key={category.id}
                        style={{ borderColor: "var(--bs-secondary)" }}
                    >
                        <thead className="bg-primary text-light">
                            <tr>
                                <th scope="col">{category.category_name}</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags
                                .filter(
                                    (tag) => tag.category_id === category.id
                                )
                                .map((tag) => (
                                    <tr className="table-row" key={tag.id}>
                                        <td
                                            style={{
                                                background:
                                                    "var(--bs-secondary)",
                                            }}
                                        >
                                            {tag.tag_name}
                                        </td>
                                        <td>
                                            {" "}
                                            <Button
                                                type="button"
                                                variant="info"
                                                className="mr-3 bg-info"
                                                onClick={() =>
                                                    handleEdit(tag.id)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            {/* <Button
                                                type="button"
                                                variant="danger"
                                                className="bg-danger"
                                                onClick={() =>
                                                    handleDelete(tag.id)
                                                }
                                            >
                                                Delete
                                            </Button> */}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                ))}
                <div ref={toastRef}>
                    <ToastContainer position="middle-center" id="toast-container">
                        <Toast
                            bg="primary"
                            show={isUpdating}
                            onClose={() => setIsUpdating(false)}
                        >
                            <Toast.Header closeLabel="Cancel" closeButton={false}>
                                <strong>Edit Data </strong>
                                <Button
                                    type="button"
                                    variant="primary"
                                    className="ml-auto text-slate-950"
                                    onClick={() => setIsUpdating(false)}
                                >
                                    Close
                                </Button>
                            </Toast.Header>
                            <Toast.Body className="d-flex justify-content-center align-items-center">
                                <EditTags
                                    id={selectedTagId}
                                    data={selectedData}
                                    categories={categories}
                                />
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>
            </div>
        </>
    );
};

export default CreateTag;
