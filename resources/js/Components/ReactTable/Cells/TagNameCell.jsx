import React, { useState, useEffect } from "react";
import { Button, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function TagNameCell({
    getValue,
    onDataChange,
    rowId,
    editMode,
    allTags,
    selectedCategoryId,
}) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    console.log(selectedCategoryId)

    const filteredTags = allTags.filter(tag => tag.category_id === parseInt(selectedCategoryId, 10));

    const handleSelectTag = (selectedTag) => {
        setValue(selectedTag);
        onDataChange(rowId, selectedTag);
    };

    return (
        <>
            {editMode ? (
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {value}
                    </MenuButton>
                    <MenuList>
                        {filteredTags.map((tag) => (
                            <MenuItem
                                key={tag.id}
                                onClick={() => handleSelectTag(tag.tag_name)}
                            >
                                {tag.tag_name}
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
