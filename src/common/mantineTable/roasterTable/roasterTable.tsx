import { MantineProvider, Image, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
} from 'mantine-react-table';
import { ButtonVarient } from '../../buttonVariant/buttonVarient';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../../context/app-slice';
import { useRosterHook } from '../../../useHooks/apiHooks/useRosterHook/useRosterHook';
import { CircularProgress } from '@mui/material';
import { DeleteDataModal } from '../../../component/modal/deleteDataModal/deleteDataModal';

interface Player {
    id?: string,
    rosterName?: string;
    date?: string;
    imageUrl?: string;
    visibility?: boolean;
}

const RoasterTable = () => {
    const [openPopupRow, setOpenPopupRow] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    // const [roasterData, setRoasterData] = useState<Player[]>([]);
    const roasterData = useSelector((state: any) => state.app.roasterDetails) || [];
    const defaultRoasterDetails = useSelector((state: any) => state.app.defaultRoasterDetails) || [];

    const rosterTablePaginatedData = useSelector((state: any) => state.app.rosterTablePaginatedData) || [];

    const handlePopoverClick = (event: React.MouseEvent<HTMLElement>, rowIndex: string) => {
        setIsEditModalOpen(true);
        setAnchorEl(event.currentTarget);
        setOpenPopupRow(rowIndex);
    };
    const navigate = useNavigate();
    const { fetchRoasterData, loading,setLoading, deleteRoasterData } = useRosterHook();
    const columns = useMemo<MRT_ColumnDef<Player>[]>(() => [
        {
            accessorKey: 'rosterName',
            header: 'Roster Name',
            Cell: ({ row }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                        src={row.original.imageUrl}
                        width={20}
                        height={20}
                        radius="lg"
                        alt={row.original.rosterName}
                    />
                    <Text style={{ marginLeft: '10px' }}>{row.original.rosterName}</Text>
                </div>
            ),
            size: 1000,
            enableSorting: false,
            enableColumnActions: false
        },
        {
            accessorKey: 'date',
            header: 'Import Date',
            enableSorting: true,
            // size: 0
        },
        {
            accessorKey: 'visibility',
            header: '',
            Cell: ({ row }) => (
                <>
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                            handlePopoverClick(e, row?.original?.id || '');
                        }}
                    >{
                            loading ?
                                <CircularProgress />
                                :
                                <ButtonVarient text="Delete Import" variant={'custom'} />
                        }
                    </div>
                </>
            ),
            size: 50,
            enableSorting: false,
            enableColumnActions: false,
        },
    ], [openPopupRow]);
    const dispatch = useDispatch();
    const table = useMantineReactTable({
        columns,
        data: rosterTablePaginatedData,
        enableTopToolbar: false,
        enableBottomToolbar: false,
        icons: {
            IconColumns: (props: any) => (
                <div className='flex justify-center items-center w-[25px] h-[22px] rounded-[4px] px-[2px] bg-custom-neutral-light'  {...props}>!</div>
            ),
        },
        mantinePaperProps: () => ({
            style: {
                border: '0px',
                backgroundColor: 'rgba(45, 45, 45, 1)',
            },
        }),
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
                <Text size="sm">You do not have any Rosters imported</Text>
            </div>
        ),
        mantineTableBodyCellProps: ({ cell, row }) => {
            const isLastColumn = cell.column.id === columns[columns.length - 1].accessorKey;
            return {
                style: {
                    // color: 'white',
                    fontWeight: '600',
                    backgroundColor: 'rgba(45, 45, 45, 1)',
                    padding: '10px 20px',
                    border: 'none',
                    margin: '10px 10px',
                    borderRadius:
                        cell.column.id === 'rosterName'
                            ? '10px 0px 0px 10px'
                            : Object.keys((rosterTablePaginatedData || [{}])[0])[Object.keys((rosterTablePaginatedData || [{}])[0]).length - 1] === cell.column.id ? '0px 10px 10px 0px' : '0px 0px 0px 0px',
                },
                onClick: isLastColumn
                    ? undefined
                    : async () => {
                        console.log("Row clicked:", row.original);
                        dispatch(appActions.updateFileDetails(row.original));
                        await fetch(`${process.env.REACT_APP_API_ENDPOINT}/roster/${row.original.id}`, {
                            method: "get",
                        })
                            .then((res) => res.json())
                            .then(async (res) => {
                                const newData = res[0]?.players?.map((item: any) => ({
                                ...item,
                                    visibility: true,
                                }));
                                dispatch(appActions.updatePlayerDetails(newData));
                                dispatch(appActions.updateDefaultPlayerDetails(newData));
                                navigate(`/roaster-details/${row.original.id}`);
                            })
                            .catch((err) => {
                                console.error("Error:", err);
                            });
                    },
            }
        },
        enableTableHead: true,
        mantineTableHeadCellProps: () => ({
            style: {
                // color: 'white',
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
        mantineTableBodyRowProps: ({ row, }) => {

            return {
                style: {
                    backgroundColor: '#333',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    cursor: 'pointer'
                },

            };
        },
    });
    useEffect(() => {
        fetchRoasterData();
    }, [])
    const handleDeleteFile = async () => {
        let newRoasterData = [];
        setLoading(true);
        newRoasterData = defaultRoasterDetails.filter((item: any, index: number) => {
            return (openPopupRow !== item.id);
        })
        dispatch(appActions.updateRoasterDetils(newRoasterData));
        dispatch(appActions.updateDefaultRoasterDetails(newRoasterData));
        await deleteRoasterData(openPopupRow);
        setIsEditModalOpen(false);
        setLoading(false);
    }
    return (
        <>
            <MantineProvider
                theme={{
                    colorScheme: 'dark',
                    globalStyles: () => ({
                        body: {},
                    }),
                }}
            >
                <MantineReactTable table={table} />
            </MantineProvider>
            <DeleteDataModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                handleChange={handleDeleteFile}
                id={openPopupRow}
                data={roasterData}
                loading={loading}
            />
        </>
    );
};

export default RoasterTable;
