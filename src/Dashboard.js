import React, { useState, useEffect } from 'react';
import { Link, Menu, MenuItem, Grid, Card, Heading, Button, ScrollView } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';

import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
  NavLink,
  useNavigate,
  Routes,
  Route,
} from 'react-router-dom';

import { withAuthenticator } from '@aws-amplify/ui-react';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function Home() {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    fetch('https://api.dev.gometarail.io/platform', {
      method: 'GET',
      headers: {
        'x-api-key': 'K5UkJ7Jgu3aHXTnsDRYHjarywILS5Al37NnO4yr5'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('HERE', data);
        setPlatforms(data.Items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {platforms.map((platform) => {
        return (
          <div className="post-card" key={platform.category + '-' + platform.name}>
            <h2 className="post-title">{platform.name}</h2>
            <p className="post-body">
              <p>Category: {platform.category}</p>
              <p>Description:<br/>{platform.description}</p>
            </p>
            <Button variation="primary" onClick={() => navigate('/edit/' + platform.name)}>Edit</Button>
          </div>
        );
      })}
    </div>
  );
}

function EditPlatform() {
  return (
    <div>EDIT PLATFORM</div>
  )
}

function Dashboard({ isPassedToWithAuthenticator, signOut, user }) {
  return(
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
          <NavLink to="/edit">Edit</NavLink>
        </Card>
        <Card
          columnStart="2"
          columnEnd="-1"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<EditPlatform />} />
          </Routes>
        </Card>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(Dashboard, {
  hideSignUp: true
});