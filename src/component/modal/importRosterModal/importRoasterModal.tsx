import React from 'react'
import ModalVariant from '../../../common/modalVariant/modalVariant';
import { useRosterImport } from '../../../useHooks/useRosterImport/useRosterImport';
import { ButtonVarient } from '../../../common/buttonVariant/buttonVarient';
import { CircularProgress } from '@mui/material';

export const ImportRoasterModal = ({ isModalOpen, setModalOpen }: {
    isModalOpen: boolean,
    setModalOpen: any
}) => {
    const { selectedFile, handleFileChange, isValidCSV, fileData, summaryMap, showErrorOnce, handleImportClicked, dataLoading, errorMessage, setErrorMessage } = useRosterImport({ setModalOpen });

    return (
        <ModalVariant
            isOpen={isModalOpen}
            onRequestClose={() => {
                setModalOpen(false);
                setErrorMessage('');
            }}
            title="Importer"
            isTitleAndClose={true}
            isTitleBorder={true}
            customStyles={{
                content: { width: '500px' },
            }}
        >
            <div className="font-semibold">
                <div className="text-custom-text-2 pb-2 pt-5">Roster File</div>
                <div className={`flex justify-between items-center border ${(isValidCSV && fileData.length > 0 && selectedFile) ? 'border-custom-text-3' : `${showErrorOnce ? 'border-red-500' : 'border-custom-text-3'}`}  w-[300px] rounded-[8px]`}>
                    <div className="py-2 pl-5 text-sm">
                        {selectedFile ? selectedFile.length > 20 ? selectedFile.substring(0, 17) + '...' : selectedFile : 'No File Selected'}
                    </div>
                    <div className={`relative cursor-pointer flex justify-center text-custom-text-2 items-center rounded-[8px] py-2 border-l ${(isValidCSV && fileData.length > 0 && selectedFile) ? 'border-custom-text-3' : `${showErrorOnce ? 'border-red-500' : 'border-custom-text-3'}`} px-5`}>
                        Select File
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>
                {(isValidCSV || fileData.length > 0) && <div className="py-2 text-sm">File must be in .csv format</div>}

                {isValidCSV && fileData.length > 0 && selectedFile ? (<>
                    <div className="mt-4 text-custom-text-2">
                        <div className="text-[20px] mb-[20px]">File Summary</div>
                        <div className={`grid grid-cols-5 gap-2`}>
                            {[...summaryMap.entries()].map(([position, count], index) => (
                                <div className="flex flex-col gap-2" key={index}>
                                    <div className="text-custom-text-3">{position}</div>
                                    <div className="font-bold">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {
                        errorMessage && <div className=" absolute bottom-20 right-4 w-[100%] flex justify-end pt-[20px] text-red-600">
                            {errorMessage}
                        </div>
                    }
                    <div className="absolute bottom-4 right-4" onClick={() => { handleImportClicked() }}>
                        {
                            dataLoading ?
                                <CircularProgress />
                                :
                                <ButtonVarient text="Import" className='!min-w-[20px]' />

                        }
                    </div>
                </>
                ) : (<>
                    {showErrorOnce && (
                        <div>
                            <div className="text-custom-text-2 pb-2 pt-3 text-red-500">Error</div>
                            <div className="text-sm">Your sheet is missing data. Please ensure all cells are filled out.</div>
                        </div>
                    )}
                    <div className="absolute bottom-6 right-8">
                        Import
                    </div>
                </>
                )}

            </div>
        </ModalVariant>
    )
}
