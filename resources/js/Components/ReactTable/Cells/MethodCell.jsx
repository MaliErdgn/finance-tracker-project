import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Menu } from "@chakra-ui/react";

export default function MethodCell({
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
