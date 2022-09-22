import Dashboard from "./Dashboard";
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import React, {useState, useEffect} from 'react';
import Amplify, {API, Auth} from "aws-amplify";

import awsExports from "./aws-exports";

Amplify.configure({
  ...awsExports,
  /*aws_cloud_logic_custom: [
    {
      name: 'GoMetaRail',
      endpoint: 'https://ovif3ncu01.execute-api.us-east-2.amazonaws.com/dev',
      region: 'us-east-2',
      custom_header: async () => {
        return {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        }
      }
    }
  ],
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'K5UkJ7Jgu3aHXTnsDRYHjarywILS5Al37NnO4yr5'*/
});
// import * as queries from './graphql/schema.json';

function App() {
  useEffect( () => {
    // const allTodos = await API.graphql({ query: queries });


    // API.get('GoMetaRail', '/platform', {
    //   authMode: 'AWS_IAM'
    // })
    //   .then((data) => {
    //     console.log(data);
    //     // setPlatforms(data['Items']);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  });

  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
