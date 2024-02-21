import React from 'react';
import clsx from 'clsx';

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
      className={clsx([
        'page-header',
        !fill && 'dsr-container dsr-mx-auto p-2',
        className,
      ])}
      style={{
        padding: size === 'lg' && !fill ? '3.5vh 3.5vw' : '',
      }}
    >
      <div>
        <div className="dsr-flex dsr-flex-wrap">
          <div className="md:dsr-w-2/3 dsr-py-2">
            {backButton && (
              <Button
                variant="link"
                color="contrast"
                leftIcon="arrow-left"
                {...backButton}
                size={size === 'lg' ? 'lg' : 'sm'}
                className={clsx([
                  '!dsr-no-underline dsr-px-1.5 dsr-py-1 !dsr-rounded-lg hover:dsr-bg-neutral-100 hover:dark:hover:dsr-bg-neutral-200',
                  backButton?.className,
                ])}
              />
            )}
            {breadcrumbItems?.length > 0 ? (
              <div className={size === 'lg' ? 'dsr-px-2 dsr-mb-4' : 'dsr-mb-2'}>
                <Breadcrumb
                  homeLink={homeLink}
                  className={size === 'sm' ? 'dsr-text-sm dsr-mb-0' : ''}
                  {...breadcrumb}
                  items={breadcrumbItems}
                />
              </div>
            ) : null}
            {customTitle ? customTitle : (
              <h1
                aria-level={1}
                className={clsx([
                  size == 'lg' ? 'dsr-text-6xl' : 'dsr-text-3xl',
                  'dsr-mt-1 dsr-font-semibold',
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
                  'dsr-opacity-80 dsr-max-w-full dsr-w-[600px]',
                  size == 'lg' ? 'dsr-text-base dsr-mt-3' : 'dsr-text-sm dsr-mt-2',
                ])}
              >
                {description}
              </p>
            ) : null}
            {titleBottomRenderer()}
          </div>
          <div className="md:dsr-w-1/3 dsr-py-2 dsr-flex dsr-justify-end dsr-items-center">
            {sidebarRenderer()}
          </div>
        </div>
        {customRender && customRender()}
      </div>
    </section>
  );
};

export default PageHeader;
