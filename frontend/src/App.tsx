

import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { useAppContext } from './context/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Details from './pages/Details';
import Booking from './pages/Booking';
 

const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
      <Routes>
         <Route path='/' 
          element={
            <Layout>
              <p className='text-black'>Home Page</p>
            </Layout>}>
         </Route>
         <Route path='/search' 
          element={
            <Layout>
              <Search />
            </Layout>}>
         </Route>

         <Route path='/details/:hotelId' 
          element={
            <Layout>
              <Details />
            </Layout>}>
         </Route>
          <Route path='/register' 
          element ={<Layout><Register/></Layout>}/>

          <Route 
            path="/sign-in"
            element={<Layout><SignIn /></Layout>}
          />
          {isLoggedIn && 
            <>

            <Route path='/hotel/:hotelId/booking'
            element = {
              <Layout><Booking /></Layout>
            } />
              <Route path='/add-hotel'
                    element = {
                      <Layout><AddHotel /></Layout>
                    } />

                <Route path='/edit-hotel/:hotelId'
                    element = {
                      <Layout><EditHotel /></Layout>
                    } />
              
              <Route path='/my-hotels'
                    element = {
                      <Layout><MyHotels /></Layout>
                    } />

             
            </>
          }
         <Route path='*' element={<Navigate to = '/' />}></Route>

      </Routes>
       
    );
};

export default App

