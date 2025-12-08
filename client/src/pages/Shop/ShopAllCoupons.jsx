import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllCoupons from "../../components/Shop/AllCoupons"
import Toast from 'react-hot-toast';

const ShopAllCoupons=()=> {
  return (
     <div>
        <DashboardHeader/>
        <div className='flex  justify-center w-full'>
             <div className='w-[80px] 800:w-[330px]'>
                 <DashboardSideBar active={9} />
             </div>
             <div className="w-full justify-center flex">
                <AllCoupons />
                <Toast />
             </div>
        </div>
    </div>
  )
}

export default ShopAllCoupons;
