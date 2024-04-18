import React from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';
import { cva } from '../utils/cva';

import Button from './Button';
import SimpleSelect from './SimpleSelect';

export type PageNavigatorProps = {
  totalCount: number,
  itemsPerPage: number,
  page: number,
  setPage?: (no: number) => void,
  setItemsPerPage?: (count: number) => void,
  hideItemsPerPage?: boolean
  showEdgePages?: boolean,
  showPages?: boolean,
  showControls?: boolean,
  showEdges?: boolean,
  id?: string,
  className?: string,
  buttonClassName?: string,
  size?: 'sm' | 'md' | 'lg',
  labels?: {
    rowsPerPage?: string,
  }
};

const DEFAULT_LABELS = {
  rowsPerPage: 'rows per page',
};

const PageNavigator = ({
  totalCount, page, itemsPerPage, id, className, buttonClassName, hideItemsPerPage = false,
  showControls = true, showEdges = true, showPages = true, showEdgePages = false,
  setPage = () => {}, setItemsPerPage = () => {}, labels: _labels, size = 'md',
}: PageNavigatorProps) => {

  const labels = { ...DEFAULT_LABELS, ..._labels };
  const length = Math.floor(((totalCount + itemsPerPage - 1) / itemsPerPage));

  const getPageNo = () => {
    let list = [];
    if (length > 1) {
      if (length < 6)
        Array(length).fill(0).map((_, i) => list.push(i + 1));
      else if (page > 2 && page + 2 < length)
        for (let i = page - 2; i <= (page + 2); i++)
          list.push(i);
      else if (page + 2 >= length)
        for (let i = length - 4; i <= length; i++)
          list.push(i);
      else {
        for (let i = 1; i <= 5; i++)
          list.push(i);
      }
    } else list = [1];
    return list;
  };

  const buttonClasses = cva({
    base: [
      'flex items-center justify-center',
    ],
    variants: {
      size: {
        'sm': 'w-6 h-6 text-sm',
        'md': 'w-8 h-8 text-base',
        'lg': 'w-10 h-10 text-lg',
      },
    },
  });

  const iconClasses = cva({
    base: [],
    variants: {
      size: {
        'sm': 'text-lg',
        'md': 'text-xl',
        'lg': 'text-2xl',
      },
    },
  });

  return (
    <div
      id={id}
      className={mcs([
        'page-navigator flex items-center justify-center text-center',
        className,
      ])}
    >
      <div className="select-none">
        <div className="flex items-stretch justify-center gap-2">
          {(showEdges && page > 2) && (
          <Button
            color="shade"
            variant="minimal"
            label="Go to first page"
            className={mcs(['first-page-button', buttonClasses({ size }), buttonClassName])}
            onClick={() => setPage(1)}
          >
            <i className={mcs(['ri-skip-left-fill', iconClasses({ size })])} />
          </Button>
          )}
          {(showControls && page > 1) && (
          <Button
            color="shade"
            variant="minimal"
            label="Go to previous page"
            className={mcs(['previous-page-button', buttonClasses({ size }), buttonClassName])}
            onClick={() => setPage(page - 1)}
          >
            <i className={mcs(['ri-arrow-left-s-fill', iconClasses({ size })])} />
          </Button>
          )}
          {showEdgePages && showPages && (length > 5 && (page > 3)) && (
            <Button
              label="Go to page 1"
              variant="minimal"
              color="shade"
              isDisabled={page === 1}
              className={mcs([
                'page-number-button', buttonClasses({ size }),
                page === 1 ? 'active !opacity-100' : '',
                buttonClassName,
              ])}
              onClick={() => setPage(1)}
            >
              1
              </Button>
          )}
          {showPages && (
            getPageNo().map((item, index) => (
              <Button
                label={`Go to page ${item}`}
                variant="minimal"
                color={page === item ? 'primary' : 'shade'}
                isDisabled={page === item}
                key={`page_${item}_${index}`}
                className={clsx([
                  'page-number-button', buttonClasses({ size }),
                  page === item ? 'active font-semibold !opacity-100' : '',
                  buttonClassName,
                ])}
                onClick={() => setPage(item)}
              >
                {item}
              </Button>
            ))
          )}
          {(showEdgePages && showPages && length > 5 && (page < length - 2)) && (
            <Button
              label={`Go to page ${length}`}
              variant="minimal"
              color="shade"
              isDisabled={page === length}
              className={mcs([
                'page-number-button', buttonClasses({ size }),
                buttonClassName,
              ])}
              onClick={() => setPage(length)}
            >
                {length}
              </Button>
          )}
          {(showControls && !(page + 1 >= length)) && (
            <Button
              color="shade"
              variant="minimal"
              label="Go to next page"
              className={mcs(['next-page-button', buttonClasses({ size }), buttonClassName])}
              onClick={() => setPage(page + 1)}
            >
              <i className={mcs(['ri-arrow-right-s-fill', iconClasses({ size })])} />
            </Button>
          )}
          {(showEdges && (page + 1 < length)) && (
          <Button
            color="shade"
            variant="minimal"
            label="Go to last page"
            className={mcs(['last-page-button', buttonClasses({ size }), buttonClassName])}
            onClick={() => setPage(length)}
          >
            <i className={mcs(['ri-skip-right-fill', iconClasses({ size })])} />
          </Button>
          )}
        </div>
        {!hideItemsPerPage && (
          <div className="flex items-center justify-center mt-3">
            <div className="mr-1 w-12">
              <SimpleSelect
                value={itemsPerPage}
                hideLabel
                labels={{
                  label: labels.rowsPerPage,
                }}
                onChange={(n) => {
                  setPage(1);
                  setItemsPerPage(typeof n === 'number' ? n : parseInt(n));
                }}
                name="items_per_page"
                className="!p-1 text-sm text-center"
                hideArrow={true}
                isRequired
                options={[
                  { label: '10', value: 10 },
                  { label: '20', value: 20 },
                  { label: '30', value: 30 },
                  { label: '50', value: 50 },
                  { label: '100', value: 100 },
                ]}
              />
            </div>
            {` ${labels.rowsPerPage}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageNavigator;
