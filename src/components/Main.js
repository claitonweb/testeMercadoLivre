import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Items from './Items'
import Item from './Item'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/items' component={Items}/>
      <Route path='/items/:id' component={Item}/>
     </Switch>
  </main>
)

export default Main
