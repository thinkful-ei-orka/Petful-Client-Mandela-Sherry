import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import LandingRoute from '../Landing/LandingRoute'
import AdoptionRoute from '../Adoption/AdoptionRoute'



function App() {
  return (
    <main className="app"> 
      <BrowserRouter>
        <Route path="/" exact component={LandingRoute}></Route>
        <Route path="/adoption" component={AdoptionRoute}></Route>
      </BrowserRouter>
    </main>
  )
}

export default App;