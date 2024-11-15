import React, { useState } from 'react'
import ModalVariant from '../../common/modalVariant/modalVariant'
import { Text } from '@mantine/core'
import { ButtonVarient } from '../../common/buttonVariant/buttonVarient'
import { PlayerDetailsHeader } from '../playerDetailsHeader/playerDetailsHeader'
import { ImportRoasterModal } from '../modal/importRosterModal/importRoasterModal'

export const NoFormationData = ({ showModal }: {
    showModal: boolean;
}) => {
    const [isNoListModalOpen, setIsNoListModalOpen] = useState<boolean>(showModal);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
        <PlayerDetailsHeader isRoasterSelected={false}/>
            <div className='flex justify-center items-center gap-7 p-7 rounded-[8px] bg-custom-neutral-light min-h-[70vh]'>
                <div className='w-[70%]'>
                    <img src="../assests/field.png" alt="field" className='w-[100%] h-[590px]' />
                </div>
                <div className='bg-custom-neutral-dark w-[30%] h-[590px] flex flex-col px-4 rounded-[7px]'>
                    <div className='h-[70%]'></div>
                    <div className='border-b border-b-custom-text-4 w-[100%] h-[2px] flex justify-center'></div>
                    <div className='h-[30%]'></div>
                </div>
                <ModalVariant
                    isOpen={isNoListModalOpen}
                    onRequestClose={() => {
                        setIsNoListModalOpen(false)
                    }}
                    isTitleAndClose={false}
                    isTitleBorder={false}
                    width='150px'
                    height='120px'
                    customStyles={{
                        content: { width: '350px' },
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#bbb',
                        padding: '20px',
                        fontSize: '18px',
                        gap: '10px'
                    }}
                        className='font-semibold'
                    >
                        <div className='flex justify-center items-center gap-2 font-bold text-custom-text-1'>
                            <img src='../assests/warning.png' alt="warning" className='h-[15px] w-[15px]' />
                            <Text>No players found</Text>
                        </div>
                        <Text size="sm">Please import your roaster first</Text>
                        <div
                        onClick={() => { setModalOpen(true) }}
                        >
                            <ButtonVarient text={'Go to Import List Page'} variant='custom' className='!h-[47px] !bg-custom-neutral-dark' />
                        </div>
                    </div>
                </ModalVariant >
            <ImportRoasterModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
            </div >
        </>
    )
}
