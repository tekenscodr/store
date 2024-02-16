// Page.tsx
import React from 'react'
import prisma from "@/app/prismadb"
import ImageGallery from '../ImageGallery'
import Review from '@/app/components/Review'
import Session from '@/app/components/Session'
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options"

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const productId = parseInt(params.slug, 10)
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })

  const urlString = product?.images
  const productPrice = product?.price
  return (
    <div className='max-w-[1280px] mx-auto px-3 py-3'>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col col-span-2'>
          <div className='font-semibold text-2xl mb-2'>
            <a href="/">NPP Store</a>
          </div>
          <hr />
        </div>

        <div className='flex flex-row col-span-2 mb-20 mt-20'>
          <div className='flex'>
            {product && (
              <div className='grid grid-cols-2 mt-10 gap-14'>
                {urlString && (
                  <ImageGallery imageUrls={urlString} />
                )}
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <div className=' items-center space-x-5 mb-10 pt-7'>
              <span className='w-[5px] h-[30px] bg-blue-600 rounded-full inline-block'></span>
              <span className='font-medium text-xl '>Product Details</span>
            </div>
            {product && (
              <div className='flex'>
                <div className='flex flex-col justify-center mr-8'>
                  <div className='grid grid-cols-3 gap-5 mb-5'>
                    <div>
                      <h3 className='font-medium'>Category</h3>
                      <p className='text-sm text-blue-500'>{product.category}</p>
                    </div>
                    <div>
                      <h3 className='font-medium'>Store</h3>
                      <p className='text-sm text-blue-500'>{product.store}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className='font-medium'>Description</h3>
                    <p className='text-sm text-blue-500'>{product.description}</p>
                  </div>
                </div>
              </div>
            )}
            <Review />
          </div>

        </div>
      </div>
      <Session
        productId={productId}
        price={productPrice || 0} />
    </div>

  )
}
