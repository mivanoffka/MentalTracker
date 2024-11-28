import { Button } from "antd";

interface IconButtonProps {
    icon: any;
    size: number;
}

function IconButton({ icon, size }: IconButtonProps) {
    return (
        <Button
            style={{
                width: size + "px",
                height: size + "px",
                borderWidth: "0",
                background: "transparent",
                boxShadow: "none",
                textShadow: "none",
                fontSize: "16px",
            }}
        >
            {icon}
        </Button>
    );
}

export default IconButton;
