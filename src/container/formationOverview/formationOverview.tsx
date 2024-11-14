import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PlayerDetailsHeader } from '../../component/playerDetailsHeader/playerDetailsHeader';
import ModalVariant from '../../common/modalVariant/modalVariant';
import { PlayerFormationView } from '../../component/playerFormationView/playerFormationView';
import { ShowPlayerStats } from '../../component/showPlayerStats/showPlayerStats';
import { useSelector } from 'react-redux';

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

const FormationOverviewPage = () => {
  const [isStartersDataModal, setIsStarterDataModal] = useState(true);
  // const [showFormation, setShowFormation] = useState(false);
  const [positionMap, setPositionMap] = useState<Map<string, number>>(new Map());
  const [starterData, setStarterData] = useState<any>({
    lowStarter: 0,
    moreStarter: 0
  });
  const [selectedPlayer, setSelectedPlayer] = useState<any>();
  const playerData = useSelector((state: any) => state.app.playerDetails) || [];
  const defaultPositionMap: Map<string, number> = new Map();
  defaultPositionMap.set('goalkeeper', 1);
  defaultPositionMap.set('defender', 4);
  defaultPositionMap.set('midfielder', 3);
  defaultPositionMap.set('forward', 3);

  useEffect(() => {
    let newSummaryMap = new Map<string, number>();
    newSummaryMap.set('goalkeeper', 0);
    newSummaryMap.set('defender', 0);
    newSummaryMap.set('midfielder', 0);
    newSummaryMap.set('forward', 0);
    playerData.forEach((item: any) => {
      const position = item?.position?.toLowerCase();
      if (position && item.starter) {
        newSummaryMap.set(position, (newSummaryMap.get(position) || 0) + 1);
      }
    });
    let newStarterData = { ...starterData };
    const roles = [
      { role: "goalkeeper", threshold: newSummaryMap.get('goalkeeper') },
      { role: "defender", threshold: newSummaryMap.get('defender') },
      { role: "midfielder", threshold: newSummaryMap.get('midfielder') },
      { role: "forward", threshold: newSummaryMap.get('forward') },
    ];
    roles.forEach(({ role, threshold }) => {
      const count = defaultPositionMap.get(role) || 0;
      if (threshold) {
        if (count > threshold) {
          newStarterData.lowStarter = newStarterData.lowStarter - 1;
        } else if (count < threshold) {
          newStarterData.moreStarter = newStarterData.moreStarter + 1;
        }
      }
    });

    setStarterData(newStarterData);
    setPositionMap(newSummaryMap);
  }, [playerData]);

  const [positionObjectMap, setPositionObjectMap] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const newPositionObjectMap: Map<string, any> = new Map();
    playerData?.filter((item: any) => item.starter === true).map((item: any) => {
      newPositionObjectMap.set(item.position, [...(newPositionObjectMap.get(item?.position) || []), item]);
    });
    setSelectedPlayer({ ...(newPositionObjectMap?.get('goalkeeper') && newPositionObjectMap?.get('goalkeeper')[0]) || {}, index: 'goalkeeper' + 0 });
    setPositionObjectMap(newPositionObjectMap);
  }, [playerData]);

  const [formationData, setFormationData] = useState<FormationData>({
    "Goalkeeper": [{
      id: '0',
      selected: true,
      className: 'left-[23px] bottom-[42%]',
    }],
    "Defender": [{
      id: '1',
      selected: false,
      className: 'left-[24%] bottom-[80%]',
    },
    {
      id: '2',
      selected: false,
      className: 'left-[22%] bottom-[55%]',
    },
    {
      id: '3',
      selected: false,
      className: 'left-[22%] bottom-[30%]',
    },
    {
      id: '4',
      selected: false,
      className: 'left-[23%] bottom-[6%]',
    }],
    "Midfielder": [{

      id: '5',
      selected: false,
      className: 'left-[45%] bottom-[10%]',
    },
    {

      id: '6',
      selected: false,
      className: 'left-[45%] bottom-[42%]',
    },
    {

      id: '7',
      selected: false,
      className: 'left-[45%] bottom-[75%]',
    }],
    "Forward": [{

      id: '8',
      selected: false,
      className: 'left-[68%] bottom-[65%]',
    },
    {

      id: '9',
      selected: false,
      className: 'left-[70%] bottom-[42%]',
    },
    {

      id: '10',
      selected: false,
      className: 'left-[68%] bottom-[15%]',
    }]
  });
  useEffect(() => {
    const updatedFormationData = { ...formationData };

    Object.keys(updatedFormationData).forEach((position) => {
      updatedFormationData[position as keyof FormationData] = updatedFormationData[
        position as keyof FormationData
      ].map((player, index) => ({
        ...player,
        selected: selectedPlayer?.index === (position + index), // Set selected to true for each player
      }));
    });
    setFormationData(updatedFormationData);
  }, [selectedPlayer])
  const renderItems = useCallback(() => {

    const items: any = [];

    positionMap.forEach((position, name) => {
      ((defaultPositionMap.get(name.toLowerCase())) !== position) &&
        items.push(
          <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-3  py-4 font-semibold bg-custom-neutral-dark rounded-[8px] text-custom-text-2'>
              <div className='text-center'>
                {name}
              </div>
              <div className='text-center'>
                {defaultPositionMap.get(name.toLowerCase())}
              </div>
              <div className='text-center text-custom-primary-1'>
                {position}
              </div>
            </div>
          </div>
        );
    });
    if (items.size === 0) {
      setStarterData({
        lowStarter: 0,
        moreStarter: 0
      })
    }
    console.log(starterData)
    return items;
  }, [positionMap, starterData]);
  // useEffect(()=>{
  //   if(positionMap.size ===0){
  //     setStarterData({
  //       lowStarter: 0,
  //       moreStarter: 0
  //     })
  //   }
  // },[positionMap])
  return (
    <div>
      <PlayerDetailsHeader isRoasterSelected={false} />
      {
        (starterData.lowStarter !== 0 || starterData.moreStarter !== 0) ? (<>
          <div className='flex justify-center items-center gap-7 p-7 rounded-[8px] bg-custom-neutral-light min-h-[70vh]'>
            <div className='w-[70%]'>
              <img src="../assests/field.png" alt="field" className='w-[100%] h-[590px]' />
            </div>
            <div className='bg-custom-neutral-dark w-[30%] h-[590px] flex flex-col px-4 rounded-[7px]'>
              <div className='h-[70%]'></div>
              <div className='border-b border-b-custom-text-4 w-[100%] h-[2px] flex justify-center'></div>
              <div className='h-[30%]'></div>
            </div>
          </div>
          <ModalVariant
            isOpen={isStartersDataModal}
            onRequestClose={() => { setIsStarterDataModal(false) }}
            width='300px'
            height='300px'
            customStyles={{
              content: { width: '500px' },
            }}
          >
            <div className='flex flex-col gap-4 font-semibold px-4'>
              <div className='flex justify-center items-center gap-2'>
                <img src='../assests/warning.png' alt="warning" className='h-[20px]' />
                <div className='font-bold text-[22px]'>{starterData.lowStarter < starterData.moreStarter ? 'Not enough starters' : 'There are too many starters'}</div>
                {/* There are too many starters */}
              </div>
              <div className='text-[20px] flex justify-center text-center font-normal'>
                {/* Your team has too many starters for one or more of the positions in the 4-3-3 formation. */}
                {
                  starterData.lowStarter < starterData.moreStarter ?
                    'Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation'
                    :
                    'Your team has too many starters for one or more of the positions in the 4-3-3 formation.'
                }
              </div>
              <div className='grid grid-cols-3'>
                <div className='text-left px-8'>
                  Position
                </div>
                <div className='text-center'>Required</div>
                <div className='text-center'>Current</div>
              </div>
              {renderItems()}
            </div>
          </ModalVariant>
        </>) : (
          <>
            <div className='flex justify-center items-center gap-7 p-7 rounded-[8px] bg-custom-neutral-light min-h-[70vh]'>
              <div className='w-[70%] relative'>
                <PlayerFormationView positionObjectMap={positionObjectMap} formationData={formationData} setSelectedPlayer={setSelectedPlayer} />
              </div>
              <div className='bg-custom-neutral-dark w-[30%] h-[590px] flex flex-col px-6 rounded-[7px]'>
                <ShowPlayerStats selectedPlayer={selectedPlayer} />
              </div>
            </div>
          </>
        )
      }
    </div >
  )
}
export default FormationOverviewPage;