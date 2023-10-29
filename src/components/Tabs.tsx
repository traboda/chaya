'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { LinkWrapper } from '../utils/misc';

import Badge, { BaseBadgeProps } from './Badge';
import Icon, { IconInputType } from './Icon';
import AccordionGroup from './AccordionGroup';
import SidebarNavigation from './SidebarNavigation';

export type TabItemObject = {
  key?: string,
  label: string
  link?: string
  onClick?: () => void
  icon?: IconInputType,
  labelClassName?: string
  isDisabled?: boolean,
  badge?: React.ReactNode,
  badgeProps?: BaseBadgeProps,
  // extras
  isHidden?: boolean,
  renderer?: React.ReactNode
  rendererFunc?: () => React.ReactNode
  isInitial?: boolean
};

export type TabItemWithKeys = TabItemObject & {
  key: string
};

export type TabsProps = {
  items: TabItemObject[]
  isDisabled?: boolean
  onClickDisabled?: (key: string) => void,
  onChange?: (key: string) => void,
  id?: string,
  badgeProps?: BaseBadgeProps,
  className?: string,
  bodyClassName?: string,
  menuClassName?: string,
  menuButtonClassName?: string,
  initialKey?: string,
  isVertical?: boolean,
  disableResponsive?: boolean,
  alignCenter?: boolean,
  variant?: 'pill' | 'line'
};

