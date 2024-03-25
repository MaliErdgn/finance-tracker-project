import React, { useEffect } from "react";
import { useState } from "react";

export default function AmountCell({
    initialValue,
}) {
    const [value, setValue] = useState(initialValue);

    const getValue = (theValue) => {
        if (theValue % 1 !== 0) {
            return value.toFixed(2);
        } else {
            return value.toString();
        }
    }
    useEffect(() => {
        setValue(initialValue)
    },[initialValue])
    return (
        <>
                <div>{getValue(value)} ₺</div>
        </>
    );
}
