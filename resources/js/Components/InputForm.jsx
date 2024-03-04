export default function InputForm({label, type, name, value, onChange, classNames, required}) {
    const className = `form-control ${classNames || ""}`
    return (
        <div className="mb-3">
            <label htmlFor="{name}" className="form-control"></label>
            {label}:
            <input
                type={type}
                className= {className}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}
