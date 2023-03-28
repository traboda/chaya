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
  onKeyDown?: (e: KeyboardEvent) => void,
  inputStyle?: React.CSSProperties
};

const buttonClass = 'dsr-w-full dsr-h-full dsr-rounded-none dsr-text-color dsr-bg-transparent';

const SearchBox = ({
  keyword, name = 'search', setKeyword = () => {}, hideLabel = false, inputStyle = {}, id, className = '',
  labels: labelProps, onSearch = () => {}, onClear = () => {}, onKeyDown = () => () => {},
  autoFocus = false,
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
          <div className="dsr-flex dsr-w-full dsr-p-0">
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
                  postfixRenderer={
                      <div className="dsr-flex dsr-items-center dsr-w-full dsr-h-full">
                          {keyword.length > 0 && (
                              <Button
                                  variant="link"
                                  color="danger"
                                  type="button"
                                  className={clsx([buttonClass, '-dsr-mr-3.5'])}
                                  onClick={() => {
                                    setKeyword('');
                                    onSearch('');
                                    onClear();
                                  }}
                                  rightIcon="times"
                              />
                          )}
                          <Button
                              variant="link"
                              color="contrast"
                              className={clsx(['search-box-button', buttonClass])}
                              label={`${name} button`}
                              type="submit"
                              rightIcon="search"
                          />
                      </div>
                  }
              />
          </div>
      </form>
  );
};

export default SearchBox;