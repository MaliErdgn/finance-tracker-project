import React, { useState, useEffect } from "react";
import { Button, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const TypeCell = React.memo(({ initialValue, onDataChange, rowId, editMode, types }) => {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (selectedType) => {
        setValue(selectedType);
        onDataChange(rowId, selectedType);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

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
});

export default TypeCell;
