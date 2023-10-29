
import React, { useState, DragEvent, useRef, ChangeEvent, MouseEvent, useMemo } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import Icon, { IconInputType } from './Icon';
import Label from './Label';
import UploadStatusIndicator from './UploadStatusIndicator';

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

      <UploadStatusIndicator
        removeFile={removeFile}
        className="dsr-mt-4"
        files={value}
        statuses={uploadIndicator}
      />

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