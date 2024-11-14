import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appActions } from '../../context/app-slice';
import { useDispatch, useSelector } from 'react-redux';
import { ImportRoasterModal } from '../modal/importRosterModal/importRoasterModal';

const SidePanel: React.FC = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const roasterData= useSelector((state: any) => state.app.roasterDetails) || [];
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <>
            <div className="flex items-center gap-14 flex-col">
                <Link to={'/'} onClick={() => {
                    dispatch(appActions.updatePlayerDetails([]));
                }}>
                    <img src="../assests/logo.png" alt="logo" className="w-[100%] cursor-pointer" />
                </Link>
                <div className="cursor-pointer" onClick={() => {
                    if(roasterData?.length===0){
                        navigate('/formation-overview')
                    }
                    else{
                        setModalOpen(true);
                    }
                 }}>
                    <img src="../assests/import.png" alt="import" className="w-[100%] cursor-pointer" />
                </div>
            </div>
            <ImportRoasterModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

export default React.memo(SidePanel);
