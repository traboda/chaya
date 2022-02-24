import React from 'react';
import styled from '@emotion/styled';

import TextInput from './TextInput';
import Button from './Button';

const SearchBoxContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0;
    button {
        color: ${({ theme }) => theme.color};
        background: transparent;
        &:hover,
        &:focus {
            background: transparent;
            outline: none;
            color: ${({theme}) => theme.secondary};
        }
    }
`;

const defaultLabels = {
    'label': 'Search',
    'placeholder': 'Enter a keyword to search',
};

type SearchBox = {
    keyword: string,
    setKeyword: (keyword: string) => void,
    name?: string,
    hideLabel?: boolean,
    autoFocus?: boolean,
    className?: string,
    labels?: {
        label?: string,
        placeholder?: string
    },
    onSearch?: (keyword: string) => void,
    onKeyDown?: (e) => void,
    inputStyle?: React.CSSProperties,
};

const SearchBox = ({
   keyword, name = 'search', setKeyword = () => {}, hideLabel = false, inputStyle = null, className = '',
   labels: labelProps, onSearch = () => {}, onKeyDown = () => () => {},
   autoFocus = false,
}: SearchBox) => {

    const labels = {...defaultLabels, ...labelProps};

    return (
        <form
            className={className}
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(keyword);
            }}
        >
            <SearchBoxContainer>
                <TextInput
                    name={name}
                    label={labels.label}
                    placeholder={labels.placeholder}
                    inputStyle={inputStyle}
                    value={keyword}
                    autoFocus={autoFocus}
                    onChange={setKeyword}
                    hideLabel={hideLabel}
                    onKeyDown={onKeyDown}
                    postfixRenderer={
                        <div className="flex items-center">
                            {keyword.length > 0 && (
                                <Button
                                    size="md"
                                    variant="link"
                                    color="danger"
                                    type="button"
                                    className="px-1 py-3 mr-1"
                                    onClick={() => {
                                        setKeyword('');
                                        onSearch('');
                                    }}
                                >
                                    ❌
                                </Button>
                            )}
                            <Button
                                size="md"
                                variant="link"
                                color="primary"
                                className="px-1 py-3"
                                label={`${name} button`}
                                type="submit"
                            >
                                🔍
                            </Button>
                        </div>
                    }
                />
            </SearchBoxContainer>
        </form>
    );
};

export default SearchBox;