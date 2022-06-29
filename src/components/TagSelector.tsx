import React, { useEffect, useState } from 'react';
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
      color: ${({theme}) => theme.color};
      cursor: pointer;
      margin: 0.35rem;
      transition: all 250ms ease;
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
`;

type TagSelectorProps = {
    labels?: {
        helpText: string,
        title: string,
    },
    value: any,
    onChange: (any) => void,
    className?: string,
    tagClassName?: string,
    small?: boolean,
    options: {
        value: (string|number),
        label: (string|React.ReactElement),
        color?: string
    }[],
    isClearable?: boolean,
    multiple?: boolean,
}

const TagSelector = (props: TagSelectorProps) => {
    const getValue = () => {
        if(props.value && !Array.isArray(props.value))
            for(const opt of props.options)
                if(JSON.stringify(props.value) === JSON.stringify(opt.value))
                    return opt;

        return props.options[0];
    }

    const [tag, setTag] = useState(getValue());
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (!props.multiple && props.value) {
            if (typeof props.value === 'string') setTag(getValue());
            else setTag(props.value);
        }
    }, [props.value]);

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
        } else if(props.isClearable && _tag.value === tag?.value) props.onChange(props.options[0]);
        else props.onChange(_tag);
    };

    const generateClassName = ({ value }) => {
        let _class = props.small ? 'small' : '';
        if(props.multiple && tags.includes(value)) _class += ' active';
        if(!props.multiple && tag?.value === value) _class += ' active';

        return _class;
    };

    return <TagSelectorContainer className={props?.className}>
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
        <div className={`tag-container`}>
            {props.options.map(opt =>
                <div
                    key={opt.value}
                    className={`tag px-4 py-1 text-lg ${generateClassName(opt)} ${props?.tagClassName}`}
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