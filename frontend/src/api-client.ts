
;
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import  { HotelType } from "../../backend/src/models/hotels"
import { HotelSearchResponse } from "../../backend/src/routes/hotels"
import { SlTarget } from "react-icons/sl";
import {UserType} from "../../backend/src/models/user"


export const fetchCurrentUser = async(): Promise<UserType> => {
  const response = await fetch("http://localhost:7000/api/users/me", {
    credentials : "include"
  })

  if(!response.ok){
    throw new Error("Error while fetching hotel")
  }
  return response.json()
}


export const register = async (formData: RegisterFormData) => {
    console.log("starungaojd");
    
    const response = await fetch("http://localhost:7000/api/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
    console.log(responseBody);
    console.log("below this");


    // const response = await axios.post(`${API_BASE_URL}/users/register`, formData, {
    //     withCredentials: true, // Include cookies for authentication
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   console.log('Registration successful:', response.data); // Log success message
    
    if (!response.ok) {
        console.log(responseBody.message);
        
        throw new Error(responseBody.message);
      }
  };


export const signIn = async(formData : SignInFormData)=>{
  const response = await fetch("http://localhost:7000/api/auth/login",{
    method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
      },
      body : JSON.stringify(formData)
  })

  const body = await response.json()

  if(!response.ok){
    throw new Error(body.message)
  }
  return body;
}




export const validateToken = async() => {
  const response = await fetch("http://localhost:7000/api/auth/validate-token",{
    credentials  :"include"
  })

  if(!response.ok){
    throw new Error("invalid token")
  }
  return response.json()
};


export const signOut = async() =>{
  const response = await fetch ("http://localhost:7000/api/auth/logout",{
    method: "POST",
    credentials: "include"
  });
  if(!response.ok){
    throw new Error("error during signout")
  }
};


export const addMyHotel = async(hotelFormData : FormData) => {
  const response = await fetch("http://localhost:7000/api/my-hotels", {
    method : "POST",
    credentials : "include",
    body : hotelFormData,
  })

  if(!response.ok){
    throw new Error("Failed to add new Hotel")
  }
  return response.json();
}


export const fetchMyHotels = async(): Promise<HotelType[]> =>{
  const response = await fetch("http://localhost:7000/api/my-hotels", {
    credentials : "include"
  })
  if(!response.ok){
    throw new Error("failed to fetch hotels")
  }

  return response.json()
  
}

export const fetchMyHotelById = async(hotelId : string): Promise<HotelType[]>  => {
  const response = await fetch(`http://localhost:7000/api/my-hotels/${hotelId}`,{
    credentials : "include"
  })

  if(!response.ok){
    throw new Error("Error while fectching hotel")
  }
  return response.json()
}


export const updateMyHotelById = async(hotelFormData: FormData) => {
  const response = await fetch(
    `http://localhost:7000/api/my-hotels/${hotelFormData.get("hotelId")}`,{
      method : "PUT",
      body: hotelFormData,
      credentials : "include"
    }
  )
  if(!response.ok){
    throw new Error("Error while fectching hotel")
  }
  return response.json()
}


export type SearchParams = {
  destination? : string;
  checkIn? : string;
  checkOut? : string;
  adultCount? : string; 
  childCount? : string;
  page? : string;
  facilities? : string[];
  types? : string[];
  stars? : string[];
  maxPrice? : string
  sortOption? : string;
}


export const searchHotels = async(searchParams : SearchParams):Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  console.log("in search hotels function");
  queryParams.append("destiantion", searchParams.destination || "")
  queryParams.append("checkIn", searchParams.checkIn || "")
  queryParams.append("checkOut", searchParams.checkOut || "")
  queryParams.append("adultCount", searchParams.adultCount || "")
  queryParams.append("childCount", searchParams.childCount || "")
  queryParams.append("paeg", searchParams.page || "")

  queryParams.append("maxPrice", searchParams.maxPrice || "")
  queryParams.append("sortOption", searchParams.sortOption || "")
  
  searchParams.facilities?.forEach((facility) => 
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => 
    queryParams.append("types" , type)
  );

  searchParams.stars?.forEach((star) => 
      queryParams.append("stars", star)
  );

  console.log(queryParams);
  
  const response = await fetch(`http://localhost:7000/api/hotels/search?${queryParams}`)
  console.log(response)
  if(!response.ok){
    throw new Error("Error while fetching hotels")
  }
  return response.json()
}


export const  fetchHotelById = async(hotelId : string): Promise<HotelType> => {
  const response = await fetch(`http://localhost:7000/api/hotels/${hotelId}`);

  if(!response.ok){
    throw new Error("error while fetching hotels")
  }

  return response.json()
}
