'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Avatar, Button } from '../index';

import Icon, { IconInputType } from './Icon';
import SidebarNavigation, { SidebarNavigationProps } from './SidebarNavigation';
import { SidebarNavigatorItemType } from './SidebarNavigation/Item';
import { AvatarProps } from './Avatar';

export type SidebarProps = {
  id?: string,
  className?: string,
  allowCollapseToggling?: boolean,
  isCollapsed?: boolean,
  topNavigationItems?: SidebarNavigatorItemType[],
  bottomNavigationItems?: SidebarNavigatorItemType[],
  navigationGroups?: {
    title: string,
    items: SidebarNavigatorItemType[],
  }[],
  topRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  bottomRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  bottomTopRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  navigationProps?: Partial<SidebarNavigationProps>,
  userProfile?: {
    name: string,
    avatar?: AvatarProps,
    onClick?: () => void,
    link?: string,
  },
  logoutButton?: {
    icon?: IconInputType,
    link?: string,
    onClick?: () => void,
  }
};

const Sidebar = ({
  id, className, allowCollapseToggling = true, isCollapsed: _isCollapsed = false, navigationProps,
  topRenderer, bottomRenderer, bottomTopRenderer,
  bottomNavigationItems, topNavigationItems, navigationGroups, logoutButton, userProfile,
}: SidebarProps) => {

  const [isCollapsed, setCollapsed] = useState(_isCollapsed ?? false);
  const [footerHeight, setFooterHeight] = useState(120);

  const footerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => { setCollapsed(_isCollapsed ?? false); }, [_isCollapsed]);

  useEffect(() => {
    setFooterHeight(footerRef && footerRef?.current ? footerRef?.current?.clientHeight : 100);
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
      <div className="dsr-h-full dsr-overflow-y-auto dsr-border-t dark:dsr-border-neutral-500/20 dsr-border-neutral-500/10">
        <div className="dsr-flex dsr-flex-col dsr-gap-2">
          <div className="sidebar-top-area">
            {(topNavigationItems && topNavigationItems.filter((i) => !i.isHidden).length > 0) ? (
              <div className="dsr-py-2 dsr-px-1 ">
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
                    {!isCollapsed && (
                    <div className="dsr-text-sm dsr-font-semibold dsr-opacity-80 dsr-mb-2 dsr-px-2">
                      {group.title}
                    </div>
                    )}
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
        </div>
        <div style={{ height: footerHeight + 15, width: 1 }} className="dsr-w-full" />
      </div>
      <div ref={footerRef} className="sidebar-bottom-area dsr-absolute dsr-bottom-0 dsr-left-0 dsr-w-full dsr-bg-background">
        {typeof bottomTopRenderer === 'function' ? bottomTopRenderer({ isCollapsed }) : null}
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
        {(logoutButton || userProfile) ? (
          <div
            className={clsx([
              'dsr-flex dsr-items-center dsr-gap-1 dsr-px-1 dsr-py-2',
              'dsr-border-t dark:dsr-border-neutral-500/20 dsr-border-neutral-500/10',
              isCollapsed ? 'dsr-flex-col ' : 'dsr-flex-row dsr-justify-between',
            ])}
          >
            {userProfile ? (
              <Button
                variant="link"
                color="shade"
                className={clsx([
                  '!dsr-no-underline dsr-flex hover:!dsr-bg-neutral-400/20 dsr-rounded-lg dsr-truncate dsr-items-center',
                  !isCollapsed && '!dsr-justify-start dsr-text-left dsr-p-1 dsr-w-full',
                ])}
                link={userProfile.link}
                onClick={userProfile.onClick}
              >
                <Avatar alt={userProfile.name} size={isCollapsed ? 42 : 32} className="dsr-rounded-full" {...userProfile.avatar} />
                {!isCollapsed ? userProfile.name : null}
              </Button>
            ) : null}
            {logoutButton ? (
              <Button
                size="lg"
                variant="link"
                color="shade"
                className="!dsr-no-underline dsr-flex dsr-py-1 dsr-px-3 hover:!dsr-bg-neutral-400/20 dsr-rounded-lg"
                link={logoutButton.link}
                onClick={logoutButton.onClick}
                rightIcon={logoutButton.icon || 'logout'}
              />
            ) : null}
          </div>
        ) : null}
        {typeof bottomRenderer === 'function' ? bottomRenderer({ isCollapsed }) : null}
      </div>
    </div>
  );
};

export default Sidebar;