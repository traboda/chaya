'use client';
import React, { Fragment, ReactNode } from 'react';
import { Waypoint } from 'react-waypoint';

import Button from './Button';

const defaultLabels = { endOfList: 'You have reached the end.' };

interface InfiniteLoaderProps {
  canLoadMore?: boolean,
  isLoading?: boolean,
  onLoadMore?: () => void,
  labels?: { endOfList?: string },
  renderer?: () => ReactNode,
  showEndOfListMessage?: boolean,
}
 
const InfiniteLoader = ({
  canLoadMore = false,
  isLoading = false,
  onLoadMore = () => {},
  labels = defaultLabels,
  renderer = () => <div />,
  showEndOfListMessage = false,
}: InfiniteLoaderProps) => (
  <Fragment>
    {renderer()}
    {canLoadMore ? (
      <Waypoint onEnter={() => isLoading ? null : onLoadMore()}>
        <div>
          {!isLoading && (
            <div className="flex justify-center items-center text-center my-4">
              <Button onClick={onLoadMore}>
                Load more
              </Button>
            </div>
          )}
        </div>
      </Waypoint>
    ) : showEndOfListMessage ? (
      <div className="my-4 text-center opacity-80">
        {labels.endOfList}
      </div>
    ) : <div />}
  </Fragment>
);


export default InfiniteLoader;