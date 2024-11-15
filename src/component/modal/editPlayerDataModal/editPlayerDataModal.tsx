import React, { useState, useEffect, useCallback } from 'react';
import ModalVariant from '../../../common/modalVariant/modalVariant';
import SearchVariant from '../../../common/searchVariant/searchVariant';
import { ButtonVarient } from '../../../common/buttonVariant/buttonVarient';
import RadioButtonVariant from '../../../common/radioButtonVariant/radioButtonVariant';
import SelectDropdownVariant from '../../../common/selectDropdownVariant/selectDropdownVariant';

interface EditPlayerDataModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (data: boolean) => void;
    data: PlayerData;
    handleChange: (updatedData: PlayerData) => void;
    errorMessage: string;
    setErrorMessage: any;
}

interface PlayerData {
    id?: string;
    playerName: string;
    jerseyNumber: string;
    height: string;
    weight: string;
    nationality: string;
    position: string;
    starter: string;
}

export const EditPlayerDataModal: React.FC<EditPlayerDataModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    data,
    handleChange,
    errorMessage,
    setErrorMessage
}) => {
    const [playerData, setPlayerData] = useState<PlayerData>({
        playerName: '',
        jerseyNumber: '',
        height: '',
        weight: '',
        nationality: '',
        position: '',
        starter: ''
    });
    const [isDataModified, setIsDataModified] = useState(false);
    const nationalitiesOptions = [
        { label: "United States", value: "US" },
        { label: "Canada", value: "CA" },
        { label: "United Kingdom", value: "UK" },
        { label: "Australia", value: "AU" },
        { label: "France", value: "FR" },
        { label: "Germany", value: "DE" },
        { label: "India", value: "IN" },
        { label: "China", value: "CN" },
        { label: "Japan", value: "JP" },
        { label: "South Korea", value: "KR" },
        { label: "Brazil", value: "BR" },
        { label: "Mexico", value: "MX" },
        { label: "Italy", value: "IT" },
        { label: "Spain", value: "ES" },
        { label: "Russia", value: "RU" },
        { label: "South Africa", value: "ZA" },
        { label: "Argentina", value: "AR" },
        { label: "Nigeria", value: "NG" },
        { label: "Egypt", value: "EG" },
        { label: "Turkey", value: "TR" },
    ]
    const positionOptions = [
        { label: "Goalkeeper", value: "goalkeeper" },
        { label: "Defender", value: "defender" },
        { label: "MidFielder", value: "midFielder" },
        { label: "Forward", value: "forward" },
    ]
    const StarterOptions = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ]

    useEffect(() => {
        if (data) {
            setPlayerData({ ...data, starter: data.starter ? 'Yes' : 'No' });
        }
    }, [data]);

    const handleInputChange = useCallback((field: keyof PlayerData, value: string) => {
        setIsDataModified(true);
        setPlayerData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }, [playerData]);

    const handleEditPlayer = () => {
        setErrorMessage('');
        handleChange(playerData);
        setIsDataModified(false);
    };

    return (
        <ModalVariant
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            title="Edit Player"
            isTitleAndClose={true}
            isTitleBorder={false}
            customStyles={{ content: { width: '200px' } }}
            width="500px"
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-center items-center gap-4 font-semibold text-custom-text-2">
                    <div className="flex flex-col w-[60%] gap-2">
                        <div>Player Name</div>
                        <SearchVariant
                            event="any"
                            placeholder="Enter Player Name"
                            showSearchButton={false}
                            className="bg-custom-neutral-light !w-[100%]"
                            value={playerData.playerName}
                            onChange={(e) => handleInputChange('playerName', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-[40%] gap-2">
                        <div>Jersey Number</div>
                        <SearchVariant
                            event="any"
                            placeholder="Enter Jersey Number"
                            showSearchButton={false}
                            className="bg-custom-neutral-light !w-[100%]"
                            value={playerData.jerseyNumber}
                            onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 font-semibold text-custom-text-2">
                    <div className="flex flex-col w-[45%] gap-2">
                        <div>Height</div>
                        <SearchVariant
                            event="any"
                            placeholder="Enter Height"
                            showSearchButton={false}
                            className="bg-custom-neutral-light !w-[100%]"
                            value={playerData.height}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-[55%] gap-2">
                        <div>Weight</div>
                        <SearchVariant
                            event="any"
                            placeholder="Enter Weight"
                            showSearchButton={false}
                            className="bg-custom-neutral-light !w-[100%]"
                            value={playerData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 font-semibold text-custom-text-2">
                    <div className="flex flex-col w-[100%] gap-2">
                        <div>Nationality</div>
                        <SelectDropdownVariant
                            placeholder="Enter Nationality"
                            options={nationalitiesOptions}
                            value={playerData.nationality}
                            onChange={(value: string) => handleInputChange('nationality', value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 font-semibold text-custom-text-2">
                    <div className="flex flex-col w-[100%] gap-2">
                        <div>Position</div>
                        <SelectDropdownVariant
                            placeholder="Enter Position"
                            options={positionOptions}
                            value={playerData.position}
                            onChange={(value: string) => handleInputChange('position', value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 font-semibold text-custom-text-2">
                    <div className="flex flex-col w-[100%] gap-2">
                        <div>Starter</div>
                        <RadioButtonVariant
                            options={StarterOptions}
                            value={playerData.starter}
                            onChange={(e: any) => handleInputChange('starter', e)}
                        />
                    </div>
                </div>
                {
                    errorMessage && <div className="w-[100%] flex justify-end text-red-600">
                        {errorMessage}
                    </div>
                }
                {
                    !isDataModified ?
                        <div className="w-[100%] flex justify-end">
                            Edit Player
                        </div>
                        :
                        <div className="w-[100%] flex justify-end">
                            <ButtonVarient
                                text="Edit Player"
                                className="!min-w-[30px]"
                                onClick={handleEditPlayer}
                            />
                        </div>
                }
            </div>
        </ModalVariant>
    );
};