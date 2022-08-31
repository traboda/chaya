import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styled from "@emotion/styled";
import { link_wrapper } from "../utils/misc";
import Badge from "./Badge";

export type TabItemObject =  {
    name?: string
    label?: string
    key?: string,
    type?: ('section')
    badge?: string,
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
    className?: string,
    bodyClassName?: string,
    menuClassName?: string,
    menuButtonClassName?: string,
    initialKey?: string,
    isVertical?: boolean,
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
 isVertical, items, disabled = false, onClickDisabled = () => {}, initialKey,
 className = '', menuButtonClassName = '', menuClassName = '', bodyClassName = '',
 alignCenter,  onChange = () => {}
}: Tabs) => {

    const tabID = `tab-${nanoid()}`;

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
        <div className="flex-col">
            <div className="float-left">
                {t.iconClassName && (
                    <i className={t.iconClassName} style={{ marginRight: '8px' }} />
                )}
                {t.iconRenderer || null}
                <span className={t.labelClassName}>{t.label}</span>
            </div>
            <Badge className="ml-1.5 rounded-xl" color={t?.key === currentTab ? "contrast" : "primary"} variant="minimal">{t.badge}</Badge>
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

    return isVertical ? (
        <div className={`flex flex-wrap mx-0 ${className}`}>
            <div className="md:w-1/5 p-0">
                <VerticalTabSelector role="tablist" aria-orientation="vertical" className={`sticky list-none top-0 ${menuClassName}`}>
                    {render_tabs()}
                </VerticalTabSelector>
            </div>
            <div className={`md:w-4/5 pr-4 pl-4 ${bodyClassName}`}>
                {render_panels()}
            </div>
        </div>
    ) : (
        <div className={`${alignCenter ? 'flex flex-col items-center' : 'px-0'} ${className}`}>
            <HorizontalTabSelector role="tablist" aria-orientation="horizontal" className={`list-none ${menuClassName}`}>
                {render_tabs()}
            </HorizontalTabSelector>
            <div className={`py-3 ${bodyClassName}`}>
                {render_panels()}
            </div>
        </div>
    );

}

export default Tabs;