// src/components/Reusable/ReusableButton.tsx
import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import ButtonStyle from './ButtonStyle';

interface ReusableButtonProps {
    label: string;
    icon?: keyof typeof LucideIcons;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    formId?: string;
    disabled?: boolean;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
    label,
    icon,
    onClick,
    className = "",
    style = {},
    type = "button",
    formId,
    disabled = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const IconComponent = icon ? LucideIcons[icon] : null;

    const buttonStyle = {
        color: style.color || ButtonStyle.color,
        backgroundColor: isHovered
            ? (style.hoverBackgroundColor || ButtonStyle.hoverBackgroundColor)
            : (style.backgroundColor || ButtonStyle.backgroundColor),
        transition: 'all 0.3s ease',
        ...style,
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${ButtonStyle.base} ${className} flex items-center justify-center space-x-0.5 p-2 md:p-4 lg:p-6`}
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            form={formId}
        >
            {IconComponent && <IconComponent size={20} />}
            <span className="text-sm md:text-base lg:text-lg ml-2">{label}</span>
        </button>
    );
};

export default ReusableButton;