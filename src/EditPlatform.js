import React, {useState, useEffect} from 'react';
import {
  Card,
  Heading,
  Button,
  TextField,
  TextAreaField, Alert
} from '@aws-amplify/ui-react';
import {API} from 'aws-amplify';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

export default function EditPlatform() {
  let {category, name} = useParams();
  const navigate = useNavigate();
  let alerts = [];
  const [platform, setPlatform] = useState([]);
  useEffect(() => {
    API.get('GoMetaRail', `/platform/category/${category}/name/${name}`, {})
      .then((data) => {
        alerts.push({
          heading: 'test',
          body: 'tester'
        })
        setPlatform(data.Item);
      })
      .catch((err) => {
        console.error(err);
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
    API.put('GoMetaRail', '/platform', {
      body: platform
    })
      .then((data) => {

      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      {alerts.map((alert) => {
        return (
          <Alert isDismissible={false} heading={alert.heading}>{alert.body}</Alert>
        );
      })}
      <Card>
        <Heading level={4}>Edit Platform</Heading>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Category" value={platform.category} name="category"
                   onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Name" value={platform.name} name="name" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextAreaField autoComplete="off" label="Description" value={platform.description} name="description"
                       onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Domain (without http:// or the path, example: google.com)"
                   value={platform.domain} name="domain" onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="URL (to open when platform is launched)" value={platform.url} name="url"
                   onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Icon Image" value={platform.iconImage} name="iconImage"
                   onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Network" value={platform.network} name="network"
                   onChange={handleInputChange}/>
      </Card>
      <Card>
        <TextField autoComplete="off" label="Network Symbol" value={platform.networkSymbol} name="networkSymbol"
                   onChange={handleInputChange}/>
      </Card>
      <Card>
        <Button onClick={() => {
          savePlatform();
        }}>Save</Button>
      </Card>
    </div>
  );
}