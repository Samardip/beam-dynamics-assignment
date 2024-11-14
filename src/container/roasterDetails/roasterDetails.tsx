import React, { useEffect, useState } from 'react'
import { PaginationBar } from '../../component/paginationBar/paginationBar';
import PlayerTable from '../../common/mantineTable/playerTable/playerTable';
import { PlayerDetailsHeader } from '../../component/playerDetailsHeader/playerDetailsHeader';

export const RoasterDetailsPage = () => {
    return (
        <>
            <PlayerDetailsHeader isRoasterSelected={true} />
            <PaginationBar />
            <PlayerTable/>
        </>
    )
}
export default RoasterDetailsPage;