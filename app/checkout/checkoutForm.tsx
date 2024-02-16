'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios'
import { useRouter } from 'next/navigation';


type Props = {}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    onFormSubmit: () => void;
    children: React.ReactNode;
  }
  
type FormFields = {
    name: string,
    address: string,
    email: string,
    user: string,
    product: string,
    amount: string,
}

const CheckoutForm: React.FC<ModalProps> = ({ open, onClose, onFormSubmit, children }) => {

    const { data: session } = useSession()
    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<FormFields>()
    const productId = localStorage.getItem('product');
    const amountStr = localStorage.getItem('price')
    const customer = localStorage.getItem('customer')
    const email = localStorage.getItem('userEmail')
    const name = localStorage.getItem("name");
    const router = useRouter();
    const [newData, setNewData] = useState<FormFields>({
        name: "",
        address: "",
        email: "",
        user: "",
        product: "",
        amount: ""
    });
    const modalBackdropClasses = open
    ? 'fixed inset-0 flex justify-center items-center visible bg-black bg-opacity-25 backdrop-blur-sm z-[1000]'
    : 'invisible hidden';

    const modalContentClasses = 'bg-white p-4';

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
      };
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
           
            const updatedData = {
                ...data,
                name:name||"",
                email: email||"",
                amount: amountStr || "",
                user: customer || "",
                product: productId || ""
            };

            setNewData(updatedData);
            console.log(updatedData)
            // Send the form data to the server
            await axios.post("/api/webhook/", updatedData)
            .then((response)=> {
                router.push(response.data.data.authorization_url)
                console.log(response.data.data.authorization_url)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={modalBackdropClasses} onClick={onClose}>
        <div className={modalContentClasses} onClick={stopPropagation}>

        <div className='px-5 max-w-[1280px] mx-auto mb-10'>
            <div>
                <h1 className="text-3xl font-semibold py-6">Payment Details</h1>
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
                                    disabled
                                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                                    {...register('name', {
                                    })}
                                    defaultValue={name || ""}
                                />
                                {errors.name && (
                                    <div className="text-red-500">{errors.name.message}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className='font-medium'>Email</label>
                                <input
                                    type="text"
                                    disabled
                                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                                    {...register('email', {
                                    })}
                                    defaultValue={email|| ""}
                                />
                              
                            </div>
                            <div>
                                <label htmlFor="amount" className='font-medium'>Amount</label>
                                <input
                                    type="text"
                                    disabled
                                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                                    {...register('amount', {
                                    })}
                                    defaultValue={amountStr|| ""}
                                />
                            
                            </div>
                            <div>
                                <label htmlFor="address" className='font-medium'>Address</label>
                                <input
                                    type="text"
                                    className=' w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                                    {...register('address', {
                                        required: 'Address is required'
                                    })}
                                   
                                />
                                {errors.address && (
                                    <div className="text-red-500">{errors.address.message}</div>
                                )}
                            </div>
                            <div className="items-center">
                                <button type='submit' disabled={isSubmitting} className='bg-blue-800 p-4 border rounded-lg text-white text-medium w-[300px] disabled:bg-gray-500'>
                                    {isSubmitting ? "Loading..." : "Pay Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    )
}

export default CheckoutForm
