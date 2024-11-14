import React from 'react';
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup } from '@mui/material';
import { TripOrigin } from '@mui/icons-material';

interface RadioButtonVariantProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: any;
    label?: string;
    disabled?: boolean;
    iconColor?: string;
    checkedIconColor?: string;
}

const RadioButtonVariant: React.FC<RadioButtonVariantProps> = ({
    options,
    value,
    onChange,
    label,
    disabled = false,
    iconColor = 'rgba(112, 112, 112, 1)',
    checkedIconColor = 'rgba(254, 160, 19, 1)',
}) => {
    return (
        <FormControl component="fieldset" disabled={disabled}>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <RadioGroup
                value={value}
                onChange={(e) => { onChange(e.target.value) }}
                row
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        checked={option.value===value.toLowerCase()?true:false}
                        control={
                            <Radio
                                sx={{
                                    color: iconColor,
                                    '&.Mui-checked': {
                                        color: checkedIconColor,
                                    },
                                }}
                                // icon={<TripOrigin />}
                                checkedIcon={<TripOrigin />}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonVariant;
