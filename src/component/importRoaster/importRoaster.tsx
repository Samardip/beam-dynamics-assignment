import React, { useCallback, useState } from 'react'
import SearchVariant from '../../common/searchVariant/searchVariant'
import { ButtonVarient } from '../../common/buttonVariant/buttonVarient'
import { ImportRoasterModal } from '../modal/importRosterModal/importRoasterModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../context/app-slice';

export const ImportRoaster = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roasterData = useSelector((state: any) => state.app.roasterDetails) || [];
    const defaultRoasterDetails = useSelector((state: any) => state.app.defaultRoasterDetails) || [];

    const handleSearchChange = useCallback((value: string) => {
        // dispatch(appActions.updatePlayerDetails(defaultPlayerDetails)); // Make sure 'defaultPlayerDetails' is spelled correctly
        setSearchTerm(value);

        let searchedItems = defaultRoasterDetails.filter((item: any) => {
            return item.rosterName.toLowerCase().includes(value.toLowerCase()) 
        });
        console.log(searchedItems, defaultRoasterDetails)
        if (value) {
            dispatch(appActions.updateRoasterDetils(searchedItems));
        } else {
            dispatch(appActions.updateRoasterDetils(defaultRoasterDetails));
        }
    }, []);
    return (
        <>
            <div className='flex justify-between mt-[50px] mb-[20px]'>
                <div className='flex gap-2 justify-center items-center'>
                    <div className='' onClick={() => {
                        if (roasterData?.length === 0) {
                            navigate('/formation-overview')
                        }
                        else {
                            setModalOpen(true);
                        }
                    }}>
                        <img src="../assests/import-1.png" alt="logo" className='w-[100%] cursor-pointer' />
                    </div>
                    <div className='text-[20px] font-semibold text-custom-primary-1'>Import List</div>
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    <div>
                        <SearchVariant
                            placeholder='Find Roaster'
                            showSearchButton={true}
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onClear={()=>handleSearchChange('')}
                        />
                    </div>
                    <div>
                        <ButtonVarient text="Import Team" onClick={() => { setModalOpen(true) }} />
                    </div>
                </div>
            </div>
            <ImportRoasterModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </>
    )
}
