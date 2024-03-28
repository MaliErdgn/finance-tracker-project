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
import { reduce } from "lodash";

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
        setShowModal(id); //Open up the modal to show the form
    };

    const handleDelete = async (id) => {
        setSelectedData(tags.filter((item) => item.id === id));
        console.log("Deleting Tag: ", selectedData);
        try {
            await axios.delete(`/api/delete-tag/${selectedData[0].id}`); //send a request to delete the tag
            console.log("Data Deleted Successfully");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="relative">
                <Form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="w-4/5 mx-auto mt-3"
                >
                    <div className="flex gap-10 justify-between ">
                        <div className="w-6/12">
                            <InputForm
                                label="Tag Name"
                                type="text"
                                name="tag_name"
                                value={formData.tag_name}
                                onChange={handleInputChange}
                                required={true}
                            />
                        </div>
                        <div className="w-6/12">
                            <SelectForm
                                label="Category"
                                type="select"
                                name="category_id"
                                onChange={handleInputChange}
                                className=""
                                options={categories}
                                optionKey="id"
                                optionValue="category_name"
                                required={true}
                            />
                        </div>
                    </div>
                        <Button
                            variant="primary"
                            className="mt-3 border-2"
                            style={{ color: "var(--chakra-colors-whiteAlpha-800)" }}
                            _hover={{
                                color: "var(--chakra-colors-whiteAlpha-900) !important",
                                borderColor: "blue.500",
                            }}
                            type="submit"
                        >
                            Submit
                        </Button>
                </Form>
                <div className="w-4/5 mx-auto">
                    {categories.map((category) => (
                        <Table
                            variant="primary"
                            className="mt-5 border-2"
                            key={category.id}
                        >
                            <thead className="bg-primary text-light">
                                <tr>
                                    <th
                                        scope="col"
                                        className="w-1/2 border-r-2 text-center"
                                    >
                                        {category.category_name}
                                    </th>
                                    <th
                                        scope="col"
                                        className="w-1/2 text-center"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags
                                    .filter(
                                        (tag) => tag.category_id === category.id
                                    )
                                    .map((tag) => (
                                        <tr
                                            className="table-row border-b-2"
                                            key={tag.id}
                                        >
                                            <td className="border-r-2 items-center text-center">
                                                {tag.tag_name}
                                            </td>
                                            <td className="items-center text-center py-2">
                                                <EditButton
                                                    handleEdit={() =>
                                                        handleEdit(tag.id)
                                                    }
                                                    classNames="mr-3"
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
                </div>
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
