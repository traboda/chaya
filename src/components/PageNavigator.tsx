import React from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

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
  labels?: {
    rowsPerPage?: string,
  }
};

const DEFAULT_LABELS = {
  rowsPerPage: 'rows per page',
};

const PageNavigator = ({
  totalCount, page, itemsPerPage, id, className = '', hideItemsPerPage = false,
  showControls = true, showEdges = true, showPages = true, showEdgePages = false,
  setPage = () => {}, setItemsPerPage = () => {}, labels: _labels,
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

  return (
    <div
      id={id}
      className={mcs([
        'page-navigator flex items-center justify-center text-center pt-4 page-navigator',
        className,
      ])}
    >
      <div className="select-none">
        <div className="flex items-stretch justify-center">
          {(showEdges && page > 2) && (
          <Button
            color="contrast"
            variant="minimal"
            label="Go to first page"
            className="first-page-button w-10 h-10 flex items-center justify-center mx-1"
            onClick={() => setPage(1)}
          >
            <i className="ri-skip-left-fill text-xl" />
          </Button>
          )}
          {(showControls && page > 1) && (
          <Button
            color="contrast"
            variant="minimal"
            label="Go to previous page"
            className="previous-page-button w-10 h-10 flex items-center justify-center mx-1"
            onClick={() => setPage(page - 1)}
          >
            <i className="ri-arrow-left-s-fill text-xl" />
          </Button>
          )}
          {showEdgePages && showPages && (length > 5 && (page > 3)) && (
            <React.Fragment>
              <Button
                label="Go to page 1"
                variant="minimal"
                color="shade"
                isDisabled={page === 1}
                className={clsx([
                  'page-number-button w-10 h-10 mx-1',
                  page === 1 ? 'active !opacity-100' : '',
                ])}
                onClick={() => setPage(1)}
              >
                1
              </Button>
              <div className="flex justify-center h-10 w-4 opacity-70 items-end">
                <i className="ri-more-fill h-5" />
              </div>
            </React.Fragment>
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
                  'page-number-button w-10 h-10 mx-1',
                  page === item ? 'active !opacity-100' : '',
                ])}
                onClick={() => setPage(item)}
              >
                {item}
              </Button>
            ))
          )}
          {(showEdgePages && showPages && length > 5 && (page < length - 2)) && (
            <React.Fragment>
              <div className="flex justify-center h-10 w-4 opacity-70 items-end">
                <i className="ri-more-fill h-5" />
              </div>
              <Button
                label={`Go to page ${length}`}
                variant="minimal"
                color="shade"
                isDisabled={page === length}
                className="page-number-button w-10 h-10 mx-1"
                onClick={() => setPage(length)}
              >
                {length}
              </Button>
            </React.Fragment>
          )}
          {(showControls && !(page + 1 >= length)) && (
            <Button
              color="contrast"
              variant="minimal"
              label="Go to next page"
              className="next-page-button w-10 h-10 flex items-center justify-center mx-1"
              onClick={() => setPage(page + 1)}
            >
              <i className="ri-arrow-right-s-fill text-xl" />
            </Button>
          )}
          {(showEdges && (page + 1 < length)) && (
          <Button
            color="contrast"
            variant="minimal"
            label="Go to last page"
            className="last-page-button w-10 h-10 flex items-center justify-center mx-1"
            onClick={() => setPage(length)}
          >
            <i className="ri-skip-right-fill text-xl" />
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
