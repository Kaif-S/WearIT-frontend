import React from 'react'

const Payment = ({handleconfirm}) => {


  return (
    <div>
      <div>
            <label htmlFor="cardnumber" className="block mb-2.5 text-sm font-medium text-heading">Card number</label>
            <input name='card number' disabled type="text"  id='cardnumber' className="bg-neutral-secondary-medium outline-0 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="card number" value="1234-5678" />
        </div>
        <div className='mt-4'>
            <button onClick={handleconfirm} className=' px-4 py-2 w-fit h-fit bg-purple-500 text-white text-xl rounded-2xl mt-3 mx-auto'>Confirm Payment</button>
        </div>
    </div>
  )
}

export default Payment
