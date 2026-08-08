import React from 'react';

import clsx from 'clsx';

import mcs from '../utils/merge';

import Breadcrumb, { BreadcrumbItemProps, BreadcrumbProps } from './Breadcrumb';
import Button, { ButtonProps } from './Button';

export type PageHeaderProps = {
  title?: string;
  customTitle?: React.ReactElement;
  description?: string;
  id?: string;
  size?: 'lg' | 'sm';
  fill?: boolean;
  className?: string;
  headingClassName?: string;
  breadcrumb?: BreadcrumbProps;
  homeLink?: BreadcrumbItemProps;
  breadcrumbItems?: BreadcrumbItemProps[];
  titleBottomRenderer?: () => React.ReactNode;
  sidebarRenderer?: () => React.ReactNode;
  customRender?: () => React.ReactNode;
  backButton?: ButtonProps;
};

const PageHeader = ({
  title,
  description,
  className = '',
  headingClassName = '',
  id,
  homeLink,
  breadcrumbItems = [],
  size = 'sm',
  fill = false,
  customRender = () => <div />,
  titleBottomRenderer = () => <div />,
  sidebarRenderer = () => <div />,
  customTitle,
  breadcrumb,
  backButton,
}: PageHeaderProps) => {
  return (
    <section
      id={id}
      className={mcs(['page-header', fill ? 'p-2 md:p-4' : 'container mx-auto p-2', className])}
      style={{
        padding: size === 'lg' && !fill ? '3.5vh 3.5vw' : undefined,
      }}
    >
      <div>
        <div className="flex flex-wrap">
          <div className="w-full py-2 md:w-2/3">
            {backButton && (
              <Button
                variant="link"
                color="contrast"
                leftIcon="arrow-left"
                {...backButton}
                size={size === 'lg' ? 'lg' : 'sm'}
                className={mcs([
                  '!rounded-lg px-1.5 py-1 !no-underline hover:bg-neutral-100 hover:dark:hover:bg-neutral-200',
                  backButton?.className,
                ])}
              />
            )}
            {breadcrumbItems?.length > 0 ? (
              <div className={size === 'lg' ? 'mb-4 px-2' : 'mb-2'}>
                <Breadcrumb
                  homeLink={homeLink}
                  className={size === 'sm' ? 'mb-0 text-sm' : ''}
                  {...breadcrumb}
                  items={breadcrumbItems}
                />
              </div>
            ) : null}
            {customTitle ? (
              customTitle
            ) : (
              <h1
                aria-level={1}
                className={mcs([
                  size == 'lg' ? 'text-6xl' : 'text-3xl',
                  'mt-1 font-semibold',
                  headingClassName,
                ])}
                role="heading"
              >
                {title}
              </h1>
            )}
            {description && description?.length > 0 ? (
              <p
                className={clsx([
                  'w-[600px] max-w-full opacity-80',
                  size == 'lg' ? 'mt-3 text-base' : 'mt-2 text-sm',
                ])}
              >
                {description}
              </p>
            ) : null}
            {titleBottomRenderer()}
          </div>
          <div className="flex w-full items-center justify-end py-2 md:w-1/3">
            {sidebarRenderer()}
          </div>
        </div>
        {customRender && customRender()}
      </div>
    </section>
  );
};

export default PageHeader;
