import React from "react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";

export default function AmountCell({
    initialValue,
    onDataChange,
    rowId,
    editMode,
}) {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = () => {
        onDataChange(rowId, value);
    };

    const getValue = (theValue) => {
        if (theValue % 1 !== 0) {
            return value.toFixed(2);
        } else {
            return value.toString();
        }
    }
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
                <div>{getValue(value)} ₺</div>
            )}
        </>
    );
}
