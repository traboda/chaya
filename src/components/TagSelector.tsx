import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import ToolTip from './ToolTip';
import Icon from './Icon';

type OptionType = {
  value: (string | number),
  label: (string | React.ReactElement),
  isDisabled?: boolean,
  color?: string
};

type SingleValueType = string | number;
type TagSelectorProps<Type> = {
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
      props?.multiple && tags.includes(value) && 'dsr-bg-primary dsr-text-gray-100 dsr-border-primary',
      !props.multiple && tag === value && 'dsr-bg-primary dsr-text-gray-100 dsr-border-primary',
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
              <div className="dsr-flex dsr-flex-wrap dsr-mx-0">
                  {props.labels?.title && (
                      <div className="dsr-w-4/5 dsr-p-1">
                          <div className="dsr-text-lg dsr-opacity-80">{props.labels.title}</div>
                      </div>
                  )}
                  {props.labels.helpText && (
                      <ToolTip overlay={props.labels.helpText}>
                          <Icon icon="info" size={16} />
                      </ToolTip>
                  )}
              </div>
          )}
          <div className="dsr-flex dsr-flex-wrap dsr-items-center">
              {props.options.map(o => (
                  <button
                      key={o.value}
                      className={clsx([
                        'tag-option dsr-px-4 dsr-py-1 dsr-rounded-lg dsr-m-1 dsr-text-lg',
                        'dsr-transition-all dsr-duration-200ms dsr-ease dsr-border',
                        generateClassName(o.value),
                        props?.tagClassName,
                      ])}
                      onClick={() => handleTagClick(o)}
                      disabled={o?.isDisabled}
                  >
                      {o.label}
                  </button>
              ))}
          </div>
      </div>
  );
};

export default TagSelector;