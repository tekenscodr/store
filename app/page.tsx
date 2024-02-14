import Image from 'next/image'
import Navbar from './components/Navbar'
import { getCurrentUser } from './lib/session'
import Container from './components/container/Container'

export default async function Home() {
  const user = await getCurrentUser()
  // console.log(user)
  return (
    <div className='px-5 max-w-[1280px] mx-auto'>
      <Navbar/>
      <hr />
      <div className="w-full h-[400px] items-center relative overflow-hidden mb-5 ">
        <Image
        src={'/mock up.jpg'}
        alt=''
        fill={true}
        className='object-contain shadow-md border border-gray-200'
        />
        
      </div>
      <h3 className="text-bold text-center text-lg text-blackish mb-5 mt-9">
          Valentine Donation Product
        </h3>
      <Container/>
    </div>
  )
}
