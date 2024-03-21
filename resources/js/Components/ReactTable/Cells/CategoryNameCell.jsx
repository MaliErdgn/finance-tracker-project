import React, { useState, useEffect } from "react";
import { Button, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function CategoryNameCell({
    getValue,
    onDataChange,
    rowId,
    editMode,
    categories,
    onSelectCategory,
}) {
    const initialValue = getValue();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSelectCategory = (selectedCategory, categoryId) => {
        onSelectCategory(categoryId)
        setValue(selectedCategory);
        onDataChange(rowId, selectedCategory);
    };

    return (
        <>
            {editMode ? (
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {value}
                    </MenuButton>
                    <MenuList>
                        {categories.map((category) => (
                            <MenuItem
                                key={category.category_name}
                                onClick={() =>
                                    handleSelectCategory(
                                        category.category_name,
                                        category.id
                                    )
                                }
                            >
                                {category.category_name}
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
