import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import ToolTip from './ToolTip';
import Icon from './Icon';

type OptionType = {
  value: (string | number),
  label: (string | React.ReactElement),
  color?: string
};

type ValueType = string | number;

type TagSelectorProps = {
  labels?: {
    helpText: string,
    title: string,
  },
  value: ValueType | ValueType[],
  onChange: (arg: ValueType | ValueType[]) => void,
  id?: string,
  className?: string,
  tagClassName?: string,
  small?: boolean,
  options: OptionType[],
  isClearable?: boolean,
  multiple?: boolean,
};

const Index = (props: TagSelectorProps) => {
  const [tag, setTag] = useState<ValueType>(Array.isArray(props.value) ? '' : props.value);
  const [tags, setTags] = useState<ValueType[]>(Array.isArray(props.value) ? props.value : []);

  useEffect(() => {
    if (props.multiple) setTags(props.value as ValueType[]);
    else setTag(props.value as ValueType);
  }, [props.value]);

  const handleTagClick = (tagSelect: OptionType) => {
    if (props.multiple) {
      if (tags.includes(tagSelect.value)) {
        const tempTags = [...tags];
        const index = tags.indexOf(tagSelect.value);
        tempTags.splice(index, index + 1);
        setTags(tempTags);
        props.onChange(tempTags);
      } else {
        const tempTags = [...tags, tagSelect.value];
        setTags(tempTags);
        props.onChange(tempTags);
      }
    } else if (props.isClearable && tagSelect.value === tag) props.onChange(props.options[0].value);
    else props.onChange(tagSelect.value);
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
      <div id={props?.id} className={props?.className}>
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
              {props.options.map(opt => (
                  <button
                      key={opt.value}
                      className={clsx([
                        'dsr-px-4 dsr-py-1 dsr-rounded-lg dsr-m-1 dsr-text-lg',
                        'dsr-transition-all dsr-duration-200ms dsr-ease dsr-border',
                        generateClassName(opt.value),
                        props?.tagClassName,
                      ])}
                      onClick={() => handleTagClick(opt)}
                  >
                      {opt.label}
                  </button>
              ))}
          </div>
      </div>
  );
};

export default Index;