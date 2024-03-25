import { Menu } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function TimeCell({
    initialValue,
}) {
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]); //whenever the initial value changes, update the initial value

    return (
        <>
            <div>{value}</div>
        </>
    );
}
