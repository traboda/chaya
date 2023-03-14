import React, { useState, DragEvent, useRef, ChangeEvent, MouseEvent, useMemo } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import Icon, { IconInputType } from './Icon';
import Label from './Label';

export type DropzoneProps = {
  accept?: string[],
  allowMultiple?: boolean,
  value: File[] | FileList,
  onChange: (files: File[] | FileList) => void,
  id?: string,
  labels?: {
    label: string,
    text: string,
    hint: string,
  },
  isRequired?: boolean,
  className?: string,
  icon?: IconInputType,
};

const defaultLabels = {
  text: 'Drag and drop files here or click to upload',
};

const Dropzone = ({
  value, accept, allowMultiple = false, onChange = () => {}, id, icon, labels: _labels, isRequired = false, className,
}: DropzoneProps) => {
  const inputId = useMemo(() => id ?? nanoid(), [id]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labels = { ...defaultLabels, ..._labels };
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
          {labels && <Label htmlFor={inputId} children={labels?.label} isRequired={isRequired} />}
          <button
              type="button"
              onDrop={drop}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              className={clsx([
                'dsr-w-full dsr-rounded-md dsr-min-h-[10rem] dsr-flex',
                'dsr-flex-col dsr-text-center dsr-p-4 dsr-border-2 dsr-border-dashed dsr-border-gray-400/80 hover:dsr-border-primary',
                value?.length ? 'dsr-gap-1' : 'dsr-items-center dsr-justify-center',
                isDragging ? 'dark:dsr-bg-gray-500/50 dsr-bg-gray-500/30' : 'dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
                className,
              ])}
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
                                  <Icon icon="times" size={16} />
                              </button>
                          </span>
                      ))}
                  </>
              ) : (
                  <div className="dsr-text-center">
                      {icon && (
                      <div className="dsr-flex dsr-mb-2 dsr-justify-center">
                          <Icon icon={icon} size={48} />
                      </div>
                      )}
                      {labels?.text && <div className="dsr-mb-2">{labels?.text}</div>}
                      {labels?.hint && <div className="dsr-opacity-75 dsr-text-sm">{labels?.hint}</div>}
                  </div>
              )}
          </button>
          <input
              id={inputId}
              type="file"
              className="dsr-hidden"
              ref={fileInputRef}
              onChange={onFileUpload}
              accept={accept?.join(', ')}
              multiple={allowMultiple}
          />
      </div>
  );
};

export default Dropzone;