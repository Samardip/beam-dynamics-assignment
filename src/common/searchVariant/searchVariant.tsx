import React, { useState, ChangeEvent } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchVariantProps {
    placeholder?: string;
    showSearchButton?: boolean;
    className?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    onSearch?: (term: string) => void;
    iconColor?: string;
}

const SearchVariant: React.FC<SearchVariantProps> = ({
    placeholder = 'Search...',
    showSearchButton = true,
    className = '',
    value = '',
    onChange,
    onClear,
    onSearch,
    iconColor = 'rgba(153, 153, 153, 1)'
}) => {
    const [searchTerm, setSearchTerm] = useState<string>(value);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchTerm(newValue);
        if (onChange) {
            onChange(event);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        if (onClear) {
            onClear();
        }
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <TextField
            variant="outlined"
            placeholder={placeholder}
            className={`${className} border-[1px] !border-custom-neutral-light`}
            sx={{
                minWidth: '100%',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                    border: '1px solid rgba(112, 112, 112, 1)',
                    borderRadius: '8px',
                    padding: '7px 8px',
                    color: iconColor,
                    '&:hover': {
                        // Maintain background on hover if needed
                    },
                    '&.Mui-focused': {
                        // Maintain background on focus if needed
                    },
                },
                '& .MuiOutlinedInput-input': {
                    padding: '4px 0px',
                    color: 'rgba(153, 153, 153, 1)',
                    '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                },
                '& .MuiSvgIcon-root': {
                    color: iconColor,
                },
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
                startAdornment: (
                    showSearchButton && (
                        <InputAdornment position="start">
                            <IconButton onClick={handleSearchClick} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={searchTerm ? handleClearSearch : undefined}
                            aria-label={searchTerm ? 'clear search' : 'search'}
                        >
                            {searchTerm ? <ClearIcon /> : null}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchVariant;