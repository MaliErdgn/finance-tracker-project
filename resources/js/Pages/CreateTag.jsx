import React, { useState } from "react";
import { Form } from "react-bootstrap";
import InputForm from "@/Components/InputForm";
import SelectForm from "@/Components/SelectForm";
import { useEffect } from "react";
import EditButton from "@/Components/Buttons/EditButton/EditButton";
import DeleteButton from "@/Components/Buttons/DeleteButton/DeleteButton";
import {
    Table,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import EditTags from "@/Components/EditTags";

const CreateTag = () => {
    const [formData, setFormData] = useState({
        tag_name: "",
        category_id: "",
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTagId, setSelectedTagId] = useState();
    const [selectedData, setSelectedData] = useState();
    const [showModal, setShowModal] = useState(false);

    const handleCancelEdit = () => {
        setShowModal(false); // Hide the edit form when cancelling
    };

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
        setSelectedTagId(id);
        setSelectedData(tags.filter((item) => item.id === id)); //preload the form
        setShowModal(id) //Open up the modal to show the form
    };

    const handleDelete = async (id) => {
        setSelectedData(tags.filter((item) => item.id === id))
        console.log("Deleting Tag: ", selectedData);
        try {
            await axios.delete(`/api/delete-tag/${selectedData[0].id}`) //send a request to delete the tag
            console.log("Data Deleted Successfully")
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="relative">
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
                                            <EditButton
                                                handleEdit={() =>
                                                    handleEdit(tag.id)
                                                }
                                                className="mr-3"
                                            />
                                            <DeleteButton
                                                handleDelete={() =>
                                                    handleDelete(tag.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                ))}
                <Modal isOpen={showModal} onClose={handleCancelEdit}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Tag</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <EditTags
                                id={selectedTagId}
                                data={selectedData}
                                categories={categories}
                            />
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
};

export default CreateTag;
