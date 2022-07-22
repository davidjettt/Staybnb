import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch])

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(sessionActions.removeUser());
    history.push('/login');
  }

  return isLoaded && (
    <Switch>
      <Route exact path='/'>
        <button onClick={logoutHandler}>LOG OUT</button>
      </Route>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
