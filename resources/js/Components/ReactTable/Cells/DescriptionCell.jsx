import React from "react";
import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function DescriptionCell({
    getValue,
    onDataChange,
    rowId,
    editMode,
}) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSubmit = (description) => {
        setValue(description);
        onDataChange(rowId, description);
    };

    return (
        <>
            {editMode ? (
                <Input
                    value={value ? value : ""}
                    onChange={(e) => setValue(e.target.value)}
                    variant={"underlined"}
                    bg={"inherit"}
                    size={"sm"}
                    w={"%85"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    textAlign={"center"}
                    whiteSpace={"nowrap"}
                    onSubmit={() => handleSubmit(newDescription)}
                />
            ) : (
                <div>{value}</div>
            )}
        </>
    );
}
