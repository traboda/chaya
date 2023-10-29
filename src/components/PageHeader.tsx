'use client';

import React from 'react';
import clsx from 'clsx';


import Breadcrumb, { BreadcrumbProps } from './Breadcrumb';

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
  breadcrumbItems?: {
    link: string,
    title: string,
    isActive?: boolean
  }[],
  titleBottomRenderer?: () => (React.ReactNode),
  sidebarRenderer?: () => (React.ReactNode)
  customRender?: () => (React.ReactNode),
};

const PageHeader = ({
  title, description, className = '', headingClassName = '', id,
  breadcrumbItems = [], size = 'lg', fill = false,
  customRender = () => <div />,
  titleBottomRenderer = () => <div />,
  sidebarRenderer = () => <div />,
  customTitle, breadcrumb,
} : PageHeaderProps) => {

  return (
    <section
      id={id}
      className={clsx([
        'page-header dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
        !fill && 'dsr-flex dsr-items-center dsr-justify-center',
        className,
      ])}
      style={{
        padding: size === 'lg' ? '3.5vh 3.5vw' : '1.5vh 1.5vw',
      }}
    >
      <div className={clsx([fill ? '' : 'dsr-container'])}>
        <div className="dsr-flex dsr-flex-wrap">
          <div className="md:dsr-w-2/3 dsr-py-2">
            <div className={size === 'lg' ? 'dsr-px-2 dsr-mb-4' : 'dsr-mb-2'}>
              <Breadcrumb
                {...breadcrumb}
                items={breadcrumbItems}
                className={size === 'sm' ? 'dsr-text-sm dsr-mb-0' : ''}
              />
            </div>
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
            {description && description?.length > 0 ? <p className="dsr-text-md dsr-opacity-80 dsr-mt-2 dsr-max-w-full dsr-w-[600px]">{description}</p> : null}
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
