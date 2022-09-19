import React, { useState, useEffect } from 'react';
import {
  Menu,
  MenuItem,
  Grid,
  Card,
  Heading,
  Button,
  TextField,
  TextAreaField
} from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';

import {
  BrowserRouter as Router,
  useParams,
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
            <Button variation="primary" onClick={() => navigate(`/edit/${platform.category}/${platform.name}`)}>Edit</Button>
          </div>
        );
      })}
    </div>
  );
}

function EditPlatform() {
  let { category, name } = useParams();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState([]);
  useEffect(() => {
    fetch(`https://api.dev.gometarail.io/platform/category/${category}/name/${name}`, {
      method: 'GET',
      headers: {
        'x-api-key': 'K5UkJ7Jgu3aHXTnsDRYHjarywILS5Al37NnO4yr5'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('HERE', data);
        setPlatform(data.Item);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.name;

    setPlatform({
      ...platform,
      [fieldName]: value
    });

    console.log(platform);
  }

  const savePlatform = () => {
    fetch('https://api.dev.gometarail.io/platform', {
      method: 'PUT',
      headers: {
        'x-api-key': 'K5UkJ7Jgu3aHXTnsDRYHjarywILS5Al37NnO4yr5'
      },
      body: JSON.stringify(platform)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('HERE', data);
        setPlatform(data.Item);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div>
      <Card>
        <Heading level={4}>Edit Platform</Heading>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Category" value={platform.category} name="category" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Name" value={platform.name} name="name" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextAreaField autoComplete="off" label="Description" value={platform.description} name="description" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Domain (without http:// or the path, example: google.com)" value={platform.domain} name="domain" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="URL (to open when platform is launched)" value={platform.url} name="url" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Icon Image" value={platform.iconImage} name="iconImage" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Network" value={platform.network} name="network" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Network Symbol" value={platform.networkSymbol} name="networkSymbol" onChange={handleInputChange}/>
      </Card>
      <Card>
        <Button onClick={() => { savePlatform(); }}>Save</Button>
      </Card>
    </div>
  );
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
          <NavLink to="/edit/">Edit</NavLink>
        </Card>
        <Card
          columnStart="2"
          columnEnd="-1"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:category/:name" element={<EditPlatform />} />
          </Routes>
        </Card>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(Dashboard, {
  hideSignUp: true
});