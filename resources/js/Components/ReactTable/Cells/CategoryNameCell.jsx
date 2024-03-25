import React, { useState, useEffect } from "react";

export default function CategoryNameCell({ initialValue }) {
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <>
            <div>{value}</div>
        </>
    );
}