const Tabs = ({
  isVertical, items, isDisabled = false, onClickDisabled = () => {}, initialKey, id,
  className = '', menuButtonClassName = '', menuClassName = '', bodyClassName = '',
  alignCenter, onChange = () => {}, disableResponsive = false, badgeProps, variant = 'pill',
}: TabsProps) => {

  const tabID = useMemo(() => id ?? `tab-${nanoid()}`, [id]);

  const tabItems: TabItemWithKeys[] = items?.length > 0 ?
    items.map((t, index) => { return { key: `tab_${index}`, ...t }; }) : [];

  const getInitialTab = () => {
    let tabkey = tabItems.length > 0 ? tabItems[0].key : null;
    if (tabItems.length > 0) {
      tabItems.forEach((t) => {
        if ((tabkey === null && t.key) || t.isInitial)
          tabkey = t.key;
      });
    }
    return tabkey;
  };

  const [currentTab, setTab] = useState<string | null>(initialKey ?? getInitialTab());
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, height: 0, translate: 0 });
  const tabRef = useRef<HTMLUListElement>(null);

  const updateIndicator = () => {
    console.log(tabRef.current);
    if (tabRef.current) {
      const tab = tabRef.current.querySelector('.active');
      console.log(tab);
      if (tab) {
        const { left, width, height, top } = tab.getBoundingClientRect();
        const { left: containerLeft, top: containerTop } = tabRef.current.getBoundingClientRect();
        if (isVertical) setIndicatorStyle({ height, translate: (top - containerTop), width: 0 });
        else setIndicatorStyle({ height: 0, translate: (left - containerLeft), width });
      }
    }
  };


  useEffect(() => {
    if (initialKey && initialKey?.length) setTab(initialKey);
  }, [initialKey]);

  useEffect(() => {
    if (currentTab) {
      updateIndicator();
      onChange(currentTab);
    }
  }, [currentTab]);

  const renderOption = (t: TabItemObject) => (
    <div
      className={clsx([
        'dsr-flex dsr-w-full dsr-justify-between dsr-items-center dsr-gap-2',
        variant === 'line' && 'dsr-transition-all dsr-rounded-lg hover:dsr-bg-gray-400/20 dsr-gap-2 dsr-py-0.5 dsr-px-2 hover:dsr-backdrop-blur',
      ])}
    >
      <div className="dsr-flex dsr-items-center dsr-gap-2 dsr-text-left">
        {t.icon && <span className="dsr-w-[16px]"><Icon icon={t.icon} size={16} /></span>}
        <span className={t.labelClassName}>{t.label}</span>
      </div>
      {(t?.badge !== undefined || badgeProps || t.badgeProps) && (
      <Badge
        size="sm"
        {...{
          color: 'shade',
          variant: 'minimal',
          ...(badgeProps ?? {}), ...t?.badgeProps,
        }}
      >
        {t?.badge}
      </Badge>
      )}
    </div>
  );

  const renderPanels = tabItems?.length > 0 ? (
    <div
      key="tab_panel"
      role="tabpanel"
      id="tab-panel"
      aria-labelledby="tab-panel"
      className="dsr-fade-in"
    >
      {tabItems.filter(t => t.key === currentTab).map(t => (
        t?.renderer ? t.renderer :
          t.rendererFunc ? t.rendererFunc() : null
      ))}
    </div>
  ) : <div />;

  const underlineRenderer = (
    <div
      className={clsx([
        'tab-underline dsr-transition-all dsr-ease-in-out dsr-absolute',
        'dsr-border-2 dsr-border-primary dsr-rounded-lg dsr-left-0',
        'dsr-bottom-0 dsr-w-full',
      ])}
      style={{
        transform: isVertical ?
          `translateY(${indicatorStyle?.translate}px)` :
          `translateX(${indicatorStyle?.translate}px)`,
        width: indicatorStyle?.width,
        height: indicatorStyle?.height,
      }}
    />
  );

  const menuButtonClassNameGenerator = (key: string) => clsx([
    'dsr-text-lg dsr-font-semibold dsr-outline-1 focus-visible:dsr-outline dsr-duration-200 dsr-transition',
    'dsr-border-0 dsr-text-color dsr-no-underline dsr-rounded-lg dsr-transition-background dsr-outline-2',
    menuButtonClassName,
    currentTab === key ? variant === 'pill' ? 'active dsr-bg-primary dsr-text-primaryTextColor' : 'active' : '',
    variant === 'pill' ? isVertical ? 'dsr-px-5 dsr-py-2 dsr-w-full dsr-text-left' : 'dsr-px-5 dsr-py-2' : isVertical ? 'dsr-w-full dsr-px-2' : 'dsr-py-2',
  ]);

  const renderButton = (t: TabItemWithKeys) => (
    <button
      onClick={() =>
        t?.onClick && typeof t.onClick === 'function' ? (isDisabled ? onClickDisabled(t.key) : t.onClick?.())
          : setTab(t.key)
          }
      className={menuButtonClassNameGenerator(t.key)}
      role="tab"
      id={`${tabID}-${t.key}-tab`}
      data-toggle="tab"
      aria-selected={currentTab === t.key}
      aria-controls={`${tabID}-${t.key}-panel`}
      disabled={t.isDisabled}
      aria-disabled={t.isDisabled}
    >
      {renderOption(t)}
    </button>
  );

  const verticalSelector = (
    <SidebarNavigation
      id={tabID}
      className={clsx(['tab-selector vertical-selector', menuClassName])}
      activeItem={currentTab}
      variant={variant}
      items={tabItems.map(t => ({
        key: t.key,
        label: t.label,
        icon: t.icon,
        badge: t.badge,
        badgeProps: t.badgeProps || badgeProps,
        labelClassName: t.labelClassName,
        isDisabled: t.isDisabled,
        isHidden: t.isHidden,
        link: t.link,
        onClick: () => t?.onClick && typeof t.onClick === 'function' ? (isDisabled ? onClickDisabled(t.key) : t.onClick?.()) : setTab(t.key),
      }))}
    />
  );

  const horizontalSelector = (
    <ul
      id={tabID}
      role="tablist"
      aria-orientation="horizontal"
      ref={tabRef}
      className={clsx([
        'dsr-list-none tab-selector horizontal-tabs dsr-relative dsr-inline-flex',
        'dsr-items-center dsr-rounded-lg',
        variant === 'pill' ? 'dsr-bg-gray-400/20 bg-rounded-lg' : '',
        variant === 'line' ? 'dsr-gap-x-4' : '',
        menuClassName,
      ])}
    >
      {tabItems.filter((t) => !t.isHidden).map(t => (
        <li
          key={t?.key ? `tab_selector_${t?.key}` : nanoid()}
          className={isVertical ? 'dsr-w-full' : undefined}
          role="presentation"
        >
          {t?.onClick && typeof t.onClick === 'function' ? renderButton(t) :
            t.link ? LinkWrapper(!t.isDisabled ? t.link : '', renderOption(t), {
              className: menuButtonClassNameGenerator(t.key),
              id: `${tabID}-${t.key}-tab`,
            }) : renderButton(t)}
        </li>
      ))}
    </ul>
  );

  const ResponsiveView = (
    <AccordionGroup
      accordionClassName="!dsr-p-1"
      items={tabItems.filter((t) => !t.isHidden).map((t) => ({
        title: (
          <>
            {renderOption(t)}
          </>
        ),
        isOpen: currentTab === t.key,
        renderer: () => (
          <>
            {tabItems.filter(t => t.key === currentTab).map(t => (
              t?.renderer ? t.renderer :
                t.rendererFunc ? t.rendererFunc() : null
            ))}
          </>
        ),
      }))}
    />
  );

  return (
    <React.Fragment>
      <div
        className={clsx([
          isVertical ? 'dsr-flex-wrap dsr-mx-0' : 'dsr-px-0',
          (!isVertical && alignCenter) && 'dsr-flex-col dsr-items-center',
          isVertical ?
            !disableResponsive ? 'dsr-hidden md:dsr-flex' : 'dsr-flex' :
            !disableResponsive ?
              alignCenter ? 'dsr-hidden md:dsr-flex' : 'dsr-hidden md:dsr-block'
              : alignCenter ? 'dsr-flex' : 'dsr-block',
          className,
        ])}
      >
        <div className={clsx([isVertical ? 'dsr-w-full md:dsr-w-1/5 dsr-p-0' : 'dsr-relative'])}>
          {isVertical ? verticalSelector : (
            <div className="dsr-relative">
              {horizontalSelector}
              {variant === 'line' && underlineRenderer}
            </div>
          )}
        </div>
        <div
          className={clsx([
            isVertical ?
              'dsr-w-full md:dsr-w-4/5 dsr-pl-0 dsr-pr-0 md:dsr-pr-4 md:dsr-pl-4'
              : 'dsr-py-3',
            bodyClassName,
          ])}
        >
          {renderPanels}
        </div>
      </div>
      {!disableResponsive && (
        <div className="dsr-block md:dsr-hidden">
            {ResponsiveView}
        </div>
      )}
    </React.Fragment>
  );

};

export default Tabs;