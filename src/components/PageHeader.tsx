import React from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

import Breadcrumb, { BreadcrumbItemProps, BreadcrumbProps } from './Breadcrumb';
import Button, { ButtonProps } from './Button';

export type PageHeaderProps = {
  title?: string,
  customTitle?: React.ReactElement,
  description?: string,
  id?: string,
  size?: ('lg' | 'sm')
  fill?: boolean,
  className?: string,
  headingClassName?: string,
  breadcrumb?: BreadcrumbProps,
  homeLink?: BreadcrumbItemProps;
  breadcrumbItems?: BreadcrumbItemProps[],
  titleBottomRenderer?: () => (React.ReactNode),
  sidebarRenderer?: () => (React.ReactNode)
  customRender?: () => (React.ReactNode),
  backButton?: ButtonProps
};

const PageHeader = ({
  title, description, className = '', headingClassName = '', id, homeLink,
  breadcrumbItems = [], size = 'sm', fill = false,
  customRender = () => <div />,
  titleBottomRenderer = () => <div />,
  sidebarRenderer = () => <div />,
  customTitle, breadcrumb, backButton,
} : PageHeaderProps) => {

  return (
    <section
      id={id}
      className={mcs([
        'page-header',
        fill ? 'p-2 md:p-4' : 'container mx-auto p-2',
        className,
      ])}
      style={{
        padding: size === 'lg' && !fill ? '3.5vh 3.5vw' : '',
      }}
    >
      <div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3 py-2">
            {backButton && (
              <Button
                variant="link"
                color="contrast"
                leftIcon="arrow-left"
                {...backButton}
                size={size === 'lg' ? 'lg' : 'sm'}
                className={mcs([
                  '!no-underline px-1.5 py-1 !rounded-lg hover:bg-neutral-100 hover:dark:hover:bg-neutral-200',
                  backButton?.className,
                ])}
              />
            )}
            {breadcrumbItems?.length > 0 ? (
              <div className={size === 'lg' ? 'px-2 mb-4' : 'mb-2'}>
                <Breadcrumb
                  homeLink={homeLink}
                  className={size === 'sm' ? 'text-sm mb-0' : ''}
                  {...breadcrumb}
                  items={breadcrumbItems}
                />
              </div>
            ) : null}
            {customTitle ? customTitle : (
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
                  'opacity-80 max-w-full w-[600px]',
                  size == 'lg' ? 'text-base mt-3' : 'text-sm mt-2',
                ])}
              >
                {description}
              </p>
            ) : null}
            {titleBottomRenderer()}
          </div>
          <div className="w-full md:w-1/3 py-2 flex justify-end items-center">
            {sidebarRenderer()}
          </div>
        </div>
        {customRender && customRender()}
      </div>
    </section>
  );
};

export default PageHeader;
