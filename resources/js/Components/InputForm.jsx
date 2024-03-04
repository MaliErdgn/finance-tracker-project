import React from 'react';
import Form from 'react-bootstrap/Form';

export default function InputForm({ label, type, name, value, onChange, classNames, required }) {
    const className = `form-control ${classNames || ""}`;

    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={name}>{label}:</Form.Label>
            <Form.Control
                type={type}
                className={className}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </Form.Group>
    );
}
