import React from 'react';

interface Player {
    id: string;
    selected: boolean;
    className: string;
}

type FormationData = {
    Goalkeeper: Player[];
    Defender: Player[];
    Midfielder: Player[];
    Forward: Player[];
};
export const PlayerFormationView = ({ positionObjectMap,formationData, setSelectedPlayer }: any) => {

    const showFormation = () => {
        const formationElements: JSX.Element[] = [];

        positionObjectMap.forEach((data:any, position:any) => {
            if (formationData[position as keyof FormationData]) {
                formationData[position as keyof FormationData].forEach((formation: Player, index: number) => {
                    const player = data[index];
                    formationElements.push(
                        <div
                            key={formation.id}
                            className={`absolute ${formation.className} flex flex-col items-center justify-center`}
                        >
                            <div
                                className={`flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer ${formation.selected ? 'bg-custom-primary-1' : 'bg-custom-neutral-dark border-[2px] border-custom-text-1'
                                    } text-custom-text-1 font-bold`}
                                onClick={() => { 
                                    formation.selected=true;
                                    setSelectedPlayer({...player,index:position+index});
                                 }}
                            >
                                {player?.jerseyNumber}
                            </div>
                            <div className='text-custom-text-1 font-semibold'>{player?.playerName}</div>
                        </div>
                    );
                });
            }
        });

        return formationElements;
    };

    return (
        <>
            <img src="../assests/field.png" alt="field" className="w-[100%] h-[590px]" />
            {showFormation()}
        </>
    );
};
