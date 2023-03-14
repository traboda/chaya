import React, { useState, DragEvent, useRef, ChangeEvent, MouseEvent, useMemo } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import Icon from './Icon';
import Label from './Label';

export type FileUploaderProps = {
  acceptMimes?: string[],
  acceptMultiple?: boolean,
  value: File[] | FileList,
  onChange: (files: File[] | FileList) => void,
  id?: string,
  label?: string,
  isRequired?: boolean,
  className?: string
};

const FileUploader = ({ acceptMimes, acceptMultiple, value, onChange, id, label, isRequired, className }: FileUploaderProps) => {
  const inputId = useMemo(() => id ?? nanoid(), [id]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files ?? []);
  };

  const removeFile = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();
    onChange([...value].filter((_, i) => index !== i));
  };

  const dragLeave = (event: DragEvent<HTMLButtonElement>) => {
    if (event.target !== event.currentTarget) return;
    setIsDragging(false);
  };

  const drop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    onChange(event.dataTransfer?.files ?? []);
  };

  const dragEnter = () => setIsDragging(true);
  const dragOver = (event: DragEvent<HTMLButtonElement>) => event.preventDefault();

  const convertSize = (size: number) => {
    size = size / 1024;
    if (size < 1024) return `${size.toFixed(2)} KB`;
    size = size / 1024;
    if (size < 1024) return `${size.toFixed(2)} MB`;
    size = size / 1024;
    return `${size.toFixed(2)} GB`;
  };

  return (
      <div>
          {label && <Label htmlFor={inputId} children={label} isRequired={isRequired} />}

          <button
              type="button"
              onDrop={drop}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              className={clsx([
                'dsr-w-full dsr-rounded-md dsr-bg-background dsr-min-h-[10rem] dsr-flex',
                'dsr-flex-col dsr-text-center dsr-p-4 dsr-border-gray-400/80 hover:dsr-border-primary',
                value?.length ? 'dsr-gap-1' : 'dsr-items-center dsr-justify-center',
                !isDragging && 'dsr-border',
                className,
              ])}
              style={{ backgroundImage: isDragging ? 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'7\' ry=\'7\' stroke=\'white\' stroke-width=\'4\' stroke-dasharray=\'6%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' : undefined }}
              onClick={() => fileInputRef.current?.click()}
          >
              {isDragging ? (
                  <span className="dsr-w-full dsr-h-full">Drop Items here</span>
              ) : value?.length ? (
                  <>
                      {value.length > 1 && (
                      <span className="dsr-opacity-60 dsr-mb-2">
                          {value.length}
                          {' '}
                          files selected
                      </span>
                      )}
                      {[...value].map((file, i) => (
                          <span className="dsr-flex dsr-items-center dsr-justify-between dsr-w-full">
                              <span>
                                  {file.name}
                                  {' '}
                                  -
                                  {' '}
                                  {convertSize(file.size)}
                              </span>
                              
                              <button onClick={event => removeFile(event, i)}>
                                  <Icon icon="times" size={14} /> 
                              </button>
                          </span>
                      ))}
                  </>
              ) : (
                  <>
                      Drag and drop items
                      <span className="dsr-opacity-60 dsr-my-1 dsr-text-sm">Or</span>
                      Click here to upload files
                  </>
              )}
          </button>

          <input
              id={inputId}
              type="file"
              className="dsr-hidden"
              ref={fileInputRef}
              onChange={onFileUpload}
              accept={acceptMimes?.join(', ')}
              multiple={acceptMultiple}
          />
      </div>
  );
};

export default FileUploader;