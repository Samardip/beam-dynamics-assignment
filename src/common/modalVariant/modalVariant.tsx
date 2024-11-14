import React from 'react';
import ReactModal from 'react-modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonVarient } from '../buttonVariant/buttonVarient';

// Set the app element for accessibility
ReactModal.setAppElement('#root');

interface ModalVariantProps {
    isOpen: boolean;
    onRequestClose: () => void;
    title?: string;
    children: React.ReactNode;
    customStyles?: ReactModal.Styles;
    isTitleAndClose?: boolean;
    isTitleBorder?:boolean;
    width?:string;
    height?:string;
}

const ModalVariant: React.FC<ModalVariantProps> = ({
    isOpen,
    onRequestClose,
    title,
    children,
    customStyles,
    isTitleAndClose,
    isTitleBorder,
    width,
    height
}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '0px',
                    minWidth: width || '700px',
                    minHeight: height || '500px',
                    background: 'rgba(45, 45, 45, 1)',
                    position: 'relative', // Ensure absolute positioning inside content works
                    zIndex:1,
                    ...customStyles?.content,
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    ...customStyles?.overlay,
                },
            }}
        >
            {
                isTitleAndClose &&
                <div className={`flex justify-between items-center pb-3 ${isTitleBorder && 'border-b-[1px] border-custom-text-3 text-custom-text-3'}`}>
                    {title && <div className="font-semibold text-custom-text-2 text-[20px]">{title}</div>}
                    <CloseIcon className="!text-custom-text-2 !w-[18px] !h-[18px] cursor-pointer" onClick={onRequestClose} />
                </div>
            }

            <div className="text-custom-text-3">{children}</div>
        </ReactModal>
    );
};

export default ModalVariant;
