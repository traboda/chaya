import React, { ReactNode } from 'react';
import clsx from 'clsx';

import Button from '../Button';

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
      className={clsx([
        '!dsr-p-2 hover:!dsr-bg-gray-500/30 focus:!dsr-bg-gray-500/50 !dsr-rounded',
        'dark:!dsr-border-gray-500/70 !dsr-border-gray-500/10',
        '!dsr-block dsr-w-full',
        className,
      ])}
      variant="outline"
      color="contrast"
      link={result?.link}
    >
      <div className="dsr-flex dsr-justify-between dsr-items-center dsr-w-full dsr-text-left">
        {result?.iconRenderer && (
        <div className="dsr-mr-1 dsr-flex dsr-items-center dsr-justify-center dsr-h-full">
          <div className="dsr-w-[24px] dsr-h-[24px]">
            {result.iconRenderer}
          </div>
        </div>
        )}
        <div className="dsr-flex-grow">
          <div className="dsr-text-sm">{result.title}</div>
          {result?.description?.length && (<p className="dsr-text-xs dsr-opacity-80">
            {result.description}
          </p>
          )}
        </div>
      </div>
    </Button>
  );

};

export default SearchResult;