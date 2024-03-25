import React, { useState, useEffect } from "react";

const TypeCell = ({
    initialValue,
}) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <>
            <div>{value}</div>
        </>
    );
};

export default TypeCell;
