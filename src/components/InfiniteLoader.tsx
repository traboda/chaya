'use client';

import React, { Fragment, ReactNode } from 'react';
import { Waypoint } from 'react-waypoint';

import Button from './Button';

const defaultLabels = { endOfList: 'You have reached the end.' };

interface InfiniteLoaderProps {
  loadable?: boolean,
  canLoadMore?: boolean,
  isLoading?: boolean,
  onLoadMore?: () => void,
  labels?: { endOfList?: string },
  renderer?: () => ReactNode,
  showEndOfListMessage?: boolean,
}
 
const InfiniteLoader = ({
  loadable = false,
  canLoadMore = false,
  isLoading = false,
  onLoadMore = () => {},
  labels = defaultLabels,
  renderer = () => <div />,
  showEndOfListMessage = false,
}: InfiniteLoaderProps) => (
  <Fragment>
    {renderer()}
    {loadable && (canLoadMore ? (
      <Waypoint onEnter={() => isLoading ? null : onLoadMore()}>
        <div>
          {!isLoading && (
            <div className="dsr-flex dsr-justify-center dsr-items-center dsr-text-center dsr-my-4">
              <Button onClick={onLoadMore}>
                Load more
              </Button>
            </div>
          )}
        </div>
      </Waypoint>
    ) : showEndOfListMessage ? (
      <div className="dsr-my-4 dsr-text-center dsr-opacity-80">
        {labels.endOfList}
      </div>
    ) : <div />)}
  </Fragment>
);


export default InfiniteLoader;