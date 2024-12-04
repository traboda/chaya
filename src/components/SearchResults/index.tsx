import React from 'react';

import mcs from '../../utils/merge';

import SearchResult, { SearchResultType } from './result';

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
    <ul id={id} className={mcs('flex flex-col gap-2', className)}>
      {results.map((result, i) => {
        if ('results' in result) {
          return (
            <li key={i}>
              <div className="font-semibold mb-1">{result.title}</div>
              <ul className="flex flex-col gap-2">
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