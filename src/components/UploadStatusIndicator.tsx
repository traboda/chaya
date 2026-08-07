import React, { MouseEvent } from 'react';

import Icon from './Icon';
import Spinner from './Spinner';

export type UploadStatus = {
  loading?: boolean;
  progress?: number;
  error?: boolean;
  success?: boolean;
};

export type UploadStatusIndicatorProps = {
  files: File[] | FileList;
  statuses?: UploadStatus[];
  removeFile: (event: MouseEvent, index: number) => void;
  className?: string;
  hideTitle?: boolean;
};

const UploadStatusIndicator = ({
  className,
  files,
  statuses,
  removeFile,
  hideTitle,
}: UploadStatusIndicatorProps) => {
  const convertSize = (size: number) => {
    const postfixes = ['KB', 'MB', 'GB'];
    for (let i = 0; i < postfixes.length; i++) {
      size = size / 1024;
      if (size < 1024 || i === postfixes.length - 1) return `${size.toFixed(2)} ${postfixes[i]}`;
    }
  };

  return (
    <div className={className}>
      {!!files.length && !hideTitle && (
        <div className="mb-1 opacity-60">
          {`${files.length} file${files.length > 1 ? 's' : ''} selected`}
        </div>
      )}
      {[...files].map((file, i) => (
        <div
          key={file.name}
          className="flex w-full items-center justify-between rounded bg-neutral-100 px-2 py-1 dark:bg-neutral-800"
        >
          <div>
            {file.name} - <span className="text-sm opacity-75">{convertSize(file.size)}</span>
          </div>
          <div className="flex items-center text-sm">
            {statuses &&
              statuses[i] &&
              (statuses[i].loading || statuses[i].progress !== undefined) && <Spinner size="sm" />}
            {statuses &&
              statuses[i] &&
              (statuses[i].success ? (
                <Icon icon="check" size={16} className="text-green-600" />
              ) : statuses[i].error ? (
                <Icon icon="alert-triangle" size={16} className="text-red-600" />
              ) : statuses[i].progress !== undefined ? (
                <div className="ml-1">{statuses[i].progress}%</div>
              ) : null)}
            <button
              aria-label="Remove File"
              className="ml-2"
              onClick={(event) => removeFile(event, i)}
            >
              <i className="ri-close-line text-xl text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadStatusIndicator;
