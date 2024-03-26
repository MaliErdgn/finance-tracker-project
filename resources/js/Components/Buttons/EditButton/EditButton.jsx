import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from '@chakra-ui/react';

export default function EditButton({ handleEdit, classNames }) {
    return (
        <Button onClick={handleEdit} className={classNames}>
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </Button>
    );
}
