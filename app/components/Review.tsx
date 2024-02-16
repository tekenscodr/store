'use client'
import React, {useEffect, useState} from 'react'
import ReactStars from "react-rating-star-with-type"
import axios from 'axios'
import { useRouter } from 'next/navigation'
type Props = {
    productId?:number
    userId?:number
}

const Review = ({productId,userId}: Props) => {
    const router = useRouter()
    const product = localStorage.getItem('product');
    const customer = localStorage.getItem('customer')
    console.log(product)
    const parsedProduct = product ? parseInt(product, 10) : undefined;
    const parsedCustomer = customer ? parseInt(customer, 10) : undefined;
    useEffect(() => {
        // Save the current URL before redirecting to the login page
        sessionStorage.setItem('prevPage', window.location.pathname);
      }, []);
    const postData = async () => {
        try{
            console.log(parsedCustomer);
            if (!parsedCustomer) {
                router.push("/signin");
                return; // Stop further execution
            } await axios.post('/api/cart', {
                productId: parsedProduct,
                userId: parsedCustomer
            })
            .then((response) =>{
                router.push('/cart')
                console.log(response.data)
            })
            
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
         <button className='px-5 p-2 border-[1px] bg-blue-600 text-white rounded-lg mt-5' onClick={postData}>Add To Cart</button>
    </div>
  )
}

export default Review