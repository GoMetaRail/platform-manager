import React, {useState, useEffect, useImperativeHandle, createRef, useRef} from 'react';
import {
  Button, Card, Image, Link
} from '@aws-amplify/ui-react';
import {Auth, Storage} from 'aws-amplify';

import awsExports from "../aws-exports";
import prettyBytes from "pretty-bytes";
import Sortable from 'sortablejs';

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
  const imageCollectionRef = useRef();
  const imageRefs = useRef([]);

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

        const checkProgress = () => {
          if (uploadedFiles.length === files.length) {
            // All uploads completed
            setUploading(false);
            resolve(uploadedFiles);
          }
        }

        // Only allow deletion of images (instead of folders, etc.)
        const safeDelete = async (key) => {
          for (const type of fileTypes) {
            const fileExtension = `.${type.split('/').pop()}`;
            if(key.endsWith(fileExtension)) {
              return Storage.remove(key);
            }
          }

          console.error('Deletion blocked', key, fileTypes);
          return false;
        }

        // Delete removed uploads
        for (const fileObj of markedForDeletion) {
          safeDelete(fileObj.key);
        }

        // Check if there is nothing to upload
        checkProgress();
        for (const [index, fileObj] of files.entries()) {
          if (maxLength && index >= maxLength) {
            // Don't upload any more files
            continue;
          }

          const suffix = maxLength && maxLength > 1 ? `-${index + 1}` : '';
          const fileExtension = `.${fileObj.type.split('/').pop()}`;
          let fileName = `${namePrepend}${name}${suffix}-${Date.now()}${fileExtension}`;

          if (fileObj.isUploaded) {
            // Rename the file by copying it first and append a version to the filename
            Storage.copy({
              key: fileObj.key
            }, {
              key: fileName
            }).then(async () => {
              // Then delete the original file
              await safeDelete(fileObj.key);
            }).finally(() => {
              checkProgress();
            });

            uploadedFiles.push(fileName);
          } else {
            const file = fileObj.file;

            if (!fileTypes.includes(fileObj.type)) {
              throw new Error('File is not of an allowed type');
            }

            if (maxFileSize && file.size > maxFileSize) {
              throw new Error(`File is greater than max filesize of ${prettyBytes(maxFileSize)}`);
            }

            Storage.put(fileName, file, {
              contentType: file.type,
              level: "public"
            }).then(result => {
              uploadedFiles.push(result.key);
            }).catch(err => {
              console.error('upload failed', err);
              reject(`Cannot upload file: ${err}`);
            }).finally(() => checkProgress());
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

        const fileExtension = key.split('.').pop();
        let fileType = 'image/jpg';
        if (fileExtension && fileExtension.toLowerCase() === '.png') {
          fileType = 'image/png';
        }

        return {
          name: name + suffix,
          type: fileType,
          url: process.env.REACT_APP_IMG_URL + key,
          isUploaded: true,
          key: key
        };
      });

      setFiles(newFiles);
      imageRefs.current = files.map((_, i) => imageRefs.current[i] ?? createRef());
    }

    setTimeout(() => {
      if (maxLength === 1 || !imageCollectionRef.current) return;
      Sortable.create(imageCollectionRef.current, {
        onEnd: (e) => {
          if (e.oldIndex !== e.newIndex) {
            setFiles((currentFiles) => {
              // Remove from old position
              const file = currentFiles.splice(e.oldIndex, 1)[0];
              // Insert into new position
              currentFiles.splice(e.newIndex, 0, file);

              return currentFiles;
            });
          }
        }
      });
    }, 2000);
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
          type: i.type,
          isUploaded: false,
          file: i
        }
      })
    );

    setFiles(newFiles.filter((file, index) => {
      return maxLength && index < maxLength;
    }));
  }

  function removeFile(file) {
    setFiles((tmpFiles) => {
      if (file.isUploaded) {
        setMarkedForDeletion((tmpDeletions) => {
          tmpDeletions.push(file);
          return tmpDeletions;
        });
      }

      return tmpFiles.filter((tmpFile, i) => {
        return tmpFile.url !== file.url;
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
          <Card>
            <ul
              className={'imageUploaderCollection'}
              ref={imageCollectionRef}
            >
              {
                files.map((item, index) => (
                  <li
                    key={item.url}
                  >
                    <Card
                      borderRadius="medium"
                      maxWidth="20rem"
                      variation="outlined"
                    >
                      <div style={{marginBottom: '5px'}}>
                        {item.name}
                        <Link
                          onClick={(e) => {
                            removeFile(item)
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
                  </li>
                ))
              }
            </ul>
          </Card>
        }
        <input
          type="file"
          multiple
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
          {maxLength === 1 && 'Choose Upload' || 'Choose Uploads'}
        </Button>
      </div>
    </div>
  );
}

export default ImageUploader;