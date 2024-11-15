import React from 'react'
import { ButtonVarient } from '../../../common/buttonVariant/buttonVarient'
import ModalVariant from '../../../common/modalVariant/modalVariant'
import { CircularProgress } from '@mui/material';

export const DeleteDataModal = ({ isModalOpen, setIsModalOpen, id, data, handleChange, loading }: {
    isModalOpen: boolean;
    setIsModalOpen: any;
    id: string;
    data: any;
    loading?: boolean;
    handleChange: () => void;
}) => {
    return (
        <ModalVariant
            isOpen={isModalOpen}
            onRequestClose={() => { setIsModalOpen(false) }}
            title="Are you sure?"
            isTitleAndClose={true}
            isTitleBorder={false}
            width='150px'
            height='150px'
            customStyles={{
                content: { width: '400px' },
            }}
        >

            <div>This action cannot be undone</div>
            <div className='flex justify-end items-center gap-2 mt-[10px]'>
                <ButtonVarient variant='custom' text={'Cancel'} className='!h-[40px] !min-w-[20px] !text-[15px]' onClick={() => { setIsModalOpen(false) }} />
                {
                    loading ? <CircularProgress />
                        :
                        <ButtonVarient
                            text={'Delete'}
                            className='!h-[40px] !min-w-[20px] !text-[15px] !bg-custom-primary-3'
                            onClick={() => { handleChange() }} />
                }

            </div>
        </ModalVariant>
    )
}
