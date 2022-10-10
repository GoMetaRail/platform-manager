import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button, Card, Collection, Flex, Grid, Heading, Image, Link, Loader, ScrollView, TextAreaField, TextField
} from '@aws-amplify/ui-react';
import Storage from "@aws-amplify/storage";
import {API, graphqlOperation} from 'aws-amplify';
import * as query from "../graphql/queries";
import * as mutation from "../graphql/mutations";

// todo: enforce max uploads and file size

function ImageUploader(props) {
  const {onChange, isDisabled, name, value, maxLength, fileSize, fileTypes, itemNameSingular, itemNamePlural} = props;
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState('');
  const [uploading, setUploading] = useState(false);
  let inputRef;

  function upload() {
    setUploading(true);
    console.log('files', files);
    // Storage.put(`userimages/${this.upload.files[0].name}`,
    //   this.upload.files[0],
    //   { contentType: this.upload.files[0].type })
    //   .then(result => {
    //     this.upload = null;
    //     this.setState({ response: "Success uploading file!" });
    //   })
    //   .catch(err => {
    //     this.setState({ response: `Cannot uploading file: ${err}` });
    //   });
    setUploading(false);
  }

  return (
    <div>
      <label
        className="amplify-label">
        {(maxLength === 1 ? itemNameSingular : itemNamePlural) + (maxLength > 1 ? ` (maximum: ${maxLength})` : '')}
      </label>
      <div>
        {
          files.length > 0 && (
            <Card>
              <Collection
                items={files}
                type="list"
                direction="row"
                gap="20px"
                wrap="nowrap"
              >
                {
                  (item, index) => (
                    <Card
                      key={index}
                      borderRadius="medium"
                      maxWidth="20rem"
                      variation="outlined"
                    >
                      <p>{item.name}</p>
                      <Image
                        alt={`${itemNameSingular}Image${index + 1}`}
                        src={URL.createObjectURL(item.file)}
                      />
                    </Card>
                  )
                }
              </Collection>
            </Card>
          )
        }
        <input
          type="file"
          accept={fileTypes.join(', ')}
          style={{display: "none"}}
          ref={refParam => inputRef = refParam}
          onChange={e => {
            setFiles(files.concat(
              Array.from(inputRef.files).map(i => {
                return {name: i.name, file: i}
              })
            ));
          }}
        />
        <Button
          onClick={() => inputRef.click()}
          isLoading={uploading}
        >
          Browse
        </Button>
        <Button
          onClick={upload}
          isLoading={uploading}
        >
          Upload Test
        </Button>
        {!!response && <div>{response}</div>}
      </div>
    </div>
  );
}

export default ImageUploader;