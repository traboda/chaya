import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Icon from './Icon';
import SidebarNavigation, { SidebarNavigationItemType, SidebarNavigationProps } from './SidebarNavigation';

export type SidebarProps = {
  id?: string,
  className?: string,
  allowCollapseToggling?: boolean,
  isCollapsed?: boolean,
  topNavigationItems?: SidebarNavigationItemType[],
  bottomNavigationItems?: SidebarNavigationItemType[],
  topRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  bottomRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  navigationProps?: Partial<SidebarNavigationProps>,
};

const Sidebar = ({
  id, className, allowCollapseToggling = true, isCollapsed: _isCollapsed = false,
  topRenderer, topNavigationItems, bottomRenderer, bottomNavigationItems, navigationProps,
}: SidebarProps) => {

  const [isCollapsed, setCollapsed] = useState(_isCollapsed ?? false);

  useEffect(() => { setCollapsed(_isCollapsed ?? false); }, [_isCollapsed]);

  return (
    <div
      id={id}
      className={clsx([
        'sidebar dsr-flex dsr-flex-col dsr-h-full dsr-justify-between dsr-relative dsr-border-r-2 dsr-border-gray-500/20 dsr-max-w-full',
        !isCollapsed ? 'dsr-w-[280px]' : '!dsr-w-[50px]',
        'dsr-transition-all dsr-duration-300',
        className,
      ])}
    >
      <div className="sidebar-top-area dsr-px-2">
        {typeof topRenderer === 'function' ? (
          <div className="dsr-py-2">
            {topRenderer({ isCollapsed })}
          </div>
        ) : null}
        {allowCollapseToggling && (
          <div className={clsx([!isCollapsed && typeof topRenderer === 'function' ? 'dsr-absolute dsr-top-0 dsr-right-0 dsr-px-2' : null, 'md:dsr-p-2'])}>
            <button type="button" onClick={() => setCollapsed(!isCollapsed)} title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
              <Icon icon={isCollapsed ? 'menu-unfold' : 'menu-fold'} />
            </button>
          </div>
        )}
        {(topNavigationItems && topNavigationItems.filter((i) => !i.isHidden).length > 0) ? (
          <div className="dsr-py-2 dsr-border-t dsr-border-neutral-50/20 dsr-mt-3">
            <SidebarNavigation
              {...navigationProps}
              items={topNavigationItems}
              isCollapsed={isCollapsed}
              id={id ? `${id}-top-navigation` : undefined}

            />
          </div>
        ) : null}
      </div>
      <div className="sidebar-bottom-area dsr-px-2">
        {(bottomNavigationItems && bottomNavigationItems.filter((i) => !i.isHidden).length > 0) ? (
          <div className="dsr-py-2 dsr-border-t dsr-border-neutral-50/20 dsr-mt-3">
            <SidebarNavigation
              {...navigationProps}
              items={bottomNavigationItems}
              isCollapsed={isCollapsed}
              id={id ? `${id}-bottom-navigation` : undefined}
            />
          </div>
        ) : null}
        {typeof bottomRenderer === 'function' ? bottomRenderer({ isCollapsed }) : null}
      </div>
    </div>
  );
};

export default Sidebar;