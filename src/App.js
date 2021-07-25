import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import TorneoDetails from './components/TorneoDetails/TorneoDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Rondas from './components/Rondas/Rondas';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/torneos" />} />
          <Route path="/torneos" exact component={Home} />
          <Route path="/torneos/search" exact component={Home} />
          <Route path="/torneos/:id" exact component={TorneoDetails} />
          <Route path="/torneos/:id/rondas" exact component={Rondas} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/torneos" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;