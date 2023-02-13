import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SearchShipments, MyAdvances, SearchUsers } from './pages';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchShipments} />
          <Route exact path='/myAdvances' component={MyAdvances} />
          <Route exact path='/users' component={SearchUsers} />
          <Route render={() => <h1 className='display-2'>404 Page Not Found</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
