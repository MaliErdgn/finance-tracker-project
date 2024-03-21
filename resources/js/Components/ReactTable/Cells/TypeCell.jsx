import React from "react";
import { Button, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function TypeCell({
    getValue,
    onDataChange,
    rowId,
    editMode,
    types
}) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (selectedType) => {
        setValue(selectedType);
        onDataChange(rowId, selectedType);
    };

    return (
        <>
            {editMode ? (
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {value}
                    </MenuButton>
                    <MenuList>
                        {types.map((type, id) => (
                            <MenuItem
                                key={id}
                                onClick={() => handleSubmit(type.type_name)}
                            >
                                {type.type_name}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            ) : (
                <div>{value}</div>
            )}
        </>
    );
}
