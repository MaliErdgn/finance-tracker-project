import React from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
} from "@tanstack/react-table";
import DescriptionCell from "./Cells/DescriptionCell";
import { useState } from "react";
import AmountCell from "./Cells/AmountCell";
import TypeCell from "./Cells/TypeCell";
import TimeCell from "./Cells/TimeCell";
import TagNameCell from "./Cells/TagNameCell";
import CategoryNameCell from "./Cells/CategoryNameCell";
import MethodCell from "./Cells/MethodCell";
import EditExpInc from "../EditExpInc";
import EditButton from "../Buttons/EditButton/EditButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import { css } from "@emotion/react";

const ReactTable = ({
    data,
    categories,
    allTags,
    types,
    methods,
    handleCategoryChange,
    selectedCategoryId,
}) => {
    const [formData, setFormData] = useState({
        type_id: "",
        amount: "",
        time: "",
        description: "",
        category: "",
        tag_id: "",
        method_id: "",
    });
    const [sorting, setSorting] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editableRow, setEditableRow] = useState(null);

    const toggleEditMode = (rowId) => {
        setEditableRow(rowId);
        setShowModal(true); // Show the edit form when toggling edit mode
    };

    const handleCancelEdit = () => {
        setEditableRow(null);
        setShowModal(false); // Hide the edit form when cancelling
    };

    const handleSubmit = (rowId) => {
        setEditableRow(null);
    };

    const handleDiscard = () => {
        setEditableRow(null);
    };

    const handleDelete = async (rowId) => {
        try {
            await axios.delete(`/api/delete-data/${data[rowId].id}`); //delete the corresponding data from the database
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDataChange = (rowId, newValue) => {
        console.log("ID: ", rowId);
        console.log("Value: ", newValue);
    };
    const columns = [
        {
            accessorKey: "type.type_name",
            header: "Type",
            cell: ({ getValue, row }) => (
                <TypeCell
                    initialValue={data[row.id].type.type_name}
                    formData={formData}
                    setFormData={setFormData}
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                    types={types}
                />
            ),
        },
        {
            accessorKey: "amount",
            header: "Amount",
            size: 100,
            cell: ({ getValue, row }) => (
                <AmountCell
                    initialValue={data[row.id].amount}
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                />
            ),
        },
        {
            accessorKey: "time",
            header: "Time",
            cell: ({ getValue, row }) => (
                <TimeCell //TODO: No editing fucntionality.
                    initialValue={data[row.id].time}
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                />
            ),
        },
        {
            accessorKey: "tag.category.category_name",
            header: "Category Name",
            cell: ({ getValue, row }) => (
                <CategoryNameCell
                    initialValue={data[row.id].tag.category.category_name} //whats causing the problem
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                    categories={categories}
                    onSelectCategory={handleCategoryChange}
                />
            ),
        },
        {
            accessorKey: "tag.tag_name",
            header: "Tag Name",
            cell: ({ getValue, row }) => (
                <TagNameCell
                    initialValue={data[row.id].tag.tag_name}
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                    allTags={allTags}
                    selectedCategoryId={selectedCategoryId}
                />
            ),
        },
        {
            accessorKey: "method.method_name",
            header: "Method",
            cell: ({ getValue, row }) => (
                <MethodCell
                    initialValue={data[row.id].method.method_name}
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                    methods={methods}
                />
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ getValue, row }) => (
                <DescriptionCell
                    initialValue={data[row.id].description}
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                />
            ),
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <EditButton
                        handleEdit={() => toggleEditMode(row.id)}
                        classNames=""
                    />

                    <DeleteButton handleDelete={() => handleDelete(row.id)} />
                </div>
            ),
        },
    ];
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });
    const getRowBgColor = (rowData) => {
        //Make the background of the row red or green depending on the type of the data
        const typeName = rowData?.type?.type_name;
        if (typeName === "Expense") {
            return {
                background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), var(--chakra-colors-red-500)`,
                hover: {
                    background: `var(--chakra-colors-red-600)`,
                },
            };
        } else if (typeName === "Income") {
            return {
                background: `linear-gradient(rgba(0,0,0, 0.15), rgba(0, 0, 0, 0.15)), var(--chakra-colors-green-500)`,
            };
        }
        return null; // Default background color
    };

    const getRowHoverColor = (rowData) => {
        const typeName = rowData?.type?.type_name;
        if (typeName === "Expense") {
            return "var(--chakra-colors-red-600)";
        } else if (typeName === "Income") {
            return "var(--chakra-colors-green-600)";
        }
        return null; // Default hover color
    };

    return (
        <>
            <Box>
                <Table colorScheme="">
                    <Thead>
                        <Tr>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <React.Fragment key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th
                                            key={header.id}
                                            className="border border-black"
                                        >
                                            <div
                                                className={`relative ${
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : ""
                                                }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() ===
                                                          "asc"
                                                            ? "Sort ascending"
                                                            : header.column.getNextSortingOrder() ===
                                                              "desc"
                                                            ? "Sort descending"
                                                            : "Clear sort"
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {{ asc: " 🔼", desc: " 🔽" }[
                                                    header.column.getIsSorted()
                                                ] ?? null}
                                            </div>
                                        </Th>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Tr>
                    </Thead>

                    <Tbody>
                        {table.getRowModel().rows.map((row) => (
                            <Tr
                                key={row.id}
                                style={getRowBgColor(row.original)}
                                css={css`
                                    &:hover {
                                        background-color: ${getRowHoverColor(
                                            row.original
                                        )} !important;
                                    }
                                `}
                                >
                                {row.getVisibleCells().map((cell) => (
                                    <Td
                                        key={cell.id}
                                        className={`border border-black text-center`}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Modal isOpen={showModal} onClose={handleCancelEdit}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Data</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <EditExpInc
                                formData={data[editableRow]}
                                types={types}
                                categories={categories}
                                allTags={allTags}
                                methods={methods}
                                onCancel={handleCancelEdit}
                            />
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
};

export default ReactTable;
