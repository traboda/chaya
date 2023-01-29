import React, { useEffect, useMemo, useState } from 'react';
import hyperid from 'hyperid';
import clsx from 'clsx';

import { LinkWrapper } from '../utils/misc';

import SimpleSelect from './SimpleSelect';
import Badge, { BadgeProps } from './Badge';
import Icon, { IconInputType } from './Icon';
 
const generateId = hyperid();
 
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

export type Tabs = {
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
  alignCenter?: boolean
};

const Tabs = ({
  isVertical, items, disabled = false, onClickDisabled = () => {}, initialKey, id,
  className = '', menuButtonClassName = '', menuClassName = '', bodyClassName = '',
  alignCenter, onChange = () => {}, disableResponsive = false, countBadgeProps,
}: Tabs) => {

  const tabID = useMemo(() => id ?? `tab-${generateId()}`, [id]);

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

  useEffect(() => {
    if (initialKey && initialKey?.length) setTab(initialKey);
  }, [initialKey]);

  useEffect(() => {
    if (currentTab) onChange(currentTab);
  }, [currentTab]);

  const renderOption = (t: TabItemObject) => (
      <div className="dsr-flex dsr-w-full dsr-justify-between dsr-items-center dsr-gap-2">
          <div className="dsr-flex dsr-items-center dsr-gap-2 dsr-text-left">
              {t.icon && <span className="dsr-w-[16px]"><Icon icon={t.icon} size={16} /></span>}
              <span className={t.labelClassName}>{t.label}</span>
          </div>
          {countBadgeProps && (
              <Badge size="sm" {...{ ...countBadgeProps, ...t?.countBadgeProps }}>{t?.count}</Badge>
          )}
      </div>
  );

  const renderPanels = () => tabItems?.length > 0 ?
    tabItems.map((t) => (
        <div
            key={t?.key ? `tab_panel_${t.key}` : generateId()}
            role="tabpanel"
            id={`${tabID}-${t.key}-panel`}
            aria-labelledby={`${tabID}-${t.key}-tab`}
        >
            {t.key === currentTab && (
              t?.renderer ? t.renderer :
                t.rendererFunc ? t.rendererFunc() : null
            )}
        </div>
    )) : <div />;

  const menuButtonClassNameGenerator = (key: string) => clsx([
    'dsr-text-lg dsr-font-semibold dsr-px-5 dsr-py-2 dsr-outline-none',
    'dsr-border-0 dsr-bg-transparent dsr-text-color dsr-no-underline dsr-rounded-lg dsr-transition-all',
    currentTab === key ? 'dsr-bg-primary dsr-text-color' : 'hover:dsr-bg-gray-500/20 focus:dsr-bg-gray-500/20',
    menuButtonClassName,
    isVertical ? 'dsr-w-full dsr-text-left' : '',
  ]);

  const renderTabs = () => (
    tabItems.filter((t) => !t.hidden).map(t => (
        <li
            key={t?.key ? `tab_selector_${t?.key}` : generateId()}
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

  const VerticalSelector = () => (
      <div
          id={tabID}
          role="tablist"
          aria-orientation="vertical"
          className={clsx([
            'dsr-sticky dsr-list-none dsr-top-0 tab-selector vertical-selector',
            'dsr-flex dsr-items-center dsr-flex-col dsr-justify-start',
            menuClassName,
          ])}
      >
          {renderTabs()}
      </div>
  );

  const HorizontalSelector = () => (
      <div
          id={tabID}
          role="tablist"
          aria-orientation="horizontal"
          className={clsx([
            'dsr-list-none tab-selector horizontal-tabs dsr-inline-flex dsr-bg-gray-400/20 bg-rounded-lg',
            'dsr-items-center dsr-rounded-lg',
            menuClassName,
          ])}
      >
          {renderTabs()}
      </div>
  );

  const ResponsiveSelector = () => (
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
                      <div className="dsr-hidden md:dsr-block">
                          <VerticalSelector />
                      </div>
                      <div className="dsr-block md:dsr-hidden">
                          <ResponsiveSelector />
                      </div>
                  </React.Fragment>
              ) : (
                  <VerticalSelector />
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
                  <div className="dsr-hidden md:dsr-block">
                      <HorizontalSelector />
                  </div>
                  <div className="dsr-block md:dsr-hidden">
                      <ResponsiveSelector />
                  </div>
              </React.Fragment>
          ) : (
              <HorizontalSelector />
          )}
          <div className={clsx([bodyClassName, 'dsr-py-3'])}>
              {renderPanels()}
          </div>
      </div>
  );

};

export default Tabs;