import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from '@chakra-ui/react';

export default function DeleteButton({handleDelete, classNames}) {
  return (
    <Button onClick={handleDelete} className={classNames}>
        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
    </Button>
  )
}
