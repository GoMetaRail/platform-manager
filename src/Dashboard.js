import React, {useState, useEffect} from 'react';
import {
  Menu,
  MenuItem,
  Grid,
  Card,
  Heading
} from '@aws-amplify/ui-react';
import Amplify, {Auth} from 'aws-amplify';

import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import {withAuthenticator} from '@aws-amplify/ui-react';

import awsExports from "./aws-exports";
import Platforms from "./Platforms";
import Categories from "./Categories";
import Tags from "./Tags";
import Networks from "./Networks";
import FeaturedEvent from "./FeaturedEvent";

Amplify.configure({
  ...awsExports
});

function Dashboard({isPassedToWithAuthenticator, signOut, user}) {
  return (
    <Router>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 4fr"
        templateRows="1fr auto"
      >
        <Card
          columnStart="1"
          columnEnd="-1"
        >
          <Grid
            columnGap="0.5rem"
            rowGap="0.5rem"
            templateColumns="4fr 1fr"
            templateRows="1fr"
          >
            <Card
              columnStart="1"
              columnEnd="4"
            >
              <Heading level={1}>Go MetaRail Platform Manager</Heading>
            </Card>
            <Card
              columnStart="4"
              columnEnd="5"
            >
              <Menu menuAlign="start">
                <MenuItem onClick={signOut}>
                  Sign out
                </MenuItem>
              </Menu>
            </Card>
          </Grid>
        </Card>
        <Card
          columnStart="1"
          columnEnd="2"
          id="sidebarMenu"
        >
          <NavLink to="/platform/">Platforms</NavLink>
          <NavLink to="/event/">Events</NavLink>
          <NavLink to="/category/">Categories</NavLink>
          <NavLink to="/tag/">Tags</NavLink>
          <NavLink to="/network/">Networks</NavLink>
        </Card>
        <Card
          columnStart="2"
          columnEnd="-1"
        >
          <Routes>
            <Route path="/platform/*" element={<Platforms/>}/>
            <Route path="/event/*" element={<FeaturedEvent/>}/>
            <Route path="/network/*" element={<Networks/>}/>
            <Route path="/category/*" element={<Categories/>}/>
            <Route path="/tag/*" element={<Tags/>}/>
            <Route
              path="*"
              element={<Navigate to="/platform" replace/>}
            />
          </Routes>
        </Card>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(Dashboard, {
  hideSignUp: true
});