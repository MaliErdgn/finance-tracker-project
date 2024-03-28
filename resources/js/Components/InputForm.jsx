import React from "react";
import Form from "react-bootstrap/Form";

const InputForm = ({
    label,
    type,
    name,
    value,
    onChange,
    className,
    required,
    style,
    rows,
}) => {
    return (
        <Form.Group className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                style={style}
                as={type === "textarea" ? "textarea" : undefined} // Set 'as' prop for textarea
                rows={rows} // Set the rows attribute for textarea
            />
        </Form.Group>
    );
};

export default InputForm;
