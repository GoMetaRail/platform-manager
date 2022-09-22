import React, {useState, useEffect} from 'react';
import {
  Button
} from '@aws-amplify/ui-react';
import {API, graphqlOperation} from 'aws-amplify';
import { listNetworks } from './graphql/queries';

import {
  useNavigate
} from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);

  useEffect( async () => {
    const networkData = await API.graphql({
      query: listNetworks,
      authMode: "AWS_IAM"
    });
    console.log('networkData', networkData);

    // API.get('GoMetaRail', '/platform', {
    //   authMode: 'AWS_IAM'
    // })
    //   .then((data) => {
    //     // setPlatforms(data['Items']);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  });

  return (
    <div>
      {platforms.map((platform) => {
        return (
          <div className="post-card" key={platform.category + '-' + platform.name}>
            <h2 className="post-title">{platform.name}</h2>
            <div className="post-body">
              <p>Category: {platform.category}</p>
              <p>Description:<br/>{platform.description}</p>
            </div>
            <Button variation="primary" onClick={() => navigate(`/edit/${platform.category}/${platform.name}`)}>Edit</Button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;