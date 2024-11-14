import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../../context/app-slice';

export const useRosterHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const roasterData = useSelector((state: any) => state.app.roasterDetails) || [];
    const fetchRoasterData = useCallback(async() => {
        setLoading(true);
        await fetch('http://localhost:5001/api/file', {
            method: "get",
        })
            .then((res) => res.json())
            .then(async (res) => {
                // setRoasterData(res);
                // console.log(res);
                let newData = [];
                newData = res?.map((item: any) => {
                    let date = new Date(item.createdAt);
                    console.log(date.toLocaleString(),item.createdAt)
                    let newObj = {
                        id: item.id,
                        rosterName: item.fileName,
                        date: date.toLocaleString("en-US", { month: "long" }) + ' ' + date.getDate() + ', ' + date.getFullYear(),
                        imageUrl: '../assests/import-2.png',
                        visibility: true,
                    }
                    return newObj;
                });
                // setRoasterData(newData);
                dispatch(appActions.updateRoasterDetils(newData));
                dispatch(appActions.updateDefaultRoasterDetails(newData));
                // if(newData.length===1){
                // dispatch(appActions.updateRosterTablePaginatedDetails(newData));
                // }
            })
            .catch((err) => {
                console.error("Error:", err);
            }).finally(() => {
                setLoading(false);
            })
    },[roasterData])
    const deleteRoasterData = async (id: string) => {
        setLoading(true);
        await fetch(`http://localhost:5001/api/file/${id}`, {
            method: "delete",
        })
            .then((res) => res.json())
            .then(async (res) => {
                
            }).catch((err) => {

            }).finally(() => {
                setLoading(false);
            })
    }
   
    return {
        fetchRoasterData,deleteRoasterData, loading
    }
}
