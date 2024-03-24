import { Menu } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function TimeCell({
    initialValue,
    onDataChange,
    rowId,
    editMode,
}) {
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]); //whenever the initial value changes, update the initial value

    return (
        <>
            {editMode ? ( // return these if the user is editing
                <Menu></Menu>
            ) : (
                // return these if the user is not editing. (Just the data itself)
                <div>{value}</div>
            )}
        </>
    );
}
