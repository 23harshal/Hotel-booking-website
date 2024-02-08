
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import * as apiClient from "../api-client"
import {BsBuilding, BsMap} from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'
const MyHotels = () => {
    const {data: hotelData} = useQuery("fetchMyHotels", 
    apiClient.fetchMyHotels , {
        onError : () => {

        }
    })

    if(!hotelData){
        return <span>No Hotels found</span>
    }
  return (
    <div className='space-y-5'>
        <span className='flex justify-between'>
            <h1 className='text-3xl font-bold'>My Hotels</h1>
            <Link to = "/add-hotel"
            className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-400'>
                Add Hotel
            </Link>
        </span>
        <div className='grid grid-cols-1 gap-8'>
            {
                hotelData.map((hotel) =>(
                    <div className='flex flex-col justify-between border border-emerald-600 rounded-lg p-8 gap-5'>
                        <h2 className='text-wxl font-bold'>{hotel.name}</h2>
                        <div className='whitespace-pre-line'>
                            {hotel.description}
                        </div>
                        <div className='grid grid-cols-5 gap-2'>
                            <div className='border border-slate-300 p-3 rounded-sm flex items-center'>
                                <BsMap className='mr-1'/>
                                {hotel.city} , {hotel.country}
                            </div>
                            <div className='border border-slate-300 p-3 rounded-sm flex items-center'>
                                <BsBuilding className='mr-1'/>
                                {hotel.type}
                            </div>
                            <div className='border border-slate-300 p-3 rounded-sm flex items-center'>
                                <BiMoney className='mr-1'/>
                                {hotel.pricePerNight} per night
                            </div>
                            <div className='border border-slate-300 p-3 rounded-sm flex items-center'>
                                <BiHotel className='mr-1'/>
                                {hotel.adultCount} Adults , {hotel.childCount} Childrens
                              
                            </div>
                            <div className='border border-slate-300 p-3 rounded-sm flex items-center'>
                                <BiStar className='mr-1'/>
                                    {hotel.starRating} Star
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <Link
                             className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-400' 
                            to = {`/edit-hotel/${hotel._id}`}> 
                            View Deatils
                            </Link>
                        </span>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MyHotels
