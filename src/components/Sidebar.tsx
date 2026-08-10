'use client';
import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import mcs from '../utils/merge';

import { VerticalNavigatorItemType } from './VerticalNavigator/Item';

import Avatar, { AvatarProps } from './Avatar';
import Button from './Button';
import Icon, { IconInputType } from './Icon';
import VerticalNavigator, { VerticalNavigatorProps } from './VerticalNavigator';

export type SidebarProps = {
  id?: string;
  className?: string;
  allowCollapseToggling?: boolean;
  isCollapsed?: boolean;
  topNavigationItems?: VerticalNavigatorItemType[];
  bottomNavigationItems?: VerticalNavigatorItemType[];
  navigationGroups?: {
    title: string;
    items: VerticalNavigatorItemType[];
  }[];
  topRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode;
  bottomRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode;
  bottomTopRenderer?: ({ isCollapsed }: { isCollapsed: boolean }) => React.ReactNode;
  navigationProps?: Partial<VerticalNavigatorProps>;
  userProfile?: {
    name: string;
    avatar?: AvatarProps;
    onClick?: () => void;
    link?: string;
  };
  logoutButton?: {
    icon?: IconInputType;
    link?: string;
    onClick?: () => void;
  };
};

const Sidebar = ({
  id,
  className,
  allowCollapseToggling = true,
  isCollapsed: _isCollapsed = false,
  navigationProps,
  topRenderer,
  bottomRenderer,
  bottomTopRenderer,
  bottomNavigationItems,
  topNavigationItems,
  navigationGroups,
  logoutButton,
  userProfile,
}: SidebarProps) => {
  const [isCollapsed, setCollapsed] = useState(_isCollapsed ?? false);
  const [footerHeight, setFooterHeight] = useState(120);

  const footerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollapsed(_isCollapsed ?? false);
  }, [_isCollapsed]);

  useEffect(() => {
    setFooterHeight(footerRef && footerRef?.current ? footerRef?.current?.clientHeight : 100);
  });

  return (
    <div
      id={id}
      className={mcs([
        'sidebar border-light relative flex h-full max-w-full flex-col justify-between border-r-2',
        !isCollapsed ? 'w-[280px]' : '!w-fit items-center',
        'relative transition-all duration-300',
        className,
      ])}
    >
      {typeof topRenderer === 'function' || allowCollapseToggling ? (
        <div className="border-light mb-3 h-fit border-t px-1">
          {typeof topRenderer === 'function' ? (
            <div className="flex justify-center py-2">{topRenderer({ isCollapsed })}</div>
          ) : null}
          {allowCollapseToggling ? (
            <div
              className={clsx([
                !isCollapsed && typeof topRenderer === 'function'
                  ? 'absolute top-0 right-0 px-2'
                  : null,
                isCollapsed && 'flex justify-center',
                'md:py-2',
              ])}
            >
              <button
                type="button"
                onClick={() => setCollapsed(!isCollapsed)}
                title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                <Icon icon={isCollapsed ? 'menu-unfold' : 'menu-fold'} />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="h-full overflow-y-auto">
        <div className="flex flex-col gap-2">
          <div className="sidebar-top-area">
            {topNavigationItems && topNavigationItems.filter((i) => !i.isHidden).length > 0 ? (
              <div className="px-1 py-2">
                <VerticalNavigator
                  {...navigationProps}
                  items={topNavigationItems}
                  isCollapsed={isCollapsed}
                  key={isCollapsed ? 'collapsed-sidebar' : 'expanded-sidebar'}
                  id={id ? `${id}-sidebar-navigator` : undefined}
                />
              </div>
            ) : null}
            {navigationGroups && navigationGroups.length > 0 ? (
              <React.Fragment>
                {navigationGroups.map((group, index) => (
                  <div key={index} className="border-light border-t px-1 py-2">
                    {!isCollapsed && (
                      <div className="mb-2 px-2 text-sm font-semibold opacity-80">
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
      <div
        ref={footerRef}
        className="sidebar-bottom-area bg-background absolute bottom-0 left-0 w-full"
      >
        {typeof bottomTopRenderer === 'function' ? bottomTopRenderer({ isCollapsed }) : null}
        {bottomNavigationItems && bottomNavigationItems.filter((i) => !i.isHidden).length > 0 ? (
          <div className="border-light mt-1 border-t px-1 py-2">
            <VerticalNavigator
              {...navigationProps}
              items={bottomNavigationItems}
              isCollapsed={isCollapsed}
              id={id ? `${id}-bottom-navigation` : undefined}
            />
          </div>
        ) : null}
        {logoutButton || userProfile ? (
          <div
            className={clsx([
              'flex items-center gap-1 px-1 py-2',
              'border-light border-t',
              isCollapsed ? 'flex-col' : 'flex-row justify-between',
            ])}
          >
            {userProfile ? (
              <Button
                variant="link"
                color="shade"
                className={clsx([
                  'flex items-center truncate rounded-lg !no-underline hover:!bg-neutral-400/20',
                  !isCollapsed && 'w-full !justify-start p-1 text-left',
                ])}
                link={userProfile.link}
                onClick={userProfile.onClick}
              >
                <Avatar
                  alt={userProfile.name}
                  size={isCollapsed ? 42 : 32}
                  className="rounded-full"
                  {...userProfile.avatar}
                />
                {!isCollapsed ? userProfile.name : null}
              </Button>
            ) : null}
            {logoutButton ? (
              <Button
                size="lg"
                variant="link"
                color="shade"
                className="flex rounded-lg px-3 py-1 !no-underline hover:!bg-neutral-400/20"
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
