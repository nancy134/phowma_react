import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Politicians from './containers/Politicians';
import States from './containers/States';
import Representatives from './containers/Representatives';
import Elections from './containers/Elections';
import Test from './containers/Test';

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/politicians" exact component={Politicians} />
    <Route path="/states" exact component={States} />
    <Route path="/representatives" exact component={Representatives} />
    <Route path="/elections" exact component={Elections} />
    <Route component={NotFound} />
  </Switch>;