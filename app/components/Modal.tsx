import React, { useEffect, useState } from 'react'
import CheckoutForm from '../checkout/checkoutForm'

const Modal = () => {
    const [open, setOpen] = useState(false);

    const handleFormSubmit = async () => {
        // Close the modal
        setOpen(false);

      };
      useEffect(() => {
 
        handleFormSubmit();
      }, []);
    return(
        <></>
    )
}

export default Modal
