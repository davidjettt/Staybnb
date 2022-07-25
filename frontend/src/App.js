import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LoginFormModal from './components/LoginFormModal';

function App() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {

    // if (sessionUser) {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
        .catch((e) => {
          if (e) {
            setIsLoaded(true);
            console.log(e);
          }
        })
    // }
  }, [dispatch])

  console.log('is loaded', isLoaded)
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>

        {/* <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route> */}
      </Switch>
      )}
      <Switch>
        <Route exact path='/'>
          <h1>HOME</h1>
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
