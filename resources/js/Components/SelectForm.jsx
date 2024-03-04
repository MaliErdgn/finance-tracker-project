import React from 'react';
import Form from 'react-bootstrap/Form';

export default function SelectForm({ label, name, value, onChange, classNames, required, options, optionKey, optionValue }) {
    const className = `form-control ${classNames || ""}`;

    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={name}>{label}:</Form.Label>
            <Form.Control
                as="select"
                className={className}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option[optionKey]} value={option[optionKey]}>
                        {option[optionValue]}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}
