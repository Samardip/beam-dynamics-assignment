import React, { useCallback, useState } from 'react'
import { Edit, KeyboardArrowRight } from '@mui/icons-material'
import SearchVariant from '../../common/searchVariant/searchVariant'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../context/app-slice';

export const PlayerDetailsHeader = ({ isRoasterSelected }: {
    isRoasterSelected: boolean | null
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const fileData = useSelector((state: any) => state.app.fileDetails) || {};
    const playerData = useSelector((state: any) => state.app.playerDetails) || [];
    const defaultPlayerDetails = useSelector((state: any) => state.app.defaultPlayerDetails) || [];

    const [teamName, setTeamName] = useState(fileData?.rosterName || '');
    const [searchTerm, setSearchTerm] = useState<string>('');

    let showEditIcon = JSON.parse(localStorage.getItem(fileData?.id || id) || JSON.stringify(true));
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(event.target.value);
    };

    const handleEvent = async () => {
        let newFileData: any = {
            fileName: teamName,
            fileId: fileData?.id || id || ''
        }
        await fetch(`${process.env.REACT_APP_API_ENDPOINT}/file`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFileData)
        }).then((res) => {
            return res.json();
        }).then((res) => {
            localStorage.setItem(fileData?.id || id, JSON.stringify(false));
            setIsEditing(false);
        }).catch(() => { })
    };
    const handleSearchChange = useCallback((value: string) => {
        // dispatch(appActions.updatePlayerDetails(defaultPlayerDetails)); // Make sure 'defaultPlayerDetails' is spelled correctly
        setSearchTerm(value);

        let searchedItems = defaultPlayerDetails.filter((item: any) => {
            return item.playerName.toLowerCase().includes(value.toLowerCase()) ||
                item.position.toLowerCase().includes(value.toLowerCase());
        });
        console.log(searchedItems, defaultPlayerDetails)
        if (value) {
            dispatch(appActions.updatePlayerDetails(searchedItems));
        } else {
            dispatch(appActions.updatePlayerDetails(defaultPlayerDetails));
        }
    }, [defaultPlayerDetails, dispatch, playerData]);
    return (
        <div className='flex justify-between mt-[50px] mb-[20px]'>
            <div className='flex gap-2 justify-center items-center'>
                <div>
                    <img src="../assests/import-2.png" alt="logo" className='w-[100%] cursor-pointer' />
                </div>
                <div className='text-[15px] font-semibold text-custom-text-3'>Import List</div>
                <div><KeyboardArrowRight /></div>
                <div><MenuIcon className='text-custom-primary-1' /></div>
                <div className='flex gap-2' onMouseEnter={() => { setShowEdit(true) }} onMouseLeave={() => { setShowEdit(false) }}>
                    <div className='text-[20px] font-semibold text-custom-primary-1' >
                        {isEditing ? (
                            <TextField
                                value={teamName}
                                onChange={handleInputChange}
                                // onBlur={handleEvent}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleEvent()
                                    }
                                }}
                                autoFocus
                                size="small"
                                variant="standard"
                                InputProps={{
                                    style: { color: 'rgba(203, 203, 203, 1)' }, // Set text color to white
                                }}
                            />
                        ) : (
                            <span className="cursor-pointer">
                                {teamName}
                            </span>
                        )}
                    </div>
                    {
                        (showEdit||showEditIcon) && <IconButton onClick={handleEditClick} size="small">
                            <Edit fontSize='small' className='!flex' style={{ color: 'rgba(254, 160, 19, 1)' }} />
                        </IconButton>
                    }
                </div>
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <div>
                    <SearchVariant placeholder={'Find Player'}
                        showSearchButton={true}
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onClear={() => handleSearchChange('')}
                    />
                </div>
                <div className='flex justify-center items-center border-[1px] border-custom-text-4 rounded-[8px] h-[46px]'>
                    <div className={`flex gap-2 justify-center items-center cursor-pointer py-2 px-4 rounded-l-[8px] ${isRoasterSelected ? 'bg-custom-neutral-light' : ''} border-r-[1px] border-r-custom-text-4`}
                        onClick={() => {
                            navigate(`/roaster-details/${id}`)
                        }}
                    >
                        <div><img src="../assests/roaster-icon.png" alt="logo" className='w-[100%] cursor-pointer' /></div>
                        <div className='text-[18px] font-semibold'>Roaster Details</div>
                    </div>
                    <div className={`flex gap-2 justify-center items-center cursor-pointer py-2 px-4  ${!isRoasterSelected ? 'bg-custom-neutral-light rounded-r-[8px]' : ''}`}
                        onClick={() => {
                            navigate(`/formation-overview/${id}`)
                        }}
                    >
                        <div><img src="../assests/formation-icon.png" alt="logo" className='w-[100%] cursor-pointer' /></div>
                        <div className='text-[18px] font-semibold'>Formation Overview</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
