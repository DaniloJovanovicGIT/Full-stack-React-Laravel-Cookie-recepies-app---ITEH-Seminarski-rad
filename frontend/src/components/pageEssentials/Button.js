import React from "react";
import "../../styles/Button.css";

const styles = ["basic", "bordered", "color"];

const sizes = ["small", "original", "large"];

export const Button = ({text, type, onClick, buttonStyle, buttonSize,}) => {

    const checkButtonStyle = styles.includes(buttonStyle) ? buttonStyle : styles[0];

    const checkButtonSize = sizes.includes(buttonSize) ? buttonSize : sizes[1];

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};