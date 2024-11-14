import React from 'react';

export const ShowPlayerStats = ({ selectedPlayer }: any) => {

    return (
        <>
            <div className='h-[70%] flex flex-col justify-center items-center gap-5 relative top-[45px]'>
                {/* {isImageLoaded ? ( */}
                <img
                    className='min-h-[300px] h-[75%] w-[65%] opacity-[0.7] object-contain'
                    src={selectedPlayer?.position==='Goalkeeper'?'../assests/test-player-2.png':'../assests/test-player.png'}
                    alt="player"
                />
                {/* ) : (
                    <div className='h-[75%] w-[65%] flex items-center justify-center'>
                        <span className='text-gray-500'>Image not available</span>
                    </div>
                )} */}
                <div className='absolute top-0 left-[12px] font-bold text-[50px] text-custom-primary-1'>{selectedPlayer?.jerseyNumber}</div>
                <div className='absolute top-[-80px] left-[-2px] opacity-20 font-bold text-[140px] text-custom-text-4'>{selectedPlayer?.jerseyNumber}</div>
                {/* <div className="absolute bottom-[139px] left-0 right-0 h-[2%] w-[100%] bg-gradient-to-t from-custom-neutral-dark via-custom-neutral-dark to-transparent"></div> */}
                <div className='flex justify-start w-[100%] gap-14'>
                    <div className='flex flex-col items-start justify-start gap-2'>
                        <div className='text-custom-text-2'>
                            Height
                        </div>
                        <div className='font-bold text-[15px] text-custom-text-1'>
                            {selectedPlayer?.height / 100}m
                        </div>
                    </div>

                    <div className='flex flex-col items-start justify-start gap-2'>
                        <div className='text-custom-text-2'>
                            Weight
                        </div>
                        <div className='font-bold text-[15px] text-custom-text-1'>
                            {selectedPlayer?.weight} Kg
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-2'>
                        <div className='text-custom-text-2'>
                            Nationality
                        </div>
                        <div className='flex gap-2 items-center font-bold text-[15px] text-custom-text-1'>
                            <img src={selectedPlayer?.flagImg} alt='nationImg' width={30} height={30} /> <div>{selectedPlayer?.nationality}</div>
                        </div>
                    </div>
                </div>
                <div className='font-bold text-custom-text-1 w-[100%] relative bottom-[173px]'>
                    <div className='text-[30px]'>{selectedPlayer?.playerName}</div>
                    <div className='text-custom-primary-1 text-[20px]'>{selectedPlayer?.position}</div>
                </div>
            </div>
            <div className='border-b border-b-custom-text-4 w-[100%] h-[3px] flex justify-center'></div>
            <div className='h-[25%] mt-[9px] grid grid-cols-2 gap-y-0'>
                <div className='flex flex-col justify-center'>
                    <div className='text-custom-primary-1 font-bold text-[25px]'>{selectedPlayer?.appearances}</div>
                    <div className='text-custom-text-2'>Appearances</div>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='text-custom-primary-1 font-bold text-[25px]'>{selectedPlayer?.minutesPlayed}</div>
                    <div className='text-custom-text-2'>Minutes Played</div>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='text-custom-primary-1 font-bold text-[25px]'>{selectedPlayer?.position === 'Goalkeeper' ? selectedPlayer?.cleanSheets : selectedPlayer?.goals}</div>
                    <div className='text-custom-text-2'>{selectedPlayer?.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}</div>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='text-custom-primary-1 font-bold text-[25px]'>{selectedPlayer?.position === 'Goalkeeper' ? selectedPlayer?.saves : selectedPlayer?.assists}</div>
                    <div className='text-custom-text-2'>{selectedPlayer?.position === 'Goalkeeper' ? 'Saves' : 'Assists'}</div>
                </div>
            </div>
        </>
    );
};
