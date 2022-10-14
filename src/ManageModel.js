import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  Alert,
  Button, Card, Collection, Flex, Grid, Heading, Image, Link, Loader, ScrollView, TextAreaField, TextField
} from '@aws-amplify/ui-react';
import {API, graphqlOperation} from 'aws-amplify';
import * as query from "./graphql/queries";
import * as mutation from "./graphql/mutations";

import {
  useNavigate, useParams
} from 'react-router-dom';

function Update(props) {
  const {pushAlert, clearAlerts, baseRoute, itemNameSingular, itemNamePlural, itemFields, id} = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [origItem, setOrigItem] = useState({});
  const [item, setItem] = useState({});

  const fieldRefs = useRef([]);
  fieldRefs.current = itemFields.map((_, i) => fieldRefs.current[i] ?? createRef());

  useEffect(() => {
    fetchitem();
  }, []);

  async function fetchitem() {
    if (props.id) {
      const apiData = await API.graphql(graphqlOperation(query[`get${itemNameSingular}`], {id: props.id}));
      const newItem = apiData.data[`get${itemNameSingular}`];

      for (const field of itemFields) {
        if (field.manyToMany) {
          const relQuery = {};
          relQuery[`${itemNameSingular.toLowerCase()}ID`] = props.id;
          const relApiData = await API.graphql(graphqlOperation(query[`list${field.manyToMany.relationship}`], relQuery));
          const relItems = relApiData.data[`list${field.manyToMany.relationship}`].items;

          newItem[field.name] = relItems.map(i => i[field.manyToMany.id]);
        }
      }
      setItem(newItem);
      // Keep a copy of the original item for comparison
      setOrigItem(newItem);
    }
    setIsLoading(false);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.name;

    setItem({
      ...item,
      [fieldName]: value
    });
  }

  async function saveitem() {
    setIsSaving(true);
    clearAlerts('error');
    try {
      // Check for required fields
      const missingRequiredFields = itemFields.filter((field, index) => {
        const ref = fieldRefs.current[index].current;
        if (field.required && ref.isUploader) {
          return ref.getFiles().length === 0;
        }

        return field.required && (
          item[field.name] === ''
          || typeof item[field.name] === 'undefined'
          || item[field.name] === null
        );
      });

      if (missingRequiredFields.length > 0) {
        missingRequiredFields.forEach(field => pushAlert(`${field.label} is required`, 'error'));
        return;
      }

      const sanitizedItem = {};
      itemFields.forEach((field, index) => {
        const ref = fieldRefs.current[index].current;

        if (field.manyToMany || ref.isUploader) {
          return;
        }

        if (field.belongsTo && item[field.name].id) {
          sanitizedItem[field.belongsTo] = item[field.name].id;
          return;
        }

        sanitizedItem[field.name] = item[field.name];
      });

      try {
        let tmpItem;
        if (item.id) {
          tmpItem = item;
          sanitizedItem['id'] = item.id;
          await API.graphql(graphqlOperation(mutation[`update${itemNameSingular}`], {
              input: sanitizedItem
            }
          ));
        } else {
          const apiData = await API.graphql(graphqlOperation(mutation[`create${itemNameSingular}`], {
              input: sanitizedItem
            }
          ));
          tmpItem = apiData.data[`create${itemNameSingular}`];
        }

        // Update join table entries
        for (const field of itemFields) {
          if (field.manyToMany) {
            const origRelatedIds = origItem[field.name] ?? [];
            for (const relatedItem of item[field.name] ?? []) {
              const relationObj = {};
              relationObj['id'] = `${tmpItem.id}|${relatedItem.id}`;
              relationObj[field.manyToMany.id] = relatedItem.id;
              relationObj[`${itemNameSingular.toLowerCase()}ID`] = tmpItem.id;
              const createOrUpdate = origRelatedIds.includes(relatedItem.id) ? 'update' : 'create';
              await API.graphql(graphqlOperation(mutation[`${createOrUpdate}${field.manyToMany.relationship}`], {
                input: relationObj
              }));
            }

            if (origRelatedIds.length !== 0) {
              // Delete removed entries
              const updatedIds = item[field.name].map(i => i.id);
              const deletedIds = origRelatedIds.filter(i => !updatedIds.includes(i));
              for (const deletedId of deletedIds) {
                await API.graphql(graphqlOperation(mutation[`delete${field.manyToMany.relationship}`], {
                  input: {
                    id: `${tmpItem.id}|${deletedId}`
                  }
                }));
              }
            }
          }
        }

        // Update uploads
        for (const [index, field] of itemFields.entries()) {
          const ref = fieldRefs.current[index].current;
          if (ref.isUploader) {
            const uploadedFiles = await ref.upload(`${tmpItem.id}/`);
            sanitizedItem[field.name] = ref.isList() ? uploadedFiles : uploadedFiles[0];

            // Update entry in the db
            await API.graphql(graphqlOperation(mutation[`update${itemNameSingular}`], {
                input: sanitizedItem
              }
            ));
          }
        }

        setItem(tmpItem);
        setOrigItem(tmpItem);
        navigate(baseRoute);
        pushAlert(`${itemNameSingular} ${item.id ? 'updated' : 'added'}`, 'success');
      } catch (err) {
        pushAlert(`Error saving ${itemNameSingular.toLowerCase()}. ${err}`, 'error');
      }
    } catch (e) {
      console.error(e);
      e.errors.forEach(error => pushAlert(error.message, 'error'));
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteItem() {
    setIsLoading(true);
    clearAlerts('error');
    try {
      // Delete join table entries
      for (const field of itemFields) {
        if (field.manyToMany) {
          if (origItem[field.name]) {
            for (const deletedId of origItem[field.name]) {
              await API.graphql(graphqlOperation(mutation[`delete${field.manyToMany.relationship}`], {
                input: {
                  id: `${item.id}|${deletedId}`
                }
              }));
            }
          }
        }
      }

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
              itemFields.map((field, index) => {
                return (
                  <Card key={index}>
                    <field.type ref={fieldRefs.current[index]}
                                isRequired={field.required}
                                isDisabled={isSaving}
                                autoComplete="off"
                                label={field.label}
                                value={item[field.name]}
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
        <Collection
          items={items}
          type="list"
          direction="column"
        >
          {
            (item, index) => (
              <Card
                key={item.id}
              >
                {
                  itemFields.map((field, index) => {
                    if (field.showInList) {
                      if (field.isImage) {
                        return (
                          <div>
                            <div>{field.name}</div>
                            <Image
                              key={index}
                              alt={field.name}
                              src={process.env.REACT_APP_IMG_URL + item[field.name]}
                              style={{maxWidth: '150px', maxHeight: '150px'}}
                            />
                          </div>
                        )
                      } else {
                        return (
                          <p
                            key={index}
                          >
                            {field.name}: {item[field.name]}
                          </p>
                        )
                      }
                    }
                  })
                }
                <Button variation="primary" onClick={() => navigate(baseRoute + item.id)}>Edit</Button>
              </Card>
            )
          }
        </Collection>
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
    if (!message) return;

    if (type !== 'error') {
      setTimeout(() => {
        setAlerts(a => {
          return a.filter(item => item.type !== 'error' && (Date.now() - item.createdDate) < 3000);
        });
      }, 3000);
    }

    setAlerts(a => {
      /*a({
        message: message,
        type: type ?? 'info',
        createdDate: Date.now()
      })*/

      return [
        ...a,
        {
          message: message,
          type: type ?? 'info',
          createdDate: Date.now()
        }
      ];
    });
  }

  function clearAlerts(type) {
    setAlerts((alerts) => {
      return alerts.filter(item => item.type !== type);
    });
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
            <Alert key={alert.id} isDismissible={true} variation={alert.type}>
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
          clearAlerts={clearAlerts}
          baseRoute={baseRoute}
          itemNameSingular={itemNameSingular}
          itemNamePlural={itemNamePlural}
          itemFields={itemFields}
        />)}
      {state === 'update' && (
        <Update
          id={itemId}
          pushAlert={pushAlert}
          clearAlerts={clearAlerts}
          baseRoute={baseRoute}
          itemNameSingular={itemNameSingular}
          itemNamePlural={itemNamePlural}
          itemFields={itemFields}
        />)}
    </div>
  );
}

export default ManageModel;