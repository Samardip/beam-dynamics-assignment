import React from 'react'
import RoasterTable from '../../common/mantineTable/roasterTable/roasterTable'
import { ButtonVarient } from '../../common/buttonVariant/buttonVarient'

export const RoasterDetails = () => {
    return (
        <div className='flex justify-between items-center px-6 py-2 mb-2 font-semibold bg-custom-neutral-light rounded-[8px]'>
            <div className='flex justify-center items-center gap-3'>
                <div>
                    <img src="../assests/import-2.png" alt="logo" className='cursor-pointer' />
                </div>
                <div>
                    PAris Saint-German F.C.
                </div>
            </div>
            <div className='flex justify-center items-center gap-14'>
                <div>October 12, 2024</div>
                <ButtonVarient text="Delete Import" variant={'custom'} />
            </div>
        </div>
    )
}
