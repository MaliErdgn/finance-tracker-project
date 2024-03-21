import React from "react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";

export default function AmountCell({
    getValue,
    onDataChange,
    rowId,
    editMode,
}) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const handleSubmit = () => {
        onDataChange(rowId, valule);
    };
    return (
        <>
            {editMode ? (
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSubmit}
                    variant={"underlined"}
                    bg={"inherit"}
                    size={"sm"}
                    w={"%85"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    textAlign={"center"}
                    whiteSpace={"nowrap"}
                    />
            ) : (
                <div>{value}</div>
            )}
        </>
    );
}
