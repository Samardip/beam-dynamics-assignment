import { MantineProvider, Image, Text } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import {
  MantineReactTable,
  MRT_PaginationState,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ButtonVarient } from '../../buttonVariant/buttonVarient';
import { ImportRoasterModal } from '../../../component/modal/importRosterModal/importRoasterModal';
import { useDispatch, useSelector } from 'react-redux';
import ModalVariant from '../../modalVariant/modalVariant';
import { Delete, Edit } from '@mui/icons-material';
import { DeleteDataModal } from '../../../component/modal/deleteDataModal/deleteDataModal';
import { EditPlayerDataModal } from '../../../component/modal/editPlayerDataModal/editPlayerDataModal';
import { appActions } from '../../../context/app-slice';

interface Player {
  id?: string;
  goals?: number | null;
  saves?: number;
  fileId?: string;
  height?: number;
  weight?: number;
  assists?: number | null;
  flagImg?: string;
  starter?: boolean;
  position?: string;
  createdAt?: string;
  playerImg?: string;
  updatedAt?: string;
  playerName?: string;
  appearances?: number;
  cleanSheets?: number;
  nationality?: string;
  jerseyNumber?: number;
  minutesPlayed?: number;
}


const PlayerTable = () => {
  const [openPopupRow, setOpenPopupRow] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handlePopoverClose = () => {
    setOpenPopupRow('');
    setAnchorEl(null);
  };
  const handlePopoverClick = useCallback((event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setIsActionModalOpen(true);
    setAnchorEl(event.currentTarget);
    setOpenPopupRow(rowId);
  }, [openPopupRow]);
  const playerData = useSelector((state: any) => state.app.playerDetails) || [];
  const defaultPlayerDetails = useSelector((state: any) => state.app.defaultPlayerDetails) || [];

  const playerTablePaginatedData = useSelector((state: any) => state.app.playerTablePaginatedData)||[];

  const RederColumnVisibility = useCallback(() => {
    if (playerData[0]) {
      return <div className='w-[250px] bg-custom-neutral-dark p-4 flex flex-col'>
        <div className={`flex justify-between items-center pb-3`}>
          <div className="font-semibold text-custom-text-2 text-[20px]">Columns</div>
          {/* <Close className="!text-custom-text-2 !w-[18px] !h-[18px] cursor-pointer" 
        onClick={onRequestClose} 
        /> */}
        </div>
        <input placeholder='Search...' className='h-[44px] w-[100%] px-[35px] text-custom-text-3 rounded-[8px] bg-custom-neutral-dark border-[1px] border-custom-text-4' />
        <span className="input-icon-addon relative bottom-[32px] left-[5px] flex w-[25px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search text-custom-text-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
          </svg>
        </span>
        {
          Object.keys(playerData[0])?.map((item, index) => {
            let columns = [
              "playerName",
              "jerseyNumber",
              "starter",
              "position",
              "height",
              "weight",
              "nationality",
              "appearance"
            ];
            if (columns.includes(item)) {
              return (
                <div className='flex w-[100%] justify-start items-center gap-4 text-custom-text-3 font-semibold' key={index}>
                  <span className="input-group-text flex justify-center items-center w-[15px] h-[15px]">
                    <input
                      className="form-check-input m-0 w-[100%] h-[100%] bg-custom-primary-1"
                      type="checkbox"
                      checked
                    />
                  </span>
                  <div>{item}</div>
                </div>
              )
            }
          })
        }
        <div className='flex justify-end items-center gap-2 mt-[10px]'>
          <ButtonVarient variant='custom' text={'Cancel'} className='!h-[40px] !min-w-[20px] !text-[15px]' />
          <ButtonVarient text={'Confirm'} className='!h-[40px] !min-w-[20px] !text-[15px]' />
        </div>
      </div>
    }
    else {
      return <></>
    }
  }, [playerData]);
  const columns = useMemo<MRT_ColumnDef<Player>[]>(() => [
    {
      accessorKey: 'playerName',
      header: 'Player Name',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={row.original.flagImg}
            width={30}
            height={30}
            radius="lg"
            alt={row.original.playerName}
          />
          <Text style={{ marginLeft: '10px' }}>{row.original.playerName}</Text>
        </div>
      ),
      size: 300,
      enableSorting: false,
    },
    {
      accessorKey: 'jerseyNumber', header: 'Jersey Number', enableSorting: false,
      size: 10
    },
    {
      accessorKey: 'starter',
      header: 'Starter',
      Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
      enableSorting: false,
      size: 10
    },
    {
      accessorKey: 'position', header: 'Position', enableSorting: false,
      size: 10
    },
    {
      accessorKey: 'height', header: 'Height', enableSorting: false,
      size: 10
    },
    {
      accessorKey: 'weight', header: 'Weight', enableSorting: false,
      size: 10
    },
    {
      accessorKey: 'nationality', header: 'Nationality', enableSorting: false,
      size: 10
    },
    {
      accessorKey: 'appearances', header: 'Appearances', enableSorting: false,
      size: 10
    },
    {
      accessorKey: 'visibility',
      header: '',
      renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
        RederColumnVisibility()
      ),
      Cell: ({ row }) => (
        <>
          <div
            className="flex items-center justify-center cursor-pointer w-[20px] h-[35px]"
            onClick={(e) => handlePopoverClick(e, row.original.id || '')} // Set the row index on click
          >
            <Image
              src={'../assests/moreIcon.png'}
              width={'10px'}
              alt="More Options"
            />
          </div>
        </>
      ),
      size: 50,
      enableSorting: false,
      enableColumnActions: true,
    },
  ], [RederColumnVisibility, openPopupRow, handlePopoverClick]);

  const table = useMantineReactTable({
    columns,
    data: playerTablePaginatedData,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    manualPagination:true,
    onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    state: {
      pagination,
    },
    renderEmptyRowsFallback: () => (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#bbb',
        padding: '40px',
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
        <div onClick={() => { setModalOpen(true) }}>
          <ButtonVarient text={'Go to Import List Page'} variant='custom' className='!h-[47px] !bg-custom-neutral-dark' />
        </div>
      </div>
    ),
    mantinePaperProps: () => ({
      style: {
        border: '0px',
        backgroundColor: 'rgba(45, 45, 45, 1)',
      },
    }),
    mantineTableBodyCellProps: ({ cell, row }: any) => ({
      style: {
        color: 'white',
        backgroundColor: 'rgba(45, 45, 45, 1)',
        padding: '10px 20px',
        border: 'none',
        margin: '10px 10px',
        borderRadius:
          cell.column.id === 'playerName'
            ? '10px 0px 0px 10px'
            : Object.keys((playerTablePaginatedData||[{}])[0])[Object.keys((playerTablePaginatedData||[{}])[0]).length - 1] === cell.column.id ? '0px 10px 10px 0px' : '0px 0px 0px 0px',
      },
    }),
    enableTableHead: true,
    mantineTableHeadCellProps: () => ({
      style: {
        color: 'white',
        backgroundColor: 'rgba(34, 34, 34, 1)',
        padding: '20px',
        border: '0px',
      },
    }),
    mantineTableContainerProps: () => ({
      style: {
        overflow: 'auto',
        scrollbarWidth: 'none',
      },
      className: 'hide-scrollbar',
    }),
    mantineTableProps: {
      style: {
        backgroundColor: 'rgba(34, 34, 34, 1)',
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
      },
    },
    mantineTableBodyRowProps: () => ({
      style: {
        backgroundColor: '#333',
        borderRadius: '8px',
        marginBottom: '8px',
      },
    }),
  });
  const handleChangeEditData = async (data: any) => {
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/roster`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data.id,
        playerName: data.playerName,
        jerseyNumber: data.jerseyNumber,
        height: data.height,
        weight: data.weight,
        nationality: data.nationality,
        position: data.position,
        starter: data.starter==='no'?false:true
      })
    }).then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res,'deleted res');
      let newPlayerData=[];
      newPlayerData=defaultPlayerDetails.map((item: any) => {
          if (data.id === item.id) {
            return {
              ...data,
              starter:data.starter==='no'?false:true
            }
          } else {
            return item;
          }
        })
      dispatch(appActions.updatePlayerDetails(newPlayerData));
      dispatch(appActions.updateDefaultPlayerDetails(newPlayerData));

      setIsActionModalOpen(false);
      setIsEditOpenModal(false);
    }).catch((err) => {
      setErrorMessage(err.message)
    })
  }
  const deleteRoasterData = async () => {
    // setLoading(true);
    let newPlayerData = [];
    newPlayerData = defaultPlayerDetails.filter((item: any) => {
      return item.id !== openPopupRow;
    })
    dispatch(appActions.updatePlayerDetails(newPlayerData));
        dispatch(appActions.updateDefaultPlayerDetails(newPlayerData));

    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/roster/${openPopupRow}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then(async (res) => {
        setIsActionModalOpen(false);
        setIsDeleteModalOpen(false);
      }).catch((err) => {

      }).finally(() => {
        // setLoading(false);

      })
  }
  return (
    <>
      <MantineProvider
        theme={{
          colorScheme: 'dark',
          globalStyles: () => ({
            body: {
              // mantine-Menu-dropdown{
              //   padding: '0rem !important';
              //   }
            },

          }),
        }}
      >
        <MantineReactTable table={table} />
      </MantineProvider>
      <ImportRoasterModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <ModalVariant
        isOpen={isActionModalOpen}
        onRequestClose={() => {
          setIsActionModalOpen(false)
        }}
        title="Actions"
        isTitleAndClose={true}
        isTitleBorder={false}
        width='150px'
        height='150px'
        customStyles={{
          content: { width: '250px' },
        }}
      >
        <div className='flex flex-col justify-center items-center gap-2'>
          <div
            onClick={() => { setIsEditOpenModal(true) }}
            className='flex justify-start items-center gap-4 w-[100%] p-[12px] rounded-[4px] cursor-pointer hover:bg-custom-neutral-dark'>
            <Edit />
            <div className='text-md font-semibold'>Edit Player</div>
          </div>
          <div
            onClick={() => { setIsDeleteModalOpen(true) }}
            className='flex justify-start items-center gap-4 w-[100%] p-[12px] rounded-[4px] cursor-pointer hover:bg-custom-neutral-dark'>
            <Delete />
            <div className='text-md font-semibold'>Delete Player</div>
          </div>
        </div>
      </ModalVariant>
      <DeleteDataModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        id={openPopupRow}
        data={playerData}
        handleChange={() => { deleteRoasterData() }}
      />
      <EditPlayerDataModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditOpenModal}
        data={(playerData.filter((item: any) => item.id === openPopupRow) || [{}])[0]}
        handleChange={handleChangeEditData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default PlayerTable;
