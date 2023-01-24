import React, { useContext } from 'react';

import Breadcrumb, { BreadcrumbPropType } from './Breadcrumb';
import clsx from 'clsx';
import DSRContext from '../contexts/DSRContext';
import Color from 'color';

type PageHeader = {
  title?: string,
  customTitle?: React.ReactElement,
  description?: string,
  id?: string,
  size?: ('lg' | 'sm')
  fill?: boolean,
  className?: string,
  headingClassName?: string,
  breadcrumb?: BreadcrumbPropType,
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
} : PageHeader) => {
  const { isDarkTheme, theme } = useContext(DSRContext);

  return (
      <section
          id={id}
          className={clsx([
            className,
            !fill && 'dsr-flex dsr-items-center dsr-justify-center',
          ])}
          style={{
            background: isDarkTheme ? Color(theme?.background || '#000').lighten(0.2).hex() : Color(theme?.background || '#FFF').darken(0.15).hex(),
            padding: size === 'lg' ? '3.5vh 3.5vw' : '1.5vh 1.5vw',
          }}
      >
          <div style={!fill ? { width: '1333px', maxWidth: '100%' } : {}}>
              <div className="dsr-flex dsr-flex-wrap">
                  <div className="md:dsr-w-2/3 dsr-py-2">
                      <div className={size == 'lg' ? 'dsr-px-2 dsr-mb-4' : 'dsr-mb-2' }>
                          <Breadcrumb
                              {...breadcrumb}
                              items={breadcrumbItems}
                              className={`${size == 'sm' ? 'dsr-text-sm dsr-mb-0' : ''}`}
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
                      {description && description?.length > 0 ? <p style={{ width: '600px', maxWidth: '100%' }} className="dsr-text-md dsr-opacity-80 dsr-mt-2">{description}</p> : null}
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
