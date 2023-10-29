'use client';

import React, { KeyboardEvent } from 'react';
import clsx from 'clsx';

import TextInput from './TextInput';
import Button from './Button';

const defaultLabels = {
  'label': 'Search',
  'placeholder': 'Enter a keyword to search',
};

export type SearchBoxProps = {
  keyword: string,
  setKeyword: (keyword: string) => void,
  name?: string,
  hideLabel?: boolean,
  autoFocus?: boolean,
  id?: string,
  className?: string,
  labels?: {
    label?: string,
    placeholder?: string
  },
  onClear?: () => void,
  onSearch?: (keyword: string) => void,
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  inputStyle?: React.CSSProperties,
  isDisabled?: boolean,
  isLoading?: boolean,
  inputClassName?: string,
  buttonClassName?: string,
  buttonWrapperClassName?: string,
  hideButton?: boolean,
};

const buttonClass = 'dsr-w-full dsr-h-full dsr-rounded-none dsr-text-color dsr-bg-transparent';

const SearchBox = ({
  keyword, name = 'search', setKeyword = () => {}, hideLabel = false, inputStyle = {}, id, className = '',
  labels: labelProps, onSearch = () => {}, onClear = () => {}, onKeyDown = () => () => {},
  autoFocus = false, isDisabled = false, isLoading = false, hideButton = false,
  inputClassName, buttonClassName, buttonWrapperClassName,
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
        postfixClassName={clsx([hideButton && 'dsr-border-l-0 !dsr-bg-transparent', buttonWrapperClassName])}
        leftIcon={hideButton ? 'search' : undefined}
        postfixRenderer={(!hideButton || keyword?.length > 0) && (
          <div className="dsr-flex dsr-items-center dsr-w-full dsr-h-full">
            {keyword.length > 0 && (
              <Button
                variant="link"
                color="danger"
                type="button"
                className={clsx([buttonClass, !hideButton && '-dsr-mr-3.5', 'dsr-opacity-100', buttonClassName])}
                onClick={() => {
                  setKeyword('');
                  onSearch('');
                  onClear();
                }}
                rightIcon="times"
                isDisabled={isDisabled || isLoading}
              />
            )}

            {!hideButton && (
              <Button
                variant="link"
                color="contrast"
                className={clsx(['search-box-button dsr-opacity-100', buttonClass, buttonClassName])}
                label={`${name} button`}
                type="submit"
                rightIcon="search"
                isDisabled={isDisabled || isLoading}
              />
            )}
          </div>
        )}
      />
    </form>
  );
};

export default SearchBox;