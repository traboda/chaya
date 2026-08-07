'use client';
import React, { ChangeEvent, DragEvent, MouseEvent, useMemo, useRef, useState } from 'react';

import { nanoid } from 'nanoid';

import mcs from '../utils/merge';

import Label from './Label';
import UploadStatusIndicator from './UploadStatusIndicator';

export type DropzoneProps = {
  accept?: string[];
  allowMultiple?: boolean;
  value: File[] | FileList;
  onChange: (files: File[] | FileList) => void;
  id?: string;
  labels?: {
    label: string;
    text: string;
    hint: string;
  };
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
  maxCount?: number;
  maxSize?: number;
  uploadIndicator?: {
    loading?: boolean;
    progress?: number;
    error?: boolean;
    success?: boolean;
  }[];
};

const defaultLabels = {
  text: 'Drag and drop files here or click to upload',
};

const Dropzone = ({
  value,
  accept,
  allowMultiple = false,
  onChange = () => {},
  id,
  labels: _labels,
  isRequired = false,
  className,
  isDisabled,
  maxCount = -1,
  maxSize = 5 * 1024 * 1024,
  uploadIndicator,
}: DropzoneProps) => {
  const inputId = useMemo(() => id ?? nanoid(), [id]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labels = { ...defaultLabels, ..._labels };
  const [isDragging, setIsDragging] = useState(false);

  const onFileChange = (files: File[] | FileList) => {
    if (isDisabled) return;
    onChange(
      [...files]
        .filter((file) => {
          const [type, subtype] = file.type.split('/');
          return (
            file.size <= maxSize &&
            accept?.some((acceptType) => {
              const [acceptTypeMain, acceptTypeSub] = acceptType.split('/');
              return (
                acceptTypeMain === '*' ||
                (acceptTypeMain === type && (acceptTypeSub === '*' || acceptTypeSub === subtype))
              );
            })
          );
        })
        .filter((_, i) => i < maxCount || maxCount === -1)
    );
  };

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files ?? []);
  };

  const removeFile = (event: MouseEvent, index: number) => {
    event.stopPropagation();
    onFileChange([...value].filter((_, i) => index !== i));
  };

  const dragLeave = (event: DragEvent<HTMLButtonElement>) => {
    if (event.target !== event.currentTarget) return;
    setIsDragging(false);
  };

  const drop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    onFileChange(event.dataTransfer?.files ?? []);
  };

  const dragEnter = () => setIsDragging(true);
  const dragOver = (event: DragEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <div>
      {labels && <Label htmlFor={inputId} children={labels?.label} isRequired={isRequired} />}
      {allowMultiple || (typeof value !== 'undefined' && value?.length == 0) ? (
        <button
          type="button"
          onDrop={drop}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          className={mcs([
            'flex min-h-[10rem] w-full rounded-lg border-dashed',
            'mt-1 flex-col items-center justify-center border-2 p-4 text-center',
            !isDisabled && isDragging
              ? 'bg-gray-500/30 dark:bg-gray-500/50'
              : 'bg-gray-500/10 dark:bg-gray-500/20',
            isDisabled ? 'cursor-not-allowed opacity-75' : 'hover:border-primary',
            className,
          ])}
          onClick={() => fileInputRef.current?.click()}
        >
          {isDragging && !isDisabled ? (
            <span className="pointer-events-none h-full w-full">Drop Items here</span>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <i
                className="ri-upload-2-line text-3xl lg:text-4xl xl:text-5xl"
                title={labels.text}
              />
              {labels?.text && <div className="mb-2 w-[75%]">{labels.text}</div>}
              {labels?.hint && <div className="text-sm opacity-75">{labels.hint}</div>}
            </div>
          )}
        </button>
      ) : (
        <div>
          <UploadStatusIndicator
            removeFile={removeFile}
            className="mt-2"
            files={value}
            statuses={uploadIndicator}
            hideTitle
          />
        </div>
      )}
      {allowMultiple ? (
        <UploadStatusIndicator
          removeFile={removeFile}
          className="mt-4"
          files={value}
          statuses={uploadIndicator}
        />
      ) : null}
      <input
        id={inputId}
        type="file"
        className="hidden"
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
