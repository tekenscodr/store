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
    title:string,
    description:string,
    category:string,
    style:string,
    size:string,
    inventory:number,
    color: string,
    price:number
    images:string,
    userId:string,
    store:string,
}

const ProductForm = (props:Props) => {
    const {register, handleSubmit, setError, reset, formState:{errors, isSubmitting}} = useForm<FormFields>()

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve,1000))
            const raw_image = await data.images[0]
            const formData = new FormData()
            formData.append('file', raw_image)
            formData.append('upload_preset', 'npp_shop')

            //Uplpoad to Cloudinary
            try {
               const upload = await fetch('https://api.cloudinary.com/v1_1/dpmt9uqts/image/upload', {
                method: "POST",
                body: formData,
               })
               if(!upload.ok){
                throw new Error('Something went wrong')
               }
               const imageData = await upload.json()
               const imageUrl = await imageData.secure_url;
               const productData = {...data, images:imageUrl}
               
                axios.post("/api/addproduct/", productData)
               .then((response: any) => {
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
            // Cloudinary stuff
            // name:npp_shop
            // cloudname: dpmt9uqts
        } catch (error) {
            
        }
    }
  return (
    <div className='px-5 max-w-[1280px] mx-auto mb-10'>
        <div>
            
        </div>
        <h1 className="text-3xl font-semibold py-6">Add Product</h1>
        {errors.root && (
                        <div className="text-red-500">{errors.root.message}</div>
                    )}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-black mt-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div>
                    <label htmlFor="title" className='font-medium'>Title</label>
                    <input 
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                    {...register('title', {
                        required: 'Title is required'
                    })}
                    />
                    {errors.title && (
                        <div className="text-red-500">{errors.title.message}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="category" className='font-medium'>Category</label>
                    <input 
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                    {...register('category',{
                        required: 'Category is required'
                    })}
                    />
                    {errors.category && (
                        <div className="text-red-500">{errors.category.message}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="size" className='font-medium'>Size</label>
                    <input 
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                    {...register('size',{
                        required: 'Size is required'
                    })}
                    />
                    {errors.size && (
                        <div className="text-red-500">{errors.size.message}</div>
                    )}
                    {/* <Size setFormData={setFormData}/> */}
                </div>
                <div>
                    <label htmlFor="inventory" className='font-medium'>Inventory</label>
                    <input 
                    type="number"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                    {...register('inventory', {
                        required: 'Inventory is required',
                        valueAsNumber: true 
                    })}
                    />
                    {errors.inventory && (
                        <div className="text-red-500">{errors.inventory.message}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="store" className='font-medium'>Store</label>
                    <input 
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                    {...register('store', {
                        required: 'Store is required'
                    })}
                    />
                    {errors.store && (
                        <div className="text-red-500">{errors.store.message}</div>
                    )}

                </div>
                <div>
                    <label htmlFor="color" className='font-medium'>Color</label>
                    <input 
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                    {...register('color', {
                        required: 'Color is required'
                    })}
                    />
                    {errors.color && (
                        <div className="text-red-500">{errors.color.message}</div>
                    )}

                </div>
                <div>
                    <label htmlFor="price" className='font-medium'>Price</label>
                    <input 
                    type="number"
                    prefix='GHC'
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-blue-500 px-3 focus:border-2 outline-none '
                    {...register('price', {
                        required: 'Price is required',
                        valueAsNumber: true 
                    })}
                    />
                    {errors.price && (
                        <div className="text-red-500">{errors.price.message}</div>
                    )}

                </div>
                <div>
                    <label htmlFor="description" className='font-medium'>Description</label>
                    <input 
                    type="text"
                    className='w-full h-[100px] border-[1px] rounded-lg focus:border-blue-500 focus:border-2 outline-none '
                    {...register('description', {
                        required: 'Description is required'
                    })}
                    />
                    {errors.description && (
                        <div className="text-red-500">{errors.description.message}</div>
                    )}

                </div>
                <div>
                <label htmlFor="images" className="mt-10 inline-block font-medium">Upload images</label>
                <input 
                type="file" 
                {...register('images',{
                    required:"images is required"
                    })}/>

                </div>
                {/* {isSubmitting && } */}
                <button type='submit' disabled={isSubmitting} className='bg-blue-800 p-4 border rounded-lg text-white text-medium w-[100px] disabled:bg-gray-500'>
                    {isSubmitting ? "Loading...": "Submit" }
                     </button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default ProductForm
