import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styled from "@emotion/styled";

export type TabItemObject =  {
    name?: string
    label?: string
    key?: string,
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
    labelClassName?: string
    onActive?: () => void
};

export type TabSwitcher = {
    items: TabItemObject[]
    disabled?: boolean
    onClickDisabled?: (arg) => void,
    onChange: (key: string) => void,
    tabSelectorClassName?: string,
    initialKey?: string,
    linkWrapper?: (link: string, component: React.ReactNode) => React.ReactNode,
    isVertical?: boolean,
    alignCenter?: boolean
};

const TabBase = styled.div`
  user-select: none;
  a, button {
    border: none !important;
    background: none;
    font-size: 18px;
    padding: 0.75rem 1.25rem;
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
    a, button {
      font-weight: 600;
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

const TabSwitcher = ({
 isVertical, items, disabled = false, onClickDisabled = () => {}, initialKey,
 linkWrapper, alignCenter, tabSelectorClassName, onChange = () => {}
}: TabSwitcher) => {

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
        <React.Fragment>
            {t.iconClassName && (
                <i className={t.iconClassName} style={{ marginRight: '8px' }} />
            )}
            <span className={t.labelClassName}>{t.label}</span>
        </React.Fragment>
    );

    const render_active_tab = () => {
        const t = tabItems.filter((t) => !t.hidden).filter((t) => t.key === currentTab);
        return t.length > 0 ? (
            <div className="py-3">
                <div>{
                    t[0]?.renderer ? t[0].renderer :
                        t[0].rendererFunc ? t[0].rendererFunc() : null
                }</div>
            </div>
        ) : <div />;
    };

    const render_menu_options = () => (
        <div>
            {tabItems.filter((t) => !t.hidden).map((t) =>
                t?.onClick && typeof t.onClick === "function" ? (
                    <button
                        key={nanoid()}
                        onClick={() => t.onClick()}
                        className={t.key === currentTab ? 'active-tab' : null}
                    >
                        {render_option(t)}
                    </button>
                ) :
                disabled ? (
                    <button
                        key={nanoid()}
                        onClick={() => onClickDisabled(t.key)}
                        className={t.key === currentTab ? 'active-tab' : null}
                    >
                        {render_option(t)}
                    </button>
                ) :
                t.link ?
                <React.Fragment key={nanoid()}>
                    {linkWrapper(t.link, render_option(t))}
                </React.Fragment> :
                t.url ? (
                    <a
                        key={nanoid()}
                        href={t.url}
                        className={t.key === currentTab ? 'active-tab' : null}
                    >
                        {render_option(t)}
                    </a>
                ):
                t.type === 'section' ? (
                    <h5
                        key={nanoid()}
                        style={{ opacity: 0.9 }}
                        className="text-left font-semibold mt-2 p-2 w-full"
                    >
                        {t.name}
                    </h5>
                ) : (
                    <button
                        key={nanoid()}
                        onClick={() => setTab(t.key)}
                        className={t.key === currentTab ? 'active-tab' : null}
                    >
                        {render_option(t)}
                    </button>
                )
            )}
        </div>
    );

    return isVertical ? (
        <div className="flex flex-wrap  mx-0">
            <div className="md:w-1/5 p-0">
                <VerticalTabSelector className={`sticky top-0 ${tabSelectorClassName}`}>
                    {render_menu_options()}
                </VerticalTabSelector>
            </div>
            <div className="md:w-4/5 pr-4 pl-4">
                {render_active_tab()}
            </div>
        </div>
    ) : (
        <div className={alignCenter ? 'justify-center flex' : 'px-0'}>
            <HorizontalTabSelector className={tabSelectorClassName}>
                {render_menu_options()}
            </HorizontalTabSelector>
        </div>
    );

}

export default TabSwitcher;