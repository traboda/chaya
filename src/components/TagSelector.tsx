'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

import Badge, { BaseBadgeProps } from './Badge';
import Label from './Label';

export type OptionType = {
  value: (string | number),
  label: (string | React.ReactElement),
  isDisabled?: boolean,
  color?: string,
  count?: React.ReactNode,
  countBadgeProps?: BaseBadgeProps,
};

export type SingleValueType = string | number;
export type TagSelectorProps<Type> = {
  labels?: {
    helpText: string,
    title: string,
  },
  value: Type,
  onChange: (arg: Type) => void,
  id?: string,
  className?: string,
  tagClassName?: string,
  small?: boolean,
  options: OptionType[],
  isClearable?: boolean,
  multiple?: boolean,
  countBadgeProps?: BaseBadgeProps,
};

const TagSelector = <Type extends SingleValueType | SingleValueType[]>(props: TagSelectorProps<Type>) => {
  const [tag, setTag] = useState<SingleValueType>(Array.isArray(props.value) ? '' : props.value);
  const [tags, setTags] = useState<SingleValueType[]>(Array.isArray(props.value) ? props.value : []);

  useEffect(() => {
    if (props.multiple) setTags(props.value as SingleValueType[]);
    else setTag(props.value as SingleValueType);
  }, [props.value]);

  const handleTagClick = (tagSelect: OptionType) => {
    if (props.multiple) {
      if (tags && tags.includes(tagSelect.value)) {
        const tempTags = [...tags];
        const index = tags.indexOf(tagSelect.value);
        tempTags.splice(index, index + 1);
        setTags(tempTags);
        props.onChange(tempTags as Type);
      } else {
        const tempTags = [...tags, tagSelect.value];
        setTags(tempTags);
        props.onChange(tempTags as Type);
      }
    } else if (props.isClearable && tagSelect.value === tag) props.onChange(props.options[0].value as Type);
    else props.onChange(tagSelect.value as Type);
  };

  const generateClassName = (value: string | number) => {
    const className = clsx([
      props?.multiple && tags && tags.includes(value) && '!bg-primary text-gray-100 border-primary',
      !props.multiple && tag === value && '!bg-primary text-gray-100 border-primary',
    ]);

    return clsx([
      props.small ? 'px-1 py-4' : '',
      className || [
        'hover:dark:bg-gray-500/30 hover:bg-gray-500/20',
        'border-gray-500',
      ],
    ]);
  };

  return (
    <div id={props?.id} className={mcs(['tag-selector', props?.className])}>
      {props?.labels && (
      <Label
        htmlFor=""
        children={props.labels.title}
        tooltip={props.labels.helpText}
      />
      )}
      <div className="flex flex-wrap items-center gap-2">
        {props.options.map(o => (
          <button
            type="button"
            key={o.value}
            className={mcs([
              'tag-option px-3 py-2 rounded-lg text-base flex items-center gap-2',
              'transition-all duration-200ms ease border shadow hover:shadow-none',
              generateClassName(o.value),
              props?.tagClassName,
            ])}
            onClick={() => handleTagClick(o)}
            disabled={o?.isDisabled}
          >
            <div>{o?.label}</div>
            {(o?.count !== undefined || props.countBadgeProps || o.countBadgeProps) && (
              <Badge
                size="xs"
                {...{
                  color: 'shade',
                  variant: 'minimal',
                  ...(props.countBadgeProps ?? {}), ...o?.countBadgeProps,
                }}
              >
                {o?.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;