import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/models/hotels"
import {Link} from 'react-router-dom'

type Props = {
    hotel : HotelType;
}
const SearchResultCard = ({hotel} : Props ) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-green-400 rounded-lg p-8 gap-8">
        <div className="w-full h-[300px]">
            <img src={hotel.imageUrls[1]} 
            className="w-full h-full object-cover object-center"
            />
        </div>
        <div className="grid grid-rows-[1fr_2fr_3fr]">
           <div>
                <div className="flex items-center">
                    <span className="flex">
                        {Array.from({length : hotel.starRating}).map(() => (
                            <AiFillStar className="fill-yellow-400" />
                        ))}
                    </span>
                    <span className="ml-1 text-sm">
                        {hotel.type}
                    </span>
                </div>
                <Link to={`/detail/${hotel._id}`}className="text-xl font-bold cursor-pointer">
                    {hotel.name}
                </Link>
           </div>
           <div className="line-clamp-4 mt-1">
                {hotel.description}
           </div>
           <div className="grid grid-cols-2 items-end whitespace-nowrap">
                <div className="gap-2 items-center">
                    {hotel.facilities.slice(0,3).map((facility) => (
                        <span className="bg-slate-300 p-1 rounded-lg font-semibold text-sm whitespace-nowrap">
                            {facility}
                        </span>
                    ))}
                    <span className="text-sm">
                        {hotel.facilities.length > 3 && 
                        `+ ${hotel.facilities.length -3} more`
                        }    
                     </span>
                 </div>
           </div>
           <div className="flex flex-col item-end gap-1">
                <span className="font-semibold p-2">
                    {hotel.pricePerNight} per night
                </span>
                <span>
                    <Link to={`/details/${hotel._id}`} className="bg-blue-600 p-2 text-white h-full font-bold text-xl max-w-fit hover:bg-blue-500">
                        View Details
                    </Link>
                </span>
           </div>
        </div>
    </div>
  )
}

export default SearchResultCard
