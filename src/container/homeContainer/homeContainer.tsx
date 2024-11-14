import React from 'react'
import { ImportRoaster } from '../../component/importRoaster/importRoaster';
import SidePanel from '../../component/sidePanel/sidePanel';
import { PaginationBar } from '../../component/paginationBar/paginationBar';
import { ShowRoaster } from '../../container/showRoasters/showRoaster';

const HomeContainer = () => {
    return (
        <>
            <ImportRoaster />
            <PaginationBar isRoster={true}/>
            <ShowRoaster />
        </>
    )
}
export default HomeContainer;
