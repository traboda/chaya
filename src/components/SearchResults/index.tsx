import React from 'react';
import clsx from 'clsx';

import SearchResult, { SearchResultType } from './result';

export { SearchResultType };


export type SearchResultGroupType = {
  title: string,
  results: SearchResultType[],
};

export type SearchResultsProps = {
  results: (SearchResultType | SearchResultGroupType)[],
  id?: string,
  className?: string,
  resultClassName?: string,
};


const SearchResults = ({
  results, id, className, resultClassName,
}: SearchResultsProps) => {

  return (
    <ul id={id} className={clsx('dsr-flex dsr-flex-col dsr-gap-2', className)}>
      {results.map((result, i) => {
        if ('results' in result) {
          return (
            <li key={i}>
              <div className="dsr-font-semibold dsr-mb-1">{result.title}</div>
              <ul className="dsr-flex dsr-flex-col dsr-gap-2">
                {result.results.map((result, j) => (
                  <li key={`${j}_${i}`}>
                    <SearchResult result={result} className={resultClassName} />
                  </li>
                ))}
              </ul>
            </li>
          );
        }
        return (
          <li key={i}>
            <SearchResult result={result} />
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;