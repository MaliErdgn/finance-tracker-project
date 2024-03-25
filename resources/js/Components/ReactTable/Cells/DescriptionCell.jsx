import React from "react";
import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function DescriptionCell({ initialValue }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <>
            <div>{value}</div>
        </>
    );
}
