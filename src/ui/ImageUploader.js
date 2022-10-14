import React, {useState, useEffect, useImperativeHandle} from 'react';
import {
  Alert,
  Button, Card, Collection, Flex, Grid, Heading, Image, Link, Loader, ScrollView, TextAreaField, TextField
} from '@aws-amplify/ui-react';
import {API, Auth, Storage, graphqlOperation} from 'aws-amplify';
import * as query from "../graphql/queries";
import * as mutation from "../graphql/mutations";

import awsExports from "../aws-exports";
import prettyBytes from "pretty-bytes";

Auth.configure(awsExports);
Storage.configure(awsExports);

function ImageUploader(props, ref) {
  const {
    onChange,
    isDisabled,
    label,
    name,
    value,
    maxFileSize,
    maxLength,
    fileTypes
  } = props;
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState('');
  const [uploading, setUploading] = useState(false);
  let inputRef;

  useImperativeHandle(ref, () => ({
    isUploader: true,
    isList() {
      return maxLength !== 1;
    },
    getFiles() {
      return files;
    },
    upload(namePrepend) {
      return new Promise((resolve, reject) => {
        setUploading(true);

        const uploadedFiles = [];
        for (const [index, fileObj] of files.entries()) {
          if (maxLength && index >= maxLength) {
            // Don't upload any more files
            continue;
          }

          const file = fileObj.file;

          if (maxFileSize && file.size > maxFileSize) {
            throw new Error(`File is greater than max filesize of ${prettyBytes(maxFileSize)}`);
          }

          const suffix = maxLength && maxLength > 1 ? `-${index + 1}` : '';
          let fileName = `${namePrepend}${name}${suffix}.jpg`;
          Storage.put(fileName, file, {
            contentType: file.type,
            level: "public"
          }).then(result => {
            uploadedFiles.push(result.key);
          }).catch(err => {
            reject(`Cannot upload file: ${err}`);
          }).finally(() => {
            if(index === (files.length - 1)) {
              // All uploads completed
              setUploading(false);
              resolve(uploadedFiles);
            }
          });
        }
      });
    }
  }));

  function addFiles() {
    const newFiles = files.concat(
      Array.from(inputRef.files).map(i => {
        if (maxFileSize && i.size > maxFileSize) {
          throw new Error(`File is greater than max filesize of ${prettyBytes(maxFileSize)}`);
        }
        return {name: i.name, file: i}
      })
    );

    setFiles(newFiles.filter((file, index) => {
      return maxLength && index < maxLength;
    }));
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
        {label + (maxLength > 1 ? ` (maximum: ${maxLength})` : '')}
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
                        alt={`Upload${index + 1}`}
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
          isDisabled={isDisabled}
        >
          Choose Upload
        </Button>
        {!!response && <div>{response}</div>}
      </div>
    </div>
  );
}

export default ImageUploader;