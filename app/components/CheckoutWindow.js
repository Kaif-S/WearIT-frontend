"use client"
import React, {useState} from 'react'
import Shipping from './Shipping'
import Payment from './Payment';
import Review from './Review';
import { ShoppingCart , Banknote, PackageCheck} from 'lucide-react';
import { strapi } from '../lib/strapi';
import { useUser } from '@clerk/nextjs'

const CheckoutWindow = () => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [address, setAddress] = useState({addressLine1:"", addressLine2:"", country:""})
  const { user } = useUser();


  const handlepayment = async () => {
    let response = await strapi.placeOrder(user.id,address);
    console.log(response)
    if(response.status === 200){
      let cartRES = await strapi.UpdateCartOrderd(user.id);
      if(cartRES.status === 200){
        console.log("cart updated to ordered")
      }else{
        console.error("error updating cart status")
      }
      alert("order placed")
    }

    setCurrentPhase(currentPhase + 1)
    
  }

  const handleChange = (e) => {
  const { name, value } = e.target;
  
  // Use computed property names [name] to dynamically 
  // determine which key in the 'address' object to update.
  setAddress(prevAddress => ({
    ...prevAddress, // Spread the existing state
    [name]: value    // Update only the field corresponding to the input's 'name' attribute
  }));
};

  const checkoutFormPhase = [{name: 'Shipping',componentt:<Shipping value={address} Change={handleChange}/>,icon:<ShoppingCart/>}, {name: 'Payment',componentt:<Payment handleconfirm={handlepayment}/>,icon:<Banknote/>}, {name: 'Review',componentt:<Review/>,icon:<PackageCheck/>}]
  
  


  const nextPhase=()=>{
    if (currentPhase < checkoutFormPhase.length - 1){
    setCurrentPhase(currentPhase + 1)
    }else{
      setCurrentPhase(0)
    }
  }

  return (
    <div className='flex flex-col h-full justify-between p-6'>
      <div className='flex justify-between w-4/5 mx-auto relative items-center'>
        <div className='h-1 w-full absolute bg-gray-500 z-10'></div>
        <div style={{width:`${(currentPhase/(checkoutFormPhase.length-1)*100)}%`}} className={`h-1 transition-all duration-700 absolute bg-green-500 z-20 `}></div>
      {checkoutFormPhase.map((phase,index)=>{
        return <div key={index} className={`rounded-full transition-all duration-300 z-30 text-white size-14 text-xs flex justify-center items-center ${currentPhase==index&&"bg-blue-500"} ${currentPhase>index&&"bg-green-500"} ${currentPhase<index&&"bg-slate-400"}`}>{phase.icon}</div>
      })}
      </div>
      {checkoutFormPhase[currentPhase].componentt}
      {currentPhase<checkoutFormPhase.length-1?<button onClick={nextPhase} className='border border-gray-400 px-2 hover:bg-gray-300 w-fit align-bottom'>next</button>:<button className='border border-gray-400 px-2 hover:bg-gray-300 w-fit align-bottom' onClick={()=>setCurrentPhase(0)}>Finish</button>}
    </div>
  )
}

export default CheckoutWindow
