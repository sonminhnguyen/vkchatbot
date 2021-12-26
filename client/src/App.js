import './App.css';
import { useState } from 'react';
import Authenticate from './components/login';
import AppRouter, { history } from './router/AppRouter'
import Header from './components/header'

const App = () => {
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user;
  }

  const [user, setUser] = useState(getUser() || '');

  const saveUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    history.push('/')
  };

  const handeLogOut = () => {
    localStorage.removeItem('user');
    setUser('');
  }

  if(!user.token) {
    return <Authenticate saveUser={saveUser} />
  }

  return (
    <div>
        <AppRouter user={user} handeLogOut={handeLogOut}/>
    </div>
  );
}

export default App;

