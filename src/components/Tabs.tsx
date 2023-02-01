import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { LinkWrapper } from '../utils/misc';
import DSRContext from '../contexts/DSRContext';

import SimpleSelect from './SimpleSelect';
import Badge, { BadgeProps } from './Badge';
import Icon, { IconInputType } from './Icon';

export type TabItemObject = {
  name?: string
  label?: string
  key?: string,
  count?: React.ReactElement,
  countBadgeProps?: BadgeProps,
  type?: ('section')
  isInitial?: boolean
  renderer?: React.ReactElement
  rendererFunc?: () => React.ReactElement
  onClick?: () => void
  disabled?: boolean
  hidden?: boolean
  url?: string
  link?: string
  icon?: IconInputType,
  labelClassName?: string
  onActive?: () => void
};

export type TabsProps = {
  items: TabItemObject[]
  disabled?: boolean
  onClickDisabled?: (key: string) => void,
  onChange?: (key: string) => void,
  id?: string,
  countBadgeProps?: BadgeProps,
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
  isVertical, items, disabled = false, onClickDisabled = () => {}, initialKey, id,
  className = '', menuButtonClassName = '', menuClassName = '', bodyClassName = '',
  alignCenter, onChange = () => {}, disableResponsive = false, countBadgeProps, variant = 'pill',
}: TabsProps) => {

  const tabID = useMemo(() => id ?? `tab-${nanoid()}`, [id]);

  const tabItems = items?.length > 0 ?
    items.map((t, index) => { return { key: `tab_${index}`, ...t }; }) : [];

  const getInitialTab = () => {
    let tabkey = tabItems.length > 0 && tabItems[0].type !== 'section' ? tabItems[0].key : null;
    if (tabItems.length > 0) {
      tabItems.forEach((t) => {
        if (tabkey === null && t.key && t.type !== 'section')
          tabkey = t.key;
        if (t.isInitial)
          tabkey = t.key;
      });
    }
    return tabkey;
  };

  const [currentTab, setTab] = useState(initialKey ?? getInitialTab());
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, height: 0, translate: 0 });
  const tabRef = useRef<HTMLUListElement>(null);
  const { isDarkTheme } = useContext(DSRContext);

  const updateIndicator = () => {
    if (tabRef.current) {
      const tab = tabRef.current.querySelector('.active');
      if (tab) {
        const { left, width, height, top } = tab.getBoundingClientRect();
        const { left: containerLeft, top: containerTop } = tabRef.current.getBoundingClientRect();
        const underlineComponent:HTMLDivElement | null = (
          tabRef.current.querySelector('.tab-underline') ||
                    tabRef.current.parentElement?.querySelector('.tab-underline') ||
                    null
        );
        if (underlineComponent) {
          if (isVertical) {
            setIndicatorStyle({ height, translate: (top - containerTop), width: 0 });
          } else {
            setIndicatorStyle({ height: 0, width, translate: (left - containerLeft) });
          }
        }
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
            (variant === 'underline') && 'dsr-transition-all dsr-transition hover:dsr-ease-in-out dsr-duration-200 dsr-delay-[50ms] hover:dsr-bg-gray-400/20 dsr-gap-y-2 dsr-py-0.5 dsr-p-2 hover:dsr-backdrop-blur dsr-rounded-lg',
            variant === 'underline' && (isDarkTheme ? 'dsr-bg-gray-200/15' : 'dsr-bg-black/5'),
          ])}
      >
          <div className="dsr-flex dsr-items-center dsr-gap-2 dsr-text-left">
              {t.icon && <span className="dsr-w-[16px]"><Icon icon={t.icon} size={16} /></span>}
              <span className={t.labelClassName}>{t.label}</span>
          </div>
          {countBadgeProps && (
          <Badge size="sm" {...{ ...countBadgeProps, ...t?.countBadgeProps }}>{t?.count}</Badge>
          )}
      </div>
  );

  const renderPanels = () => tabItems?.length > 0 ? (
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

  const Underline = (
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
    'dsr-text-lg dsr-font-semibold dsr-outline-none dsr-duration-200 dsr-transition',
    'dsr-border-0 dsr-text-color dsr-no-underline dsr-rounded-lg dsr-transition-background',
    menuButtonClassName,
    currentTab === key ? variant === 'pill' ? 'active dsr-bg-primary' : 'active' : '',
    variant === 'pill' ? isVertical ? 'dsr-px-5 dsr-py-2 dsr-w-full dsr-text-left' : 'dsr-px-5 dsr-py-2' : isVertical ? 'dsr-px-2' : 'dsr-py-2',
  ]);

  const renderTabs = () => (
    tabItems.filter((t) => !t.hidden).map(t => (
        <li
            key={t?.key ? `tab_selector_${t?.key}` : nanoid()}
            className={isVertical ? 'dsr-w-full' : undefined}
            role="presentation"
        >
            {t?.onClick && typeof t.onClick === 'function' ? (
                <button
                    onClick={() => t.onClick?.()}
                    className={menuButtonClassNameGenerator(t.key)}
                    role="tab"
                    id={`${tabID}-${t.key}-tab`}
                    data-toggle="tab"
                    aria-selected={currentTab === t.key}
                    aria-controls={`${tabID}-${t.key}-panel`}
                >
                    {renderOption(t)}
                </button>
            ) : disabled ? (
                <button
                    onClick={() => onClickDisabled(t.key)}
                    className={menuButtonClassNameGenerator(t.key)}
                    role="tab"
                    id={`${tabID}-${t.key}-tab`}
                    data-toggle="tab"
                    aria-selected={currentTab === t.key}
                    aria-controls={`${tabID}-${t.key}-panel`}
                >
                    {renderOption(t)}
                </button>
            ) : t.link ? LinkWrapper(t.link, renderOption(t)) : t.url ? (
                <a
                    href={t.url}
                    className={menuButtonClassNameGenerator(t.key)}
                    role="tab"
                    id={`${tabID}-${t.key}-tab`}
                    data-toggle="tab"
                    aria-selected={currentTab === t.key}
                    aria-controls={`${tabID}-${t.key}-panel`}
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
            ) : (
                <button
                    onClick={() => setTab(t.key)}
                    className={menuButtonClassNameGenerator(t.key)}
                    role="tab"
                    id={`${tabID}-${t.key}-tab`}
                    data-toggle="tab"
                    aria-selected={currentTab === t.key}
                    aria-controls={`${tabID}-${t.key}-panel`}
                >
                    {renderOption(t)}
                </button>
            )}
        </li>
    ))
  );

  const VerticalSelector = (
      <ul
          id={tabID}
          role="tablist"
          aria-orientation="vertical"
          ref={tabRef}
          className={clsx([
            'dsr-sticky dsr-list-none dsr-top-0 tab-selector vertical-selector',
            'dsr-flex dsr-items-center dsr-flex-col dsr-justify-start',
            variant === 'underline' ? 'dsr-gap-y-4' : '',
            menuClassName,
          ])}
      >
          {renderTabs()}
      </ul>
  );

  const HorizontalSelector = (
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

  const ResponsiveSelector = (
      <SimpleSelect
          labels={{ placeholder: 'Select Tab' }}
          required
          className="dsr-mb-3 dsr-border-4 dsr-font-semibold dsr-rounded-lg"
          value={currentTab as string}
          name="tab"
          options={tabItems.filter((t) => !t.hidden).map((t) => ({ value: t.key, label: t.label as string }))}
          onChange={(key) => {
            const tab = tabItems.find((t) => t.key === key);
            if (tab?.onClick && typeof tab.onClick === 'function') tab.onClick();
            setTab(key.toString());
          }}
      />
  );

  return isVertical ? (
      <div className={clsx(['dsr-flex dsr-flex-wrap dsr-mx-0', className])}>
          <div className="dsr-w-full md:dsr-w-1/5 dsr-p-0">
              {!disableResponsive ? (
                  <React.Fragment>
                      <div className="dsr-hidden md:dsr-block dsr-relative">
                          {VerticalSelector}
                          {variant === 'underline' && Underline}
                      </div>
                      <div className="dsr-block md:dsr-hidden">
                          {ResponsiveSelector}
                      </div>
                  </React.Fragment>
              ) : (
                  <div className="dsr-relative">
                      {VerticalSelector}
                      {variant === 'underline' && Underline}
                  </div>
              )}
          </div>
          <div className={clsx([bodyClassName, 'dsr-w-full md:dsr-w-4/5 dsr-pr-4 dsr-pl-4'])}>
              {renderPanels()}
          </div>
      </div>
  ) : (
      <div
          className={clsx([
            className,
            alignCenter ? 'dsr-flex dsr-flex-col dsr-items-center' : 'dsr-px-0',
          ])}
      >
          {!disableResponsive ? (
              <React.Fragment>
                  <div className="dsr-hidden md:dsr-block dsr-relative">
                      {HorizontalSelector}
                      {variant === 'underline' && Underline}
                  </div>
                  <div className="dsr-block md:dsr-hidden">
                      {ResponsiveSelector}
                  </div>
              </React.Fragment>
          ) : (
              <div className="dsr-relative">
                  {HorizontalSelector}
                  {variant === 'underline' && Underline}
              </div>
          )}
          <div className={clsx([bodyClassName, 'dsr-py-3'])}>
              {renderPanels()}
          </div>
      </div>
  );

};

export default Tabs;