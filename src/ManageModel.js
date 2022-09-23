import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button, Card, Flex, Grid, Heading, Loader, ScrollView, TextAreaField, TextField
} from '@aws-amplify/ui-react';
import {API, graphqlOperation} from 'aws-amplify';
import * as query from "./graphql/queries";
import * as mutation from "./graphql/mutations";

import {
  useNavigate, useParams
} from 'react-router-dom';

function Update(props) {
  const {pushAlert, baseRoute, itemNameSingular, itemNamePlural, itemFields, id} = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [item, setitem] = useState({});

  useEffect(() => {
    fetchitem();
  }, []);

  async function fetchitem() {
    if (props.id) {
      const apiData = await API.graphql(graphqlOperation(query[`get${itemNameSingular}`], {id: props.id}));
      setitem(apiData.data[`get${itemNameSingular}`]);
    }
    setIsLoading(false);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.name;

    setitem({
      ...item,
      [fieldName]: value
    });
  }

  async function saveitem() {
    setIsSaving(true);
    try {
      if (item.id) {
        const apiData = await API.graphql(graphqlOperation(mutation[`update${itemNameSingular}`], {
            input: {
              id: item.id,
              config: item.config,
              method: item.method,
              name: item.name
            }
          }
        ));
      } else {
        const apiData = await API.graphql(graphqlOperation(mutation[`create${itemNameSingular}`], {
            input: {
              config: item.config,
              method: item.method,
              name: item.name
            }
          }
        ));
        setitem(apiData.data[`create${itemNameSingular}`]);
      }
      navigate(baseRoute);
      pushAlert(`item ${item.id ? 'updated' : 'added'}`, 'success');
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
      const apiData = await API.graphql(graphqlOperation(mutation[`delete${itemNameSingular}`], {
        input: {
          id: item.id
        }
      }));

      pushAlert(`${itemNameSingular} deleted`, 'success');
      navigate(baseRoute);
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
            saveitem();
            return false;
          }}>
            {
              itemFields.map((field) => {
                return (
                  <Card>
                    <field.type isRequired={field.required} isDisabled={isSaving} autoComplete="off" label={field.label} value={item[field.name]}
                               name={field.name}
                               onChange={handleInputChange}/>
                  </Card>
                );
              })
            }
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
                  {item.id && (
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
  const {baseRoute, itemNameSingular, itemNamePlural, itemFields} = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  async function fetchPlatforms() {
    const apiData = await API.graphql({query: query[`list${itemNamePlural}`]});
    setItems(apiData.data[`list${itemNamePlural}`].items);
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && (
        <Loader size="large"/>
      ) || (
        items.map((item) => {
          return (
            <div>
              <Card>
                {
                  itemFields.map((field) => {
                    if(field.showInList) {
                      return (
                        <p>{item[field.name]}</p>
                      )
                    }
                  })
                }
                <Button variation="primary" onClick={() => navigate(baseRoute + item.id)}>Edit</Button>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
}

function ManageModel(baseRoute, itemNameSingular, itemNamePlural, itemFields) {
  const navigate = useNavigate();
  const params = useParams();
  const itemId = params['*'];
  const [state, setState] = useState('list');
  const [alerts, setAlerts] = useState([]);

  function pushAlert(message, type) {
    if (type !== 'error') {
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
          >{state === 'list' && itemNamePlural || state === 'create' && `Create ${itemNameSingular}` || `Update ${itemNameSingular}`}
          </Heading>
          <Flex
            columnStart="4"
            columnEnd="5">
            <Button
              variation="primary"
              onClick={() => navigate(`${baseRoute}create`)}>Create New</Button>
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

      {state === 'list' && (
        <List
          pushAlert={pushAlert}
          baseRoute={baseRoute}
          itemNameSingular={itemNameSingular}
          itemNamePlural={itemNamePlural}
          itemFields={itemFields}
        />)}
      {state === 'create' && (
        <Update
          pushAlert={pushAlert}
          baseRoute={baseRoute}
          itemNameSingular={itemNameSingular}
          itemNamePlural={itemNamePlural}
          itemFields={itemFields}
        />)}
      {state === 'update' && (
        <Update
          id={itemId}
          pushAlert={pushAlert}
          baseRoute={baseRoute}
          itemNameSingular={itemNameSingular}
          itemNamePlural={itemNamePlural}
          itemFields={itemFields}
        />)}
    </div>
  );
}

export default ManageModel;