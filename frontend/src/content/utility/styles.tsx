import { CSSProperties } from "react";

export const fullWidthStyle: CSSProperties = {
    width: "100%",
};

export const fullHeightStyle: CSSProperties = {
    width: "100%",
};

export const fullFillStyle: CSSProperties = {
    width: "100%",
    height: "100%",
};

export const textButtonStyle: CSSProperties = {
    width: "8px",
    height: "24px",
    borderWidth: "0",
    background: "transparent",
    boxShadow: "none",
    textShadow: "none",
    fontSize: "16px",
};

export const editButtonStyle: CSSProperties = {
    ...textButtonStyle,
    color: "#3078F6",
};

export const deleteButtonStyle: CSSProperties = {
    ...textButtonStyle,
    color: "#E14D3E",
};

