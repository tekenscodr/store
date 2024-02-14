import React from 'react'
import {AiOutlineHeart} from "react-icons/ai"
import Link from 'next/link'
import prisma from "@/app/prismadb"
import Image from 'next/image'

type Props = {}

const Item = async (props: Props) => {
    const products = await prisma.product.findMany()
    // console.log(products)
    if(products.length === 0){
        return(
            <div>empty</div>
        )
    }
    return(
        <div>
            <h1 className='py-3 text-xl '></h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center md:gap-20 gap-12 '>
  {products.map((product) => (
    <div key={product.id} className="rounded-lg shadow-md border w-[320px] border-gray-200 p-4 cursor-pointer">
      <Link href={`/dashboard/${product.id}`}>
        <div className='w-[250px] h-[250px] relative overflow-hidden rounded-lg'>
          <Image 
            src={product.images}
            alt={product.title}
            fill={true}
            className='object-cover'
          />
        </div>
      </Link>
      <div className='flex items-center justify-between mt-4'>
        <div>
          <h1 className='text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden'>{product.title}</h1>
          <p className='text-[13px] opacity-60'>{product.store}</p>
        </div>
        <span className='px-2 font-medium bg-gray-100 rounded-lg'>GHC{product.price}.00</span>
      </div>
    </div>
  ))}
</div>

        </div>
    )
}

export default Item