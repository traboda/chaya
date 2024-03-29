'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import { Avatar, Button } from '../index';
import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';
import VerticalNavigator, { VerticalNavigatorProps } from './VerticalNavigator';
import { VerticalNavigatorItemType } from './VerticalNavigator/Item';
import { AvatarProps } from './Avatar';

export type SidebarProps = {
  id?: string,
  className?: string,
  allowCollapseToggling?: boolean,
  isCollapsed?: boolean,
  topNavigationItems?: VerticalNavigatorItemType[],
  bottomNavigationItems?: VerticalNavigatorItemType[],
  navigationGroups?: {
    title: string,
    items: VerticalNavigatorItemType[],
  }[],
  topRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  bottomRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  bottomTopRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode,
  navigationProps?: Partial<VerticalNavigatorProps>,
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
      className={mcs([
        'sidebar flex flex-col h-full justify-between relative border-r-2 dark:border-neutral-500/20 border-neutral-500/10 max-w-full',
        !isCollapsed ? 'w-[280px]' : '!w-fit items-center',
        'transition-all duration-300 relative',
        className,
      ])}
    >
      {(typeof topRenderer === 'function' || allowCollapseToggling) ? (
        <div className="mb-3 h-fit px-1 border-t dark:border-neutral-500/20 border-neutral-500/10">
          {typeof topRenderer === 'function' ? (
            <div className="py-2 flex justify-center">
              {topRenderer({ isCollapsed })}
            </div>
          ) : null}
          {allowCollapseToggling ? (
            <div
              className={clsx([
                !isCollapsed && typeof topRenderer === 'function' ? 'absolute top-0 right-0 px-2' : null,
                isCollapsed && 'flex justify-center',
                'md:py-2',
              ])}
            >
              <button type="button" onClick={() => setCollapsed(!isCollapsed)} title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
                <Icon icon={isCollapsed ? 'menu-unfold' : 'menu-fold'} />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="h-full overflow-y-auto">
        <div className="flex flex-col gap-2">
          <div className="sidebar-top-area">
            {(topNavigationItems && topNavigationItems.filter((i) => !i.isHidden).length > 0) ? (
              <div className="py-2 px-1 ">
                <VerticalNavigator
                  {...navigationProps}
                  items={topNavigationItems}
                  isCollapsed={isCollapsed}
                  key={isCollapsed ? `collapsed-sidebar-${nanoid()}` : `expanded-sidebar-${nanoid()}`}
                  id={id ? `${id}-sidebar-navigator` : undefined}
                />
              </div>
            ) : null}
            {navigationGroups && navigationGroups.length > 0 ? (
              <React.Fragment>
                {navigationGroups.map((group, index) => (
                  <div key={index} className="py-2 px-1 border-t dark:border-neutral-500/20 border-neutral-500/10">
                    {!isCollapsed && (
                    <div className="text-sm font-semibold opacity-80 mb-2 px-2">
                      {group.title}
                    </div>
                    )}
                    <VerticalNavigator
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
        <div style={{ height: footerHeight + 15, width: 1 }} className="w-full" />
      </div>
      <div ref={footerRef} className="sidebar-bottom-area absolute bottom-0 left-0 w-full bg-background">
        {typeof bottomTopRenderer === 'function' ? bottomTopRenderer({ isCollapsed }) : null}
        {(bottomNavigationItems && bottomNavigationItems.filter((i) => !i.isHidden).length > 0) ? (
          <div className="py-2 px-1 mt-1 border-t dark:border-neutral-500/20 border-neutral-500/10">
            <VerticalNavigator
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
              'flex items-center gap-1 px-1 py-2',
              'border-t dark:border-neutral-500/20 border-neutral-500/10',
              isCollapsed ? 'flex-col ' : 'flex-row justify-between',
            ])}
          >
            {userProfile ? (
              <Button
                variant="link"
                color="shade"
                className={clsx([
                  '!no-underline flex hover:!bg-neutral-400/20 rounded-lg truncate items-center',
                  !isCollapsed && '!justify-start text-left p-1 w-full',
                ])}
                link={userProfile.link}
                onClick={userProfile.onClick}
              >
                <Avatar alt={userProfile.name} size={isCollapsed ? 42 : 32} className="rounded-full" {...userProfile.avatar} />
                {!isCollapsed ? userProfile.name : null}
              </Button>
            ) : null}
            {logoutButton ? (
              <Button
                size="lg"
                variant="link"
                color="shade"
                className="!no-underline flex py-1 px-3 hover:!bg-neutral-400/20 rounded-lg"
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