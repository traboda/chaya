'use client';
import React, { Fragment, ReactNode } from 'react';

import { useInView } from 'react-intersection-observer';

import Button from './Button';

const defaultLabels = { endOfList: 'You have reached the end.' };

interface InfiniteLoaderProps {
  canLoadMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  labels?: { endOfList?: string };
  renderer?: () => ReactNode;
  showEndOfListMessage?: boolean;
}

const InfiniteLoader = ({
  canLoadMore = false,
  isLoading = false,
  onLoadMore = () => {},
  labels = defaultLabels,
  renderer = () => <div />,
  showEndOfListMessage = false,
}: InfiniteLoaderProps) => {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isLoading) {
        onLoadMore();
      }
    },
    skip: !canLoadMore,
  });

  return (
    <Fragment>
      {renderer()}
      {canLoadMore ? (
        <div ref={ref}>
          {!isLoading && (
            <div className="my-4 flex items-center justify-center text-center">
              <Button onClick={onLoadMore}>Load more</Button>
            </div>
          )}
        </div>
      ) : showEndOfListMessage ? (
        <div className="my-4 text-center opacity-80">{labels.endOfList}</div>
      ) : (
        <div />
      )}
    </Fragment>
  );
};

export default InfiniteLoader;
