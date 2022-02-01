import React, { useState } from 'react';
import styled from '@emotion/styled';

import ToolTip from './ToolTip';

const TagSelectorContainer = styled.div`
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .tag {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 7px;
      padding: 0.5rem 1rem;
      color: ${({theme}) => theme.color};
      cursor: pointer;
      margin: 0.35rem;
      transition: all 250ms ease;
      font-size: 1.35rem;
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.15)!important;
      border: 1px solid ${({ theme }) => theme.color};
      
      &.small {
        padding: 0.25rem 1rem;
      }

      &:hover:not(.active) {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.primaryTextColor} !important;
        border: 1px solid ${({ theme }) => theme.primary};
      }

      &.active {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.primaryTextColor} !important;
        border: 1px solid ${({ theme }) => theme.primary};
        &:hover {
          background: ${({ theme }) => theme.primaryTextColor};
          color: ${({ theme }) => theme.primary} !important;
        }
      }
    }
  }

  &.fullWidth .tag-container {
    flex-direction: column;
    border-radius: 5px;
    overflow: hidden;

    .tag {
      width: 100%;
      margin: 0;
      padding: 0.75rem 1rem;
      border-radius: 0;
    }
  }
`;

type TagSelectorProps = {
    labels?: {
        helpText: string,
        title: string,
    },
    value: any,
    onChange: (any) => void,
    small?: boolean,
    options: {
        value: (string|number),
        label: (string|React.ReactElement),
        color?: string
    }[],
    isClearable?: boolean,
    multiple?: boolean,
    fullWidth?: boolean
}

const TagSelector = (props: TagSelectorProps) => {
    let _default = props.options[0];
    if(props.value && !Array.isArray(props.value))
        for(const opt of props.options)
            if(JSON.stringify(props.value) === JSON.stringify(opt.value))
                _default = opt;

    const [tag, setTag] = useState(_default);
    const [tags, setTags] = useState([]);

    const handleTagClick = (_tag) => {
        if(props.multiple) {
            if(tags.includes(_tag.value)) {
                const _tags = [...tags];
                const index = tags.indexOf(_tag.value);
                _tags.splice(index, index + 1);
                setTags(_tags);
                props.onChange(_tags);
            } else {
                const _tags = [...tags, _tag.value];
                setTags(_tags);
                props.onChange(_tags);
            }
        } else if(props.isClearable && _tag.value === tag?.value) {
            setTag(props.options[0]);
            props.onChange(props.options[0]);
        } else {
            setTag(_tag);
            props.onChange(_tag);
        }
    };

    const generateClassName = ({ value }) => {
        let _class = props.small ? 'small' : '';
        if(!props.fullWidth) _class += ' shadow-sm';
        if(props.multiple && tags.includes(value)) _class += ' active';
        if(!props.multiple && tag?.value === value) _class += ' active';

        return _class;
    };

    return <TagSelectorContainer className={props.fullWidth ? 'fullWidth' : ''}>
        {props?.labels &&
        <div className="flex flex-wrap  mx-0">
            {props.labels?.title &&
            <div className="w-4/5 p-1">
                <div className="text-lg opacity-80">{props.labels.title}</div>
            </div>}
            {props.labels.helpText &&
            <div className="w-1/5 flex items-center justify-end p-1">
                <ToolTip placement="top" overlay={props.labels.helpText}>
                    <i
                        style={{ fontSize: '1.35rem', opacity: 0.8, fontWeight: 300 }}
                        className="far fa-info-circle"
                    />
                </ToolTip>
            </div>}
        </div>}
        <div className={`tag-container ${props.fullWidth ? 'shadow-sm' : ''}`}>
            {props.options.map(opt =>
                <div
                    key={opt.value}
                    className={`tag ${generateClassName(opt)}`}
                    onClick={() => handleTagClick(opt)}
                    style={opt.color ? { color: opt.color } : null}
                >
                    {opt.label}
                </div>
            )}
        </div>
    </TagSelectorContainer>;
};

export default TagSelector;