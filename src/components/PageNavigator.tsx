'use client';

import React from 'react';
import clsx from 'clsx';

import Button from './Button';
import SimpleSelect from './SimpleSelect';
import Icon from './Icon';

export type PageNavigatorProps = {
  totalCount: number,
  itemsPerPage: number,
  page: number,
  setPage?: (no: number) => void,
  setItemsPerPage?: (count: number) => void,
  hideItemsPerPage?: boolean
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
  showControls = true, showEdges = true, showPages = true,
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
      className={clsx([
        'page-navigator dsr-flex dsr-items-center dsr-justify-center dsr-text-center dsr-pt-4 page-navigator',
        className,
      ])}
    >
      <div className="dsr-select-none">
        <div className="dsr-flex dsr-items-stretch dsr-justify-center">
          {(showEdges && page > 2) && (
          <Button
            label="Go to first page"
            className="first-page-button dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1"
            onClick={() => setPage(1)}
          >
            <Icon icon="chevrons-left" size={18} />
          </Button>
          )}
          {(showControls && page > 1) && (
          <Button
            label="Go to previous page"
            className="previous-page-button dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1"
            onClick={() => setPage(page - 1)}
          >
            <Icon icon="chevron-left" size={18} />
          </Button>
          )}
          {showPages && (
            getPageNo().map((item, index) => (
              <Button
                label={`Go to page ${item}`}
                variant={page === item ? 'solid' : 'outline'}
                color={page === item ? 'primary' : 'primary'}
                isDisabled={page === item}
                key={`page_${item}_${index}`}
                className={clsx([
                  'page-number-button dsr-w-12 dsr-mx-1',
                  page === item ? 'active !dsr-opacity-100' : '',
                ])}
                onClick={() => setPage(item)}
              >
                {item}
              </Button>
            ))
          )}
          {(showControls && !(page + 1 >= length)) && (
          <Button
            label="Go to next page"
            className="next-page-button dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1"
            onClick={() => setPage(page + 1)}
          >
            <Icon icon="chevron-right" size={18} />
          </Button>
          )}
          {(showEdges && (page + 1 < length)) && (
          <Button
            label="Go to last page"
            className="last-page-button dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1"
            onClick={() => setPage(length)}
          >
            <Icon icon="chevrons-right" size={18} />
          </Button>
          )}
        </div>
        {!hideItemsPerPage && (
          <div className="dsr-flex dsr-items-center dsr-justify-center dsr-mt-3">
            <div className="dsr-mr-1 dsr-w-12">
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
                className="!dsr-p-1 dsr-text-sm dsr-text-center"
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
