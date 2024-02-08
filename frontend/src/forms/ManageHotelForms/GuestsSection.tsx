import React from 'react'
import { HotelFormData } from './ManageHotelForm'
import { useFormContext } from 'react-hook-form'
const GuestsSection = () => {
    const {register , 
            formState :{errors}} = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className='text-3xl font-bold mb-3'>Guests</h2>
      <div className='grid grid-cols-2 p-6 gap-5 bg-gray-300'>
        <label className='text-gray-700 text-sm font-semibold'>
            Adults
            <input className='border rounded w-full py-2 px-3 font-normal'
            type='number'
            min = {1} 
            {...register("adultCount", {
                required : "This a required field",
            })}
            />
            {errors.adultCount?.message && (
        <span className='text-sm text-red-500 font-bold'>{errors.adultCount.message}</span>
         )}
        </label>


        <label className='text-gray-700 text-sm font-semibold'>
            Children
            <input 
            className='border rounded w-full py-2 px-3 font-normal'
            type='number'
            min = {0} 
            {...register("childCount")}
            />
            {errors.childCount?.message && (
        <span className='text-sm text-red-500 font-bold'>{errors.childCount.message}</span>
         )}
        </label>
      </div>
      
    </div>
  )
}

export default GuestsSection
