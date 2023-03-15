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
  isDisabled?: boolean,
  className?: string,
  icon?: IconInputType,
  maxCount?: number,
  maxSize?: number,
  uploadIndicator?: {
    loading?: boolean,
    progress?: number,
    error?: boolean,
    success?: boolean
  }[],
};

const defaultLabels = {
  text: 'Drag and drop files here or click to upload',
};

const Dropzone = ({
  value, accept, allowMultiple = false, onChange = () => {}, id, icon, labels: _labels, isRequired = false, className,
  isDisabled, maxCount = -1, maxSize = 5 * 1024 * 1024, uploadIndicator,
}: DropzoneProps) => {
  const inputId = useMemo(() => id ?? nanoid(), [id]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labels = { ...defaultLabels, ..._labels };
  const [isDragging, setIsDragging] = useState(false);

  const onFileChange = (files: File[] | FileList) => {
    if (isDisabled) return;
    onChange([...files].filter(file => {
      const [type, subtype] = file.type.split('/');
      return file.size <= maxSize && accept?.some(acceptType => {
        const [acceptTypeMain, acceptTypeSub] = acceptType.split('/');
        return acceptTypeMain === '*' || (acceptTypeMain === type && (acceptTypeSub === '*' || acceptTypeSub === subtype));
      });
    }).filter((_, i) => i < maxCount || maxCount === -1));
  };

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files ?? []);
  };

  const removeFile = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();
    onFileChange([...value].filter((_, i) => index !== i));
  };

  const dragLeave = (event: DragEvent<HTMLButtonElement>) => {
    if (event.target !== event.currentTarget) return;
    console.log(event.target, event.currentTarget);
    setIsDragging(false);
  };

  const drop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    onFileChange(event.dataTransfer?.files ?? []);
  };

  const dragEnter = () => setIsDragging(true);
  const dragOver = (event: DragEvent<HTMLButtonElement>) => event.preventDefault();

  const convertSize = (size: number) => {
    const postfixes = ['KB', 'MB', 'GB'];
    for (let i = 0; i < postfixes.length; i++) {
      size = size / 1024;
      if (size < 1024 || i === postfixes.length - 1) return `${size.toFixed(2)} ${postfixes[i]}`;
    }
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
                'dsr-w-full dsr-rounded-md dsr-min-h-[10rem] dsr-flex dsr-border-dashed dsr-border-gray-400/80',
                'dsr-flex-col dsr-text-center dsr-p-4 dsr-border-2 dsr-items-center dsr-justify-center',
                !isDisabled && isDragging ? 'dark:dsr-bg-gray-500/50 dsr-bg-gray-500/30' : 'dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
                className,
                isDisabled ? 'dsr-opacity-75 dsr-cursor-not-allowed' : 'hover:dsr-border-primary',
              ])}
              onClick={() => fileInputRef.current?.click()}
          >
              {isDragging && !isDisabled ? (
                  <span className="dsr-w-full dsr-h-full dsr-pointer-events-none">Drop Items here</span>
              ) : (
                  <div className="dsr-text-center">
                      {icon && (
                          <div className="dsr-flex dsr-mb-4 dsr-justify-center">
                              <Icon icon={icon} size={48} />
                          </div>
                      )}
                      {labels?.text && <div className="dsr-mb-2">{labels.text}</div>}
                      {labels?.hint && <div className="dsr-opacity-75 dsr-text-sm">{labels.hint}</div>}
                  </div>
              )}
          </button>

          <div className="dsr-mt-4">
              {!!value.length && (
                  <div className="dsr-opacity-60 dsr-mb-1">
                      {value.length}
                      {' '}
                      file
                      {value.length > 1 && 's'}
                      {' '}
                      selected
                  </div>
              )}
              {[...value].map((file, i) => (
                  <div
                      key={file.name}
                      className="dsr-flex dsr-items-center dsr-justify-between dsr-w-full dsr-transition hover:dsr-bg-gray-500/20 dsr-rounded dsr-py-0.5"
                  >
                      <div>
                          {file.name}
                          {' '}
                          -
                          {' '}
                          {convertSize(file.size)}
                      </div>

                      <div className="dsr-flex dsr-text-sm dsr-items-center">
                          {uploadIndicator && uploadIndicator[i] && (uploadIndicator[i].loading || uploadIndicator[i].progress !== undefined) && (
                              <div></div>
                          )}
                          {uploadIndicator && uploadIndicator[i] && (
                            uploadIndicator[i].success ? (
                                <Icon icon="check" size={16} className="dsr-text-green-600" />
                            ) : uploadIndicator[i].error ? (
                                <Icon icon="alert-triangle" size={16} className="dsr-text-red-600" />
                            ) : (
                                <div className="ml-1">
                                    {uploadIndicator[i].progress}
                                    %
                                </div>
                            )
                          )}

                          <button className="dsr-ml-2" onClick={event => removeFile(event, i)}>
                              <Icon icon="times" size={16} />
                          </button>
                      </div>
                  </div>
              ))}
          </div>

          <input
              id={inputId}
              type="file"
              className="dsr-hidden"
              ref={fileInputRef}
              onChange={onFileUpload}
              accept={accept?.join(', ')}
              multiple={allowMultiple}
              disabled={isDisabled}
              required={isRequired}
          />
      </div>
  );
};

export default Dropzone;