'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Size from '../components/Size'
import ImageUpload from '../components/ImageUpload'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { date } from 'zod'
import { on } from 'events'
import axios from 'axios'


type Props = {}
type FormFields = {
    name:string,
    address:string,
    email:string,
    user:string,
    amount:string,
}


const CheckoutForm = (props: Props) => {
    const {data:session} = useSession()
    const {register, handleSubmit, setError, reset, formState:{errors, isSubmitting}} = useForm<FormFields>()

    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        try {
            const savedData = localStorage.getItem('myData');
            const amountStr = localStorage.getItem('ecirp',)
            const newData = await {...data, 
                email:session?.user.email, 
                amount:amountStr,
                user: session?.user.id
            }
            axios.post("/api/webhooks/", newData)
            .then((response: any) => {
            // console.log(data)
            return response
            })
            .catch((error) => {
            console.log(error)
            return error
            })
            .finally(() => {
            console.log("Done!!")
        })
        //    reset()
        } catch (error) {
            console.log(error)
        }
    }
  return (
        <div className='px-5 max-w-[1280px] mx-auto mb-10'>
            <div>
                
            </div>
            <h1 className="text-3xl font-semibold py-6">Address Details</h1>
            {errors.root && (
                            <div className="text-red-500">{errors.root.message}</div>
                        )}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-black mt-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <label htmlFor="name" className='font-medium'>Name</label>
                        <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                        {...register('name', {
                            required: 'Name is required'
                        })}
                        />
                        {errors.name && (
                            <div className="text-red-500">{errors.name.message}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="address" className='font-medium'>Address</label>
                        <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                        {...register('address',{
                            required: 'Address is required'
                        })}
                        />
                        {errors.address && (
                            <div className="text-red-500">{errors.address.message}</div>
                        )}
                    </div>

                    {/* {isSubmitting && } */}
                    <div className="items-center">
                    <button type='submit' disabled={isSubmitting} className='bg-blue-800 p-4 border rounded-lg text-white text-medium w-[300px] disabled:bg-gray-500'>
                        {isSubmitting ? "Loading...": "Pay Now" }
                         </button>
                    </div>
                </div>
            </div>
            </form>
        </div>
      )


}
export default CheckoutForm
