import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SelectDropdownVariantProps {
    placeholder?: string;
    options?: { label: string; value: string | number }[];
    value?: string | number;
    onChange?: any;
    disabled?: boolean;
    fullWidth?: boolean;
}

const SelectDropdownVariant: React.FC<SelectDropdownVariantProps> = ({
    placeholder = 'Select an option',
    options=[],
    value = '',
    onChange,
    disabled = false,
    fullWidth = true
}) => {
    return (
        <Select
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            // displayEmpty
            disabled={disabled}
            fullWidth={fullWidth}
            placeholder={placeholder}
            sx={{
                minWidth: '100%',
                height: '44px',
                paddingX: '10px',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                    border: '1px solid rgba(112, 112, 112, 1)',
                    borderRadius: '8px',
                    padding: '7px 8px',
                    color: 'rgba(153, 153, 153, 1)',
                    '&:hover': {
                        backgroundColor: 'rgba(45, 45, 45, 1)',
                    },
                    '&.Mui-focused': {
                        backgroundColor: 'rgba(45, 45, 45, 1)',
                    },
                },
                '& .MuiOutlinedInput-input': {
                    padding: '4px 0px',
                    color: 'rgba(153, 153, 153, 1)',
                    '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                },
                '& fieldset': {
                    border: '1px solid rgba(112, 112, 112, 1)',
                },
                '& .MuiSvgIcon-root': {
                    color: 'rgba(153, 153, 153, 1)',
                },
            }}
            renderValue={(selected) => {
                if (selected === '') {
                    return <span style={{ color: 'rgba(153, 153, 153, 1)' }}>{placeholder}</span>;
                }
                return options.find(option => option.value === selected)?.label || value||'';
            }}
        >
            <MenuItem disabled value={''}>
                {placeholder}
            </MenuItem>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectDropdownVariant;
