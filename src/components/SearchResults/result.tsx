import React, { ReactNode } from 'react';

import Button from '../Button';
import mcs from '../../utils/merge';

export type SearchResultType = {
  title: string,
  description?: string,
  link?: string,
  iconRenderer?: ReactNode
};

export type SearchResultProps = {
  result: SearchResultType,
  className?: string,
};

const SearchResult = ({
  result, className,
}: SearchResultProps) => {


  return (
    <Button
      className={mcs([
        '!p-2 hover:!bg-gray-500/30 focus:!bg-gray-500/50 !rounded',
        'dark:!border-gray-500/70 !border-gray-500/10',
        '!block w-full',
        className,
      ])}
      variant="outline"
      color="contrast"
      link={result?.link}
    >
      <div className="flex justify-between items-center w-full text-left">
        {result?.iconRenderer && (
        <div className="mr-1 flex items-center justify-center h-full">
          <div className="w-[24px] h-[24px]">
            {result.iconRenderer}
          </div>
        </div>
        )}
        <div className="flex-grow">
          <div className="text-sm">{result.title}</div>
          {result?.description?.length && (<p className="text-xs opacity-80">
            {result.description}
          </p>
          )}
        </div>
      </div>
    </Button>
  );

};

export default SearchResult;