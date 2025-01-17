import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          doctors.slice(0, 2).map((item, index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-red-100' src={item.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-nwutral-800 font-semibold'> {item.name} </p>
                <p> {item.speciality} </p>
                <p className='text-zinx-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>  {item.address.line1} </p>
                <p className='text-xs'>  {item.address.line2} </p>
                <p className='text-sm mt-1'>  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25, July 2025 | 8:30 </p>
              </div>
              <div></div>
              <div className='flex flex-col justify-end gap-2'>
                <button className='hover:bg-blue-600 hover:text-white transiton-all duration-300 text-sm text-stone-500 text-center sm:min-2-48 py-2 border rounded'>Pay Online</button>
                <button className='hover:bg-primary hover:text-white transiton-all duration-300 text-sm text-stone-500 text-center sm:min-2-48 py-2 border rounded'>Cancel Appointment</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments