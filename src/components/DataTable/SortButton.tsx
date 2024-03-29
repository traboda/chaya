import React from 'react';
import clsx from 'clsx';

type SortButtonProps = {
  attribute: string,
  currentAttribute?: string,
  currentOrder?: ('asc' | 'desc'),
  onSort: (attribute: string, order?: ('asc' | 'desc')) => void
}; 

const SortButton = ({ attribute, currentAttribute, currentOrder, onSort = () => {} }: SortButtonProps) => {

  const isAsc = currentAttribute !== attribute || currentOrder !== 'asc';

  return (
    <button
      onClick={() => onSort(attribute, isAsc ? 'asc' : 'desc')}
      className={clsx([
        'ri-sort-desc',
        'p-0 m-0 bg-transparent outline-none cursor-pointer',
        isAsc ? 'rotate-180' : '',
      ])}
    />
  );

};

export default SortButton;