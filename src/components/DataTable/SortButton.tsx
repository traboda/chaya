import React from 'react';

type SortButton = {
    attribute: string,
    currentAttribute?: string,
    currentOrder?: ('asc'|'desc'),
    onSort: (attribute: string, order: ('asc'|'desc')) => void
}

const SortButton = ({ attribute, currentAttribute, currentOrder, onSort = () => {} }: SortButton) =>
    currentAttribute !== attribute ?
        <i onClick={() => onSort(attribute, 'desc')} className="fas fa-sort" /> :
        currentOrder === 'desc' ?
            <i onClick={() => onSort(attribute, 'asc')} className="fa fa-caret-down"  /> :
            <i onClick={() => onSort('DEFAULT', null)} className="fa fa-caret-up" />;

export default SortButton;