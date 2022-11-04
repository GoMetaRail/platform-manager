import React, {useState, useEffect, useImperativeHandle, useRef} from 'react';
import 'react-select-search/style.css';
import * as query from "@gometarail/gometarail/graphql/queries";
import {API, graphqlOperation} from "aws-amplify";
import {Collection, Card, Link} from "@aws-amplify/ui-react";
import {type} from "@testing-library/user-event/dist/type";

function ModelPicker(props, ref) {
  const {onChange, isDisabled, name, value, maxLength, itemNameSingular, itemNamePlural} = props;
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const Typeahead = require('react-typeahead').Typeahead;
  const typeaheadRef = useRef();
  let searchTimeout = null;

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    if (value) {
      let tmpValue = value;
      if (!Array.isArray(tmpValue)) {
        tmpValue = [value];
      }

      const unloadedIds = tmpValue.filter(i => typeof i === "string");
      if (unloadedIds.length !== 0) {
        // Load objects from ids
        loadItems(unloadedIds);
      }

      // Display objects which are already loaded
      setSelected(tmpValue.filter(i => i.id));
    }
  }, []);

  async function loadItems(ids) {
    try {
      const apiData = await API.graphql(graphqlOperation(query[`search${itemNamePlural}`], {
        limit: ids.length,
        filter: {
          or: ids.map(eachId => {
            return {
              id: {eq: eachId}
            }
          }, ids)
        }
      }));
      setSelected(apiData['data'][`search${itemNamePlural}`].items);
      triggerOnChange(apiData['data'][`search${itemNamePlural}`].items);
    } catch (e) {
      console.error(e);
    }
  }

  function searchItems(q) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      try {
        const apiData = await API.graphql(graphqlOperation(query[`search${itemNamePlural}`], {
          limit: 3,
          filter: {
            name: {wildcard: `*${q.toLowerCase()}*`}
          }
        }));
        setOptions(apiData['data'][`search${itemNamePlural}`].items);
      } catch (e) {
        console.error(e);
        setOptions([]);
      }
    }, 250);
  }

  function triggerOnChange(newSelected) {
    let newValue = newSelected;
    if (maxLength === 1) {
      newValue = newValue[0];
    }

    onChange({
      target: {
        'type': 'input',
        name: name,
        value: newValue
      }
    });
  }

  function selectItem(i) {
    setSelected(current => {
      const newSelected = [
        ...current,
        i
      ];

      triggerOnChange(newSelected);

      // Clear the search text
      const searchClearInterval = setInterval(() => {
        if (typeaheadRef.current.state.entryValue !== '') {
          typeaheadRef.current.refs.entry.value = '';
          typeaheadRef.current.state.entryValue = '';
          typeaheadRef.current.refs.entry.blur();
        } else {
          // The box finally cleared
          clearInterval(searchClearInterval);
        }
      }, 10);

      return newSelected;
    });
  }

  function deselectItem(id) {
    setSelected(current => {
      const newSelected = current.filter(i => i.id !== id);

      triggerOnChange(newSelected);
      return newSelected;
    });
  }

  function filterItem(search, option) {
    const selectedIds = selected.map(i => i.id);
    return !selectedIds.includes(option.id);
  }

  return (
    <div>
      <label
        className="amplify-label">
        {(maxLength === 1 ? itemNameSingular : itemNamePlural) + (maxLength > 1 ? ` (maximum: ${maxLength})` : '')}
      </label>
      <div>
        <Typeahead
          onOptionSelected={selectItem}
          options={options}
          disabled={isDisabled || selected.length >= maxLength}
          onChange={e => searchItems(e.target.value)}
          onBlur={e => setOptions([])}
          filterOption={filterItem}
          displayOption={'name'}
          maxVisible={3}
          placeholder={`Search ${itemNamePlural.toLowerCase()}...`}
          ref={typeaheadRef}
          customClasses={{
            input: "typeahead-input amplify-input amplify-field-group__control",
            results: "typeahead-results amplify-flex amplify-collection-items",
            listItem: "typeahead-list-item amplify-card amplify-card--outlined",
            listAnchor: "amplify-link",
            // hover: "",
            // typeahead: "",
            // resultsTruncated: ""
          }}
        />
      </div>
      {
        selected.length > 0 && (
          <Card>
            <Collection
              items={selected}
              type="list"
              direction="row"
            >
              {
                (item, index) => (
                  <Card
                    key={item.id}
                    borderRadius="medium"
                    maxWidth="20rem"
                    variation="outlined"
                  >
                    {item.name}
                    <Link
                      onClick={(e) => {
                        deselectItem(item.id)
                      }}
                    >
                      &nbsp;x
                    </Link>
                  </Card>
                )
              }
            </Collection>
          </Card>
        )
      }
    </div>
  );

}

export default ModelPicker;