import React from 'react'
import { ImportRoasterHeader } from '../../component/importRoasterHeader/importRoasterHeader';
import { PaginationBar } from '../../component/paginationBar/paginationBar';
import { ShowRoaster } from '../../container/showRoasters/showRoaster';

const HomeContainer = () => {
    return (
        <>
            <ImportRoasterHeader />
            <PaginationBar isRoster={true}/>
            <ShowRoaster />
        </>
    )
}
export default HomeContainer;
