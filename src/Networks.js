import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button, Card, Flex, Grid, Heading, Loader, ScrollView, TextAreaField, TextField
} from '@aws-amplify/ui-react';
import {API, graphqlOperation} from 'aws-amplify';
import {getNetwork, listNetworks} from "./graphql/queries";

import {
  useNavigate, useParams
} from 'react-router-dom';
import {createNetwork, deleteNetwork, updateNetwork} from "./graphql/mutations";

function Update(props) {
  const {pushAlert, id} = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState({});

  useEffect(() => {
    fetchNetwork();
  }, []);

  async function fetchNetwork() {
    if (props.id) {
      const apiData = await API.graphql(graphqlOperation(getNetwork, {id: props.id}));
      setNetwork(apiData.data.getNetwork);
    }
    setIsLoading(false);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.name;

    setNetwork({
      ...network,
      [fieldName]: value
    });
  }

  async function saveNetwork() {
    setIsSaving(true);
    try {
      if (network.id) {
        const apiData = await API.graphql(graphqlOperation(updateNetwork, {
            input: {
              id: network.id,
              config: network.config,
              method: network.method,
              name: network.name
            }
          }
        ));
      } else {
        const apiData = await API.graphql(graphqlOperation(createNetwork, {
            input: {
              config: network.config,
              method: network.method,
              name: network.name
            }
          }
        ));
        setNetwork(apiData.data.createNetwork);
        navigate(`/network/${apiData.data.createNetwork.id}`);
      }
      pushAlert(`Network ${network.id ? 'updated' : 'added'}`, 'success');
    } catch (e) {
      console.error(e);
      pushAlert(e.errors.forEach((error) => {
        pushAlert(error.message, 'error');
      }));
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteItem() {
    setIsLoading(true);

    try {
      const apiData = await API.graphql(graphqlOperation(deleteNetwork, {
        input: {
          id: network.id
        }
      }));

      pushAlert('Network deleted', 'success');
      // Back to network list
      navigate(`/network/`);
    } catch (e) {
      console.error(e);
      pushAlert(e.errors.forEach((error) => {
        pushAlert(error.message, 'error');
      }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {
        isLoading && (
          <Loader size="large"/>
        ) || (
          <form onSubmit={(e) => {
            e.preventDefault();
            saveNetwork();
            return false;
          }}>
            <Card>
              <TextField isRequired={true} isDisabled={isSaving} autoComplete="off" label="Name" value={network.name}
                         name="name"
                         onChange={handleInputChange}/>
            </Card>
            <Card>
              <TextAreaField isRequired={true} isDisabled={isSaving} autoComplete="off" label="config"
                             value={network.config}
                             name="config"
                             onChange={handleInputChange}/>
            </Card>
            <Card>
              <TextField isDisabled={isSaving} autoComplete="off" label="method"
                         value={network.method} name="method" onChange={handleInputChange}/>
            </Card>
            <Card>
              <Grid
                columnGap="0.5rem"
                rowGap="0.5rem"
                templateColumns="4fr 1fr"
                templateRows="1fr"
              >
                <Flex
                  columnStart="1"
                  columnEnd="4">
                  <Button type="submit" variation="primary" isLoading={isSaving} loadingText="Saving...">Save</Button>
                </Flex>
                <Flex
                  columnStart="4"
                  columnEnd="5">
                  {network.id && (
                    <Button
                      variation="link"
                      onClick={() => {
                        if (window.confirm('Are you sure you would like to delete this item?')) deleteItem();
                      }}>Delete</Button>
                  )}
                </Flex>
              </Grid>
            </Card>
          </form>
        )
      }
    </div>
  );
}

function List(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  async function fetchPlatforms() {
    const apiData = await API.graphql({query: listNetworks});
    setNetworks(apiData.data.listNetworks.items);
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && (
        <Loader size="large"/>
      ) || (
        networks.map((network) => {
          return (
            <div>
              <Card>
                <p>{network.name}</p>
                <Button variation="primary" onClick={() => navigate(`/network/${network.id}`)}>Edit</Button>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
}

function Networks() {
  const navigate = useNavigate();
  const params = useParams();
  const itemId = params['*'];
  const [state, setState] = useState('list');
  const [alerts, setAlerts] = useState([]);

  function pushAlert(message, type) {
    if(type !== 'error') {
      setTimeout(() => {
        setAlerts((alerts) => {
          return alerts.filter(item => (Date.now() - item.createdDate) < 3000);
        });
      }, 3000);
    }

    setAlerts([
      ...alerts,
      {
        message: message,
        type,
        createdDate: Date.now()
      }
    ]);
  }

  useEffect(() => {
    switch (itemId) {
      case 'create':
        setState('create');
        break;
      case '':
        setState('list');
        break;
      default:
        setState('update');
    }
  });

  return (
    <div>
      <Card>
        <Grid
          columnGap="0.5rem"
          rowGap="0.5rem"
          templateColumns="4fr 1fr"
          templateRows="1fr"
        >
          <Heading
            level={4}
            columnStart="1"
            columnEnd="4"
          >{state === 'list' && 'Networks' || state === 'create' && 'Create Network' || 'Update Network'}
          </Heading>
          <Flex
            columnStart="4"
            columnEnd="5">
            <Button
              variation="primary"
              onClick={() => navigate(`/network/create`)}>Create New</Button>
          </Flex>
        </Grid>
      </Card>
      <div className={'alertsContainer'}>
        {alerts.map((alert, index) => {
          return (
            <Alert key={alert.id} isDismissible={true} variation={alert.type || 'info'}>
              <span>{alert.message}</span>
            </Alert>
          );
        })}
      </div>

      {state === 'list' && (<List pushAlert={pushAlert}/>)}
      {state === 'create' && (<Update pushAlert={pushAlert}/>)}
      {state === 'update' && (<Update id={itemId} pushAlert={pushAlert}/>)}
    </div>
  );
}

export default Networks;