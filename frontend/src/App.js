import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LoginFormModal from './components/LoginFormModal';
import LoginForm from './components/LoginFormModal/LoginForm';
import Spots from './components/Spots/Spots';
import CategoryButtons from './components/CategoryButtons/CategoryButtons';
import YourSpots from './components/YourSpots/YourSpots';
import SpotDetail from './components/SpotDetail/SpotDetail';

function App() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    // if (!sessionUser) return;

      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
        .catch((e) => {
          if (e) {
            setIsLoaded(true);
            console.log(e);
          }
        })

  }, [dispatch])

  console.log('is loaded', isLoaded)
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <CategoryButtons />
      <Route exact path='/'>
        <Spots />
      </Route>
      <Route path='/your-spots'>
        <YourSpots />
      </Route>
      <Route path='/spots/:spotId'>
        <SpotDetail />
      </Route>
      {isLoaded && (
      <Switch>

        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
      )}
      {/* <Switch>
        <Route path='/'>
          <h1>Spots will go here</h1>
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch> */}
    </>
  );
}

export default App;
