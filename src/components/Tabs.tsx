'use client';
import React, { useEffect, useMemo, useState, lazy } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { ChayaColorType } from '../utils/classMaps/colors';

import Badge, { BaseBadgeProps } from './Badge';
import Icon, { IconInputType } from './Icon';
import AccordionGroup from './AccordionGroup';

const HorizontalNavigator = lazy(() => import('./HorizontalNavigator'));
const VerticalNavigator = lazy(() => import('./VerticalNavigator'));

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
  panelClassName?: string,
  menuButtonClassName?: string,
  initialKey?: string,
  isVertical?: boolean,
  disableResponsive?: boolean,
  alignCenter?: boolean,
  variant?: 'pill' | 'line',
  color?: ChayaColorType,
};

const Tabs = ({
  isVertical, items, isDisabled = false, onClickDisabled = () => {}, initialKey, id,
  className = '', menuButtonClassName = '', menuClassName = '', bodyClassName = '', panelClassName = '',
  alignCenter, onChange = () => {}, disableResponsive = false, badgeProps, variant = 'pill', color = 'primary',
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

  useEffect(() => {
    if (initialKey && initialKey?.length) setTab(initialKey);
  }, [initialKey]);

  useEffect(() => {
    if (currentTab) {
      onChange(currentTab);
    }
  }, [currentTab]);

  const renderOption = (t: TabItemObject) => (
    <div
      className={clsx([
        'dsr-flex dsr-w-full dsr-justify-between dsr-items-center dsr-gap-2',
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
      className={clsx(['dsr-fade-in', panelClassName])}
    >
      {tabItems.filter(t => t.key === currentTab).map(t => (
        t?.renderer ? t.renderer :
          t.rendererFunc ? t.rendererFunc() : null
      ))}
    </div>
  ) : <div />;

  const verticalSelector = isVertical ? useMemo(() => (
    <VerticalNavigator
      id={tabID}
      className={clsx(['tab-selector vertical-selector', menuClassName])}
      itemClassName={menuButtonClassName}
      activeItem={currentTab}
      variant={variant}
      color={color}
      items={tabItems.map(t => ({
        ...t, badgeProps: t.badgeProps || badgeProps,
      }))}
      onClickItem={(key: string) => isDisabled ? onClickDisabled(key) : setTab(key)}
    />
  ), [tabItems, currentTab, variant, menuClassName, badgeProps, isDisabled, onClickDisabled, tabID]) : null;

  const horizontalSelector = !isVertical ? useMemo(() => (
    <HorizontalNavigator
      id={tabID}
      className={clsx(['tab-selector horizontal-selector', menuClassName])}
      itemClassName={menuButtonClassName}
      activeItem={currentTab}
      variant={variant}
      color={color}
      items={tabItems.map(t => ({
        ...t, badgeProps: t.badgeProps || badgeProps,
      }))}
      onClickItem={(key: string) => isDisabled ? onClickDisabled(key) : setTab(key)}
    />
  ), [tabItems, currentTab, variant, menuClassName, badgeProps, isDisabled, onClickDisabled, tabID]) : null;

  const ResponsiveView = !disableResponsive ? useMemo(() => (
    <AccordionGroup
      accordionClassName="!dsr-p-1"
      items={tabItems.filter((t) => !t.isHidden).map((t) => ({
        title: (
          <>
            {renderOption(t)}
          </>
        ),
        isOpen: currentTab === t.key,
        isDisabled: t.isDisabled,
        isHidden: t.isHidden,
        renderer: () => t?.renderer ? t.renderer : t.rendererFunc ? t.rendererFunc() : null,
      }))}
    />
  ), [tabItems, currentTab]) : null;

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
        <div className={clsx([isVertical && 'dsr-w-full md:dsr-w-1/5 dsr-p-0'])}>
          {isVertical ? verticalSelector : horizontalSelector}
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
