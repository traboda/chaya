import React, { Fragment, ReactNode } from 'react';
import { Waypoint } from "react-waypoint";

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
}: InfiniteLoaderProps) => {
    return (
        <Fragment>
            {renderer()}

            {loadable && (canLoadMore ? (
                <Waypoint onEnter={() => !isLoading ? onLoadMore() : null}>
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
                <div className="my-4 text-center" style={{ opacity: 0.8 }}>
                    {labels.endOfList}
                </div>
            ) : <div />)}
        </Fragment>
    );
};

export default InfiniteLoader;