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
  navigationGroups?: {
    title: string,
    items: SidebarNavigationItemType[],
  }[],
  topRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  bottomRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  navigationProps?: Partial<SidebarNavigationProps>,
};

const Sidebar = ({
  id, className, allowCollapseToggling = true, isCollapsed: _isCollapsed = false,
  topRenderer, topNavigationItems, bottomRenderer, bottomNavigationItems, navigationProps, navigationGroups,
}: SidebarProps) => {

  const [isCollapsed, setCollapsed] = useState(_isCollapsed ?? false);
  const [footerHeight, setFooterHeight] = useState(120);

  const footerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => { setCollapsed(_isCollapsed ?? false); }, [_isCollapsed]);

  useEffect(() => {
    setFooterHeight(footerRef ? footerRef?.current?.clientHeight + 100 : 100);
  });
  
  return (
    <div
      id={id}
      className={clsx([
        'sidebar dsr-flex dsr-flex-col dsr-h-full dsr-justify-between dsr-relative dsr-border-r-2 dark:dsr-border-neutral-500/20 dsr-border-neutral-500/10 dsr-max-w-full',
        !isCollapsed ? 'dsr-w-[280px]' : '!dsr-w-fit dsr-items-center',
        'dsr-transition-all dsr-duration-300 relative',
        className,
      ])}
    >
      <div className="dsr-mb-3 dsr-h-fit dsr-px-1">
        {typeof topRenderer === 'function' ? (
          <div className="dsr-py-2dsr-flex dsr-justify-center">
            {topRenderer({ isCollapsed })}
          </div>
        ) : null}
        {allowCollapseToggling && (
          <div
            className={clsx([
              !isCollapsed && typeof topRenderer === 'function' ? 'dsr-absolute dsr-top-0 dsr-right-0 dsr-px-2' : null,
              isCollapsed && 'dsr-flex dsr-justify-center',
              'md:dsr-py-2',
            ])}
          >
            <button type="button" onClick={() => setCollapsed(!isCollapsed)} title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
              <Icon icon={isCollapsed ? 'menu-unfold' : 'menu-fold'} />
            </button>
          </div>
        )}
      </div>
      <div className="dsr-flex dsr-flex-col dsr-justify-between dsr-h-full dsr-overflow-y-auto">
        <div className="sidebar-top-area">
          {(topNavigationItems && topNavigationItems.filter((i) => !i.isHidden).length > 0) ? (
            <div className="dsr-py-2 dsr-px-1  dsr-border-t dark:dsr-border-neutral-500/20 dsr-border-neutral-500/10">
              <SidebarNavigation
                {...navigationProps}
                items={topNavigationItems}
                isCollapsed={isCollapsed}
                id={id ? `${id}-top-navigation` : undefined}
              />
            </div>
          ) : null}
          {navigationGroups && navigationGroups.length > 0 ? (
            <React.Fragment>
              {navigationGroups.map((group, index) => (
                <div key={index} className="dsr-py-2 dsr-px-1 dsr-border-t dark:dsr-border-neutral-500/20 dsr-border-neutral-500/10">
                  <div className="dsr-text-sm dsr-font-semibold dsr-mb-2 dsr-px-2 dsr-text-neutral-500">
                    {group.title}
                  </div>
                  <SidebarNavigation
                    {...navigationProps}
                    items={group.items}
                    isCollapsed={isCollapsed}
                    id={id ? `${id}-top-navigation` : undefined}
                  />
                </div>
              ))}
            </React.Fragment>
          ) : null}
        </div>
        <div className="dsr-w-full" style={{ height: footerHeight + 2000 }}>hello</div>
      </div>
      <div ref={footerRef} className="sidebar-bottom-area dsr-absolute dsr-bottom-0 dsr-left-0 dsr-w-full dsr-bg-background">
        {(bottomNavigationItems && bottomNavigationItems.filter((i) => !i.isHidden).length > 0) ? (
          <div className="dsr-py-2 dsr-px-1 dsr-mt-1 dsr-border-t dark:dsr-border-neutral-500/20 dsr-border-neutral-500/10">
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