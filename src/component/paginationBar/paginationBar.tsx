import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../context/app-slice';

export const PaginationBar = ({ isRoster = false, itemsPerPageOptions = [20, 50, 100] }) => {
  const playerData = useSelector((state: any) => state.app.playerDetails);
  // const memoizedPlayerData = useMemo(() => playerData || [], [playerData]);
  const roasterData = useSelector((state: any) => state.app.roasterDetails);
  // const memoizedRoasterData = useMemo(() => roasterData || [], [roasterData]);
  let totalItems = !isRoster ? playerData.length : roasterData.length;
  const [currentPage, setCurrentPage] = useState(totalItems === 0 ? 0 : 1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const dispatch = useDispatch();



  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min((totalItems===1?1:currentPage) * itemsPerPage, totalItems);

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleItemsPerPageChange = (e: any) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  useEffect(() => {
    const start = startItem - 1 < 0 ? 0 : startItem - 1;
    const paginatedData = roasterData.slice(start, endItem);
console.log(roasterData,start, endItem,'pagiation')
    dispatch(appActions.updateRosterTablePaginatedDetails(paginatedData));
  }, [roasterData, currentPage, itemsPerPage, startItem, endItem]);

  useEffect(() => {
    const start = startItem - 1 < 0 ? 0 : startItem - 1;
    const paginatedData = playerData.slice(start, endItem);
    dispatch(appActions.updatePlayerTablePaginatedDetails(paginatedData));
  }, [playerData, currentPage, itemsPerPage, startItem, endItem]);
  return (
    <div className='flex justify-between items-center border-b border-custom-text-3 pb-2 font-semibold'>
      <div className='flex justify-center items-center gap-2'>
        <div>Show</div>
        <div>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className='w-[56px] rounded-[8px] p-[1px] border-[1px] border-custom-text-3 bg-custom-neutral-dark'
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          {startItem}-{endItem} of {totalItems} items
        </div>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <div onClick={handleFirstPage} className='cursor-pointer'>
          <KeyboardDoubleArrowLeft />
        </div>
        <div onClick={handlePrevPage} className='cursor-pointer'>
          <KeyboardArrowLeft />
        </div>
        <div className='flex justify-center items-center gap-2'>
          <div>Page</div>
          <div className='flex justify-center items-center w-[25px] rounded-[8px] p-[1px] border-[1px] border-custom-text-3 bg-custom-neutral-dark'>
            {currentPage}
          </div>
          <div>of</div>
          <div>{totalPages}</div>
        </div>
        <div onClick={handleNextPage} className='cursor-pointer'>
          <KeyboardArrowRight />
        </div>
        <div onClick={handleLastPage} className='cursor-pointer'>
          <KeyboardDoubleArrowRight />
        </div>
      </div>
    </div>
  );
};
