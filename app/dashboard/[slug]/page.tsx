import React from 'react'
import prisma from "@/app/prismadb"
import ImageGallery from '../ImageGallery'
import Info from '../Info'
import Review from '@/app/components/Review'
import ReviewSection from '../ReviewSection'
import { getServerSession } from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options"
import axios from 'axios'


type Props = {}

export default async function Page({params}:{params:{slug:string}}){
    const productId = parseInt(params.slug,10)
    const session = await getServerSession(options);
    const currentUserId = session?.user.id
    const product = await prisma.product.findUnique({
        where:{
            id:productId
        }
    })
    const postData = async () => {
        try{
            console.log('go')
        }catch(error){
            console.log(error)
        }
    }

    const urlString = product?.images
    return(
        <div className='max-w-[1280px] mx-auto px-3 py-3'>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col col-span-2'>
            <div className='font-semibold text-2xl mb-2'>
              <a href="/">NPP Store</a>
            </div>
            <hr />
            {product && (
              <div className='grid grid-cols-2 mt-10 gap-14'>
                {urlString && (
                  <ImageGallery imageUrls={urlString} />
                )}
              </div>
            )}
          </div>
      
          <div className='flex flex-col col-span-2 mb-20 mt-20'>
            <div className=' items-center space-x-5 mb-0 pt-7'>
              <span className='w-[5px] h-[30px] bg-purple-600 rounded-full inline-block'></span>
              <span className='font-medium text-xl'>Product Description</span>
            </div>
            {product && (
              <div className='flex'>
                <div className='flex flex-col justify-center mr-8'>
                  <div className='grid grid-cols-3 gap-5 mb-5'>
                    <div>
                      <h3 className='font-medium'>Category</h3>
                      <p className='text-sm text-purple-500'>{product.category}</p>
                    </div>
                    <div>
                      <h3 className='font-medium'>Dress Style</h3>
                    </div>
                    <div>
                      <h3 className='font-medium'>Store</h3>
                      <p className='text-sm text-purple-500'>{product.store}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className='font-medium'>Description</h3>
                    <p className='text-sm text-purple-500'>{product.description}</p>
                  </div>
                </div>
                <Review />
              </div>
            )}
          </div>
        </div>
      </div>
      
    )
}

