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
  Routes,
  Route,
} from 'react-router-dom';

import {withAuthenticator} from '@aws-amplify/ui-react';

import awsExports from "./aws-exports";

import Home from "./Home";
import EditPlatform from "./EditPlatform";

Amplify.configure({
  ...awsExports
});

function Dashboard({ isPassedToWithAuthenticator, signOut, user }) {
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
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/edit/">Edit</NavLink>
        </Card>
        <Card
          columnStart="2"
          columnEnd="-1"
        >
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/edit/:category/:name" element={<EditPlatform/>}/>
          </Routes>
        </Card>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(Dashboard, {
  hideSignUp: true
});