import React from 'react'
import SidePanel from '../../component/sidePanel/sidePanel';
import { Outlet } from 'react-router-dom';

const LayoutContainer = () => {
  return (
    <div className='flex text-custom-text-3 min-h-screen'>
      <div className='w-[5%] bg-black pt-6'>
        <SidePanel />
      </div>
      <div className='w-[95%] px-[50px] bg-custom-neutral-dark'>
        <Outlet />
      </div>
    </div>
  )
}
export default LayoutContainer;