import React from 'react';
import clsx from 'clsx';

import Button from './Button';
import SimpleSelect from './SimpleSelect';
import Icon from './Icon';

type PageNavigator = {
  totalCount: number,
  itemsPerPage: number,
  setItemsPerPage: (count: number) => void,
  hideItemsPerPage?: boolean
  showControls?: boolean,
  showEdges?: boolean,
  page: number,
  setPage: (no: number) => void,
  id?: string,
  className?: string,
};


const PageNavigator = ({
  totalCount, itemsPerPage, setItemsPerPage, id, className = '', hideItemsPerPage = false, page, setPage,
  showControls = true, showEdges = true,
}: PageNavigator) => {


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
            'dsr-flex dsr-items-center dsr-justify-center dsr-text-center dsr-pt-4 page-navigator',
            className,
          ])}
      >
          <div className="dsr-select-none">
              <div className="dsr-flex dsr-items-stretch">
                  {(showEdges && page > 2) && (
                      <Button className="dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1" onClick={() => setPage(1)}>
                          <Icon icon={'chevronsLeft'} size={18} />
                      </Button>
                  )}
                  {(showControls && page > 1) && (
                      <Button className="dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1" onClick={() => setPage(page - 1)}>
                          <Icon icon={'chevronLeft'} size={18} />
                      </Button>
                  )}
                  {getPageNo().map((item, index) => (
                      <Button
                          variant={page === item ? 'solid' : 'outline'}
                          color={page === item ? 'contrast' : 'secondary'}
                          disabled={page === item}
                          key={`page_${item}_${index}`}
                          className={clsx([
                            'dsr-w-12 dsr-mx-1',
                          ])}
                          onClick={() => setPage(item)}
                      >
                          {item}
                      </Button>
                  ))}
                  {(showControls && !(page + 1 >= length)) && (
                      <Button className="dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1" onClick={() => setPage(page + 1)}>
                          <Icon icon={'chevronRight'} size={18} />
                      </Button>
                  )}
                  {(showEdges && (page + 1 < length)) && (
                      <Button className="dsr-w-12 dsr-flex dsr-items-center dsr-justify-center dsr-mx-1" onClick={() => setPage(length)}>
                          <Icon icon={'chevronsRight'} size={18} />
                      </Button>
                  )}
              </div>
              {!hideItemsPerPage &&
                  <div className="dsr-flex dsr-items-center dsr-justify-center dsr-mt-3">
                      <div className="dsr-mr-1 dsr-w-10">
                          <SimpleSelect
                              value={itemsPerPage}
                              onChange={(n) => {
                                setPage(1);
                                setItemsPerPage(typeof n === 'number' ? n : parseInt(n));
                              }}
                              name="items_per_page"
                              className="dsr-p-1 dsr-text-sm dsr-text-center"
                              removeSVG={true}
                              required
                              options={[
                                { label: '10', value: 10 },
                                { label: '20', value: 20 },
                                { label: '30', value: 30 },
                                { label: '50', value: 50 },
                                { label: '100', value: 100 },
                              ]}
                          />
                      </div>
                      {' '}
                      items per page
                  </div>
              }
          </div>
      </div>
  );
};

export default PageNavigator;
