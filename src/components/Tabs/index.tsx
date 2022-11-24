import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styled from "@emotion/styled";
import { link_wrapper } from "../../utils/misc";
import SimpleSelect from "../SimpleSelect";
import Badge, {BadgeProps} from "../Badge";

export type TabItemObject =  {
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
    iconClassName?: string
    iconRenderer?: React.ReactElement,
    labelClassName?: string
    onActive?: () => void
};

export type Tabs = {
    items: TabItemObject[]
    disabled?: boolean
    onClickDisabled?: (arg) => void,
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

const TabBase = styled.div`
  user-select: none;
  a, button {
    border: none !important;
    background: none;
    color: ${({ theme }) => theme.color };
    text-decoration: none!important;
    border-radius: 7px;
    transition: all 250ms ease-in-out;
    i {
      font-weight: 300;
    }
    &:focus,
    &:hover {
      outline: none !important;
      background-color: hsla(0,0%,55%,.2);
    }
    &.active-tab {
      background: ${({ theme }) => theme.primary };
      color: ${({ theme }) => theme.primaryTextColor };
    }
  }
`;

const HorizontalTabSelector = styled(TabBase)`
    display: inline-flex;
    background: hsla(0,0%,35%,.2);
    border-radius: 7px;
    align-items: center;
    a, button:not(:last-of-type) {
      margin-right: 6px;
    }
`;

const VerticalTabSelector = styled(TabBase)`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: left;
    a, button {
        text-align: left !important;
        width: 100%;
        margin-bottom: 6px;
    }
`;

const Tabs = ({
 isVertical, items, disabled = false, onClickDisabled = () => {}, initialKey, id,
 className = '', menuButtonClassName = '', menuClassName = '', bodyClassName = '',
 alignCenter,  onChange = () => {}, disableResponsive = false, countBadgeProps = null,
}: Tabs) => {

    const tabID = id ? id : `tab-${nanoid()}`;

    const tabItems =  items?.length > 0 ?
        items.map((t, index) => { return { key: `tab_${index}`, ...t }; }) : [];

    const getInitialTab = () => {
        let tabkey = tabItems.length > 0 && tabItems[0].type !== 'section' ? tabItems[0].key : null;
        if(tabItems.length > 0) {
            tabItems.forEach((t) => {
                if(tabkey == null && t.key && t.type !== 'section')
                    tabkey = t.key;
                if(t.isInitial)
                    tabkey = t.key;
            });
        }
        return tabkey;
    };

    const [currentTab, setTab] = useState(initialKey ? initialKey : getInitialTab());

    useEffect(() => {
        if(initialKey?.length) setTab(initialKey);
    }, [initialKey]);

    useEffect(() => {
        onChange(currentTab);
    }, [currentTab]);

    const render_option = (t) => (
        <div className="flex w-full justify-between items-center">
            <div className="text-left">
                {t.iconClassName && (
                    <i className={t.iconClassName} style={{ marginRight: '8px' }} />
                )}
                {t.iconRenderer || null}
                <span className={t.labelClassName}>{t.label}</span>
            </div>
            {countBadgeProps && (
                <div>
                    <Badge className="py-2 px-3" {...{...countBadgeProps, ...t?.countBadgeProps}}>{t?.count}</Badge>
                </div>
            )}
        </div>
    );

    const render_panels = () => tabItems?.length > 0 ?
    tabItems.map((t) => (
        <div
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

    const _menu_button_className = (key) => `text-lg font-semibold px-5 py-2 ${currentTab === key ? 'active-tab' : ''} ${menuButtonClassName}`;

    const render_tabs = () => (
        tabItems.filter((t) => !t.hidden).map((t) => (
            <li className={isVertical ? "w-full" : null} role="presentation">
                {t?.onClick && typeof t.onClick === "function" ? (
                        <button
                            key={nanoid()}
                            onClick={() => t.onClick()}
                            className={_menu_button_className(t.key)}
                            role="tab"
                            id={`${tabID}-${t.key}-tab`}
                            data-toggle="tab"
                            aria-selected={currentTab === t.key}
                            aria-controls={`${tabID}-${t.key}-panel`}
                        >
                            {render_option(t)}
                        </button>
                    ) :
                    disabled ? (
                        <button
                            key={nanoid()}
                            onClick={() => onClickDisabled(t.key)}
                            className={_menu_button_className(t.key)}
                            role="tab"
                            id={`${tabID}-${t.key}-tab`}
                            data-toggle="tab"
                            aria-selected={currentTab === t.key}
                            aria-controls={`${tabID}-${t.key}-panel`}
                        >
                            {render_option(t)}
                        </button>
                    ) :
                    t.link ? (
                        <React.Fragment key={nanoid()}>
                            {link_wrapper(t.link, render_option(t))}
                        </React.Fragment>
                    ) :
                    t.url ? (
                        <a
                            key={nanoid()}
                            href={t.url}
                            className={_menu_button_className(t.key)}
                            role="tab"
                            id={`${tabID}-${t.key}-tab`}
                            data-toggle="tab"
                            aria-selected={currentTab === t.key}
                            aria-controls={`${tabID}-${t.key}-panel`}
                        >
                            {render_option(t)}
                        </a>
                    ) :
                    t.type === 'section' ? (
                        <h5
                            key={nanoid()}
                            style={{ opacity: 0.9 }}
                            className={_menu_button_className(t.key)}
                        >
                            {t.name}
                        </h5>
                    ) : (
                        <button
                            key={nanoid()}
                            onClick={() => setTab(t.key)}
                            className={_menu_button_className(t.key)}
                            role="tab"
                            id={`${tabID}-${t.key}-tab`}
                            data-toggle="tab"
                            aria-selected={currentTab === t.key}
                            aria-controls={`${tabID}-${t.key}-panel`}
                        >
                            {render_option(t)}
                        </button>
                    )}
            </li>
        ))
    );

    const VerticalSelector = () => (
        <VerticalTabSelector
            id={tabID}
            role="tablist"
            aria-orientation="vertical"
            className={`sticky list-none top-0 tab-selector vertical-selector ${menuClassName}`}
        >
            {render_tabs()}
        </VerticalTabSelector>
    );

    const HorizontalSelector = () => (
        <HorizontalTabSelector
            id={tabID}
            role="tablist"
            aria-orientation="horizontal"
            className={`list-none tab-selector horizontal-tabs ${menuClassName}`}
        >
            {render_tabs()}
        </HorizontalTabSelector>
    );

    const ResponsiveSelector = () => (
        <SimpleSelect
            labels={{
                placeholder: 'Select Tab'
            }}
            required
            className="mb-3 border-4 font-semibold rounded-lg"
            value={currentTab}
            name="tab"
            options={tabItems.filter((t) => !t.hidden).map((t) => ({value: t.key, label: t.label}))}
            onChange={(key) => {
                const tab = tabItems.find((t) => t.key === key);
                if (tab?.onClick && typeof tab.onClick === "function") {
                    tab.onClick()
                }
                setTab(key.toString());
            }}
        />
    )

    return isVertical ? (
        <div className={`flex flex-wrap mx-0 ${className}`}>
            <div className="w-full md:w-1/5 p-0">
                {!disableResponsive ? (
                    <React.Fragment>
                        <div className="hidden md:block">
                            <VerticalSelector />
                        </div>
                        <div className="block md:hidden">
                            <ResponsiveSelector />
                        </div>
                    </React.Fragment>
                ) : (
                    <VerticalSelector />
                )}
            </div>
            <div className={`w-full md:w-4/5 pr-4 pl-4 ${bodyClassName}`}>
                {render_panels()}
            </div>
        </div>
    ) : (
        <div className={`${alignCenter ? 'flex flex-col items-center' : 'px-0'} ${className}`}>
            {!disableResponsive ? (
                <React.Fragment>
                    <div className="hidden md:block">
                        <HorizontalSelector />
                    </div>
                    <div className="block md:hidden">
                        <ResponsiveSelector />
                    </div>
                </React.Fragment>
            ) : (
                <HorizontalSelector />
            )}
            <div className={`py-3 ${bodyClassName}`}>
                {render_panels()}
            </div>
        </div>
    );

}

export default Tabs;