import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button, Card, Collection, Flex, Grid, Heading, Image, Link, Loader, ScrollView, TextAreaField, TextField
} from '@aws-amplify/ui-react';
import {API, Auth, Storage, graphqlOperation} from 'aws-amplify';
import * as query from "../graphql/queries";
import * as mutation from "../graphql/mutations";

import awsExports from "../aws-exports";
Auth.configure(awsExports);
Storage.configure(awsExports);

// todo: enforce max uploads and file size

function ImageUploader(props) {
  const {onChange, isDisabled, name, value, maxLength, fileSize, fileTypes, itemNameSingular, itemNamePlural} = props;
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState('');
  const [uploading, setUploading] = useState(false);
  let inputRef;

  function upload() {
    try {
      setUploading(true);
      console.log('files', files);
      for (const fileObj of files) {
        const file = fileObj.file;
        Storage.put(`userimages/${file.name}`, file, {
          contentType: file.type,
          level: "public",
        }).then(result => {
          console.log("Success uploading file!");
        }).catch(err => {
          console.error(`Cannot upload file: ${err}`);
        }).finally(() => {
          setUploading(false);
        });
      }
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  }

  function addFiles() {
    setFiles(files.concat(
      Array.from(inputRef.files).map(i => {
        return {name: i.name, file: i}
      })
    ));
  }

  function removeFile(index) {
    setFiles(files.filter((file, i) => {
      return i !== index;
    }));
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
                wrap="wrap"
              >
                {
                  (item, index) => (
                    <Card
                      key={index}
                      borderRadius="medium"
                      maxWidth="20rem"
                      variation="outlined"
                    >
                      <p>
                        {item.name}
                        <Link
                          onClick={(e) => {
                            removeFile(index)
                          }}
                        >
                          &nbsp;x
                        </Link>
                      </p>
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
            addFiles();
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