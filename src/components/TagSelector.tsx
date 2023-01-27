import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

type OptionType = {
  value: (string | number),
  label: (string | React.ReactElement),
  color?: string
};

type TagSelectorProps = {
  labels?: {
    helpText: string,
    title: string,
  },
  value: any,
  onChange: (arg: any) => void,
  id?: string,
  className?: string,
  tagClassName?: string,
  small?: boolean,
  options: OptionType[],
  isClearable?: boolean,
  multiple?: boolean,
};

const Index = (props: TagSelectorProps) => {
  const getValue = () => {
    if (props.value && !Array.isArray(props.value))
      for (const opt of props.options)
        if (JSON.stringify(props.value) === JSON.stringify(opt.value))
          return opt;

    return props.options[0];
  };

  const [tag, setTag] = useState<OptionType>(getValue());
  const [tags, setTags] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (!props.multiple && props.value) {
      if (typeof props.value === 'string') setTag(getValue());
      else setTag(props.value);
    }
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
    } else if (props.isClearable && tagSelect.value === tag?.value) props.onChange(props.options[0]);
    else props.onChange(tagSelect);
  };

  const generateClassName = (value: string | number) => {

    const className = clsx([
      props?.multiple && tags?.includes(value) && 'dsr-bg-primary dsr-text-gray-100 dsr-border-primary',
      !props.multiple && tag?.value === value && 'dsr-bg-primary dsr-text-gray-100  dsr-border-primary',
    ]);

    return clsx([
      props.small ? 'dsr-px-1 dsr-py-4' : '',
      className || [
        'hover:dsr-bg-primary hover:dsr-text-gray-100 hover:dsr-border-primary',
        'focus:dsr-bg-primary focus:dsr-text-gray-100 focus:dsr-border-primary',
        'active:dsr-bg-gray-100 active:dsr-text-primary active:dsr-border-primary dsr-border-gray-500',
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
                  {/*@TODO: Add help text*/}
                  {/*{props.labels.helpText &&*/}
                  {/*    <ToolTip placement="top" overlay={props.labels.helpText}>*/}
                  {/*        <i*/}
                  {/*            style={{ fontSize: '1.35rem', opacity: 0.8, fontWeight: 300 }}*/}
                  {/*            className="far fa-info-circle"*/}
                  {/*        />*/}
                  {/*    </ToolTip>*/}
                  {/*</div>}*/}
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