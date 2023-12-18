import React, { ChangeEvent, MouseEvent } from 'react';
import clsx from 'clsx';

import Icon, { IconInputType } from '../Icon';
import Checkbox from '../Checkbox';
import { LinkWrapper } from '../../utils/misc';
import Avatar from '../Avatar';

export type ListViewItem = {
  id: string,
  title?: string,
  description?: string,
  onClick?: (event: MouseEvent | ChangeEvent) => void,
  href?: string,
  iconRenderer?: React.ReactNode,
  iconURL?: string,
  icon?: IconInputType,
  isDisabled?: boolean,
};

export type ListViewItemProps = {
  className?: string,
  item: ListViewItem,
  role?: string,
  isHighlighted?: boolean,
  isSelectable?: boolean,
  isSelected?: boolean,
  onSelect?: (value: ChangeEvent<HTMLInputElement>) => void,
};

const ListViewItem = ({
  className, item, role,
  isSelectable = false, isSelected = false, onSelect = () => {}, isHighlighted = false,
}: ListViewItemProps) => {

  const hasDescription = item?.description && item?.description?.length > 0;

  const itemBody = (
    <React.Fragment>
      <div className="dsr-flex dsr-gap-2">
        {isSelectable && (
          <Checkbox
            onClick={event => event.stopPropagation()}
            value={(item.id ?? '').toString()}
            label=""
            isChecked={isSelected}
            onChange={onSelect}
          />
        )}
        {item?.icon && (<Icon icon={item?.icon} size={16} />)}
        {item?.iconRenderer && (
          <div className="dsr-flex dsr-items-center dsr-justify-center dsr-h-full">
            <div className="dsr-w-[24px] dsr-h-[24px]">
              {item?.iconRenderer}
            </div>
          </div>
        )}
        {item?.iconURL && (
          <div className="dsr-flex dsr-items-center dsr-justify-center dsr-h-full">
            <Avatar alt={item?.title || item?.id} src={item?.iconURL} size={24} />
          </div>
        )}
        <div>
          {item?.title && item?.title?.length > 0 ? (
            <div className={hasDescription ? 'dsr-text-lg' : ''}>
              {item.title}
            </div>
          ) : null}
          {hasDescription ? (
            <div className="dsr-text-sm dsr-opacity-80">
              {item.description}
            </div>
          ) : null}
        </div>
      </div>
      <div>
            
      </div>
    </React.Fragment>
  );

  const wrapperClassName = clsx([
    'dsr-flex dsr-w-full dsr-px-3 dsr-py-1.5 dsr-transition hover:dsr-bg-black/10 hover:dark:dsr-bg-white/20',
    'dsr-justify-between dsr-items-center dsr-cursor-pointer dsr-text-left simple-select-option !dsr-outline-0',
    isHighlighted && 'dsr-bg-black/10 dark:dsr-bg-white/10',
    className,
  ]);

  return (
    <li role={role}>
      {typeof item?.href === 'string' && item?.href?.length > 0 ? LinkWrapper(item.href, itemBody, {
        className: wrapperClassName,
        onClick: item?.onClick,
        isDisabled: item?.isDisabled,
      }) : (
        <button
          type="button"
          aria-disabled={item?.isDisabled}
          disabled={item?.isDisabled}
          onClick={typeof item?.onClick === 'function' ? item?.onClick : () => {}}
          className={wrapperClassName}
        >
          {itemBody}
        </button>
      )}
    </li>
  );

};

export default ListViewItem;