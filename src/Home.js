import React, {useState, useEffect} from 'react';
import {
  Button
} from '@aws-amplify/ui-react';
import {API} from 'aws-amplify';

import {
  useNavigate
} from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    API.get('GoMetaRail', '/platform', {})
      .then((data) => {
        setPlatforms(data['Items']);
      })
      .catch((err) => {
        console.error(err);
      });
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