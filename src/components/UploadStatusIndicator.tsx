import React, { MouseEvent } from 'react';

import Spinner from './Spinner';
import Icon from './Icon';

export type UploadStatus = {
  loading?: boolean,
  progress?: number,
  error?: boolean,
  success?: boolean
};
export type UploadStatusIndicatorProps = {
  files: File[] | FileList,
  statuses?: UploadStatus[],
  removeFile: (event: MouseEvent, index: number) => void,
  className?: string
};

const UploadStatusIndicator = ({ className, files, statuses, removeFile }: UploadStatusIndicatorProps) => {
  const convertSize = (size: number) => {
    const postfixes = ['KB', 'MB', 'GB'];
    for (let i = 0; i < postfixes.length; i++) {
      size = size / 1024;
      if (size < 1024 || i === postfixes.length - 1) return `${size.toFixed(2)} ${postfixes[i]}`;
    }
  };
  return (
    <div className={className}>
      {!!files.length && (
      <div className="opacity-60 mb-1">
        {files.length}
        {' '}
        file
        {files.length > 1 && 's'}
        {' '}
        selected
      </div>
      )}
      {[...files].map((file, i) => (
        <div
          key={file.name}
          className="flex items-center justify-between w-full transition hover:bg-gray-500/20 rounded py-0.5"
        >
          <div>
            {file.name}
            {' '}
            -
            {' '}
            <span className="opacity-75 text-sm">
              {convertSize(file.size)}
            </span>
          </div>

          <div className="flex text-sm items-center">
            {statuses && statuses[i] && (statuses[i].loading || statuses[i].progress !== undefined) && (
              <Spinner size="sm" />
            )}
            {statuses && statuses[i] && (
              statuses[i].success ? (
                <Icon icon="check" size={16} className="text-green-600" />
              ) : statuses[i].error ? (
                <Icon icon="alert-triangle" size={16} className="text-red-600" />
              ) : statuses[i].progress !== undefined ? (
                <div className="ml-1">
                  {statuses[i].progress}
                  %
                </div>
              ) : null
            )}

            <button aria-label="Remove File" className="ml-2" onClick={event => removeFile(event, i)}>
              <Icon icon="times" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadStatusIndicator;