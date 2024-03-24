import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
} from "@tanstack/react-table";
import DescriptionCell from "./Cells/DescriptionCell";
import { useState, useEffect } from "react";
import AmountCell from "./Cells/AmountCell";
import TypeCell from "./Cells/TypeCell";
import TimeCell from "./Cells/TimeCell";
import TagNameCell from "./Cells/TagNameCell";
import CategoryNameCell from "./Cells/CategoryNameCell";
import MethodCell from "./Cells/MethodCell";

const ReactTable = ({
    data,
    categories,
    allTags,
    types,
    methods,
    handleCategoryChange,
    selectedCategoryId,
}) => {
    const [sorting, setSorting] = React.useState([]);
    const [editableRow, setEditableRow] = useState(null);

    const toggleEditMode = (rowId) => {
        if (editableRow === rowId) {
            setEditableRow(null);
        } else {
            setEditableRow(rowId);
        }
    };
    const handleSubmit = (rowId) => {
        setEditableRow(null);
    };

    const handleDiscard = () => {
        setEditableRow(null);
    };

    const handleDelete = () => {
        console.log("deleting data: ", data[0]);
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
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    editMode={editableRow === row.id}
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
                    editMode={editableRow === row.id}
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
                    editMode={editableRow === row.id}
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
                    editMode={editableRow === row.id}
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
                    editMode={editableRow === row.id}
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
                    editMode={editableRow === row.id}
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
                    getValue={getValue}
                    onDataChange={handleDataChange}
                    rowId={data[row.id].id}
                    editMode={editableRow === row.id}
                    toggleEditMode={() => toggleEditMode(row.id)}
                />
            ),
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div>
                    {editableRow === row.id ? (
                        <div>
                            <Button onClick={() => handleSubmit(row.id)}>
                                Submit
                            </Button>
                            <Button onClick={handleDiscard}>Discard</Button>
                        </div>
                    ) : (
                        <Button onClick={() => toggleEditMode(row.id)}>
                            Edit
                        </Button>
                    )}
                    {!editableRow && (
                        <Button onClick={() => handleDelete(row.id)}>
                            Delete
                        </Button>
                    )}
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
    return (
        <>
            <Box>
                <Table variant="striped" colorScheme="gray">
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
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td
                                        key={cell.id}
                                        className="border border-black text-center"
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
            </Box>
        </>
    );
};

export default ReactTable;
