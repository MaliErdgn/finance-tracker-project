import React from "react";
import "./Toast.css";

const Toast = ({ show, onClose, children }) => {
    return (
        <div className={`toast ${show ? "show" : ""}`}>
            <div className="toast-header">
                <strong className="mr-auto">Edit Data</strong>
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className="toast-body">{children}</div>
        </div>
    );
};

export default Toast;
