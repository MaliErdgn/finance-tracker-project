import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Menu } from "@chakra-ui/react";

export default function MethodCell({
    initialValue,
    onDataChange,
    rowId,
    editMode,
    methods
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
