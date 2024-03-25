import React, { useState, useEffect } from "react";
import { Button, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function TagNameCell({ initialValue }) {
    const [value, setValue] = useState(initialValue);
    return (
        <>
            <div>{value}</div>
        </>
    );
}
