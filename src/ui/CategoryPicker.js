import React, {useState, useEffect} from 'react';
import 'react-select-search/style.css';
import {searchCategories} from "../graphql/queries";
import {API, graphqlOperation} from "aws-amplify";
import {Collection, Card, Link} from "@aws-amplify/ui-react";

function CategoryPicker() {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const Typeahead = require('react-typeahead').Typeahead;
  let searchTimeout = null;

  useEffect(() => {
  }, []);

  function searchItems(q) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      try {
        const apiData = await API.graphql(graphqlOperation(searchCategories, {
          limit: 3,
          filter: {
            name: {wildcard: `*${q.toLowerCase()}*`}
          }
        }));
        setOptions(apiData.data.searchCategories.items);
      } catch (e) {
        console.error(e);
        setOptions([]);
      }
    }, 250);
  }

  function selectItem(i) {
    setSelected(current => {
      return [
        ...current,
        i
      ];
    });
  }

  function deselectItem(id) {
    setSelected(current => {
      return current.filter(i => i.id !== id);
    });
  }

  function filterItem(search, option) {
    const selectedIds = selected.map(i=>i.id);
    return !selectedIds.includes(option.id);
  }

  return (
    <div>
      <label className="amplify-label">Category</label>
      <div>
        <Typeahead
          onOptionSelected={selectItem}
          options={options}
          onChange={(e) => searchItems(e.target.value)}
          onBlur={(e) => { setOptions([]) }}
          filterOption={filterItem}
          displayOption={"name"}
          maxVisible={3}
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
      <Card>
        {
          selected.length !== 0 && (
            <Collection
              items={selected}
              type="list"
              direction="row"
            >
              {(item, index) => (
                <Card
                  key={item.id}
                  borderRadius="medium"
                  maxWidth="20rem"
                  variation="outlined"
                >
                  {item.name}
                  <Link
                    onClick={(e) => { deselectItem(item.id) }}
                  >
                    &nbsp;x
                  </Link>
                </Card>
              )}
            </Collection>
          )
        }
      </Card>
    </div>
  );

}

export default CategoryPicker;