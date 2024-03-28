import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Tooltip } from '@chakra-ui/react';

export default function EditButton({ handleEdit, classNames }) {
    return (
        <Tooltip label="Edit" aria-label="Edit" placement="left">
            <Button onClick={handleEdit} className={classNames}>
                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </Button>
        </Tooltip>
    );
}
