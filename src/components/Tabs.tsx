import React, { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { LinkWrapper } from '../utils/misc';

import SimpleSelect from './SimpleSelect';
import Badge, { BaseBadgeProps } from './Badge';
import Icon, { IconInputType } from './Icon';
import AccordionGroup from './AccordionGroup';

export type TabItemObject = {
  name?: string
  label?: string
  key?: string,
  count?: React.ReactNode,
  countBadgeProps?: BaseBadgeProps,
  type?: ('section')
  renderer?: React.ReactNode
  rendererFunc?: () => React.ReactNode
  onClick?: () => void
  isInitial?: boolean
  isDisabled?: boolean
  isHidden?: boolean
  url?: string
  link?: string
  icon?: IconInputType,
  labelClassName?: string
  onActive?: () => void
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
  countBadgeProps?: BaseBadgeProps,
  className?: string,
  bodyClassName?: string,
  menuClassName?: string,
  menuButtonClassName?: string,
  initialKey?: string,
  isVertical?: boolean,
  disableResponsive?: boolean,
  alignCenter?: boolean,
  variant?: 'pill' | 'underline'
};

const Tabs = ({
  isVertical, items, isDisabled = false, onClickDisabled = () => {}, initialKey, id,
  className = '', menuButtonClassName = '', menuClassName = '', bodyClassName = '',
  alignCenter, onChange = () => {}, disableResponsive = false, countBadgeProps, variant = 'pill',
}: TabsProps) => {

  const tabID = useMemo(() => id ?? `tab-${nanoid()}`, [id]);

  const tabItems: TabItemWithKeys[] = items?.length > 0 ?
    items.map((t, index) => { return { key: `tab_${index}`, ...t }; }) : [];

  const getInitialTab = () => {
    let tabkey = tabItems.length > 0 && tabItems[0].type !== 'section' ? tabItems[0].key : null;
    if (tabItems.length > 0) {
      tabItems.forEach((t) => {
        if ((tabkey === null && t.key && t.type !== 'section') || t.isInitial)
          tabkey = t.key;
      });
    }
    return tabkey;
  };

  const [currentTab, setTab] = useState<string | null>(initialKey ?? getInitialTab());
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, height: 0, translate: 0 });
  const tabRef = useRef<HTMLUListElement>(null);

  const updateIndicator = () => {
    if (tabRef.current) {
      const tab = tabRef.current.querySelector('.active');
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
        variant === 'underline' && 'dsr-transition-all dsr-rounded-lg hover:dsr-bg-gray-400/20 dsr-gap-2 dsr-py-0.5 dsr-px-2 hover:dsr-backdrop-blur',
      ])}
    >
      <div className="dsr-flex dsr-items-center dsr-gap-2 dsr-text-left">
        {t.icon && <span className="dsr-w-[16px]"><Icon icon={t.icon} size={16} /></span>}
        <span className={t.labelClassName}>{t.label}</span>
      </div>
      {(t?.count !== undefined || countBadgeProps || t.countBadgeProps) && (
      <Badge
        size="sm"
        {...{
          color: 'shade',
          variant: 'minimal',
          ...(countBadgeProps ?? {}), ...t?.countBadgeProps,
        }}
      >
        {t?.count}
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
        isVertical ? 'dsr-top-0 dsr-left-0 dsr-w-0' : 'dsr-bottom-0 dsr-w-full',
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

  const renderTabs = () => (
    tabItems.filter((t) => !t.isHidden).map(t => (
      <li
        key={t?.key ? `tab_selector_${t?.key}` : nanoid()}
        className={isVertical ? 'dsr-w-full' : undefined}
        role="presentation"
      >
        {t?.onClick && typeof t.onClick === 'function' ? renderButton(t) :
          t.link ? LinkWrapper(t.link, renderOption(t)) : t.url ? (
            <a
              href={!t.isDisabled ? t.url : undefined}
              className={menuButtonClassNameGenerator(t.key)}
              role="tab"
              id={`${tabID}-${t.key}-tab`}
              data-toggle="tab"
              aria-selected={currentTab === t.key}
              aria-controls={`${tabID}-${t.key}-panel`}
              aria-disabled={t.isDisabled}
            >
              {renderOption(t)}
            </a>
          ) : t.type === 'section' ? (
            <h5
              style={{ opacity: 0.9 }}
              className={menuButtonClassNameGenerator(t.key)}
            >
              {t.name}
            </h5>
          ) : renderButton(t)}
      </li>
    ))
  );

  const verticalSelector = (
    <ul
      id={tabID}
      role="tablist"
      aria-orientation="vertical"
      ref={tabRef}
      className={clsx([
        'dsr-sticky dsr-list-none dsr-top-0 tab-selector vertical-selector',
        'dsr-flex dsr-items-center dsr-flex-col dsr-justify-start',
        variant === 'underline' ? 'dsr-gap-y-3' : '',
        menuClassName,
      ])}
    >
      {renderTabs()}
    </ul>
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
        variant === 'underline' ? 'dsr-gap-x-4' : '',
        menuClassName,
      ])}
    >
      {renderTabs()}
    </ul>
  );

  const responsiveSelector = (
    <SimpleSelect
      labels={{ placeholder: 'Select Tab' }}
      isRequired
      className="dsr-mb-3 dsr-border-4 dsr-font-semibold dsr-rounded-lg"
      value={currentTab as string}
      name="tab"
      options={tabItems.filter((t) => !t.isHidden).map((t) => ({
        value: t.key, label: `${t.label} ${t.count ? `(${t.count})` : ''}` as string,
      }))}
      onChange={(key) => {
        const tab = tabItems.find((t) => t.key === key);
        if (tab?.onClick && typeof tab.onClick === 'function') tab.onClick();
        setTab(key.toString());
      }}
    />
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
          <div className="dsr-relative">
            {isVertical ? verticalSelector : horizontalSelector}
            {variant === 'underline' && underlineRenderer}
          </div>
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