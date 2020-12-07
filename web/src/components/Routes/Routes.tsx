import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Login, Profile, Register } from '../../pages';
import Header from '../Header/Header';
import { ROUTE } from './route';

const { PROFILE, LOGIN, HOME, REGISTER } = ROUTE;

function Routes() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path={LOGIN} component={Login} exact/>
                <Route path={PROFILE} component={Profile} exact/>
                <Route path={REGISTER} component={Register} exact/>
                <Route path={HOME} component={Home} exact/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
