'use client'
import React, {useState} from 'react'
import ReactStars from "react-rating-star-with-type"
import axios from 'axios'
import { useRouter } from 'next/navigation'
type Props = {
    productId?:number
    userId?:number
}

const Review = ({productId,userId}: Props) => {
    const router = useRouter()
    const defaultReviwForm = {
        star:0,
        comment:'',
        productId:productId,
        userId:userId
    }

    const [reviewForm, setReviewForm] = useState(defaultReviwForm)

    const onChange = (nextValue:any) => {
        setReviewForm(prevState => ({...prevState,star:nextValue}))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setReviewForm(prevState => ({...prevState,[name]:value}))
    }

    const postData = async () => {
        try{
            router.push('/checkout')
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
         <button className='px-5 p-2 border-[1px] bg-purple-600 text-white rounded-lg mt-5' onClick={postData}>Checkout</button>
    </div>
  )
}

export default Review