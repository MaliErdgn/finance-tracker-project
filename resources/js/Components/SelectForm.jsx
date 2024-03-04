import React from 'react';

export default function SelectForm({ label, name, value, onChange, classNames, required, options, optionKey, optionValue }) {
    const className = `form-control ${classNames || ""}`;

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}:
            </label>
            <select
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
            </select>
        </div>
    );
}
