import React from 'react'
import { ArrowDropDown } from '@mui/icons-material'
import RoasterTable from '../../common/mantineTable/roasterTable/roasterTable'

export const ShowRoaster = () => {
    return (
        <>
            {/* <div className='flex justify-between items-center py-4 font-semibold'>
                <div>Roster Name</div>
                <div className='flex justify-center items-center gap-2 relative right-[215px]'>
                    <div>Import Date</div>
                    <div className='flex justify-center items-center w-[25px] h-[22px] rounded-[4px] px-[2px] bg-custom-neutral-light'><ArrowDropDown /></div>
                </div>
            </div> */}
            {/* <div className='min-h-[50vh] flex justify-center items-center text-custom-text-2 font-normal text-[16px]'>
                You do not have any Roasters imported
            </div> */}
            {/* <RoasterDetails /> */}
            <RoasterTable />
        </>
    )
}
