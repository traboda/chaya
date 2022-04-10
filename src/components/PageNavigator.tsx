import React from 'react';

import Button from './Button';
import SimpleSelect from "./SimpleSelect";

type PageNavigator = {
    totalCount: number,
    itemsPerPage: number,
    setItemsPerPage: (count: number) => void,
    hideItemsPerPage?: boolean
    showControls?: boolean,
    showEdges?: boolean,
    page: number,
    setPage: (no: number) => void,
    className?: string,
    icons?: {
        next?: React.ReactElement,
        prev?: React.ReactElement,
        start?: React.ReactElement,
        end?: React.ReactElement,
    }
}

const defaultIcons = {
    prev: <>❮</>,
    next: <>❯</>,
    start: <>❮❮</>,
    end: <>❯❯</>,
}

const PageNavigator = ({
    totalCount, itemsPerPage, setItemsPerPage, className = '', hideItemsPerPage = false, page, setPage,
    icons: _icons = null, showControls = true, showEdges = true,
}: PageNavigator) => {


    const icons = {...defaultIcons, ..._icons};
    const length = Math.floor(((totalCount + itemsPerPage-1) / itemsPerPage));

    const getPageNo = () => {
        let list = [];
        if(length > 1) {
            if(length < 6)
                Array.from({ length }, (_item, i) => {
                    list.push(i+1);
                });
            else if(page > 2 && page + 2 < length)
                for(let i = page-2; i <= (page+2); i++)
                    list.push(i);
            else if(page + 2 >= length)
                for(let i = length-4; i <= length; i++)
                    list.push(i);
            else {
                for(let i = 1; i <= 5; i++)
                    list.push(i);
            }
        } else list = [1];
        return list;
    };

    return (
        <div className={`flex items-center justify-center text-center pt-4 ${className}`}>
            <div style={{ userSelect: 'none' }}>
                {(showEdges && page > 2) && (
                    <Button className="w-12 mx-1" onClick={() => setPage(1)}>
                        {icons?.start}
                    </Button>
                )}
                {(showControls && page > 1) && (
                    <Button className="w-16 mx-1" onClick={() => setPage(page - 1)}>
                        {icons?.prev}
                    </Button>
                )}
                <React.Fragment>
                    {getPageNo().map((item, index) =>
                        <Button
                            variant={page === item ? "solid" : "outline"}
                            color={page === item ? "contrast" : "secondary"}
                            disabled={page === item}
                            key={`page_${item}_${index}`}
                            className={`w-12 mx-1 ${page === item ? 'active' : ''}`}
                            onClick={() => setPage(item)}
                        >
                            {item}
                        </Button>
                    )}
                </React.Fragment>
                {(showControls && !(page + 1 >= length)) && (
                    <Button className="w-16 mx-1" onClick={() => setPage(page + 1)}>
                        {icons?.next}
                    </Button>
                )}
                {(showEdges && (page + 1 < length)) && (
                    <Button className="w-12 mx-1" onClick={() => setPage(length)}>
                        {icons?.end}
                    </Button>
                )}
                {!hideItemsPerPage &&
                <div className="flex items-center justify-center mt-3">
                    <div className="mr-1" style={{ width: '38px' }}>
                        <SimpleSelect
                            value={itemsPerPage}
                            onChange={(n) => {
                                setPage(1) // @ts-ignore
                                setItemsPerPage(parseInt(n));
                            }}
                            name="items_per_page"
                            className="p-1 text-sm"
                            required
                            options={[
                                { label: '10', value: 10 },
                                { label: '20', value: 20 },
                                { label: '30', value: 30 },
                                { label: '50', value: 50 },
                                { label: '100', value: 100 },
                            ]}
                        />
                    </div> items per page
                </div>}
            </div>
        </div>
    );
};

export default PageNavigator;
