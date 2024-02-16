'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Modal from './Modal'
import CheckoutForm from '../checkout/checkoutForm'


const Button = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const onCheckout = async () => {
        setOpen(true);    
    }
    
    const handleFormSubmit = async () => {
        // Close the modal
        setOpen(false);

        // Perform any action after form submission if needed
    };
   
  return (
    <>
    <div className='flex items-center justify-center mt-20 cursor-pointer'>
        <span onClick={onCheckout} className='px-10 p-2 text-white bg-blue-600 rounded-full'>
            Checkout
        </span>
    </div>

    <CheckoutForm open={open} onClose={() => setOpen(false)} onFormSubmit={handleFormSubmit}>
    {/* Render your form or any other content inside the modal */}
        <Modal />
    </CheckoutForm>
</>
  )
}

export default Button