"use client"
import React from 'react'

const Shipping = ({value,Change}) => {
  return (
    <div className='gap-4 flex flex-col'>
        <div>
            <label htmlFor="address-line-1" className="block mb-2.5 text-sm font-medium text-heading">Address line 1</label>
            <textarea name='addressLine1' value={value.addressLine1} onChange={Change} rows={2} type="text" autoComplete="address-level1" id='address-line-1' className="bg-neutral-secondary-medium outline-0 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="123 Main Street, Anytown, CA 90210" required />
        </div>
        <div>
            <label htmlFor="address-line-2" className="block mb-2.5 text-sm font-medium text-heading">Address line 2</label>
            <textarea name='addressLine2' value={value.addressLine2} onChange={Change} rows={2} type="text" autoComplete="address-level2" id='address-line-2' className="bg-neutral-secondary-medium outline-0 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="123 Main Street, Anytown, CA 90210" required />
        </div>
        <div>
            <label htmlFor="country" className="block mb-2.5 text-sm font-medium text-heading">Country</label>
            <input name='country' type="text" value={value.country} onChange={Change} autoComplete="country" id='country' className="bg-neutral-secondary-medium outline-0 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Country" required />
        </div>
    </div>
  )
}

export default Shipping
