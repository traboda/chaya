'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

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
      if (tags.includes(tagSelect.value)) {
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
      props?.multiple && tags.includes(value) && '!dsr-bg-primary dsr-text-gray-100 dsr-border-primary',
      !props.multiple && tag === value && '!dsr-bg-primary dsr-text-gray-100 dsr-border-primary',
    ]);

    return clsx([
      props.small ? 'dsr-px-1 dsr-py-4' : '',
      className || [
        'hover:dsr-bg-primary hover:dsr-text-gray-100 hover:dsr-border-primary',
        'focus:dsr-border-primary dsr-border-gray-500',
      ],
    ]);
  };

  return (
    <div id={props?.id} className={clsx(['tag-selector', props?.className])}>
      {props?.labels && (
      <Label
        htmlFor=""
        children={props.labels.title}
        tooltip={props.labels.helpText}
      />
      )}
      <div className="dsr-flex dsr-flex-wrap dsr-items-center dsr-gap-2">
        {props.options.map(o => (
          <button
            type="button"
            key={o.value}
            className={clsx([
              'tag-option dsr-px-4 dsr-py-2 dsr-rounded-lg dsr-text-base dsr-flex dsr-items-center dsr-gap-2',
              'dsr-transition-all dsr-duration-200ms dsr-ease dsr-border',
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