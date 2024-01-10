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
        'dsr-p-0 dsr-m-0 dsr-bg-transparent dsr-outline-none dsr-cursor-pointer',
        isAsc ? 'dsr-rotate-180' : '',
      ])}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="16" width="16" viewBox="2 5 17.25 12">
        <path
          className="fill"
          d="M19.18,7.073,17.412,5.056A.252.252,0,0,0,17.254,5a.257.257,0,0,0-.159.056L15.327,7.073a.245.245,0,0,0-.073.175.25.25,0,0,0,.25.252h1l0,8.5a.5.5,0,0,0,.5.5h.5A.494.494,0,0,0,18,16V7.5h1a.25.25,0,0,0,.251-.252A.246.246,0,0,0,19.18,7.073Z"
        ></path>
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="12" x="2" y="15"></rect>
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="10" x="2" y="10"></rect>
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="8" x="2" y="5"></rect>
      </svg>
    </button>
  );

};

export default SortButton;