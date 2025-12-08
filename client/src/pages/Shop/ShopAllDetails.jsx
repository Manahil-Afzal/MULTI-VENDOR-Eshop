import React from 'react'
import Footer from '../../components/Layout/Footer'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import OrderDetails from '../../components/Shop/OrderDetails';


const ShopAllDetails = () => {
  return (
    <div>
       <DashboardHeader/>
          <OrderDetails/>
           <Footer/>  
    </div>
  )
}

export default ShopAllDetails
