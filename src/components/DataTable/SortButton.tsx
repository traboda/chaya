import React from 'react';
import Icon from '../Icon';

type SortButtonProps = {
  attribute: string,
  currentAttribute?: string,
  currentOrder?: ('asc' | 'desc'),
  onSort: (attribute: string, order?: ('asc' | 'desc')) => void
}; 

const SortButton = ({ attribute, currentAttribute, currentOrder, onSort = () => {} }: SortButtonProps) =>
  currentAttribute !== attribute ? (
      <button
          onClick={() => onSort(attribute, 'desc')}
          className="dsr-p-0 dsr-m-0 dsr-bg-transparent dsr-outline-none dsr-cursor-pointer dsr-flex dsr-flex-col dsr-justify-center dsr-items-center"
      >
          <Icon icon="chevronUp" size={14} />
          <Icon icon="chevronDown" size={14} />
      </button>
  ) : currentOrder === 'desc' ? (
      <button
          onClick={() => onSort(attribute, 'asc')}
          className="dsr-p-0 dsr-m-0 dsr-bg-transparent dsr-outline-none dsr-cursor-pointer"
      >
          <Icon icon="chevronDown" size={14} />
      </button>
  ) : (
      <button
          onClick={() => onSort('DEFAULT', undefined)}
          className="dsr-p-0 dsr-m-0 dsr-bg-transparent dsr-outline-none dsr-cursor-pointer"
      >
          <Icon icon="chevronUp" size={14} />
      </button>
  );

export default SortButton;