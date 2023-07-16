import React from 'react';

import SearchResult, { SearchResultType } from './result';

export { SearchResultType };


export type SearchResultGroupType = {
  title: string,
  results: SearchResultType[],
};

export type SearchResultsProps = {
  results: (SearchResultType | SearchResultGroupType)[],
};


const SearchResults = ({
  results,
}: SearchResultsProps) => {

  return (
    <div>
      <ul className="dsr-flex dsr-flex-col dsr-gap-2">
        {results.map((result, i) => {
          if ('results' in result) {
            return (
              <li key={i}>
                <div>{result.title}</div>
                <ul>
                  {result.results.map((result, j) => (
                    <li key={`${j}_${i}`}>
                      <SearchResult result={result} />
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
    </div>
  );
};

export default SearchResults;