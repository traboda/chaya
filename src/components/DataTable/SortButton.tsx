import React from 'react';

type SortButtonProps = {
  attribute: string,
  currentAttribute?: string,
  currentOrder?: ('asc' | 'desc'),
  onSort: (attribute: string, order?: ('asc' | 'desc')) => void
}; 

const SortButton = ({ attribute, currentAttribute, currentOrder, onSort = () => {} }: SortButtonProps) =>
  currentAttribute !== attribute || currentOrder !== 'asc' ? (
    <button
      onClick={() => onSort(attribute, 'asc')}
      className="dsr-p-0 dsr-m-0 dsr-bg-transparent dsr-outline-none dsr-cursor-pointer dsr-flex dsr-flex-col dsr-justify-center dsr-items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22 22" width="22" fill="currentColor">
        <path
          className="fill"
          d="M19,14.5H18V6a.494.494,0,0,0-.493-.5h-.5a.5.5,0,0,0-.5.5l0,8.5h-1a.25.25,0,0,0-.25.252.245.245,0,0,0,.073.175L17.1,16.944a.257.257,0,0,0,.159.056.252.252,0,0,0,.158-.056l1.768-2.017a.246.246,0,0,0,.074-.175A.25.25,0,0,0,19,14.5Z"
        />
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="12" x="2" y="5" />
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="10" x="2" y="10" />
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="8" x="2" y="15" />
      </svg>
    </button>
  ) : (
    <button
      onClick={() => onSort(attribute, 'desc')}
      className="dsr-p-0 dsr-m-0 dsr-bg-transparent dsr-outline-none dsr-cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22 22" width="22" fill="currentColor">
        <path
          className="fill"
          d="M19.18,7.073,17.412,5.056A.252.252,0,0,0,17.254,5a.257.257,0,0,0-.159.056L15.327,7.073a.245.245,0,0,0-.073.175.25.25,0,0,0,.25.252h1l0,8.5a.5.5,0,0,0,.5.5h.5A.494.494,0,0,0,18,16V7.5h1a.25.25,0,0,0,.251-.252A.246.246,0,0,0,19.18,7.073Z"
        />
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="12" x="2" y="15" />
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="10" x="2" y="10" />
        <rect className="fill" height="2" rx="0.5" ry="0.5" width="8" x="2" y="5" />
      </svg>
    </button>
  );

export default SortButton;