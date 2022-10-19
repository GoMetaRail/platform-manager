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
    fileTypes,
    pushAlert,
    clearAlerts
  } = props;
  const [files, setFiles] = useState([]);
  const [markedForDeletion, setMarkedForDeletion] = useState([]);
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

        const checkProgress = (index) => {
          if (index === (files.length - 1)) {
            // All uploads completed
            setUploading(false);
            resolve(uploadedFiles);
          }
        }

        const safeDelete = async (key) => {
          // Only allow deletion of images (instead of folders, etc.)
          if (key.endsWith('.jpg')) {
            Storage.remove(key);
          }
        }

        // Delete removed uploads
        for (const fileObj of markedForDeletion) {
          safeDelete(fileObj.key);
        }

        // Check if there is nothing to upload
        const uploadedFiles = [];
        checkProgress(-1);
        for (const [index, fileObj] of files.entries()) {
          if (maxLength && index >= maxLength) {
            // Don't upload any more files
            continue;
          }

          const suffix = maxLength && maxLength > 1 ? `-${index + 1}` : '';
          let fileName = `${namePrepend}${name}${suffix}.jpg`;

          if (fileObj.isUploaded) {
            if (fileObj.key !== fileName) {
              // Rename the file by copying it first
              Storage.copy({
                key: fileObj.key
              }, {
                key: fileName
              }).then(async () => {
                // Then delete the original file
                await safeDelete(fileObj.key);
              }).finally(() => {
                checkProgress(index);
              });

              uploadedFiles.push(fileName);
            } else {
              // No changes needed
              uploadedFiles.push(fileObj.key);
              checkProgress(index);
            }
          } else {
            const file = fileObj.file;

            if (maxFileSize && file.size > maxFileSize) {
              throw new Error(`File is greater than max filesize of ${prettyBytes(maxFileSize)}`);
            }

            Storage.put(fileName, file, {
              contentType: file.type,
              level: "public"
            }).then(result => {
              uploadedFiles.push(result.key);
            }).catch(err => {
              reject(`Cannot upload file: ${err}`);
            }).finally(() => checkProgress(index));
          }
        }
      });
    }
  }));

  useEffect(() => {
    if (value) {
      let tmpValue = value;
      if (!Array.isArray(tmpValue)) {
        tmpValue = [tmpValue];
      }

      const newFiles = tmpValue.map((key, index) => {
        const suffix = maxLength && maxLength > 1 ? `-${index + 1}` : '';
        return {
          name: name + suffix,
          url: process.env.REACT_APP_IMG_URL + key,
          isUploaded: true,
          key: key
        };
      });

      setFiles(newFiles);
    }
  }, []);

  function addFiles() {
    const newFiles = files.concat(
      Array.from(inputRef.files).filter(i => {
        if (maxFileSize && i.size > maxFileSize) {
          pushAlert(`File is greater than max filesize of ${prettyBytes(maxFileSize)}`, 'error');
          return false;
        }

        return true;
      }).map(i => {
        return {
          name: i.name,
          url: URL.createObjectURL(i),
          isUploaded: false,
          file: i
        }
      })
    );

    setFiles(newFiles.filter((file, index) => {
      return maxLength && index < maxLength;
    }));
  }

  function removeFile(index) {
    setFiles((tmpFiles) => {
      const file = files[index];
      if (file.isUploaded) {
        setMarkedForDeletion((tmpDeletions) => {
          tmpDeletions.push(file);
          return tmpDeletions;
        });
      }

      return tmpFiles.filter((tmpFile, i) => {
        return i !== index;
      });
    });
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
                      <div style={{marginBottom: '5px'}}>
                        {item.name}
                        <Link
                          onClick={(e) => {
                            removeFile(index)
                          }}
                        >
                          &nbsp;x
                        </Link>
                      </div>
                      <Image
                        alt={`Upload${index + 1}`}
                        src={item.url}
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
          isDisabled={isDisabled || (maxLength && files.length >= maxLength)}
        >
          Choose Upload
        </Button>
      </div>
    </div>
  );
}

export default ImageUploader;