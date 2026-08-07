import React, { ReactNode } from 'react';

import mcs from '../../utils/merge';
import Button from '../Button';

export type SearchResultType = {
  title: string;
  description?: string;
  link?: string;
  iconRenderer?: ReactNode;
};

export type SearchResultProps = {
  result: SearchResultType;
  className?: string;
};

const SearchResult = ({ result, className }: SearchResultProps) => {
  return (
    <Button
      className={mcs([
        '!rounded !p-2 hover:!bg-gray-500/30 focus:!bg-gray-500/50',
        '!border-gray-500/10 dark:!border-gray-500/70',
        '!block w-full',
        className,
      ])}
      variant="outline"
      color="contrast"
      link={result?.link}
    >
      <div className="flex w-full items-center justify-between text-left">
        {result?.iconRenderer && (
          <div className="mr-1 flex h-full items-center justify-center">
            <div className="h-[24px] w-[24px]">{result.iconRenderer}</div>
          </div>
        )}
        <div className="flex-grow">
          <div className="text-sm">{result.title}</div>
          {result?.description?.length && (
            <p className="text-xs opacity-80">{result.description}</p>
          )}
        </div>
      </div>
    </Button>
  );
};

export default SearchResult;
