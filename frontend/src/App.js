import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignUpFormPage';
import ProtectedRoute from './components/auth/ProtectedRoute'
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Spots from './components/Spots/Spots';
import CategoryButtons from './components/CategoryButtons/CategoryButtons';
import YourSpots from './components/YourSpots/YourSpots';
import SpotDetail from './components/SpotDetail/SpotDetail';
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm';
import EditSpotForm from './components/EditSpotForm/EditSpotForm';
import YourReviews from './components/YourReviews/YourReviews';
import { getAllSpotsThunk } from './store/spots';
import { loadReviewsThunk } from './store/reviews';
import { loadBookingsThunk } from './store/bookings';
import YourBookings from './components/YourBookings/YourBookings';


function App() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    dispatch(getAllSpotsThunk())
    dispatch(loadReviewsThunk())
    dispatch(loadBookingsThunk())
  }, [dispatch])

  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getAllSpotsThunk())
  //     await dispatch(loadReviewsThunk())
  //     await dispatch(loadBookingsThunk())
  //   })()
  // }, [dispatch])

  if (!isLoaded) return null


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Route exact path='/'>
        <CategoryButtons />
        <Spots />
      </Route>
      <ProtectedRoute path='/your-spots'>
        <YourSpots />
      </ProtectedRoute>
      <Route exact path='/spots/:spotId'>
        <SpotDetail />
      </Route>
      <ProtectedRoute path='/create-a-spot'>
        <CreateSpotForm />
      </ProtectedRoute>
      <ProtectedRoute path='/spots/:spotId/edit'>
        <EditSpotForm />
      </ProtectedRoute>
      <ProtectedRoute path='/your-reviews'>
        <YourReviews />
      </ProtectedRoute>
      <ProtectedRoute path='/your-bookings'>
        <YourBookings />
      </ProtectedRoute>
      {/* {isLoaded && (
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
      )} */}
    </>
  );
}

export default App;
