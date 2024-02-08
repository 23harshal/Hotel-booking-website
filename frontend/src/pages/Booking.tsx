import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import UserType from "../../../backend/src/models/user"
import BookingForm from "../forms/BookingForm/BookingForm"
import { useParams } from "react-router-dom"
import { useSearchContext } from "../context/SearchContext"
import { useEffect, useState } from "react"

const Booking = () => {
    const {data : currentUser} = useQuery("fetchCurrentuser", apiClient.fetchCurrentUser)
    const {hotelId} = useParams()
    const search = useSearchContext();

    const[numberOfNights , setNumberOfNights] = useState<number>(0)

    useEffect(() => {
        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkIn.getTime() - search.checkOut.getTime()) / 
            (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights))
        }
    },[search.checkIn, search.checkOut])

    const {data : hotel} = useQuery("fetchMyHotelById", 
    ()=>apiClient.fetchHotelById(hotelId as string), {
        enabled : !!hotelId
    })
    
  
    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <div className="bg-green-300">Booking Details</div>
            {currentUser && <BookingForm currentUser={currentUser} />}
        {/* <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        /> */}
        {/* {currentUser && paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentData.clientSecret,
            }}
          >
            <BookingForm
              currentUser={currentUser}
              paymentIntent={paymentIntentData}
            />
          </Elements>
        )} */}
      </div>
  )
}

export default Booking
