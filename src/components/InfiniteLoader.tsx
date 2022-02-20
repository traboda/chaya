import React, { Fragment, ReactNode, useEffect, useRef } from 'react';

import Button from './Button';

const defaultLabels = { endOfList: 'You have reached the end.' };

interface InfiniteLoaderProps {
    loadable?: boolean,
    canLoadMore?: boolean,
    isLoading?: boolean,
    onLoadMore?: () => void,
    labels?: { endOfList?: string },
    renderer?: () => ReactNode
}

const InfiniteLoader = ({
    loadable = false,
    canLoadMore = false,
    isLoading = false,
    onLoadMore = () => {},
    labels = defaultLabels,
    renderer = () => <div />
}: InfiniteLoaderProps) => {
    const waypoint = useRef(null);

    useEffect(() => {
        let observer;

        const handleIntersect = (entries) => entries[0].isIntersecting && !isLoading ? onLoadMore() : null;

        if (waypoint.current) {
            observer = new IntersectionObserver(handleIntersect, { threshold: 0 });
            observer.observe(waypoint.current);
        }

        return () => {
            if (waypoint.current) observer.unobserve(waypoint.current);
        };
    }, [isLoading, loadable && canLoadMore]);

    return (
        <Fragment>
            {renderer()}

            {loadable && canLoadMore ? (
                <div ref={waypoint}>
                    <div>
                        {!isLoading &&
                            <div className="flex justify-center items-center text-center my-4">
                                <Button inverseColors m={2} onClick={onLoadMore} px={4} py={2}>
                                    Load more
                                </Button>
                            </div>}
                    </div>
                </div>
            ) : (
                <div className="my-4 text-center" style={{ opacity: 0.8 }}>
                    {labels.endOfList}
                </div>
            )}
        </Fragment>
    );
};

export default InfiniteLoader;