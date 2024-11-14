import React from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

interface ButtonVarientProps {
    text: any;
    variant?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Function type for onClick
}

export const ButtonVarient: React.FC<ButtonVarientProps> = ({
    text,
    variant,
    className,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`${text ? 'min-w-[130px]' : 'w-[44px]'} font-semibold bg-custom-primary-1 px-4 text-custom-text-1 h-[44px] rounded-[8px] flex justify-center items-center
            ${variant === 'custom' ? '!h-[36px] !border-[1px] !border-custom-text-3 !bg-custom-neutral-light' : ''} ${className}`}
        >
            {text || <AddOutlinedIcon className="text-custom-text-1" />}
        </button>
    );
};
