import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EditUrl } from './components/EditUrl';
import { ErrorPage } from './components/ErrorPage';
import { Switch } from 'react-router';

export const routes = 
    <Layout>
        <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/addurl' component={EditUrl} />
            <Route path='/edit/:id' component={EditUrl} />  
            <Route component={ErrorPage} />
        </Switch>
    </Layout>

;
