import React, { KeyboardEvent } from 'react';

import clsx from 'clsx';

import mcs from '../utils/merge';

import Button from './Button';
import TextInput from './TextInput';

const defaultLabels = {
  label: 'Search',
  placeholder: 'Enter a keyword to search',
};

export type SearchBoxProps = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  name?: string;
  hideLabel?: boolean;
  autoFocus?: boolean;
  id?: string;
  className?: string;
  labels?: {
    label?: string;
    placeholder?: string;
  };
  onClear?: () => void;
  onSearch?: (keyword: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputStyle?: React.CSSProperties;
  isDisabled?: boolean;
  isLoading?: boolean;
  inputClassName?: string;
  buttonClassName?: string;
  buttonWrapperClassName?: string;
  hideButton?: boolean;
};

const buttonClass = 'w-full h-full rounded-none text-color bg-transparent';

const SearchBox = ({
  keyword,
  name = 'search',
  setKeyword = () => {},
  hideLabel = false,
  inputStyle = {},
  id,
  className = '',
  labels: labelProps,
  onSearch = () => {},
  onClear = () => {},
  onKeyDown = () => () => {},
  autoFocus = false,
  isDisabled = false,
  isLoading = false,
  hideButton = false,
  inputClassName,
  buttonClassName,
  buttonWrapperClassName,
}: SearchBoxProps) => {
  const labels = { ...defaultLabels, ...labelProps };

  return (
    <form
      id={id}
      className={clsx(['search-box', className])}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(keyword);
      }}
    >
      <TextInput
        id={`${id}-input`}
        name={name}
        label={labels.label}
        placeholder={labels.placeholder}
        inputStyle={inputStyle}
        value={keyword}
        autoFocus={autoFocus}
        onChange={setKeyword}
        hideLabel={hideLabel}
        onKeyDown={onKeyDown}
        isDisabled={isDisabled}
        isLoading={isLoading}
        inputClassName={inputClassName}
        postfixClassName={mcs([hideButton && 'border-l-0', buttonWrapperClassName])}
        leftIcon={hideButton ? 'search' : undefined}
        postfixRenderer={
          (!hideButton || keyword?.length > 0) && (
            <div className="flex h-full w-full items-center gap-2">
              {keyword.length > 0 && (
                <Button
                  variant="link"
                  color="danger"
                  type="button"
                  className={mcs([
                    buttonClass,
                    !hideButton && '-mr-3.5',
                    'px-2 !no-underline opacity-100',
                    buttonClassName,
                  ])}
                  onClick={() => {
                    setKeyword('');
                    onSearch('');
                    onClear();
                  }}
                  isDisabled={isDisabled || isLoading}
                >
                  <i className="ri-close-line text-lg text-red-600" />
                </Button>
              )}
              {!hideButton && (
                <Button
                  variant="link"
                  color="contrast"
                  className={mcs([
                    'search-box-button px-2 !no-underline opacity-100',
                    buttonClass,
                    buttonClassName,
                  ])}
                  label={`${name} button`}
                  type="submit"
                  isDisabled={isDisabled || isLoading}
                >
                  <i className="ri-search-line text-lg" />
                </Button>
              )}
            </div>
          )
        }
      />
    </form>
  );
};

export default SearchBox;
