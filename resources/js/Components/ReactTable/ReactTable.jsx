import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

const columns = [
    {
        accessorKey: "type.type_name",
        header: "Type",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "tag.tag_name",
        header: "Tag Name",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "tag.category.category_name",
        header: "Category Name",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "method.method_name",
        header: "Method",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: (props) => <p>{props.getValue()}</p>,
    },
];

const ReactTable = ({ data }) => {
    const [sorting, setSorting] = React.useState([]);
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
                                        className="border border-black"
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
