import React, { useContext, KeyboardEvent } from 'react';

import TextInput from './TextInput';
import Button from './Button';
import DSRContext from '../contexts/DSRContext';

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
  id?: string,
  className?: string,
  labels?: {
    label?: string,
    placeholder?: string
  },
  onClear?: () => void,
  onSearch?: (keyword: string) => void,
  onKeyDown?: (e: KeyboardEvent) => void,
  inputStyle?: React.CSSProperties,
  icons?: {
    search?: React.ReactElement,
    clear?: React.ReactElement
  }
};

const buttonClass = 'dsr-px-1 dsr-py-3 dsr-text-color dsr-bg-transparent focus:dsr-outline-none hover:dsr-text-secondary focus:dsr-text-secondary';

const SearchBox = ({
  keyword, name = 'search', setKeyword = () => {}, hideLabel = false, inputStyle = {}, id, className = '',
  labels: labelProps, onSearch = () => {}, onClear = () => {}, onKeyDown = () => () => {},
  autoFocus = false,
}: SearchBox) => {

  const { iconSet } = useContext(DSRContext);
  const labels = { ...defaultLabels, ...labelProps };

  return (
      <form
          id={id}
          className={className}
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(keyword);
          }}
      >
          <div className="dsr-flex dsr-w-full dsr-p-0">
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
                      <div className="dsr-flex dsr-items-center dsr-gap-1">
                          {keyword.length > 0 && (
                              <Button
                                  size="md"
                                  variant="link"
                                  color="danger"
                                  type="button"
                                  className={buttonClass}
                                  onClick={() => {
                                    setKeyword('');
                                    onSearch('');
                                    onClear();
                                  }}
                              >
                                  {iconSet?.times?.({ width: 18, height: 18 })}
                              </Button>
                          )}
                          <Button
                              size="md"
                              variant="link"
                              color="contrast"
                              className={buttonClass}
                              label={`${name} button`}
                              type="submit"
                          >
                              {iconSet?.search?.({ width: 18, height: 18 })}
                          </Button>
                      </div>
                    }
              />
          </div>
      </form>
  );
};

export default SearchBox;