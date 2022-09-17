import React, { useState, useEffect } from 'react';
import Amplify from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function Dashboard({ isPassedToWithAuthenticator, signOut, user }) {
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    console.log('i fire once');
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

  return(
    <div>
      <button onClick={signOut}>Sign out</button>
      <h1>Welcome to the Platform Manager</h1>
      <div className="platforms-container">
        {platforms.map((platform) => {
          return (
            <div className="post-card" key={platform.category + '-' + platform.name}>
              <h2 className="post-title">{platform.name}</h2>
              <p className="post-body">
                <p>Category: {platform.category}</p>
                <p>Description:<br/>{platform.description}</p>
              </p>
              <button>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withAuthenticator(Dashboard, {
  hideSignUp: true
});